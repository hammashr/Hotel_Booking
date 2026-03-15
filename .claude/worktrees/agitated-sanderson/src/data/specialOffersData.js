import razzoCreek1 from '../assets/homes/razzo-creek/razzo-creek-1.jpg';
import konaMeadow2 from '../assets/homes/kona-meadow/kona-meadow-2.jpg';
import catalinaRidge1 from '../assets/homes/catalina-ridge/catalina-ridge-1.jpg';
import raniRidge1 from '../assets/homes/rani-ridge/rani-ridge-1.jpg';

export const specialOfferPackages = [
  {
    id: 'apple-1-midweek',
    name: 'Razzo Creek Midweek Reset',
    originalPrice: 219,
    offerPrice: 179,
    discount: 18,
    duration: '2 Nights',
    stayType: 'Couples',
    groupSize: '2 guests',
    rating: 4.9,
    reviews: 128,
    image: razzoCreek1,
    validUntil: '2026-03-15',
    badge: 'Midweek',
    description: 'Quiet midweek nights with sunset views and a private firepit.',
    link: '/stay/apple-1-razoo-creek'
  },
  {
    id: 'apple-2-family',
    name: 'Kona Meadows Family Escape',
    originalPrice: 259,
    offerPrice: 219,
    discount: 15,
    duration: '3 Nights',
    stayType: 'Family',
    groupSize: '4 guests',
    rating: 4.8,
    reviews: 96,
    image: konaMeadow2,
    validUntil: '2026-04-01',
    badge: 'Family',
    description: 'Creekside stays with space to gather and unwind.',
    link: '/stay/apple-2-kona-meadows'
  },
  {
    id: 'triangle-1-extended',
    name: 'Catalina Ridge Extended Stay',
    originalPrice: 189,
    offerPrice: 149,
    discount: 21,
    duration: '4+ Nights',
    stayType: 'Value',
    groupSize: '2-3 guests',
    rating: 4.7,
    reviews: 74,
    image: catalinaRidge1,
    validUntil: '2026-05-10',
    badge: 'Extended',
    description: 'Save on longer stays with a weekly refresh included.',
    link: '/stay/triangle-1-catalina-ridge'
  },
  {
    id: 'triangle-2-weekend',
    name: 'Rani Ridge Weekend',
    originalPrice: 239,
    offerPrice: 205,
    discount: 14,
    duration: '2 Nights',
    stayType: 'Group',
    groupSize: '5 guests',
    rating: 4.8,
    reviews: 88,
    image: raniRidge1,
    validUntil: '2026-04-20',
    badge: 'Weekend',
    description: 'Open skies, shared meals, and a large outdoor deck.',
    link: '/stay/triangle-2-rani-ridge'
  }
];
