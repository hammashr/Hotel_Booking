import React, { memo } from 'react';
import config from '../../config';

const TopBar = ({ isDarkMode }) => {
  const phoneDisplay = config.site.phone;
  const phoneHref = `tel:${phoneDisplay.replace(/[^+\d]/g, '')}`;
  const email = config.site.email;

  return (
    <div className={`relative z-[60] border-b transition-colors duration-500 backdrop-blur-sm ${
      isDarkMode 
        ? 'bg-linear-to-br from-[#0B0C0E] via-[#0F1419] to-[#141A1F] border-[#1A2229] text-[#C4CCD4]'
        : 'bg-linear-to-br from-[#F8FAFB] via-[#E8F4F8] to-[#F0F9FF] text-[#1A202C]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <a href={phoneHref} className="flex items-center gap-2 transition-colors hover:text-[#22D3EE]">
            <span className="hidden md:inline">{phoneDisplay}</span>
          </a>
          <a href={`mailto:${email}`} className="hidden md:flex items-center gap-2 transition-colors hover:text-[#22D3EE]">
            <span>{email}</span>
          </a>
          <span className="hidden lg:flex items-center gap-2 text-[#4DBBFF]">
            <span>Mon - Sat: 9AM - 6PM (CT)</span>
          </span>
        </div>
        <div className="flex items-center gap-4" />
      </div>
    </div>
  );
};

export default memo(TopBar);
