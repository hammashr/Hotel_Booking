import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { QUICK_LINKS, POPULAR_DESTINATIONS, CONTACT_INFO, COMPANY_INFO, LEGAL_LINKS } from '../../constants';
import logo from '../../assets/logo.png';

const SOCIAL_LINKS = {
  cafe: [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/creeksidecafetx', color: '#1877F2' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/creeksidecafetx', color: '#E1306C' },
    { icon: FaTiktok, label: 'TikTok', href: 'https://www.tiktok.com/@creeksidecafe', color: '#ffffff' },
  ],
  escape: [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/thetinyescapetx/', color: '#1877F2' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/Thetinyescapetx', color: '#E1306C' },
    { icon: FaTiktok, label: 'TikTok', href: 'https://www.tiktok.com/@thetinyescapetx', color: '#ffffff' },
  ],
};

const Footer = ({ isDarkMode }) => {
  // All pages are now live — no under-development redirects

  return (
    <footer className={`border-t pt-10 sm:pt-16 pb-8 transition-colors ${
      isDarkMode ? 'border-[rgba(201,163,106,0.25)] bg-[#0B0C0E]' : 'border-[rgba(231,240,233,0.18)] bg-linear-to-b from-[#153828] via-[#1B4332] to-[#0F2B1E]'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 items-start">
          <div className="self-start">
            <div className="flex items-center gap-3">
              <div className="h-[90px] w-[90px] flex-shrink-0 overflow-hidden">
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
            <p className={`text-sm sm:text-base mb-6 ${isDarkMode ? 'text-[#BFAE95]' : 'text-[#DCE8DC]'}`}>
              Email: {CONTACT_INFO.email}
            </p>

            {/* Follow Us */}
            <h4 className={`font-bold mb-3 text-base ${isDarkMode ? 'text-[#F7E8D2]' : 'text-[#E7F0E6]'}`}>
              Follow Us
            </h4>
            <div className="flex gap-2">
              {SOCIAL_LINKS.escape.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`The Tiny Escape on ${label}`}
                  title={label}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    isDarkMode
                      ? 'bg-[#1A2830] border border-[#2A3A44] text-[#8BAAB8] hover:border-[#5F8C6A]'
                      : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/25 hover:border-white/40 hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
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
