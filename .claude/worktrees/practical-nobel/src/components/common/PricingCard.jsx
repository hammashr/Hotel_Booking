import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const PricingCard = ({
  media,
  mediaClassName = '',
  title,
  subtitle,
  price,
  priceNote,
  features = [],
  isDarkMode,
  gradient = 'from-[#111827] to-[#22D3EE]',
  highlightLabel,
  accentClass = 'text-[#22D3EE]',
  accentBorderClass = 'border-[#22D3EE]',
  accentBgClass = 'bg-[#22D3EE] text-[#0B0C0E]',
  footerLabel = 'Inclusions',
  footerText = 'Guides, transport, and stays included',
  ctaLabel,
  onCtaClick,
  ctaHref,
  actions,
  isSelected = false,
  className = '',
  onClick
}) => {
  const showFooter = Boolean(footerLabel || footerText);

  const cardBorderClass = highlightLabel || isSelected
    ? accentBorderClass
    : isDarkMode
      ? 'border-[#1F2A33]'
      : 'border-[#E2E8F0]';

  const ctaBaseClass = isDarkMode
    ? 'bg-[#0F1419] text-[#E0E7EE] border border-[#1F2A33] hover:bg-[#141A1F]'
    : 'bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] hover:bg-[#E2E8F0]';

  const ctaClass = isSelected ? `${accentBgClass} shadow-lg` : ctaBaseClass;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border flex flex-col h-full ${cardBorderClass} ${
        isDarkMode ? 'bg-[#0B0C0E]' : 'bg-white'
      } ${className}`}
      onClick={onClick}
    >
      {media && (
        <div className={`relative ${mediaClassName}`}>
          {media}
        </div>
      )}
      <div
        className={`px-6 pt-6 pb-10 text-white bg-linear-to-r ${gradient}`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)' }}
      >
        {highlightLabel && (
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/90">
            ★ {highlightLabel}
          </span>
        )}
        <h3 className="text-2xl font-bold mt-1">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-white/85">{subtitle}</p>
        )}
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-4xl font-bold">{price}</span>
          {priceNote && (
            <span className="text-sm text-white/80">{priceNote}</span>
          )}
        </div>
      </div>

      <div className="px-6 pt-4 pb-6 flex-1 flex flex-col">
        {features?.length > 0 && (
          <ul className="space-y-3 mb-6 flex-1">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FaCheck className={`${accentClass} mt-1 shrink-0`} size={14} />
                <span className={`text-sm ${isDarkMode ? 'text-[#C9D6DF]' : 'text-[#475569]'}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}

        {actions ? (
          <div className="mt-auto">
            {actions}
          </div>
        ) : (
          ctaLabel && (ctaHref || onCtaClick) && (
            ctaHref ? (
              <Link to={ctaHref} className="mt-auto">
                <span className={`block w-full py-3 rounded-lg font-semibold transition-all text-center ${ctaClass}`}>
                  {ctaLabel}
                </span>
              </Link>
            ) : (
              <button
                onClick={onCtaClick}
                className={`w-full py-3 rounded-lg font-semibold transition-all mt-auto ${ctaClass}`}
              >
                {ctaLabel}
              </button>
            )
          )
        )}
      </div>

      {showFooter && (
        <div
          className={`px-6 py-4 text-white bg-linear-to-r ${gradient} mt-auto`}
          style={{ clipPath: 'polygon(0 20%, 50% 0, 100% 20%, 100% 100%, 0 100%)' }}
        >
          {footerLabel && (
            <p className="text-xs uppercase tracking-widest text-white/90">{footerLabel}</p>
          )}
          {footerText && (
            <p className="text-sm text-white/90">{footerText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(PricingCard);
