import React, { memo } from 'react';
import PricingCard from './PricingCard';
import { getPricingCardTheme } from '../../config/pricingCardThemes';

const ThemedPricingCard = ({
  themeKey,
  themeIndex = 0,
  gradient,
  footerLabel,
  footerText,
  accentClass,
  accentBorderClass,
  accentBgClass,
  ...props
}) => {
  const theme = themeKey ? getPricingCardTheme(themeKey, themeIndex) : {};

  return (
    <PricingCard
      {...props}
      gradient={gradient ?? theme.gradient}
      footerLabel={footerLabel ?? theme.footerLabel}
      footerText={footerText ?? theme.footerText}
      accentClass={accentClass ?? theme.accentClass}
      accentBorderClass={accentBorderClass ?? theme.accentBorderClass}
      accentBgClass={accentBgClass ?? theme.accentBgClass}
    />
  );
};

export default memo(ThemedPricingCard);
