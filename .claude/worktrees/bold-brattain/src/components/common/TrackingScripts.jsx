import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import config from '../../config';

/**
 * TrackingScripts
 *
 * Injects GA4, GTM, and Meta (Facebook) Pixel into <head>.
 * Rendered outside BrowserRouter so it can't use useLocation.
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

  if (!hasGA && !hasFB) return null;

  return (
    <Fragment>
      <Helmet>
        {/* ── Google Tag Manager (preferred) ── */}
        {gtmId && (
          <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </script>
        )}

        {/* ── Google Analytics 4 (direct, when no GTM) ── */}
        {!gtmId && gaId && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        )}
        {!gtmId && gaId && (
          <script>
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gaId}',{send_page_view:false,anonymize_ip:true});`}
          </script>
        )}

        {/* ── Meta (Facebook) Pixel ── */}
        {hasFB && (
          <script>
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${fbPixelId}');
fbq('track','PageView');`}
          </script>
        )}
      </Helmet>

      {/* GTM noscript fallback */}
      {gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
    </Fragment>
  );
};

export default TrackingScripts;
