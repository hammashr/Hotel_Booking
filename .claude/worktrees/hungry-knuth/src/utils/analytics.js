/**
 * Analytics — The Tiny Escape
 *
 * Injects Google Analytics 4 and Meta (Facebook) Pixel at runtime,
 * reading credentials from environment variables so they are never
 * hardcoded in source.
 *
 * Setup:
 *   .env:
 *     VITE_GA_ID=G-XXXXXXXXXX       ← GA4 Measurement ID
 *     VITE_GTM_ID=GTM-XXXXXXX       ← Google Tag Manager (optional)
 *     VITE_FB_PIXEL_ID=XXXXXXXXXXXXXXX  ← Meta Pixel ID
 *
 * Call initAnalytics() once at app startup (main.jsx or App.jsx).
 * Call trackPageView(path) on every route change.
 */

const GA_ID = import.meta.env.VITE_GA_ID || '';
const GTM_ID = import.meta.env.VITE_GTM_ID || '';
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '';

let analyticsInitialized = false;

// ─── Google Analytics 4 ───────────────────────────────────────────────────────

const loadGA4 = (measurementId) => {
  if (!measurementId) return;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // we send manually on route changes
    anonymize_ip: true,
  });
};

const loadGTM = (containerId) => {
  if (!containerId) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);

  // GTM noscript iframe
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${containerId}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.prepend(noscript);
};

// ─── Meta (Facebook) Pixel ───────────────────────────────────────────────────

const loadMetaPixel = (pixelId) => {
  if (!pixelId) return;

  // Facebook Pixel base code (no inline scripts, no noscript img)
  window.fbq = function () {
    if (window.fbq.callMethod) {
      window.fbq.callMethod.apply(window.fbq, arguments);
    } else {
      window.fbq.queue.push(arguments);
    }
  };
  if (!window._fbq) window._fbq = window.fbq;
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  window.fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Initialize all analytics. Call once at app startup.
 */
export const initAnalytics = () => {
  if (analyticsInitialized) return;
  analyticsInitialized = true;

  // Prefer GTM if set (it can wrap GA4 too), otherwise load GA4 directly.
  if (GTM_ID) {
    loadGTM(GTM_ID);
  } else if (GA_ID) {
    loadGA4(GA_ID);
  }

  if (FB_PIXEL_ID) {
    loadMetaPixel(FB_PIXEL_ID);
  }
};

/**
 * Send a page-view event. Call on every route change.
 * @param {string} path — e.g. "/tours", "/stay/apple-1-razoo-creek"
 * @param {string} [title] — optional page title
 */
export const trackPageView = (path, title) => {
  // GA4
  if (window.gtag && GA_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      send_to: GA_ID,
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track a custom event (e.g. booking inquiry, date selection).
 * @param {string} eventName
 * @param {object} [params]
 */
export const trackEvent = (eventName, params = {}) => {
  // GA4
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel — map common events to standard FB events
  if (window.fbq) {
    const fbEventMap = {
      booking_request: 'Lead',
      check_availability: 'Search',
      view_stay: 'ViewContent',
      deposit_paid: 'Purchase',
    };
    const fbEvent = fbEventMap[eventName];
    if (fbEvent) {
      window.fbq('track', fbEvent, params);
    } else {
      window.fbq('trackCustom', eventName, params);
    }
  }
};

export default { initAnalytics, trackPageView, trackEvent };
