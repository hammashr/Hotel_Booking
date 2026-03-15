// Gallery Database - Organized photography collection
// Updated: December 2025

export const galleryData = {
  // DESTINATIONS GALLERY
  destinations: [
    {
      id: 'dest-001',
      title: 'Attabad Lake Turquoise Waters',
      location: 'Hunza Valley, Gilgit Baltistan',
      category: 'destinations',
      subcategory: 'lakes',
      image: '/images/gallery/attabad-lake.jpg',
      thumbnail: '/images/gallery/thumbs/attabad-lake-thumb.jpg',
      photographer: 'Ahmed Khan',
      captureDate: '2025-04-15',
      description: 'The stunning turquoise waters of Attabad Lake formed after a massive landslide in 2010. Now a popular tourist attraction with boat rides and scenic views.',
      tags: ['lake', 'hunza', 'turquoise', 'landscape', 'spring'],
      dimensions: { width: 1920, height: 1080 },
      featured: true,
      likes: 1247,
      downloads: 342
    },
    {
      id: 'dest-002',
      title: 'K2 Mighty Summit',
      location: 'Baltistan, Gilgit Baltistan',
      category: 'destinations',
      subcategory: 'mountains',
      image: '/images/gallery/k2-summit.jpg',
      thumbnail: '/images/gallery/thumbs/k2-summit-thumb.jpg',
      photographer: 'Hassan Sadpara',
      captureDate: '2025-07-20',
      description: 'K2, the Savage Mountain, standing at 8,611m, second highest peak in the world. Captured from Concordia during a clear summer morning.',
      tags: ['k2', 'mountain', 'peak', 'extreme', 'baltistan'],
      dimensions: { width: 2560, height: 1440 },
      featured: true,
      likes: 2156,
      downloads: 578
    },
    {
      id: 'dest-003',
      title: 'Fairy Meadows Paradise',
      location: 'Diamer, Gilgit Baltistan',
      category: 'destinations',
      subcategory: 'meadows',
      image: '/images/gallery/fairy-meadows.jpg',
      thumbnail: '/images/gallery/thumbs/fairy-meadows-thumb.jpg',
      photographer: 'Sara Malik',
      captureDate: '2025-06-10',
      description: 'Lush green meadows with Nanga Parbat in the background. One of the most beautiful camping spots in Pakistan.',
      tags: ['meadows', 'nanga parbat', 'camping', 'green', 'summer'],
      dimensions: { width: 1920, height: 1280 },
      featured: true,
      likes: 1893,
      downloads: 445
    },
    {
      id: 'dest-004',
      title: 'Deosai Plains Golden Hour',
      location: 'Skardu, Gilgit Baltistan',
      category: 'destinations',
      subcategory: 'plains',
      image: '/images/gallery/deosai-plains.jpg',
      thumbnail: '/images/gallery/thumbs/deosai-plains-thumb.jpg',
      photographer: 'Ali Raza',
      captureDate: '2025-08-05',
      description: 'The Land of Giants during sunset. One of the highest plateaus in the world at 4,114m with diverse wildlife.',
      tags: ['deosai', 'plains', 'sunset', 'wildlife', 'plateau'],
      dimensions: { width: 2048, height: 1365 },
      featured: false,
      likes: 987,
      downloads: 234
    },
    {
      id: 'dest-005',
      title: 'Hunza Valley Autumn Colors',
      location: 'Hunza, Gilgit Baltistan',
      category: 'destinations',
      subcategory: 'valleys',
      image: '/images/gallery/hunza-autumn.jpg',
      thumbnail: '/images/gallery/thumbs/hunza-autumn-thumb.jpg',
      photographer: 'Fatima Noor',
      captureDate: '2025-10-18',
      description: 'Hunza Valley transforms into a canvas of gold and orange during autumn. Ancient forts overlook colorful orchards.',
      tags: ['hunza', 'autumn', 'valley', 'colors', 'orchards'],
      dimensions: { width: 1920, height: 1080 },
      featured: true,
      likes: 1654,
      downloads: 398
    }
  ],

  // CULTURAL HERITAGE
  culture: [
    {
      id: 'cult-001',
      title: 'Baltit Fort Heritage',
      location: 'Karimabad, Hunza Valley',
      category: 'culture',
      subcategory: 'forts',
      image: '/images/gallery/baltit-fort.jpg',
      thumbnail: '/images/gallery/thumbs/baltit-fort-thumb.jpg',
      photographer: 'Zainab Ahmed',
      captureDate: '2025-05-12',
      description: '700 year old Baltit Fort, a UNESCO World Heritage site showcasing traditional Hunza architecture and royal history.',
      tags: ['fort', 'heritage', 'hunza', 'architecture', 'history'],
      dimensions: { width: 1920, height: 1280 },
      featured: true,
      likes: 876,
      downloads: 198
    },
    {
      id: 'cult-002',
      title: 'Kalash Valley Festival',
      location: 'Chitral, Khyber Pakhtunkhwa',
      category: 'culture',
      subcategory: 'festivals',
      image: '/images/gallery/kalash-festival.jpg',
      thumbnail: '/images/gallery/thumbs/kalash-festival-thumb.jpg',
      photographer: 'Usman Shah',
      captureDate: '2025-05-21',
      description: 'The vibrant Chilam Joshi festival celebrated by the unique Kalash people in their traditional colorful attire.',
      tags: ['kalash', 'festival', 'culture', 'traditional', 'chitral'],
      dimensions: { width: 2048, height: 1365 },
      featured: true,
      likes: 1432,
      downloads: 312
    },
    {
      id: 'cult-003',
      title: 'Shandur Polo Match',
      location: 'Shandur Pass, Gilgit Baltistan',
      category: 'culture',
      subcategory: 'sports',
      image: '/images/gallery/shandur-polo.jpg',
      thumbnail: '/images/gallery/thumbs/shandur-polo-thumb.jpg',
      photographer: 'Kamran Ali',
      captureDate: '2025-07-07',
      description: 'The highest polo ground in the world at 3,738m. Annual Shandur Polo Festival featuring freestyle polo matches.',
      tags: ['polo', 'shandur', 'sports', 'festival', 'traditional'],
      dimensions: { width: 1920, height: 1080 },
      featured: false,
      likes: 654,
      downloads: 145
    },
    {
      id: 'cult-004',
      title: 'Badshahi Mosque Sunset',
      location: 'Lahore, Punjab',
      category: 'culture',
      subcategory: 'mosques',
      image: '/images/gallery/badshahi-mosque.jpg',
      thumbnail: '/images/gallery/thumbs/badshahi-mosque-thumb.jpg',
      photographer: 'Ayesha Tariq',
      captureDate: '2025-03-28',
      description: 'The magnificent Badshahi Mosque built in 1671 by Mughal Emperor Aurangzeb. Iconic red sandstone architecture at sunset.',
      tags: ['mosque', 'lahore', 'mughal', 'architecture', 'sunset'],
      dimensions: { width: 2560, height: 1440 },
      featured: true,
      likes: 1123,
      downloads: 267
    }
  ],

  // WILDLIFE & NATURE
  wildlife: [
    {
      id: 'wild-001',
      title: 'Snow Leopard in Khunjerab',
      location: 'Khunjerab National Park',
      category: 'wildlife',
      subcategory: 'endangered',
      image: '/images/gallery/snow-leopard.jpg',
      thumbnail: '/images/gallery/thumbs/snow-leopard-thumb.jpg',
      photographer: 'Dr. Adnan Khalid',
      captureDate: '2025-02-14',
      description: 'Rare sighting of the elusive snow leopard in its natural habitat. Critically endangered species native to Pakistan\'s northern mountains.',
      tags: ['snow leopard', 'wildlife', 'endangered', 'khunjerab', 'rare'],
      dimensions: { width: 2048, height: 1365 },
      featured: true,
      likes: 2345,
      downloads: 623
    },
    {
      id: 'wild-002',
      title: 'Himalayan Brown Bear',
      location: 'Deosai National Park',
      category: 'wildlife',
      subcategory: 'bears',
      image: '/images/gallery/brown-bear.jpg',
      thumbnail: '/images/gallery/thumbs/brown-bear-thumb.jpg',
      photographer: 'Bilal Hassan',
      captureDate: '2025-08-19',
      description: 'Himalayan brown bear foraging in Deosai Plains. Approximately 40 to 50 bears inhabit this high altitude sanctuary.',
      tags: ['bear', 'wildlife', 'deosai', 'conservation', 'himalayan'],
      dimensions: { width: 1920, height: 1280 },
      featured: true,
      likes: 1567,
      downloads: 423
    },
    {
      id: 'wild-003',
      title: 'Markhor on Cliff Edge',
      location: 'Chitral Gol National Park',
      category: 'wildlife',
      subcategory: 'mammals',
      image: '/images/gallery/markhor.jpg',
      thumbnail: '/images/gallery/thumbs/markhor-thumb.jpg',
      photographer: 'Naeem Akhtar',
      captureDate: '2025-04-22',
      description: 'Pakistan\'s national animal, the majestic Markhor with its distinctive spiral horns, navigating steep mountain cliffs.',
      tags: ['markhor', 'national animal', 'wildlife', 'chitral', 'goat'],
      dimensions: { width: 1920, height: 1080 },
      featured: false,
      likes: 892,
      downloads: 198
    },
    {
      id: 'wild-004',
      title: 'Migratory Birds at Haleji Lake',
      location: 'Haleji Lake, Sindh',
      category: 'wildlife',
      subcategory: 'birds',
      image: '/images/gallery/migratory-birds.jpg',
      thumbnail: '/images/gallery/thumbs/migratory-birds-thumb.jpg',
      photographer: 'Rashid Mahmood',
      captureDate: '2025-11-15',
      description: 'Thousands of migratory birds from Siberia spend winter at Haleji Lake. Over 220 bird species recorded.',
      tags: ['birds', 'migratory', 'lake', 'sindh', 'wetlands'],
      dimensions: { width: 2048, height: 1365 },
      featured: false,
      likes: 723,
      downloads: 167
    }
  ],

  // ADVENTURE & ACTIVITIES
  adventure: [
    {
      id: 'adv-001',
      title: 'Paragliding over Hunza',
      location: 'Hunza Valley',
      category: 'adventure',
      subcategory: 'aerial',
      image: '/images/gallery/paragliding-hunza.jpg',
      thumbnail: '/images/gallery/thumbs/paragliding-hunza-thumb.jpg',
      photographer: 'Imran Yousaf',
      captureDate: '2025-09-08',
      description: 'Aerial view of Hunza Valley while paragliding. Breathtaking perspective of Rakaposhi and terraced fields.',
      tags: ['paragliding', 'adventure', 'aerial', 'hunza', 'extreme'],
      dimensions: { width: 1920, height: 1080 },
      featured: true,
      likes: 1234,
      downloads: 334
    },
    {
      id: 'adv-002',
      title: 'Rock Climbing at Trango Towers',
      location: 'Baltoro Glacier Region',
      category: 'adventure',
      subcategory: 'climbing',
      image: '/images/gallery/trango-climbing.jpg',
      thumbnail: '/images/gallery/thumbs/trango-climbing-thumb.jpg',
      photographer: 'Alex Morrison',
      captureDate: '2025-07-15',
      description: 'International climbers tackling the vertical granite faces of Trango Towers, one of the world\'s greatest climbing challenges.',
      tags: ['climbing', 'trango', 'extreme', 'mountaineering', 'vertical'],
      dimensions: { width: 2048, height: 1365 },
      featured: true,
      likes: 1876,
      downloads: 456
    },
    {
      id: 'adv-003',
      title: 'White Water Rafting Indus',
      location: 'Indus River, Gilgit',
      category: 'adventure',
      subcategory: 'water sports',
      image: '/images/gallery/rafting-indus.jpg',
      thumbnail: '/images/gallery/thumbs/rafting-indus-thumb.jpg',
      photographer: 'Salman Ahmed',
      captureDate: '2025-06-20',
      description: 'Thrilling white water rafting on the mighty Indus River. Grade 3 to 4 rapids offering adrenaline pumping experience.',
      tags: ['rafting', 'indus', 'water sports', 'adventure', 'extreme'],
      dimensions: { width: 1920, height: 1280 },
      featured: false,
      likes: 945,
      downloads: 223
    },
    {
      id: 'adv-004',
      title: 'Mountain Biking Karakoram',
      location: 'Karakoram Highway',
      category: 'adventure',
      subcategory: 'cycling',
      image: '/images/gallery/mountain-biking.jpg',
      thumbnail: '/images/gallery/thumbs/mountain-biking-thumb.jpg',
      photographer: 'Danish Siddiqui',
      captureDate: '2025-08-12',
      description: 'Extreme mountain biking on the Karakoram Highway, highest paved international road connecting Pakistan and China.',
      tags: ['cycling', 'kkh', 'mountain biking', 'adventure', 'endurance'],
      dimensions: { width: 1920, height: 1080 },
      featured: false,
      likes: 687,
      downloads: 156
    }
  ],

  // LANDSCAPES & SCENERY
  landscapes: [
    {
      id: 'land-001',
      title: 'Passu Cones Sunset',
      location: 'Passu, Gojal Valley',
      category: 'landscapes',
      subcategory: 'mountains',
      image: '/images/gallery/passu-cones.jpg',
      thumbnail: '/images/gallery/thumbs/passu-cones-thumb.jpg',
      photographer: 'Hina Bashir',
      captureDate: '2025-09-25',
      description: 'The iconic Passu Cones (Cathedral Ridge) glowing during golden hour. Unique jagged peaks resembling Gothic spires.',
      tags: ['passu', 'cones', 'sunset', 'mountains', 'landscape'],
      dimensions: { width: 2560, height: 1440 },
      featured: true,
      likes: 1789,
      downloads: 467
    },
    {
      id: 'land-002',
      title: 'Ratti Gali Lake Reflections',
      location: 'Neelum Valley, AJK',
      category: 'landscapes',
      subcategory: 'lakes',
      image: '/images/gallery/ratti-gali.jpg',
      thumbnail: '/images/gallery/thumbs/ratti-gali-thumb.jpg',
      photographer: 'Wasim Akram',
      captureDate: '2025-07-28',
      description: 'Alpine lake at 12,130 feet with perfect mountain reflections. Accessible only during summer months.',
      tags: ['lake', 'alpine', 'reflections', 'neelum', 'ajk'],
      dimensions: { width: 1920, height: 1280 },
      featured: true,
      likes: 1456,
      downloads: 378
    },
    {
      id: 'land-003',
      title: 'Hingol Sand Dunes',
      location: 'Hingol National Park, Balochistan',
      category: 'landscapes',
      subcategory: 'desert',
      image: '/images/gallery/hingol-desert.jpg',
      thumbnail: '/images/gallery/thumbs/hingol-desert-thumb.jpg',
      photographer: 'Tariq Aziz',
      captureDate: '2025-11-03',
      description: 'Golden sand dunes of Hingol National Park meeting the Arabian Sea. Pakistan\'s largest national park.',
      tags: ['desert', 'dunes', 'hingol', 'balochistan', 'coastal'],
      dimensions: { width: 2048, height: 1365 },
      featured: false,
      likes: 834,
      downloads: 189
    },
    {
      id: 'land-004',
      title: 'Shigar Valley Green Fields',
      location: 'Shigar, Gilgit Baltistan',
      category: 'landscapes',
      subcategory: 'valleys',
      image: '/images/gallery/shigar-valley.jpg',
      thumbnail: '/images/gallery/thumbs/shigar-valley-thumb.jpg',
      photographer: 'Mehreen Khan',
      captureDate: '2025-06-15',
      description: 'Lush green agricultural fields in Shigar Valley with Shigar Fort in background. Gateway to K2.',
      tags: ['valley', 'fields', 'green', 'shigar', 'agriculture'],
      dimensions: { width: 1920, height: 1080 },
      featured: false,
      likes: 923,
      downloads: 234
    }
  ],

  // SEASONAL BEAUTY
  seasons: [
    {
      id: 'seas-001',
      title: 'Cherry Blossoms Hunza',
      location: 'Hunza Valley',
      category: 'seasons',
      subcategory: 'spring',
      image: '/images/gallery/cherry-blossoms.jpg',
      thumbnail: '/images/gallery/thumbs/cherry-blossoms-thumb.jpg',
      photographer: 'Nadia Jamil',
      captureDate: '2025-04-05',
      description: 'Hunza Valley covered in pink and white cherry blossoms. The most photographed season in northern Pakistan.',
      tags: ['spring', 'blossoms', 'cherry', 'hunza', 'pink'],
      dimensions: { width: 2560, height: 1440 },
      featured: true,
      likes: 2567,
      downloads: 712
    },
    {
      id: 'seas-002',
      title: 'Snow Covered Murree',
      location: 'Murree, Punjab',
      category: 'seasons',
      subcategory: 'winter',
      image: '/images/gallery/murree-snow.jpg',
      thumbnail: '/images/gallery/thumbs/murree-snow-thumb.jpg',
      photographer: 'Omer Farooq',
      captureDate: '2025-01-20',
      description: 'Winter wonderland in Murree hills. Popular destination for snowfall viewing near Islamabad.',
      tags: ['winter', 'snow', 'murree', 'punjab', 'snowfall'],
      dimensions: { width: 1920, height: 1280 },
      featured: true,
      likes: 1345,
      downloads: 389
    },
    {
      id: 'seas-003',
      title: 'Monsoon Greenery Swat',
      location: 'Swat Valley, KPK',
      category: 'seasons',
      subcategory: 'monsoon',
      image: '/images/gallery/swat-monsoon.jpg',
      thumbnail: '/images/gallery/thumbs/swat-monsoon-thumb.jpg',
      photographer: 'Saima Rashid',
      captureDate: '2025-08-22',
      description: 'Lush green Swat Valley during monsoon season. Rivers flowing full and valleys at peak greenery.',
      tags: ['monsoon', 'green', 'swat', 'rain', 'lush'],
      dimensions: { width: 1920, height: 1080 },
      featured: false,
      likes: 876,
      downloads: 201
    }
  ],

  // NIGHT PHOTOGRAPHY
  night: [
    {
      id: 'night-001',
      title: 'Milky Way Over Fairy Meadows',
      location: 'Fairy Meadows',
      category: 'night',
      subcategory: 'astrophotography',
      image: '/images/gallery/milky-way.jpg',
      thumbnail: '/images/gallery/thumbs/milky-way-thumb.jpg',
      photographer: 'Asad Zaidi',
      captureDate: '2025-08-10',
      description: 'Spectacular Milky Way galaxy over Fairy Meadows. Minimal light pollution creates perfect conditions for astrophotography.',
      tags: ['milky way', 'stars', 'night', 'astrophotography', 'galaxy'],
      dimensions: { width: 2560, height: 1440 },
      featured: true,
      likes: 1923,
      downloads: 534
    },
    {
      id: 'night-002',
      title: 'Minar e Pakistan Night View',
      location: 'Lahore, Punjab',
      category: 'night',
      subcategory: 'monuments',
      image: '/images/gallery/minar-pakistan.jpg',
      thumbnail: '/images/gallery/thumbs/minar-pakistan-thumb.jpg',
      photographer: 'Ahsan Raza',
      captureDate: '2025-03-23',
      description: 'Beautifully illuminated Minar e Pakistan on Pakistan Day. National monument symbolizing independence.',
      tags: ['monument', 'night', 'lahore', 'illuminated', 'pakistan day'],
      dimensions: { width: 1920, height: 1080 },
      featured: false,
      likes: 756,
      downloads: 178
    }
  ]
};

