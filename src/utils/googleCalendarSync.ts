import {addDaysIso} from './bikramiEngine';
import type {IcsRecord} from './icsExport';

/**
 * Pure client-side Google Identity Services (GIS) Calendar sync helper.
 * - Reads public OAuth Client ID strictly from `import.meta.env.VITE_GOOGLE_CLIENT_ID`.
 * - NEVER stores or requires any `client_secret` in the public frontend repo.
 * - Keeps the OAuth access token strictly in memory (never written to localStorage/sessionStorage).
 * - Creates/reuses a dedicated "Tatkhalsa Puratan Jantri" calendar and upserts events idempotently
 *   using `extendedProperties.private.tatkhalsaUid` to prevent duplicates.
 */

const GIS_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';
const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const CALENDAR_SUMMARY = 'Tatkhalsa Puratan Jantri';
const OAUTH_SCOPES =
  'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.app.created';

interface GisTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface GisTokenClient {
  requestAccessToken: (overrideConfig?: {prompt?: string}) => void;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (resp: GisTokenResponse) => void;
          }) => GisTokenClient;
        };
      };
    };
  }
}

let inMemoryAccessToken: string | null = null;
let gisLoadPromise: Promise<void> | null = null;

export function getGoogleOAuthClientId(): string {
  const raw = (import.meta as unknown as {env?: Record<string, string | undefined>}).env
    ?.VITE_GOOGLE_CLIENT_ID;
  return typeof raw === 'string' ? raw.trim() : '';
}

export function isGoogleOAuthConfigured(): boolean {
  return getGoogleOAuthClientId().length > 0;
}

export function clearInMemoryGoogleToken(): void {
  inMemoryAccessToken = null;
}

function loadGisScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google sign-in requires a browser environment.'));
  }
  if (window.google?.accounts?.oauth2) {
    return Promise.resolve();
  }
  if (gisLoadPromise) return gisLoadPromise;

  gisLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GIS_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      gisLoadPromise = null;
      reject(new Error('Unable to load Google Identity Services script.'));
    };
    document.head.appendChild(script);
  });

  return gisLoadPromise;
}

/** Prompt the user via Google Identity Services to grant Calendar access (token kept in memory only). */
export async function requestGoogleCalendarAccessToken(): Promise<string> {
  const clientId = getGoogleOAuthClientId();
  if (!clientId) {
    throw new Error('Google Calendar OAuth Client ID is not configured.');
  }
  await loadGisScript();
  const oauth2 = window.google?.accounts?.oauth2;
  if (!oauth2) {
    throw new Error('Google Identity Services failed to initialize.');
  }

  return new Promise<string>((resolve, reject) => {
    const client = oauth2.initTokenClient({
      client_id: clientId,
      scope: OAUTH_SCOPES,
      callback: (resp) => {
        if (resp.error || !resp.access_token) {
          reject(new Error(resp.error_description || resp.error || 'Google sign-in was cancelled.'));
          return;
        }
        inMemoryAccessToken = resp.access_token;
        resolve(resp.access_token);
      },
    });
    client.requestAccessToken({prompt: inMemoryAccessToken ? '' : 'consent'});
  });
}

async function googleFetch(url: string, token: string, init?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
}

