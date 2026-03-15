// Special Offers Database - International pricing in USD
// Updated: January 2026

export const offersData = {
  // SEASONAL OFFERS - Winter Season 2025
  seasonal: [
    {
      id: 'winter-wonder-2025',
      title: 'Winter Wonderland Pakistan',
      subtitle: 'Snow-Capped Adventures',
      category: 'seasonal',
      type: 'winter-special',
      discount: 35,
      originalPrice: 429,
      offerPrice: 279,
      currency: 'USD',
      validFrom: '2025-12-01',
      validUntil: '2026-02-28',
      destinations: ['Murree', 'Nathia Gali', 'Malam Jabba', 'Astore Valley'],
      duration: '5 Days / 4 Nights',
      image: '/images/offers/winter-pakistan.jpg',
      badge: 'Limited Time',
      featured: true,
      description: 'Experience Pakistan\'s winter magic with snow activities, cozy stays, and breathtaking mountain views. Perfect for families and couples seeking winter adventures.',
      highlights: [
        'Snow activities: skiing, snowboarding, sledding',
        'Luxury mountain resorts with fireplaces',
        'Hot chocolate and bonfire evenings',
        'Professional ski instructors included',
        'Winter photography sessions'
      ],
      inclusions: [
        '4 nights accommodation in premium hotels',
        'Daily breakfast and dinner',
        'All transfers in heated vehicles',
        'Snow gear rental included',
        'Professional guide and photographer',
        'All entry tickets and permits'
      ],
      exclusions: [
        'International/domestic flights',
        'Lunch meals',
        'Personal expenses',
        'Travel insurance'
      ],
      termsConditions: [
        'Booking must be made 7 days in advance',
        'Subject to weather conditions',
        '50% refund if cancelled 15 days before',
        'Non-refundable if cancelled within 7 days',
        'Offer valid for new bookings only'
      ],
      availableSlots: 45,
      totalSlots: 100,
      urgency: 'high',
      tags: ['winter', 'snow', 'adventure', 'family-friendly', 'photography']
    },
    {
      id: 'spring-blossom-2026',
      title: 'Spring Blossom Valley Tours',
      subtitle: 'Hunza Cherry & Apricot Blooms',
      category: 'seasonal',
      type: 'spring-special',
      discount: 25,
      originalPrice: 599,
      offerPrice: 449,
      currency: 'USD',
      validFrom: '2026-03-01',
      validUntil: '2026-04-30',
      destinations: ['Hunza Valley', 'Skardu', 'Shigar', 'Khaplu'],
      duration: '7 Days / 6 Nights',
      image: '/images/offers/spring-hunza.jpg',
      badge: 'Coming Soon',
      featured: true,
      description: 'Witness the magical transformation of Hunza Valley during blossom season. Pink and white flowers blanket the valley against snow-capped peaks.',
      highlights: [
        'Cherry and apricot blossom photography',
        'Baltit and Altit Fort visits',
        'Traditional Hunza cuisine experiences',
        'Sunrise at Duikar viewpoint',
        'Attabad Lake boat rides',
        'Cultural evening with local music'
      ],
      inclusions: [
        '6 nights in boutique hotels',
        'All meals (breakfast, lunch, dinner)',
        'Luxury transport throughout',
        'Professional photography guide',
        'All permits and entry fees',
        'Cultural performance evening'
      ],
      exclusions: [
        'Flights to/from Gilgit',
        'Personal shopping',
        'Tips and gratuities',
        'Travel insurance'
      ],
      termsConditions: [
        'Pre-booking required (limited slots)',
        'Blossom season weather-dependent',
        'Full refund if blossoms not in bloom',
        '30% advance payment required',
        'Balance due 10 days before departure'
      ],
      availableSlots: 80,
      totalSlots: 80,
      urgency: 'medium',
      tags: ['spring', 'photography', 'nature', 'cultural', 'luxury']
    }
  ],

  // EARLY BIRD OFFERS
  earlyBird: [
    {
      id: 'summer-2026-early',
      title: 'Summer 2026 Early Bird Special',
      subtitle: 'Book Now, Save Big',
      category: 'early-bird',
      type: 'advance-booking',
      discount: 40,
      originalPrice: 899,
      offerPrice: 539,
      currency: 'USD',
      validFrom: '2025-12-01',
      validUntil: '2026-02-28',
      travelPeriod: '2026-06-01 to 2026-08-31',
      destinations: ['Fairy Meadows', 'Hunza', 'Skardu', 'Deosai'],
      duration: '10 Days / 9 Nights',
      image: '/images/offers/summer-early-bird.jpg',
      badge: '40% OFF',
      featured: true,
      description: 'Lock in the best rates for summer 2026! Explore northern Pakistan\'s most spectacular destinations during peak season at unbeatable prices.',
      highlights: [
        'Nanga Parbat base camp trek',
        'Deosai Plains wildlife spotting',
        'Hunza Valley cultural immersion',
        'Sheosar Lake camping experience',
        'Professional trekking guide',
        'All camping equipment provided'
      ],
      inclusions: [
        '9 nights accommodation (hotels + camping)',
        'All meals during entire tour',
        '4x4 jeep transfers',
        'Camping gear and equipment',
        'Experienced guide and support staff',
        'All permits and conservation fees'
      ],
      exclusions: [
        'Flights',
        'Personal trekking gear',
        'Insurance',
        'Emergency evacuation costs'
      ],
      termsConditions: [
        'Full payment required at booking',
        'Non-refundable but transferable',
        'Date changes allowed (subject to availability)',
        'Limited to first 50 bookings',
        'Offer ends February 28, 2026'
      ],
      availableSlots: 28,
      totalSlots: 50,
      urgency: 'high',
      savingsAmount: 172,
      tags: ['summer', 'trekking', 'camping', 'wildlife', 'early-bird']
    }
  ],

  // GROUP PACKAGES
  groupDeals: [
    {
      id: 'group-adventure-2025',
      title: 'Group Adventure Package',
      subtitle: 'Bring 8+ Friends, Save More',
      category: 'group',
      type: 'bulk-discount',
      discount: 30,
      originalPrice: 399,
      offerPrice: 279,
      pricePerPerson: true,
      currency: 'USD',
      minimumPeople: 8,
      maximumPeople: 15,
      validFrom: '2025-12-01',
      validUntil: '2026-12-31',
      destinations: ['Swat Valley', 'Kalam', 'Mahodand Lake', 'Ushu Forest'],
      duration: '6 Days / 5 Nights',
      image: '/images/offers/group-package.jpg',
      badge: 'Best Value',
      featured: true,
      description: 'Perfect for corporate teams, friend groups, or family reunions. Enjoy exclusive activities and personalized experiences with your group.',
      highlights: [
        'Private transport and guide',
        'Customizable itinerary options',
        'Team building activities available',
        'Group bonfire and BBQ nights',
        'Exclusive hotel group discounts',
        'Free trip leader (for 12+ people)'
      ],
      inclusions: [
        '5 nights twin/triple sharing accommodation',
        'All meals (B, L, D)',
        'Private coaster/bus transport',
        'Dedicated tour guide',
        'All entry fees and permits',
        'Group activities and games'
      ],
      exclusions: [
        'Single room supplement (PKR 15,000)',
        'Personal expenses',
        'Travel insurance',
        'Optional activities'
      ],
      termsConditions: [
        'Minimum 8 people required',
        'Discount increases: 8-10 (25%), 11-15 (30%)',
        '30% advance, balance 15 days before',
        'Flexible date changes (15 days notice)',
        'Corporate bookings: additional 5% off'
      ],
      availableSlots: 60,
      totalSlots: 120,
      urgency: 'low',
      corporateDiscount: 5,
      tags: ['group', 'corporate', 'team-building', 'friends', 'family-reunion']
    },
    {
      id: 'family-mega-deal',
      title: 'Family Mega Deal',
      subtitle: '2 Adults + 2 Kids Special',
      category: 'group',
      type: 'family-package',
      discount: 35,
      originalPrice: 999,
      offerPrice: 649,
      pricePerFamily: true,
      currency: 'USD',
      familySize: '2 Adults + 2 Children (under 12)',
      validFrom: '2025-12-15',
      validUntil: '2026-03-31',
      destinations: ['Naran', 'Kaghan', 'Shogran', 'Siri Paye'],
      duration: '5 Days / 4 Nights',
      image: '/images/offers/family-deal.jpg',
      badge: 'Family Special',
      featured: false,
      description: 'Create unforgettable family memories! Child-friendly activities, spacious accommodations, and flexible schedules perfect for families with young children.',
      highlights: [
        'Kids-friendly activities and entertainment',
        'Family suites with extra beds',
        'Flexible meal times for children',
        'Nature walks and easy hikes',
        'Horse riding for kids',
        'Complimentary kids\' meals'
      ],
      inclusions: [
        '4 nights family suite accommodation',
        'All meals (kids menu available)',
        'Private family transport',
        'Kids activities and entertainment',
        'Horse riding sessions',
        'Family photography session'
      ],
      exclusions: [
        'Additional children (PKR 20,000/child)',
        'Baby sitting services',
        'Special dietary requirements',
        'Travel insurance'
      ],
      termsConditions: [
        'Children must be under 12 years',
        'Age proof required at check-in',
        'One family per booking',
        '50% refund if cancelled 20 days before',
        'Kids activities weather-dependent'
      ],
      availableSlots: 35,
      totalSlots: 50,
      urgency: 'medium',
      tags: ['family', 'kids-friendly', 'leisure', 'nature', 'bonding']
    }
  ],

  // LAST MINUTE DEALS
  lastMinute: [
    {
      id: 'weekend-escape-dec',
      title: 'Weekend Escape - This Week!',
      subtitle: 'Spontaneous Adventure Awaits',
      category: 'last-minute',
      type: 'flash-deal',
      discount: 45,
      originalPrice: 125,
      offerPrice: 69,
      currency: 'USD',
      validFrom: '2025-12-06',
      validUntil: '2025-12-08',
      departureDate: '2025-12-13',
      destinations: ['Nathia Gali', 'Ayubia', 'Mukshpuri'],
      duration: '3 Days / 2 Nights',
      image: '/images/offers/weekend-escape.jpg',
      badge: 'Flash Sale',
      featured: true,
      urgent: true,
      description: 'Last-minute availability! Grab this incredible deal for a quick mountain escape. Limited spots available - book within 48 hours!',
      highlights: [
        'Quick weekend getaway',
        'Hiking and nature trails',
        'Cozy mountain resort',
        'Bonfire evenings',
        'Zero planning stress'
      ],
      inclusions: [
        '2 nights accommodation',
        'Breakfast and dinner',
        'Round-trip transport from Islamabad',
        'Guided nature walk',
        'All entry fees'
      ],
      exclusions: [
        'Lunch meals',
        'Personal expenses',
        'Travel insurance'
      ],
      termsConditions: [
        'Immediate booking required',
        'Non-refundable',
        'Non-transferable',
        'Departure: December 13, 2025',
        'Return: December 15, 2025'
      ],
      availableSlots: 8,
      totalSlots: 15,
      urgency: 'critical',
      countdown: true,
      tags: ['weekend', 'last-minute', 'quick-escape', 'hiking', 'flash-deal']
    }
  ],

  // FESTIVE SPECIALS
  festive: [
    {
      id: 'new-year-2026',
      title: 'New Year Celebration 2026',
      subtitle: 'Ring in 2026 in the Mountains',
      category: 'festive',
      type: 'new-year-special',
      discount: 20,
      originalPrice: 446,
      offerPrice: 357,
      currency: 'USD',
      validFrom: '2025-12-01',
      validUntil: '2025-12-25',
      travelPeriod: '2025-12-29 to 2026-01-02',
      destinations: ['Murree', 'Bhurban', 'Patriata'],
      duration: '5 Days / 4 Nights',
      image: '/images/offers/new-year-2026.jpg',
      badge: 'Festive Special',
      featured: true,
      description: 'Celebrate New Year 2026 with a spectacular mountain party! DJ night, countdown celebration, fireworks, and unlimited fun.',
      highlights: [
        'Grand New Year\'s Eve party with DJ',
        'Midnight countdown and fireworks',
        'Gala dinner with live music',
        'Special breakfast on New Year',
        'Snow activities (weather permitting)',
        'Welcome drinks and party favors'
      ],
      inclusions: [
        '4 nights deluxe accommodation',
        'All meals + New Year gala dinner',
        'New Year party with DJ and entertainment',
        'Fireworks display',
        'Round-trip transport',
        'All activities and entry fees',
        'Party favors and welcome gifts'
      ],
      exclusions: [
        'Alcoholic beverages',
        'Personal shopping',
        'Spa services',
        'Travel insurance'
      ],
      termsConditions: [
        'Limited to 100 guests only',
        'Full payment required at booking',
        'No refunds after December 15',
        'Formal dress code for gala night',
        'ID verification required'
      ],
      availableSlots: 22,
      totalSlots: 100,
      urgency: 'high',
      tags: ['new-year', 'celebration', 'party', 'festive', 'luxury']
    },
    {
      id: 'eid-family-special',
      title: 'Eid-ul-Fitr Family Retreat',
      subtitle: 'Celebrate Eid in Nature',
      category: 'festive',
      type: 'eid-special',
      discount: 28,
      originalPrice: 536,
      offerPrice: 386,
      pricePerFamily: true,
      currency: 'USD',
      validFrom: '2026-01-15',
      validUntil: '2026-02-28',
      travelPeriod: 'Eid-ul-Fitr 2026 (Dates TBA)',
      destinations: ['Swat Valley', 'Malam Jabba', 'Kalam'],
      duration: '6 Days / 5 Nights',
      image: '/images/offers/eid-special.jpg',
      badge: 'Eid Mubarak',
      featured: false,
      description: 'Spend Eid with your loved ones in the serene beauty of Swat Valley. Special Eid prayers arrangements, traditional feast, and family-friendly activities.',
      highlights: [
        'Eid prayers arrangement at scenic location',
        'Traditional Eid feast and sweets',
        'Family-friendly hiking trails',
        'Kids entertainment and activities',
        'Cultural evening with local music',
        'Scenic photography locations'
      ],
      inclusions: [
        '5 nights family accommodation',
        'All meals + special Eid feast',
        'Private family transport',
        'Eid prayer arrangements',
        'Kids activities program',
        'All entry fees and permits'
      ],
      exclusions: [
        'Personal Eid shopping',
        'Optional adventure activities',
        'Travel insurance'
      ],
      termsConditions: [
        'Family package: 2 adults + max 3 kids',
        'Eid dates subject to moon sighting',
        'Flexible rescheduling if dates change',
        '40% advance payment required',
        'Full refund if tour cancelled by operator'
      ],
      availableSlots: 40,
      totalSlots: 60,
      urgency: 'medium',
      tags: ['eid', 'family', 'islamic', 'cultural', 'festive']
    }
  ],

  // HONEYMOON SPECIALS
  honeymoon: [
    {
      id: 'romantic-hunza-escape',
      title: 'Romantic Hunza Escape',
      subtitle: 'Perfect Start to Forever',
      category: 'honeymoon',
      type: 'couples-only',
      discount: 30,
      originalPrice: 500,
      offerPrice: 350,
      pricePerCouple: true,
      currency: 'USD',
      validFrom: '2025-12-01',
      validUntil: '2026-12-31',
      destinations: ['Hunza Valley', 'Attabad Lake', 'Passu', 'Gulmit'],
      duration: '7 Days / 6 Nights',
      image: '/images/offers/honeymoon-hunza.jpg',
      badge: 'Romantic',
      featured: true,
      description: 'Begin your journey together in the magical Hunza Valley. Romantic dinners, private experiences, and breathtaking scenery create perfect memories.',
      highlights: [
        'Private candlelight dinner under stars',
        'Luxury suite with mountain views',
        'Couples spa session included',
        'Private boat ride on Attabad Lake',
        'Professional couple photoshoot',
        'Complimentary honeymoon cake',
        'Room decoration with flowers'
      ],
      inclusions: [
        '6 nights luxury suite accommodation',
        'Daily breakfast in bed option',
        'Romantic dinners with special setup',
        'Private transport throughout',
        'Couples spa and massage session',
        'Professional photography (4 hours)',
        'All romantic decorations and setup',
        'Honeymoon gift hamper'
      ],
      exclusions: [
        'Flights',
        'Lunch meals',
        'Additional spa treatments',
        'Personal shopping',
        'Travel insurance'
      ],
      termsConditions: [
        'Valid marriage certificate required',
        'Advance booking recommended',
        '25% refund if cancelled 30 days before',
        'Date changes allowed (one time free)',
        'Special requests accommodated'
      ],
      availableSlots: 15,
      totalSlots: 40,
      urgency: 'medium',
      tags: ['honeymoon', 'romantic', 'couples', 'luxury', 'photography']
    }
  ],

  // ADVENTURE SPECIALS
  adventure: [
    {
      id: 'extreme-k2-trek-2026',
      title: 'K2 Base Camp Expedition',
      subtitle: 'Conquer the Savage Mountain',
      category: 'adventure',
      type: 'expedition',
      discount: 15,
      originalPrice: 1607,
      offerPrice: 1366,
      currency: 'USD',
      validFrom: '2026-01-01',
      validUntil: '2026-03-31',
      travelPeriod: '2026-06-01 to 2026-09-30',
      destinations: ['Skardu', 'Askole', 'Baltoro Glacier', 'Concordia', 'K2 Base Camp'],
      duration: '21 Days / 20 Nights',
      image: '/images/offers/k2-expedition.jpg',
      badge: 'Extreme',
      featured: true,
      description: 'The ultimate mountaineering adventure! Trek to K2 Base Camp and witness four 8000m peaks. Professional guides, full support, and lifetime achievement.',
      highlights: [
        'K2, Broad Peak, Gasherbrum I & II views',
        'Concordia - Throne of Mountain Gods',
        'Baltoro Glacier trekking',
        'Professional high-altitude guides',
        'Full expedition support team',
        'Medical support and evacuation insurance'
      ],
      inclusions: [
        '20 nights (hotels + camping)',
        'All meals during expedition',
        'Professional guide and support staff',
        'Porters for personal gear',
        'All camping equipment',
        'Medical kit and oxygen',
        'Satellite phone for emergencies',
        'Evacuation insurance',
        'All permits and fees'
      ],
      exclusions: [
        'International flights',
        'Personal trekking gear',
        'Tips for porters and guides',
        'Personal expenses',
        'Additional evacuation costs beyond insurance'
      ],
      termsConditions: [
        'Minimum fitness level required',
        'Medical certificate mandatory',
        'Previous high-altitude experience preferred',
        '50% advance payment',
        'Weather and season dependent',
        'No refund after trek commencement'
      ],
      availableSlots: 12,
      totalSlots: 24,
      urgency: 'high',
      fitnessRequired: 'high',
      ageLimit: { min: 18, max: 55 },
      tags: ['extreme', 'trekking', 'expedition', 'k2', 'mountaineering']
    }
  ]
};

