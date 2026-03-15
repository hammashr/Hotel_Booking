import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

const FlipCard = ({
  frontImage,
  title,
  subtitle,
  price,
  description,
  highlights,
  link,
  isDarkMode,
  isMobile = false,
  isExpanded = false,
  onToggle = () => {}
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCanHover = () => setCanHover(media.matches);
    updateCanHover();
    media.addEventListener('change', updateCanHover);
    return () => media.removeEventListener('change', updateCanHover);
  }, []);

  if (isMobile) {
    return (
      <article className="overflow-hidden">
        <button
          type="button"
          onClick={onToggle}
          className={`w-full rounded-2xl overflow-hidden border text-left transition-all duration-300 ${
            isDarkMode
              ? 'border-[rgba(201,163,106,0.25)] bg-[rgba(14,11,9,0.95)]'
              : 'border-[#DDE8DD] bg-white'
          }`}
          aria-expanded={isExpanded}
        >
          <div className="relative h-44 sm:h-52 w-full">
            <img src={frontImage} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <div className={`absolute inset-0 ${
              isDarkMode
                ? 'bg-linear-to-t from-[rgba(14,11,9,0.92)] via-[rgba(14,11,9,0.45)] to-transparent'
                : 'bg-linear-to-t from-[rgba(17,24,18,0.8)] via-[rgba(17,24,18,0.28)] to-transparent'
            }`} />

            <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-3">
              <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md ${
                isDarkMode
                  ? 'border-[rgba(201,163,106,0.45)] bg-[rgba(26,22,18,0.78)] text-[#E7CFA2]'
                  : 'border-[rgba(47,93,58,0.4)] bg-[rgba(243,247,242,0.9)] text-[#2F5D3A]'
              }`}>
                {subtitle}
              </span>
              <span className={`rounded-full px-3 py-1 text-sm font-bold shadow-lg ${
                isDarkMode
                  ? 'bg-[rgba(201,163,106,0.9)] text-[#1A120A]'
                  : 'bg-[#EAF3EA] text-[#1F2A1F]'
              }`}>
                {price}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
              <h3 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-white'}`}>
                {title}
              </h3>
              <span className={`text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${
                isDarkMode ? 'text-[#E7CFA2]' : 'text-white'
              }`}>
                ▼
              </span>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-out overflow-hidden ${isExpanded ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className={`px-4 py-4 border-t ${
              isDarkMode
                ? 'border-[rgba(201,163,106,0.22)] bg-[rgba(10,9,8,0.88)]'
                : 'border-[#DDE8DD] bg-[#F7FBF7]'
            }`}>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#4B5F4B]'}`}>{description}</p>
              <div className="mt-3 space-y-1.5">
                {highlights.map((highlight, i) => (
                  <div key={i} className={`flex items-start gap-2 text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#2F3A2F]'}`}>
                    <span className={`mt-0.5 ${isDarkMode ? 'text-[#E7CFA2]' : 'text-[#2F5D3A]'}`}>•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
              <Link
                to={link}
                className={`mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider shadow-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2] text-[#1A120A]'
                    : 'bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C] text-[#0F1A12]'
                }`}
              >
                View Details
              </Link>
            </div>
          </div>
        </button>

        <div className={`mx-auto w-[2px] transition-all duration-500 ${isExpanded ? 'h-5 opacity-100' : 'h-0 opacity-0'} ${
          isDarkMode ? 'bg-[rgba(201,163,106,0.55)]' : 'bg-[rgba(47,93,58,0.5)]'
        }`} />
      </article>
    );
  }

  return (
    <div 
      className="group perspective-1000 h-[420px] sm:h-[500px]"
      onMouseEnter={() => canHover && setIsFlipped(true)}
      onMouseLeave={() => canHover && setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden rounded-3xl overflow-hidden border shadow-2xl ${
          isDarkMode ? 'border-[rgba(201,163,106,0.25)]' : 'border-[#DDE8DD]'
        }`}>
          <img src={frontImage} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${
            isDarkMode
              ? 'bg-linear-to-t from-[rgba(14,11,9,0.96)] via-[rgba(14,11,9,0.5)] to-transparent'
              : 'bg-linear-to-t from-[rgba(17,24,18,0.9)] via-[rgba(17,24,18,0.35)] to-transparent'
          }`} />

          <div className="absolute top-24 left-6">
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${
              isDarkMode
                ? 'border-[rgba(201,163,106,0.45)] bg-[rgba(26,22,18,0.78)] text-[#E7CFA2]'
                : 'border-[rgba(47,93,58,0.4)] bg-[rgba(243,247,242,0.9)] text-[#2F5D3A]'
            }`}>
              {subtitle}
            </span>
          </div>

          <div className="absolute top-5 left-5 right-5">
            <div className={`rounded-2xl border px-5 py-3 backdrop-blur-md shadow-lg ${
              isDarkMode
                ? 'border-[rgba(201,163,106,0.35)] bg-[rgba(16,13,11,0.82)] text-white'
                : 'border-[rgba(47,93,58,0.3)] bg-[rgba(243,247,242,0.92)] text-[#1F2A1F]'
            }`}>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h3>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <span className={`rounded-full px-4 py-2 text-lg font-bold shadow-lg ${
              isDarkMode
                ? 'bg-[rgba(201,163,106,0.9)] text-[#1A120A]'
                : 'bg-[#EAF3EA] text-[#1F2A1F]'
            }`}>
              {price}
            </span>
            <span className={`text-xs uppercase tracking-widest ${
              isDarkMode ? 'text-[#E7CFA2]' : 'text-white/85'
            }`}>
              per night
            </span>
          </div>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-xl ${
          isDarkMode
            ? 'bg-[rgba(12,10,8,0.55)] border-[rgba(201,163,106,0.3)]'
            : 'bg-[rgba(243,247,242,0.72)] border-[rgba(47,93,58,0.35)]'
        }`}>
          <div className="p-6 h-full flex flex-col">
            <div>
              <h3 className={`text-2xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-[#1F2A1F]'}`}>{title}</h3>
              <p className={`text-sm mb-5 leading-relaxed ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#4B5F4B]'}`}>{description}</p>
              <div className="space-y-2">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDarkMode ? 'text-[#E7CFA2]' : 'text-[#2F5D3A]'
                }`}>Highlights</p>
                {highlights.map((highlight, i) => (
                  <div key={i} className={`flex items-start gap-2 text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#2F3A2F]'}`}>
                    <span className={`mt-0.5 ${isDarkMode ? 'text-[#E7CFA2]' : 'text-[#2F5D3A]'}`}>✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link to={link} className="mt-auto">
              <button className={`w-full rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-wider shadow-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'bg-linear-to-r from-[#C9A36A] to-[#E7CFA2] text-[#1A120A] shadow-[0_0_20px_rgba(201,163,106,0.3)] hover:shadow-[0_0_30px_rgba(231,207,162,0.45)]'
                  : 'bg-linear-to-r from-[#2F5D3A] to-[#7BAF7C] text-[#0F1A12] shadow-[0_0_20px_rgba(47,93,58,0.3)] hover:shadow-[0_0_30px_rgba(123,175,124,0.45)]'
              }`}>
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FlipCard);
