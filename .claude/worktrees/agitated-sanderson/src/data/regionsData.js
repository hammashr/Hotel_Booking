export const regionsData = [
  {
    id: 'north',
    name: 'Northern Areas',
    description: 'Iconic valleys, high peaks, alpine lakes, and cultural heritage across northern Pakistan.',
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&q=80',
    center: { lat: 36.4, lng: 74.5 },
    subregions: [
      {
        id: 'hunza',
        name: 'Hunza Valley',
        slug: 'hunza-valley',
        heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
        center: { lat: 36.3167, lng: 74.65 }
      },
      {
        id: 'skardu',
        name: 'Skardu',
        slug: 'skardu',
        heroImage: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=1600&q=80',
        center: { lat: 35.297, lng: 75.633 }
      },
      {
        id: 'gilgit',
        name: 'Gilgit',
        slug: 'gilgit',
        heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
        center: { lat: 35.92, lng: 74.308 }
      },
      {
        id: 'swat',
        name: 'Swat Valley',
        slug: 'swat-valley',
        heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
        center: { lat: 35.222, lng: 72.425 }
      },
      {
        id: 'chitral',
        name: 'Chitral',
        slug: 'chitral',
        heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
        center: { lat: 35.85, lng: 71.78 }
      },
      {
        id: 'naran-kaghan',
        name: 'Naran Kaghan',
        slug: 'naran-kaghan',
        heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
        center: { lat: 34.913, lng: 73.651 }
      },
      {
        id: 'fairy-meadows',
        name: 'Fairy Meadows',
        slug: 'fairy-meadows',
        heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
        center: { lat: 35.359, lng: 74.58 }
      }
    ]
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    description: 'Lush valleys, alpine lakes, and scenic viewpoints across Azad Jammu and Kashmir.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80',
    center: { lat: 34.25, lng: 73.47 },
    subregions: [
      {
        id: 'neelum',
        name: 'Neelam Valley',
        slug: 'neelam-valley',
        heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
        center: { lat: 34.58, lng: 73.95 }
      },
      {
        id: 'arang-kel',
        name: 'Arang Kel',
        slug: 'arang-kel',
        heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
        center: { lat: 34.75, lng: 74.13 }
      },
      {
        id: 'taobat',
        name: 'Taobat',
        slug: 'taobat',
        heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
        center: { lat: 34.88, lng: 74.04 }
      },
      {
        id: 'ratti-gali',
        name: 'Ratti Gali Lake',
        slug: 'ratti-gali',
        heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
        center: { lat: 34.78, lng: 74.77 }
      },
      {
        id: 'tolipeer',
        name: 'Tolipeer Top',
        slug: 'tolipeer-top',
        heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
        center: { lat: 33.85, lng: 73.84 }
      },
      {
        id: 'ganga-choti',
        name: 'Ganga Choti',
        slug: 'ganga-choti',
        heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',
        center: { lat: 34.2, lng: 73.6 }
      }
    ]
  }
];

export const getRegions = () => regionsData;

export const getRegionById = (id) => regionsData.find((region) => region.id === id);

export const getAllSubregions = () => regionsData.flatMap((region) => region.subregions);

export const getSubregionById = (id) =>
  regionsData.flatMap((region) => region.subregions).find((subregion) => subregion.id === id);