// Helper Functions
export const getAllPhotos = () => {
  return [
    ...galleryData.destinations,
    ...galleryData.culture,
    ...galleryData.wildlife,
    ...galleryData.adventure,
    ...galleryData.landscapes,
    ...galleryData.seasons,
    ...galleryData.night
  ];
};

export const getFeaturedPhotos = () => {
  return getAllPhotos().filter(photo => photo.featured);
};

export const getPhotoById = (id) => {
  return getAllPhotos().find(photo => photo.id === id);
};

export const getPhotosByCategory = (category) => {
  return getAllPhotos().filter(photo => photo.category === category);
};

export const getPhotosBySubcategory = (subcategory) => {
  return getAllPhotos().filter(photo => photo.subcategory === subcategory);
};

export const getPhotosByTag = (tag) => {
  return getAllPhotos().filter(photo => photo.tags.includes(tag));
};

export const getPhotosByLocation = (location) => {
  return getAllPhotos().filter(photo => 
    photo.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const searchPhotos = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return getAllPhotos().filter(photo =>
    photo.title.toLowerCase().includes(lowercaseQuery) ||
    photo.description.toLowerCase().includes(lowercaseQuery) ||
    photo.location.toLowerCase().includes(lowercaseQuery) ||
    photo.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getMostLiked = (limit = 10) => {
  return getAllPhotos()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
};

export const getMostDownloaded = (limit = 10) => {
  return getAllPhotos()
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);
};

export const getRecentPhotos = (limit = 12) => {
  return getAllPhotos()
    .sort((a, b) => new Date(b.captureDate) - new Date(a.captureDate))
    .slice(0, limit);
};

export const galleryCategories = [
  { id: 'all', name: 'All Photos', icon: '', count: getAllPhotos().length },
  { id: 'destinations', name: 'Destinations', icon: '', count: galleryData.destinations.length },
  { id: 'culture', name: 'Culture', icon: '', count: galleryData.culture.length },
  { id: 'wildlife', name: 'Wildlife', icon: '', count: galleryData.wildlife.length },
  { id: 'adventure', name: 'Adventure', icon: '', count: galleryData.adventure.length },
  { id: 'landscapes', name: 'Landscapes', icon: '', count: galleryData.landscapes.length },
  { id: 'seasons', name: 'Seasons', icon: '', count: galleryData.seasons.length },
  { id: 'night', name: 'Night', icon: '', count: galleryData.night.length }
];

export const getAllTags = () => {
  const tags = new Set();
  getAllPhotos().forEach(photo => {
    photo.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getPopularTags = (limit = 20) => {
  const tagCount = {};
  getAllPhotos().forEach(photo => {
    photo.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
};
