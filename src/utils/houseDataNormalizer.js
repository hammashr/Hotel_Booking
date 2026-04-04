export const sortHousesByOrder = (items = []) =>
  [...items].sort((first, second) => {
    const firstOrder = first.sortOrder ?? 999;
    const secondOrder = second.sortOrder ?? 999;

    if (firstOrder === secondOrder) {
      return (first.name || '').localeCompare(second.name || '');
    }

    return firstOrder - secondOrder;
  });

export const createPricingFromPackages = (packages = [], fallbackPricing = {}) => {
  const packageMap = Object.fromEntries((packages || []).map((pkg) => [pkg.code, pkg]));

  const standardPrice = fallbackPricing?.standard?.price ?? packageMap.standard?.pricePerNight ?? 0;
  const signaturePrice = fallbackPricing?.signature?.price ?? packageMap.signature?.pricePerNight ?? standardPrice;
  const extendedPrice = fallbackPricing?.extended?.price ?? packageMap.extended?.pricePerNight ?? standardPrice;

  return {
    standard: {
      title: 'Standard Rate',
      price: standardPrice,
      features: packageMap.standard?.perks || fallbackPricing?.standard?.features || [],
    },
    signature: {
      title: 'Signature Rate',
      price: signaturePrice,
      popular: packageMap.signature?.isPopular ?? fallbackPricing?.signature?.popular ?? true,
      features: packageMap.signature?.perks || fallbackPricing?.signature?.features || [],
    },
    extended: {
      title: 'Extended Stay',
      price: extendedPrice,
      features: packageMap.extended?.perks || fallbackPricing?.extended?.features || [],
    },
  };
};

export const normalizeHouseToStay = ({ house, packages = [], fallbackStay = null }) => {
  if (!house) {
    return fallbackStay || null;
  }

  return {
    ...(fallbackStay || {}),
    id: house.slug,
    slug: house.slug,
    name: (house.name || '').replace(/^(Apple \d+|Triangle \d+):\s*/i, ''),
    location: fallbackStay?.location || house.baseLocation || 'Bruceville-Eddy, TX',
    description: fallbackStay?.description || house.description || '',
    shortDescription: fallbackStay?.shortDescription || house.description || '',
    heroImage: fallbackStay?.heroImage || house.heroImage || '',
    gallery:
      (fallbackStay?.gallery?.length ? fallbackStay.gallery : null) ||
      (house.galleryImages?.length ? house.galleryImages : null) ||
      [fallbackStay?.heroImage || house.heroImage],
    sleeps: fallbackStay?.sleeps ?? house.capacity ?? 1,
    bedrooms: fallbackStay?.bedrooms ?? house.beds ?? 1,
    baths: fallbackStay?.baths ?? house.baths ?? 1,
    amenities: fallbackStay?.amenities?.length ? fallbackStay.amenities : house.amenities || [],
    highlights: fallbackStay?.highlights || house.amenities || [],
    policies: fallbackStay?.policies || ['Quiet hours after 10:00 PM'],
    houseRules: fallbackStay?.houseRules || [`Maximum ${house.capacity ?? 2} guests`],
    checkIn: fallbackStay?.checkIn || '3:00 PM',
    checkOut: fallbackStay?.checkOut || '11:00 AM',
    petFriendly: fallbackStay?.petFriendly || false,
    rating: fallbackStay?.rating || 4.8,
    reviews: fallbackStay?.reviews || 0,
    sizeSqFt: fallbackStay?.sizeSqFt || 420,
    category: fallbackStay?.category || 'stay',
    tagline: fallbackStay?.tagline || `${(house.name || '').replace(/^(Apple \d+|Triangle \d+):\s*/i, '')} stay`,
    sortOrder: house.sortOrder ?? fallbackStay?.sortOrder ?? 999,
    pricing: createPricingFromPackages(packages, fallbackStay?.pricing),
  };
};
