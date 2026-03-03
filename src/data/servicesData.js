import allHomes1 from '../assets/homes/all-homes/all-homes-1.jpg';
import razzoCreek1 from '../assets/homes/razzo-creek/razzo-creek-1.jpg';
import konaMeadow2 from '../assets/homes/kona-meadow/kona-meadow-2.jpg';
import catalinaRidge1 from '../assets/homes/catalina-ridge/catalina-ridge-1.jpg';
import raniRidge1 from '../assets/homes/rani-ridge/rani-ridge-1.jpg';

export const servicesData = {
  hotels: {
    id: 'hotels',
    name: 'Stay Booking',
    slug: 'hotels',
    icon: 'STAY',
    tagline: 'Curated tiny stays in the Hill Country',
    description: 'Design-forward cabins, tiny homes, and cabins with calm details and clear pricing.',
    heroImage: allHomes1,
    categories: [
      {
        id: 'budget',
        name: 'Value',
        description: 'Simple, warm stays with the essentials handled.',
        priceRange: '$120 to $170',
        features: ['Quiet locations', 'Self check-in', 'Kitchenette', 'Outdoor seating']
      },
      {
        id: 'comfort',
        name: 'Comfort',
        description: 'Balanced stays with extra space and thoughtful details.',
        priceRange: '$170 to $240',
        features: ['Larger decks', 'Firepit', 'Premium linens', 'Scenic views']
      },
      {
        id: 'luxury',
        name: 'Signature',
        description: 'Elevated stays with premium finishes and private views.',
        priceRange: '$240 to $340',
        features: ['Designer interiors', 'Soaking tub', 'Private outdoor lounge', 'Curated amenities']
      }
    ],
    featuredProperties: [
      {
        id: 'apple-1-razoo-creek',
        name: 'Razzo Creek',
        location: 'Texas Hill Country, Wimberley',
        price: 185,
        category: 'comfort',
        rating: 4.9,
        reviews: 128,
        amenities: ['Firepit', 'Private deck', 'Full kitchen', 'Wi-Fi'],
        description: 'A quiet couples cabin with panoramic views and warm interiors.',
        image: razzoCreek1
      },
      {
        id: 'apple-2-limestone-ridge',
        name: 'Kona Meadows',
        location: 'Texas Hill Country, Dripping Springs',
        price: 210,
        category: 'comfort',
        rating: 4.8,
        reviews: 96,
        amenities: ['Outdoor shower', 'Coffee bar', 'King bed', 'Smart lock'],
        description: 'A mellow hideaway designed for slow mornings and golden hours.',
        image: konaMeadow2
      },
      {
        id: 'triangle-1-cedar-glen',
        name: 'Catalina Ridge',
        location: 'Texas Hill Country, Marble Falls',
        price: 265,
        category: 'luxury',
        rating: 5.0,
        reviews: 84,
        amenities: ['Soaking tub', 'Private deck', 'Designer finish', 'Outdoor lounge'],
        description: 'Signature stay with elevated finishes and wide-open views.',
        image: catalinaRidge1
      },
      {
        id: 'triangle-2-prairie-lake',
        name: 'Rani Ridge',
        location: 'Texas Hill Country, Wimberley',
        price: 145,
        category: 'budget',
        rating: 4.7,
        reviews: 72,
        amenities: ['Firepit', 'Kitchenette', 'Parking', 'Wi-Fi'],
        description: 'Simple and quiet with a relaxed, nature-first layout.',
        image: raniRidge1
      }
    ],
    bookingProcess: [
      { step: 1, title: 'Tell us your dates', desc: 'Share your dates and stay preferences.' },
      { step: 2, title: 'Review options', desc: 'We send a curated list with pricing.' },
      { step: 3, title: 'Confirm the stay', desc: 'Pick a stay and we lock in the booking.' },
      { step: 4, title: 'Arrive and reset', desc: 'Enjoy a calm check-in and a ready stay.' }
    ]
  },
  transport: {
    id: 'transport',
    name: 'Transfers and Local Rides',
    slug: 'transport',
    icon: 'RIDE',
    tagline: 'Smooth arrivals and local rides',
    description: 'Comfortable, reliable rides to and from the Hill Country with trusted local drivers.',
    heroImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1920&q=80',
    vehicleTypes: [
      {
        id: 'sedan',
        name: 'Private Sedan',
        price: '$95',
        capacity: 'Up to 3 guests',
        luggage: '2 suitcases',
        bestFor: 'Couples and light travel',
        features: ['Quiet ride', 'Water included', 'Flight tracking']
      },
      {
        id: 'suv',
        name: 'Comfort SUV',
        price: '$135',
        capacity: 'Up to 5 guests',
        luggage: '4 suitcases',
        bestFor: 'Families and longer stays',
        features: ['Extra legroom', 'Phone chargers', 'Local driver']
      },
      {
        id: 'van',
        name: 'Sprinter Van',
        price: '$190',
        capacity: 'Up to 9 guests',
        luggage: '8 suitcases',
        bestFor: 'Groups and celebrations',
        features: ['Group seating', 'Climate control', 'Room for gear']
      }
    ],
    services: [
      {
        name: 'Airport Transfer',
        description: 'Scheduled pickup and direct drop-off.',
        price: '$95 to $190',
        features: ['Flight monitoring', 'Meet and greet', 'Direct route', 'Driver support']
      },
      {
        name: 'Local Day Rides',
        description: 'Point-to-point rides around the Hill Country.',
        price: '$55 to $120',
        features: ['Flexible timing', 'Local recommendations', 'Clean vehicles', 'Trusted drivers']
      },
      {
        name: 'Evening Service',
        description: 'Dinner reservations and late-night returns.',
        price: '$85 to $150',
        features: ['Timed pickups', 'No surge pricing', 'Safe returns', 'Text updates']
      },
      {
        name: 'Private Driver',
        description: 'Dedicated driver for a half or full day.',
        price: '$320 to $520',
        features: ['Custom route', 'Wait time included', 'Flexible stops', 'Local insight']
      }
    ],
    whyChooseUs: [
      { title: 'Reliable timing', desc: 'We track flights and adjust for delays.' },
      { title: 'Local drivers', desc: 'Drivers know the Hill Country roads.' },
      { title: 'Clean vehicles', desc: 'Comfort-first interiors with room to breathe.' },
      { title: 'Clear pricing', desc: 'No last-minute surprises or surge fees.' }
    ]
  },
  insurance: {
    id: 'insurance',
    name: 'Stay Protection',
    slug: 'insurance',
    icon: 'COVER',
    tagline: 'Peace of mind for your stay',
    description: 'Optional coverage for trip changes, interruptions, and personal items while you travel.',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
    plans: [
      {
        id: 'basic',
        name: 'Basic Coverage',
        price: '$25',
        duration: 'Up to 3 nights',
        recommended: false,
        coverage: {
          medical: '$10,000',
          evacuation: '$5,000',
          baggage: '$500',
          cancellation: '$1,000'
        },
        features: [
          'Emergency medical coverage',
          'Trip delay coverage',
          'Lost baggage protection',
          '24/7 helpline'
        ]
      },
      {
        id: 'comprehensive',
        name: 'Comprehensive Plan',
        price: '$50',
        duration: 'Up to 5 nights',
        recommended: true,
        coverage: {
          medical: '$50,000',
          evacuation: '$25,000',
          baggage: '$2,000',
          cancellation: '$5,000'
        },
        features: [
          'Extended medical coverage',
          'Trip cancellation protection',
          'Lost baggage and documents',
          'Emergency evacuation',
          '24/7 support'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Protection',
        price: '$100',
        duration: 'Up to 10 nights',
        recommended: false,
        coverage: {
          medical: '$100,000',
          evacuation: '$50,000',
          baggage: '$5,000',
          cancellation: '$10,000'
        },
        features: [
          'Maximum medical coverage',
          'Trip interruption protection',
          'Rental car coverage',
          'VIP assistance services',
          'Concierge support'
        ]
      }
    ],
    covered: [
      'Medical emergencies and hospitalization',
      'Emergency evacuation',
      'Trip cancellation or interruption',
      'Lost, stolen, or damaged baggage',
      'Travel delays and missed connections',
      'Personal liability',
      '24/7 emergency assistance'
    ],
    notCovered: [
      'Pre-existing medical conditions unless declared',
      'Intentional self injury',
      'Illegal activities',
      'Extreme sports (basic plans)',
      'Travel to restricted areas',
      'Pregnancy related issues after 24 weeks',
      'Mental health claims unless specified'
    ],
    claimProcess: [
      { step: 1, title: 'Report Incident', desc: 'Contact the 24/7 helpline.' },
      { step: 2, title: 'Documentation', desc: 'Gather required documents and receipts.' },
      { step: 3, title: 'Submit Claim', desc: 'Fill and submit the claim form online.' },
      { step: 4, title: 'Review', desc: 'Claims reviewed within 48 hours.' },
      { step: 5, title: 'Settlement', desc: 'Claim settled within 7 to 10 business days.' }
    ],
    emergencyContacts: {
      hotline: '+1 (512) 555-0147',
      email: 'support@tinyescape.co',
      whatsapp: '+1 (512) 555-0147',
      available: '24/7'
    }
  },
  photography: {
    id: 'photography',
    name: 'Memory Sessions',
    slug: 'photography',
    icon: 'PHOTO',
    tagline: 'Capture the stay',
    description: 'Professional sessions for couples, families, and celebrations with natural light and relaxed direction.',
    heroImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80',
    photographers: [
      {
        id: 'photo-1',
        name: 'Jordan Lee',
        specialization: 'Lifestyle and Couples',
        experience: '8 years',
        rating: 4.9,
        portfolio: '200+ sessions documented',
        equipment: ['Canon R6', 'Prime lenses', 'Natural light kit'],
        price: '$250/session',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
      },
      {
        id: 'photo-2',
        name: 'Casey Rivera',
        specialization: 'Family and Celebrations',
        experience: '6 years',
        rating: 4.8,
        portfolio: 'Family and anniversary specialist',
        equipment: ['Sony A7 IV', 'Prime lenses', 'Portable lighting'],
        price: '$220/session',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
      }
    ],
    packages: [
      {
        id: 'hourly',
        name: 'Mini Session',
        price: '$150',
        duration: '45 minutes',
        features: [
          'Professional photographer',
          '20 to 30 edited photos',
          'Online gallery',
          'Basic retouching',
          'Same day highlights (5 photos)'
        ],
        bestFor: 'Arrivals, quick memories'
      },
      {
        id: 'daily',
        name: 'Half Day Session',
        price: '$320',
        duration: '3 hours',
        recommended: true,
        features: [
          'Professional photographer',
          '80 to 120 edited photos',
          'Online gallery',
          'Professional editing',
          'Next day preview (15 photos)'
        ],
        bestFor: 'Couples, families, celebrations'
      },
      {
        id: 'tour',
        name: 'Full Day Session',
        price: '$520',
        duration: '6 hours',
        features: [
          'Dedicated photographer',
          '150 to 220 edited photos',
          'Video highlights',
          'Professional editing',
          'USB and cloud delivery'
        ],
        bestFor: 'Events, proposals, milestones'
      },
      {
        id: 'video',
        name: 'Video Highlight Reel',
        price: '$280',
        duration: 'Custom',
        features: [
          'Professional videographer',
          '4K video recording',
          'Professional editing',
          '2 to 4 min highlight reel',
          'Music licensing included'
        ],
        bestFor: 'Reels, anniversary keepsakes'
      }
    ],
    services: [
      {
        name: 'Golden Hour Add-On',
        description: 'Sunset timing and glow-focused editing.',
        price: '+$60',
        features: ['Golden hour timing', 'Warm color grade', 'Extra edits', 'Flexible scheduling']
      },
      {
        name: 'Extra Retouching',
        description: 'Enhanced retouching for select images.',
        price: '$5/photo',
        features: ['Skin retouching', 'Object cleanup', 'Color grading', 'Natural finish']
      },
      {
        name: 'Photo Book',
        description: 'Premium printed keepsake book.',
        price: '$95 (50 pages)',
        features: ['Professional design', 'Premium paper', 'Custom layout', 'Hardcover binding']
      },
      {
        name: 'Rush Delivery',
        description: 'Express editing and delivery.',
        price: '+50% of package',
        features: ['24 to 48 hour delivery', 'Priority editing', 'Fast upload', 'Quick preview']
      }
    ],
    equipment: [
      'Professional mirrorless cameras',
      'Wide-angle to portrait lenses',
      '4K video cameras',
      'Gimbals and stabilizers',
      'Portable lighting',
      'Backup equipment'
    ],
    deliveryTimeline: {
      preview: '1 to 2 days (10 to 15 photos)',
      fullDelivery: '7 to 10 days',
      video: '10 to 14 days',
      photoBook: '21 to 30 days'
    }
  }
};

export const getServiceBySlug = (slug) => {
  return servicesData[slug] || null;
};

export const getAllServices = () => {
  return Object.values(servicesData);
};

export const getServicesByCategory = () => {
  return getAllServices();
};