// Helper Functions
export const getAllOffers = () => {
  return [
    ...offersData.seasonal,
    ...offersData.earlyBird,
    ...offersData.groupDeals,
    ...offersData.lastMinute,
    ...offersData.festive,
    ...offersData.honeymoon,
    ...offersData.adventure
  ];
};

export const getFeaturedOffers = () => {
  return getAllOffers().filter(offer => offer.featured);
};

export const getOfferById = (id) => {
  return getAllOffers().find(offer => offer.id === id);
};

export const getOffersByCategory = (category) => {
  return getAllOffers().filter(offer => offer.category === category);
};

export const getActiveOffers = () => {
  const today = new Date();
  return getAllOffers().filter(offer => {
    const validFrom = new Date(offer.validFrom);
    const validUntil = new Date(offer.validUntil);
    return today >= validFrom && today <= validUntil;
  });
};

export const getUrgentOffers = () => {
  return getAllOffers().filter(offer => 
    offer.urgency === 'critical' || offer.urgency === 'high'
  );
};

export const calculateSavings = (originalPrice, offerPrice) => {
  return originalPrice - offerPrice;
};

export const getDiscountPercentage = (originalPrice, offerPrice) => {
  return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
};

export const isOfferExpiringSoon = (validUntil, daysThreshold = 7) => {
  const today = new Date();
  const expiryDate = new Date(validUntil);
  const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
  return daysLeft <= daysThreshold && daysLeft > 0;
};

export const offerCategories = [
  { id: 'all', name: 'All Offers', icon: '' },
  { id: 'seasonal', name: 'Seasonal', icon: '' },
  { id: 'early-bird', name: 'Early Bird', icon: '' },
  { id: 'group', name: 'Group Deals', icon: '' },
  { id: 'last-minute', name: 'Last Minute', icon: '' },
  { id: 'festive', name: 'Festive', icon: '' },
  { id: 'honeymoon', name: 'Honeymoon', icon: '' },
  { id: 'adventure', name: 'Adventure', icon: '' }
];