async function ensureJantriCalendarId(token: string): Promise<{calendarId: string; calendarName: string}> {
  // 1. Check user's calendarList for an existing "Tatkhalsa Puratan Jantri" calendar
  try {
    const listRes = await googleFetch(`${GOOGLE_CALENDAR_API}/users/me/calendarList?maxResults=250`, token);
    if (listRes.ok) {
      const data = (await listRes.json()) as {
        items?: {id: string; summary?: string; accessRole?: string}[];
      };
      const existing = data.items?.find(
        (c) => c.summary === CALENDAR_SUMMARY && (c.accessRole === 'owner' || c.accessRole === 'writer'),
      );
      if (existing) {
        return {calendarId: existing.id, calendarName: CALENDAR_SUMMARY};
      }
    }
  } catch {
    // Fall through to creating or using primary
  }

  // 2. Try creating a dedicated secondary calendar
  try {
    const createRes = await googleFetch(`${GOOGLE_CALENDAR_API}/calendars`, token, {
      method: 'POST',
      body: JSON.stringify({
        summary: CALENDAR_SUMMARY,
        description:
          'Authentic Puratan Bikrami Sambat Jantri by Tatkhalsa Foundation (https://calendar.tatkhalsa.in).',
        timeZone: 'Asia/Kolkata',
      }),
    });
    if (createRes.ok) {
      const created = (await createRes.json()) as {id?: string};
      if (created.id) {
        return {calendarId: created.id, calendarName: CALENDAR_SUMMARY};
      }
    }
  } catch {
    // Fall back to primary calendar gracefully
  }

  return {calendarId: 'primary', calendarName: 'Primary Google Calendar'};
}

async function fetchExistingUidMap(
  token: string,
  calendarId: string,
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  let pageToken: string | undefined;

  for (let page = 0; page < 10; page++) {
    const params = new URLSearchParams({
      maxResults: '2500',
      privateExtendedProperty: 'tatkhalsaSource=puratan-jantri',
      showDeleted: 'false',
    });
    if (pageToken) params.set('pageToken', pageToken);

    const res = await googleFetch(
      `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`,
      token,
    );
    if (!res.ok) break;
    const data = (await res.json()) as {
      items?: {id?: string; extendedProperties?: {private?: Record<string, string>}}[];
      nextPageToken?: string;
    };
    for (const item of data.items ?? []) {
      const uid = item.extendedProperties?.private?.tatkhalsaUid;
      if (uid && item.id) {
        map.set(uid, item.id);
      }
    }
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }

  return map;
}

export interface GoogleCalendarSyncResult {
  calendarName: string;
  created: number;
  updated: number;
  failed: number;
  total: number;
}

/**
 * Upsert Jantri records into the user's Google Calendar with duplicate prevention and progress reporting.
 */
export async function syncRecordsToGoogleCalendar(
  records: readonly IcsRecord[],
  onProgress?: (done: number, total: number) => void,
): Promise<GoogleCalendarSyncResult> {
  const token = inMemoryAccessToken || (await requestGoogleCalendarAccessToken());
  const {calendarId, calendarName} = await ensureJantriCalendarId(token);
  const existingMap = await fetchExistingUidMap(token, calendarId);

  let created = 0;
  let updated = 0;
  let failed = 0;
  const total = records.length;
  onProgress?.(0, total);

  // Process in gentle concurrent chunks of 4 to stay well inside Google Calendar API rate limits
  const CONCURRENCY = 4;
  let completed = 0;

  for (let i = 0; i < records.length; i += CONCURRENCY) {
    const batch = records.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (rec) => {
        const body = JSON.stringify({
          summary: rec.summary,
          description: rec.description,
          start: {date: rec.date},
          end: {date: addDaysIso(rec.date, 1)},
          transparency: 'transparent',
          extendedProperties: {
            private: {
              tatkhalsaSource: 'puratan-jantri',
              tatkhalsaUid: rec.uid,
            },
          },
        });

        const existingEventId = existingMap.get(rec.uid);
        try {
          if (existingEventId) {
            const res = await googleFetch(
              `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(existingEventId)}`,
              token,
              {method: 'PATCH', body},
            );
            if (res.ok) updated += 1;
            else failed += 1;
          } else {
            const res = await googleFetch(
              `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendarId)}/events`,
              token,
              {method: 'POST', body},
            );
            if (res.ok) created += 1;
            else failed += 1;
          }
        } catch {
          failed += 1;
        } finally {
          completed += 1;
          onProgress?.(completed, total);
        }
      }),
    );
  }

  return {calendarName, created, updated, failed, total};
}
