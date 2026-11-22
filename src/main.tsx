import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Offline-first by default: precache the entire app and datasets locally.
// Check for a service worker update once at startup when online, download & apply silently,
// then continue running fully from offline cache with no nagging banners.
let hasCheckedStartupUpdate = false;
registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    if (!registration || hasCheckedStartupUpdate) return;
    hasCheckedStartupUpdate = true;
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      registration.update().catch(() => {
        // Silently stay on cached offline build if network is unreachable
      });
    }
  },
});

createRoot(document.getElementById('root')!).render(<App />);
