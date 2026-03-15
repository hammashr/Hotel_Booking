// Tours Data - All tour packages organized by category

const swatImage1 = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80';
const swatImage2 = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80';

export const toursData = {
  family: {
    id: 'family',
    category: 'Family Packages',
    title: 'Family Friendly Adventures',
    description: 'Family friendly Pakistan tours with safe transport, comfortable stays, and flexible itineraries, ideal for overseas families.',
    heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80',
    icon: '',
    features: [
      'Child friendly accommodations',
      'Experienced family guides in Northern Pakistan',
      'Flexible itineraries for families',
      'Safe and comfortable transport',
      'Educational activities and cultural visits',
      'Age appropriate adventures'
    ],
    packages: [
      {
        id: 'family-hunza-explorer',
        name: 'Hunza Valley Family Explorer',
        duration: '7 Days / 6 Nights',
        difficulty: 'Easy',
        minAge: 'All ages welcome',
        groupSize: '4-12 people',
        destination: 'Hunza Valley',
        rating: 4.8,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        shortDescription: 'Perfect introduction to Northern Pakistan for families with comfortable stays and child friendly activities.',
        highlights: [
          'Visit Eagle\'s Nest viewpoint',
          'Altit & Baltit Fort exploration',
          'Cherry blossom walks (seasonal)',
          'Interactive cultural experiences',
          'Kids friendly hiking trails',
          'Traditional handicraft workshops'
        ],
        itinerary: [
          { day: 1, title: 'Arrival & Orientation', activities: 'Islamabad pickup, hotel check in, family briefing, evening at leisure' },
          { day: 2, title: 'Journey to Hunza', activities: 'Scenic drive on KKH, photo stops, arrival at family resort' },
          { day: 3, title: 'Hunza Valley Tour', activities: 'Eagle\'s Nest, Duikar viewpoint, local market, cultural show' },
          { day: 4, title: 'Fort Adventure Day', activities: 'Baltit Fort, Altit Fort, traditional lunch, kids activities' },
          { day: 5, title: 'Nature & Culture', activities: 'Cherry orchards, handicraft workshop, family picnic' },
          { day: 6, title: 'Leisure & Shopping', activities: 'Free time, optional activities, souvenir shopping' },
          { day: 7, title: 'Return Journey', activities: 'Drive back to Islamabad, departure assistance' }
        ],
        inclusions: [
          'All accommodations (family rooms)',
          'All meals (child friendly menu)',
          'Private family transport',
          'Experienced family guide',
          'All entrance fees',
          'Kids activity kits',
          'First aid kit',
          'Travel insurance'
        ],
        pricing: {
          '2adults1child': 549,
          '2adults2children': 699,
          'family4plus': 849
        },
        bestTime: 'April to October'
      },
      {
        id: 'family-swat-adventure',
        name: 'Swat Valley Family Fun',
        duration: '5 Days / 4 Nights',
        difficulty: 'Easy',
        minAge: '5+',
        groupSize: '4-10 people',
        destination: 'Swat Valley',
        rating: 4.7,
        reviews: 98,
        image: swatImage1,
        shortDescription: 'Explore the Switzerland of Pakistan with family oriented activities and comfortable accommodations.',
        highlights: [
          'Malam Jabba ski resort visit',
          'Fizagat Park family picnic',
          'Buddhist archaeology sites',
          'Riverside camping (safe)',
          'Local fruit orchards',
          'Traditional Swati cuisine'
        ],
        pricing: {
          '2adults1child': 399,
          '2adults2children': 499,
          'family4plus': 599
        },
        bestTime: 'March to November'
      }
    ]
  },

  honeymoon: {
    id: 'honeymoon',
    category: 'Honeymoon Specials',
    title: 'Romantic Mountain Escapes',
    description: 'Romantic Pakistan honeymoon tours with private moments, scenic stays, and thoughtful touches, perfect for couples seeking comfort and beauty.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
    icon: '',
    features: [
      'Luxury romantic accommodations',
      'Private tours and experiences',
      'Candlelight dinners and scenic views',
      'Couple photography sessions',
      'Spa and wellness options',
      'Personalized service'
    ],
    packages: [
      {
        id: 'honeymoon-hunza-romance',
        name: 'Hunza Honeymoon Paradise',
        duration: '7 Days / 6 Nights',
        difficulty: 'Easy',
        minAge: 'Adults only',
        groupSize: 'Private (2 people)',
        destination: 'Hunza Valley',
        rating: 4.9,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        shortDescription: 'Ultimate romantic getaway with luxury stays, private experiences, and breathtaking mountain views.',
        highlights: [
          'Luxury resort with mountain views',
          'Private sunset at Eagle\'s Nest',
          'Candlelight dinner under stars',
          'Couple spa sessions',
          'Professional photography',
          'Rose petal decorations',
          'Champagne breakfast',
          'Private guide service'
        ],
        inclusions: [
          'Luxury honeymoon suite',
          'All gourmet meals',
          'Private luxury vehicle',
          'Personal guide',
          'Couple photography (2 sessions)',
          'Spa treatments',
          'Romantic decorations',
          'Special surprises'
        ],
        pricing: {
          'couple': 1399,
          'deluxe': 1699,
          'premium': 1999
        },
        bestTime: 'April to October'
      },
      {
        id: 'honeymoon-skardu-bliss',
        name: 'Skardu Romantic Retreat',
        duration: '6 Days / 5 Nights',
        difficulty: 'Easy',
        minAge: 'Adults only',
        groupSize: 'Private (2 people)',
        destination: 'Skardu',
        rating: 4.9,
        reviews: 187,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        shortDescription: 'Exclusive honeymoon at Shangrila Resort with private lake experiences and mountain romance.',
        highlights: [
          'Shangrila Resort stay',
          'Private boat on Kachura Lake',
          'Stargazing sessions',
          'Couple photography at Satpara',
          'Romantic desert dinner',
          'Hot air balloon (optional)',
          'Luxury camping at Deosai'
        ],
        pricing: {
          'couple': 1299,
          'deluxe': 1599,
          'premium': 1899
        },
        bestTime: 'May to October'
      }
    ]
  },

  corporate: {
    id: 'corporate',
    category: 'Corporate Tours',
    title: 'Team Building and Corporate Retreats',
    description: 'Corporate retreats in Northern Pakistan with team building activities, smooth logistics, and inspiring mountain settings for leadership and culture.',
    heroImage: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=1920&q=80',
    icon: '',
    features: [
      'Team building activities',
      'Conference facilities and meeting support',
      'Professional event management',
      'Customizable itineraries',
      'Group accommodations',
      'Transportation logistics'
    ],
    packages: [
      {
        id: 'corporate-hunza-team',
        name: 'Hunza Leadership Retreat',
        duration: '4 Days / 3 Nights',
        difficulty: 'Easy to Moderate',
        minAge: '18+',
        groupSize: '10-50 people',
        destination: 'Hunza Valley',
        rating: 4.7,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        shortDescription: 'Strategic corporate retreat combining team building, leadership workshops, and mountain adventures.',
        highlights: [
          'Conference facilities',
          'Team building exercises',
          'Leadership workshops',
          'Group trekking challenges',
          'Corporate dinners',
          'Networking sessions',
          'Professional photography',
          'AV equipment provided'
        ],
        inclusions: [
          'Conference room with AV',
          'Team building facilitator',
          'All accommodations',
          'All meals (buffet style)',
          'Transport (coaches)',
          'Activity equipment',
          'Event photography',
          'WiFi access'
        ],
        pricing: {
          'per_person_10_20': 599,
          'per_person_21_35': 549,
          'per_person_36plus': 499
        },
        bestTime: 'April to October'
      },
      {
        id: 'corporate-naran-expedition',
        name: 'Naran Corporate Challenge',
        duration: '3 Days / 2 Nights',
        difficulty: 'Moderate',
        minAge: '18+',
        groupSize: '15 to 40 people',
        destination: 'Naran Kaghan',
        rating: 4.6,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        shortDescription: 'High energy corporate team building with adventure challenges and strategic planning sessions.',
        highlights: [
          'Outdoor team challenges',
          'Problem solving activities',
          'Leadership simulations',
          'High altitude team trek',
          'Corporate bonfire night',
          'Strategy sessions'
        ],
        pricing: {
          'per_person_15_25': 399,
          'per_person_26_40': 359,
          'per_person_41plus': 329
        },
        bestTime: 'May to September'
      }
    ]
  },

  budget: {
    id: 'budget',
    category: 'Budget Tours',
    title: 'Affordable Mountain Adventures',
    description: 'Great value Pakistan tours with reliable service, smart itineraries, and honest pricing for overseas travelers.',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    icon: '',
    features: [
      'Economical accommodations',
      'Group sharing options',
      'Budget friendly meals',
      'Shared transportation',
      'Essential inclusions',
      'Great value for money'
    ],
    packages: [
      {
        id: 'budget-naran-express',
        name: 'Naran Kaghan Budget Express',
        duration: '3 Days / 2 Nights',
        difficulty: 'Easy',
        minAge: '12+',
        groupSize: '8 to 15 people',
        destination: 'Naran Kaghan',
        rating: 4.5,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        shortDescription: 'Quick and affordable escape to Naran\'s natural beauty with comfortable group tours.',
        highlights: [
          'Lake Saiful Muluk jeep ride',
          'Naran valley sightseeing',
          'Kunhar River views',
          'Local market visits',
          'Group bonfire night',
          'Photography stops'
        ],
        itinerary: [
          { day: 1, title: 'Islamabad to Naran', activities: 'Early morning departure, scenic drive, arrival, check in' },
          { day: 2, title: 'Lake Saiful Muluk', activities: 'Jeep ride to lake, full day exploration, return to hotel' },
          { day: 3, title: 'Return Journey', activities: 'Morning at Kunhar River, drive back to Islamabad' }
        ],
        inclusions: [
          'Basic hotel accommodation',
          'Breakfast and dinner',
          'Shared transport (coaster)',
          'Jeep ride to lake',
          'Basic guide service'
        ],
        pricing: {
          'per_person': 199,
          'double_sharing': 179,
          'triple_sharing': 159
        },
        bestTime: 'May to October'
      },
      {
        id: 'budget-hunza-getaway',
        name: 'Hunza Budget Getaway',
        duration: '5 Days / 4 Nights',
        difficulty: 'Easy',
        minAge: '12+',
        groupSize: '8 to 15 people',
        destination: 'Hunza Valley',
        rating: 4.6,
        reviews: 267,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        shortDescription: 'Complete Hunza experience at budget prices with group sharing and essential experiences.',
        highlights: [
          'Eagle\'s Nest viewpoint',
          'Baltit & Altit Forts',
          'Karimabad village',
          'Passu Cones views',
          'Local culture experience',
          'Budget friendly stays'
        ],
        pricing: {
          'per_person': 349,
          'double_sharing': 319,
          'triple_sharing': 289
        },
        bestTime: 'April to October'
      },
      {
        id: 'budget-swat-special',
        name: 'Swat Valley Budget Special',
        duration: '4 Days / 3 Nights',
        difficulty: 'Easy',
        minAge: '10+',
        groupSize: '10 to 15 people',
        destination: 'Swat Valley',
        rating: 4.4,
        reviews: 198,
        image: swatImage2,
        shortDescription: 'Economical Swat tour covering major attractions with comfortable group arrangements.',
        highlights: [
          'Malam Jabba visit',
          'Kalam valley tour',
          'Fizagat Park',
          'Mingora bazaar',
          'Swat Museum',
          'Traditional meals'
        ],
        pricing: {
          'per_person': 269,
          'double_sharing': 239,
          'triple_sharing': 209
        },
        bestTime: 'March to November'
      }
    ]
  }
};

// Helper functions
export const getToursByCategory = (category) => {
  return toursData[category] || null;
};

export const getAllTourCategories = () => {
  return Object.keys(toursData);
};

export const getTourById = (tourId) => {
  for (const category in toursData) {
    const tour = toursData[category].packages.find(pkg => pkg.id === tourId);
    if (tour) return { ...tour, category: toursData[category].category };
  }
  return null;
};

export const getAllTours = () => {
  const allTours = [];
  for (const category in toursData) {
    toursData[category].packages.forEach(pkg => {
      allTours.push({
        ...pkg,
        categoryId: category,
        categoryName: toursData[category].category,
        categoryIcon: toursData[category].icon
      });
    });
  }
  return allTours;
};
