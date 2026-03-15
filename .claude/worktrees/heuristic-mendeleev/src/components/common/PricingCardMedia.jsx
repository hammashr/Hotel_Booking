import React, { memo } from 'react';

const PricingCardMedia = ({
  imageSrc,
  imageAlt,
  heightClass = 'h-56',
  fallbackSrc,
  overlayClassName = 'bg-linear-to-t from-black/55 via-black/20 to-transparent',
  topRight,
  topLeft,
  children
}) => (
  <div className={`relative ${heightClass}`}>
    <img
      src={imageSrc}
      alt={imageAlt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
      onError={fallbackSrc ? (e) => { e.currentTarget.src = fallbackSrc; } : undefined}
    />
    <div className={`absolute inset-0 ${overlayClassName}`} />
    {topRight && (
      <div className="absolute top-4 right-4">
        {topRight}
      </div>
    )}
    {topLeft && (
      <div className="absolute top-4 left-4">
        {topLeft}
      </div>
    )}
    {children}
  </div>
);

export default memo(PricingCardMedia);
