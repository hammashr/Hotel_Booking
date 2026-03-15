import { memo } from 'react';
import { Link } from 'react-router-dom';
import { QUICK_LINKS, POPULAR_DESTINATIONS, CONTACT_INFO, COMPANY_INFO, LEGAL_LINKS } from '../../constants';
import logo from '../../assets/logo.png';

const Footer = ({ isDarkMode }) => {
  // All pages are now live — no under-development redirects

  return (
    <footer className={`border-t pt-10 sm:pt-16 pb-8 transition-colors ${
      isDarkMode ? 'border-[rgba(201,163,106,0.25)] bg-[#0B0C0E]' : 'border-[rgba(231,240,233,0.18)] bg-linear-to-b from-[#153828] via-[#1B4332] to-[#0F2B1E]'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 flex-shrink-0">
                <img
                  src={logo}
                  alt="The Tiny Escape logo"
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-[#C9A36A]' : 'text-[#E7F0E6]'}`}>
                {COMPANY_INFO.name}
              </h3>
            </div>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-[#BFAE95]' : 'text-[#DCE8DC]'}`}>
              {COMPANY_INFO.tagline}
            </p>
          </div>
          <div>
            <h4 className={`font-bold mb-4 text-base ${isDarkMode ? 'text-[#F7E8D2]' : 'text-[#E7F0E6]'}`}>
              Stay Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className={`text-sm sm:text-base hover:text-white transition hover:underline ${
                      isDarkMode ? 'text-[#BFAE95]' : 'text-[#DCE8DC]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`font-bold mb-4 text-base ${isDarkMode ? 'text-[#F7E8D2]' : 'text-[#E7F0E6]'}`}>
              Featured Stays
            </h4>
            <ul className="space-y-2">
              {POPULAR_DESTINATIONS.map((dest) => (
                <li key={dest.slug}>
                  <Link 
                    to={`/stay/${dest.slug}`}
                    className={`text-sm sm:text-base hover:text-white transition hover:underline ${
                      isDarkMode ? 'text-[#BFAE95]' : 'text-[#DCE8DC]'
                    }`}
                  >
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`font-bold mb-4 text-base ${isDarkMode ? 'text-[#F7E8D2]' : 'text-[#E7F0E6]'}`}>
              Contact
            </h4>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-[#BFAE95]' : 'text-[#DCE8DC]'}`}>
              Email: {CONTACT_INFO.email}
            </p>
            <p className={`mt-2 text-sm sm:text-base ${isDarkMode ? 'text-[#BFAE95]' : 'text-[#DCE8DC]'}`}>
              Phone: {CONTACT_INFO.phone}
            </p>
          </div>
        </div>
        <div className={`pt-8 border-t text-center text-xs sm:text-sm ${
          isDarkMode ? 'border-[rgba(201,163,106,0.2)] text-[#9B8A72]' : 'border-[rgba(231,240,233,0.18)] text-[#CFE0D0]'
        }`}>
          <p className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 flex-wrap">
            <span>{COMPANY_INFO.copyright}</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>
              Powered and maintained by{' '}
              <a 
                href={COMPANY_INFO.poweredBy.url}
                target="_blank" 
                rel="noopener noreferrer"
                className={`font-semibold hover:underline transition ${
                  isDarkMode ? 'text-[#F1DDBA] hover:text-[#FFF4E2]' : 'text-[#E7F0E6] hover:text-white'
                }`}
              >
                {COMPANY_INFO.poweredBy.name}
              </a>
            </span>
            <span className="hidden sm:inline mx-2">|</span>
            <span className="flex gap-2">
              {LEGAL_LINKS.map((link, index) => (
                <span key={link.path} className="flex items-center gap-2">
                  {index > 0 && <span>|</span>}
                  <Link 
                    to={link.path}
                    className={`hover:underline transition ${
                      isDarkMode ? 'hover:text-[#C9A36A]' : 'hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
