import React, { memo } from 'react';
import ThemedPricingCard from './ThemedPricingCard';
import PricingCardMedia from './PricingCardMedia';

const TourCategoryCard = ({ tour, isDarkMode }) => {
  const countText = `${tour.count}+`;

  return (
    <ThemedPricingCard
      title={tour.name}
      subtitle={tour.description}
      price={countText}
      priceNote="stays"
      features={tour.features}
      isDarkMode={isDarkMode}
      gradient={tour.color}
      highlightLabel={tour.icon ? 'Featured' : undefined}
      ctaLabel="View Stays"
      ctaHref={tour.path}
      footerLabel="Collection"
      footerText="Browse tiny home stays"
      accentClass="text-emerald-300"
      accentBorderClass="border-emerald-400"
      accentBgClass="bg-emerald-600 text-white"
      media={
        <PricingCardMedia
          imageSrc={tour.image}
          imageAlt={tour.name}
          heightClass="h-64"
          overlayClassName={
            isDarkMode
              ? 'bg-linear-to-t from-[#0B0C0E]/90 via-[#0B0C0E]/30 to-transparent'
              : 'bg-linear-to-t from-black/70 via-black/20 to-transparent'
          }
          topRight={(
            <div className={`px-4 py-2 rounded-full bg-linear-to-r ${tour.color} text-white font-bold text-xs shadow-lg flex items-center gap-2`}>
              {tour.icon && <tour.icon />}
              <span>{tour.count}+ Stays</span>
            </div>
          )}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%)]" />
        </PricingCardMedia>
      }
    />
  );
};

export default memo(TourCategoryCard);
