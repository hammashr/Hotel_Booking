import { useEffect, useState } from 'react';
import { useNavbarSetup } from '../../hooks';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from '../common/SEO';

/**
 * PageLayout Component
 * Provides consistent layout structure for all pages
 * Automatically handles navbar, footer, and SEO
 * 
 * Usage:
 * <PageLayout seo={{ title: 'Page Title', description: '...' }}>
 *   <YourPageContent />
 * </PageLayout>
 */

const PageLayout = ({ 
  children, 
  seo = {}, 
  showNavbar = true, 
  showFooter = true,
  className = '' 
}) => {
  const { navbarProps, isDarkMode } = useNavbarSetup();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal], .reveal-on-scroll'));
    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView) {
        element.classList.add('reveal-in');
      } else {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isDarkMode]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO {...seo} />
      
      <div className={`site-theme-shell min-h-screen transition-colors duration-500 theme-text ${
        isDarkMode 
          ? 'theme-dark bg-linear-to-b from-[#0F0D0A] via-[#171310] to-[#0F0D0A] text-[#E0E7EE]' 
          : 'theme-light light-page-bg text-[#2E2117]'
      } ${className}`}>
        <div className="site-theme-glow" aria-hidden="true" />
        {showNavbar && <Navbar {...navbarProps} />}
        
        <main className={`${showNavbar ? 'pt-[72px] lg:pt-[88px]' : ''} relative z-10`}>
          <div className="site-page-content">
            {children}
          </div>
        </main>

        <button
          type="button"
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          className={`fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex items-center justify-center rounded-full shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
          } ${
            isDarkMode
              ? 'bg-[#0B0C0E] text-[#22D3EE] ring-[#22D3EE]/40 hover:bg-[#111319]'
              : 'bg-[#FFF9F1] text-[#8A6B45] ring-[#C9A36A]/35 hover:bg-[#F2E7DA]'
          }`}
        >
          <svg className="h-9 w-9 md:h-10 md:w-10 p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        
        {showFooter && <Footer isDarkMode={isDarkMode} />}
      </div>
    </>
  );
};

export default PageLayout;
