import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash anchor, try to scroll to it.
    if (hash) {
      // Small timeout to allow element to mount
      setTimeout(() => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        } catch (e) {
          // ignore invalid selector
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
      return;
    }

    // Default: scroll to top on path change
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
