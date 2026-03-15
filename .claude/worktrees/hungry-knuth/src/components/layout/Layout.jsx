import { useEffect, useState } from 'react';
import { useNavbarSetup } from '../../hooks';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Centralized Layout Component
 * Wraps all pages with consistent Navbar and Footer
 * Handles all navbar setup and click-outside logic internally
 * 
 * Usage:
 * <Layout>
 *   <YourPageContent />
 * </Layout>
 */
const Layout = ({ children, className = '' }) => {
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

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 theme-text ${
      isDarkMode
        ? 'bg-linear-to-b from-[#0B0C0E] to-[#0F1419] text-[#E0E7EE]'
        : 'bg-linear-to-b from-white to-[#F8FAFB] text-[#1F2937]'
    } ${className}`}>
      <Navbar {...navbarProps} />
      <main className="flex-grow">
        {children}
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
            : 'bg-white text-[#2563EB] ring-[#3B82F6]/30 hover:bg-[#F0F6FB]'
        }`}
      >
        <svg className="h-9 w-9 md:h-10 md:w-10 p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Layout;
