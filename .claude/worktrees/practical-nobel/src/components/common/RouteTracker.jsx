import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../utils/analytics';

/**
 * RouteTracker
 *
 * Fires a GA4 page_view + Meta Pixel PageView on every route change.
 * Must be rendered inside BrowserRouter (uses useLocation).
 * Place it as a direct child of the router, alongside <ScrollToTop />.
 */
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteTracker;
