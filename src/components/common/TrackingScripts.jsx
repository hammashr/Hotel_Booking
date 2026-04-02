import { useEffect } from 'react';
import config from '../../config';
import { initAnalytics, trackPageView } from '../../utils/analytics';

/**
 * TrackingScripts
 *
 * Defers GA4, GTM, and Meta (Facebook) Pixel until the main page is idle.
 * Route-level page-view tracking is handled by RouteTracker (inside BrowserRouter).
 *
 * Credentials come from config (which reads VITE_* env vars).
 * Add to your .env:
 *   VITE_GA_ID=G-XXXXXXXXXX
 *   VITE_GTM_ID=GTM-XXXXXXX   (optional — takes precedence over GA4)
 *   VITE_FB_PIXEL_ID=XXXXXXXXXXXXXXX
 */
const TrackingScripts = () => {
  const gaId = config.analytics?.googleAnalyticsId || '';
  const gtmId = config.analytics?.googleTagManagerId || '';
  const fbPixelId = import.meta.env.VITE_FB_PIXEL_ID || '';

  const hasGA = Boolean(gaId || gtmId);
  const hasFB = Boolean(fbPixelId);

  useEffect(() => {
    if (!hasGA && !hasFB) {
      return undefined;
    }

    let timeoutId;
    let idleId;
    let cancelled = false;

    const runInit = () => {
      if (cancelled) {
        return;
      }

      initAnalytics();
      trackPageView(window.location.pathname + window.location.search, document.title);
    };

    const scheduleInit = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(runInit, { timeout: 3500 });
        return;
      }

      timeoutId = window.setTimeout(runInit, 1500);
    };

    if (document.readyState === 'complete') {
      scheduleInit();
    } else {
      window.addEventListener('load', scheduleInit, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', scheduleInit);

      if (typeof idleId === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }

      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }
    };
  }, [hasFB, hasGA]);

  return null;
};

export default TrackingScripts;
