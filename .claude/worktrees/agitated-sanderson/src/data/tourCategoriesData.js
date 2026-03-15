import {
  FaUsers,
  FaHeart,
  FaMountain,
  FaBriefcase,
  FaDollarSign,
  FaHome
} from 'react-icons/fa';

export const baseTourCategories = [
  {
    id: 'all',
    name: 'All Stays',
    icon: FaHome,
    count: 8,
    colorLight: 'from-[#3B82F6] to-[#60A5FA]'
  },
  {
    id: 'family',
    name: 'Family Tiny Homes',
    icon: FaUsers,
    count: 10,
    path: '/destinations#swimming-pool',
    color: 'from-green-400 to-green-600',
    description: 'Spacious layouts with bunk nooks, game shelves, and safe yards',
    features: ['Sleeps 4-6', 'Outdoor play space', 'Kitchen ready'],
    image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&q=80'
  },
  {
    id: 'romantic',
    name: 'Couples Retreats',
    icon: FaHeart,
    count: 6,
    path: '/destinations#horseback-riding',
    color: 'from-pink-400 to-red-500',
    description: 'Quiet escapes with panoramic views and private outdoor tubs',
    features: ['Private deck', 'Firepit nights', 'Late checkout'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
  },
  {
    id: 'adventure',
    name: 'Riverside Cabins',
    icon: FaMountain,
    count: 5,
    path: '/destinations#atv-adventure',
    color: 'from-orange-400 to-red-600',
    description: 'Front-row access to water, trails, and sunset views',
    features: ['Creek access', 'Kayak storage', 'Outdoor shower'],
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80'
  },
  {
    id: 'corporate',
    name: 'Group Getaways',
    icon: FaBriefcase,
    count: 4,
    path: '/destinations#trails',
    color: 'from-blue-400 to-indigo-600',
    description: 'Clustered cabins ideal for reunions and small retreats',
    features: ['Shared commons', 'Flexible layouts', 'Outdoor dining'],
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80'
  },
  {
    id: 'budget',
    name: 'Value Stays',
    icon: FaDollarSign,
    count: 7,
    path: '/destinations#firepit',
    color: 'from-yellow-400 to-orange-500',
    description: 'Simple, stylish tiny homes with everything you need',
    features: ['Great value', 'Smart layouts', 'Fast Wi-Fi'],
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80'
  }
];
