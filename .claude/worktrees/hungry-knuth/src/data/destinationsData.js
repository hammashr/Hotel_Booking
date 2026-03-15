import siranVideo1 from '../assets/videos/siran1.mp4';
import siranVideo2 from '../assets/videos/siran2.mp4';
import swatImage1 from '../assets/destinations/swat1.jpeg';
import swatImage2 from '../assets/destinations/swat2.jpeg';

// Complete destinations database for Pakistan tours
export const destinationsData = {
  // ADVENTURE TOURS
  'k2-base-camp': {
    id: 'k2-base-camp',
    category: 'adventure',
    name: 'K2 Base Camp Trek',
    slug: 'k2-base-camp',
    tagline: 'Ultimate Challenge',
    location: 'Baltistan, Gilgit Baltistan',
    duration: '14 Days',
    difficulty: 'extreme',
    rating: 4.9,
    reviews: 127,
    heroImage: '/images/destinations/k2-hero.jpg',
    
    description: 'Embark on the ultimate trekking adventure to the base camp of K2, the world\'s second highest mountain. This expedition takes you through breathtaking landscapes, glacial valleys, and offers views of four 8000m peaks including K2, Broad Peak, Gasherbrum I & II.',
    
    highlights: [
      'Concordia, meeting point of glaciers with 4x 8000m peaks',
      'K2 Base Camp at 5,150m altitude',
      'Baltoro Glacier, one of the longest glaciers outside polar regions',
      'Masherbrum, Trango Towers, and Cathedral Peak views',
      'Experience high altitude camping',
      'Professional Balti porters and experienced guides'
    ],
    
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Airport pickup, hotel check in, trip briefing' },
      { day: 2, title: 'Islamabad to Skardu', description: 'Scenic flight over Nanga Parbat (weather permitting) or drive via Karakoram Highway' },
      { day: 3, title: 'Skardu Rest Day', description: 'Acclimatization, gear check, visit Kharpocho Fort and Sadpara Lake' },
      { day: 4, title: 'Skardu to Askole', description: 'Drive to last village, meet porter team, final preparations' },
      { day: 5, title: 'Askole to Jhola Camp', description: 'Trek begins through Braldu Gorge (6 to 7 hours)' },
      { day: 6, title: 'Jhola to Paiju', description: 'Trek along Baltoro Glacier snout (6 to 7 hours)' },
      { day: 7, title: 'Paiju Rest Day', description: 'Acclimatization, explore Paiju Peak base' },
      { day: 8, title: 'Paiju to Khoburtse', description: 'Trek on Baltoro Glacier moraine (5 to 6 hours)' },
      { day: 9, title: 'Khoburtse to Urdukas', description: 'Spectacular views of Trango Towers (5 to 6 hours)' },
      { day: 10, title: 'Urdukas to Goro II', description: 'Deep into Baltoro Glacier (6 to 7 hours)' },
      { day: 11, title: 'Goro II to Concordia', description: 'Reach the throne room of mountain gods (4 to 5 hours)' },
      { day: 12, title: 'Concordia to K2 Base Camp & Back', description: 'Reach K2 Base Camp at 5,150m, return to Concordia (8 to 10 hours)' },
      { day: 13, title: 'Begin Return Trek', description: 'Concordia to Urdukas (6 to 7 hours)' },
      { day: 14, title: 'Return to Askole & Skardu', description: 'Fast trek and drive back to civilization' }
    ],
    
    inclusions: [
      'All accommodation (hotels in cities, camping during trek)',
      'All meals during trek (breakfast, lunch, dinner)',
      'Experienced trekking guide and support staff',
      'Porters for personal and camping equipment',
      'All camping equipment (tents, sleeping bags, mats)',
      'Kitchen crew and cooking equipment',
      'Domestic flights (Islamabad to Skardu to Islamabad)',
      'All ground transportation',
      'Jeep safari to Askole and back',
      'National park fees and permits',
      'First aid medical kit',
      'Satellite phone for emergencies'
    ],
    
    exclusions: [
      'International flights',
      'Personal trekking equipment (boots, jacket, backpack)',
      'Travel insurance (mandatory)',
      'Tips for guides and porters',
      'Personal expenses and laundry',
      'Any items not mentioned in inclusions'
    ],
    
    pricing: {
      basic: {
        price: 1299,
        title: 'Basic Package',
        features: [
          'Standard camping equipment',
          'Basic hotel accommodation (3 star)',
          'Group trekking (8 to 12 people)',
          'Shared transportation',
          'Standard meals',
          'Basic first aid kit',
          'Group guide (1 guide per 8 people)'
        ]
      },
      premium: {
        price: 1599,
        title: 'Premium Package',
        popular: true,
        features: [
          'Premium camping equipment (warmer sleeping bags)',
          'Better hotel accommodation (4 star)',
          'Smaller group (4 to 6 people)',
          'Private jeep available',
          'Enhanced meals with more variety',
          'Advanced first aid and oxygen',
          'Dedicated guide (1 guide per 4 people)',
          'Satellite communication device',
          'Pre trek fitness consultation'
        ]
      },
      ultimate: {
        price: 1999,
        title: 'Ultimate Package',
        features: [
          'Top tier mountaineering equipment',
          'Luxury hotels (5 star) with spa facilities',
          'Private expedition (1 to 3 people)',
          'Private transportation throughout',
          'Gourmet meals with chef',
          'Comprehensive medical kit with oxygen',
          'Personal guide + support guide',
          'Helicopter evacuation insurance',
          'Satellite phone for personal use',
          'Pre and post trek massage therapy',
          'Professional photography service',
          'Personalized itinerary flexibility'
        ]
      }
    },
    
    bestTime: 'June to September (Summer months for stable weather)',
    
    whatToBring: [
      'Sturdy trekking boots (waterproof, broken in)',
      'Warm sleeping bag (minus 15 C rated minimum)',
      'Insulated jacket (down or synthetic)',
      'Waterproof shell jacket and pants',
      'Thermal base layers',
      'Trekking poles',
      'Sunglasses (UV protection)',
      'Headlamp with extra batteries',
      'Personal medications',
      'Sunscreen (SPF 50+) and lip balm',
      'Water purification tablets',
      'Camera and power bank'
    ],
    
    fitnessLevel: 'Excellent fitness required. Must be able to trek 6 to 8 hours daily at high altitude. Prior high altitude trekking experience recommended.',
    
    gallery: [
      '/images/gallery/k2-1.jpg',
      '/images/gallery/k2-2.jpg',
      '/images/gallery/k2-3.jpg',
      '/images/gallery/k2-4.jpg',
      '/images/gallery/k2-5.jpg',
      '/images/gallery/k2-6.jpg'
    ],

    // Duration-based pricing
    pricingByDuration: {
      '10days': {
        basic: {
          price: 1199,
          title: 'Basic Package',
          popular: false,
          features: [
            'Standard camping equipment',
            'Basic hotel accommodation (3 star)',
            'Group trekking (8 to 12 people)',
            'Shared transportation',
            'Standard meals during trek',
            'Basic first aid kit',
            'Group guide',
            '10 day condensed itinerary'
          ]
        },
        premium: {
          price: 1499,
          title: 'Premium Package',
          popular: true,
          features: [
            'Premium camping equipment',
            'Better hotel accommodation (4 star)',
            'Smaller group (4 to 6 people)',
            'Private jeep available',
            'Enhanced meals',
            'Advanced first aid and oxygen',
            'Dedicated guide',
            'Satellite communication',
            '10 day optimized route'
          ]
        },
        ultimate: {
          price: 1899,
          title: 'Ultimate Package',
          popular: false,
          features: [
            'Top tier equipment',
            'Luxury hotels (5 star)',
            'Private expedition (1 to 3 people)',
            'Private transportation',
            'Gourmet meals',
            'Comprehensive medical kit',
            'Personal guide + support',
            'Helicopter evacuation insurance',
            'Professional photography',
            '10 day fast paced trek'
          ]
        }
      },
      '14days': {
        basic: {
          price: 1399,
          title: 'Basic Package',
          popular: false,
          features: [
            'Standard camping equipment',
            'Basic hotel accommodation (3 star)',
            'Group trekking (8 to 12 people)',
            'Shared transportation',
            'Standard meals',
            'Basic first aid kit',
            'Group guide (1 per 8 people)',
            'Standard 14 day itinerary'
          ]
        },
        premium: {
          price: 1699,
          title: 'Premium Package',
          popular: true,
          features: [
            'Premium camping equipment',
            'Better hotel accommodation (4 star)',
            'Smaller group (4 to 6 people)',
            'Private jeep available',
            'Enhanced meals with variety',
            'Advanced first aid and oxygen',
            'Dedicated guide (1 per 4 people)',
            'Satellite communication device',
            'Pre trek fitness consultation'
          ]
        },
        ultimate: {
          price: 1999,
          title: 'Ultimate Package',
          popular: false,
          features: [
            'Top tier mountaineering equipment',
            'Luxury hotels (5 star) with spa',
            'Private expedition (1 to 3 people)',
            'Private transportation throughout',
            'Gourmet meals with chef',
            'Comprehensive medical kit',
            'Personal guide + support guide',
            'Helicopter evacuation insurance',
            'Satellite phone',
            'Pre and post trek massage therapy',
            'Professional photography service',
            'Personalized itinerary'
          ]
        }
      },
      '18days': {
        basic: {
          price: 1599,
          title: 'Basic Package',
          popular: false,
          features: [
            'Standard camping equipment',
            'Basic hotel accommodation (3-star)',
            'Group trekking (8-12 people)',
            'Shared transportation',
            'Standard meals',
            'Basic first aid kit',
            'Group guide',
            'Extended 18-day exploration',
            'Additional acclimatization days'
          ]
        },
        premium: {
          price: 1899,
          title: 'Premium Package',
          popular: true,
          features: [
            'Premium camping equipment',
            'Better hotel accommodation (4-star)',
            'Smaller group (4-6 people)',
            'Private jeep available',
            'Enhanced meals',
            'Advanced first aid and oxygen',
            'Dedicated guide',
            'Satellite communication',
            'Extra exploration time',
            'Photography workshops'
          ]
        },
        ultimate: {
          price: 2299,
          title: 'Ultimate Package',
          popular: false,
          features: [
            'Top-tier equipment',
            'Luxury hotels (5-star)',
            'Private expedition',
            'Private transportation',
            'Gourmet meals with chef',
            'Comprehensive medical kit',
            'Personal guide + support',
            'Helicopter evacuation insurance',
            'Satellite phone',
            'Massage therapy',
            'Professional photography',
            'Flexible extended itinerary',
            'Side trips to hidden valleys'
          ]
        }
      }
    },

    // Duration-based itineraries
    itineraryByDuration: {
      '10days': [
        { day: 1, title: 'Arrival in Islamabad', description: 'Airport pickup, hotel check-in, evening trip briefing', activities: ['Briefing', 'Gear check', 'Rest'] },
        { day: 2, title: 'Fly to Skardu', description: 'Scenic flight over Nanga Parbat, drive to Askole', activities: ['Flight', 'Drive', 'Meet porters'] },
        { day: 3, title: 'Askole to Paiju', description: 'Fast-paced trek beginning (8-9 hours)', activities: ['Trekking', 'Camping'] },
        { day: 4, title: 'Paiju to Urdukas', description: 'Trek on Baltoro Glacier (7-8 hours)', activities: ['Glacier trekking', 'Camping'] },
        { day: 5, title: 'Urdukas to Concordia', description: 'Reach throne room of mountain gods (7-8 hours)', activities: ['Trekking', '4x8000m views', 'Camping'] },
        { day: 6, title: 'Concordia to K2 BC & Back', description: 'K2 Base Camp at 5,150m, return (10-12 hours)', activities: ['Summit push', 'Photography', 'Return'] },
        { day: 7, title: 'Concordia to Paiju', description: 'Fast return trek (8-9 hours)', activities: ['Descending', 'Camping'] },
        { day: 8, title: 'Paiju to Askole', description: 'Final trek day, drive to Skardu (6-7 hours trek)', activities: ['Trekking', 'Drive', 'Hotel'] },
        { day: 9, title: 'Skardu to Islamabad', description: 'Flight back to capital city', activities: ['Flight', 'City tour', 'Celebration dinner'] },
        { day: 10, title: 'Departure', description: 'Transfer to airport, end of adventure', activities: ['Shopping', 'Departure'] }
      ],
      '14days': [
        { day: 1, title: 'Arrival in Islamabad', description: 'Airport pickup, hotel check-in, trip briefing', activities: ['Briefing', 'Rest', 'Welcome dinner'] },
        { day: 2, title: 'Islamabad to Skardu', description: 'Scenic flight over Nanga Parbat or drive via KKH', activities: ['Flight', 'Sightseeing'] },
        { day: 3, title: 'Skardu Rest Day', description: 'Acclimatization, visit Kharpocho Fort, Sadpara Lake', activities: ['Acclimatization', 'City tour', 'Gear check'] },
        { day: 4, title: 'Skardu to Askole', description: 'Drive to last village, meet porter team', activities: ['Drive', 'Preparation'] },
        { day: 5, title: 'Askole to Jhola', description: 'Trek begins through Braldu Gorge (6-7 hours)', activities: ['Trekking', 'River crossing', 'Camping'] },
        { day: 6, title: 'Jhola to Paiju', description: 'Trek along Baltoro Glacier snout (6-7 hours)', activities: ['Trekking', 'Glacier views', 'Camping'] },
        { day: 7, title: 'Paiju Rest Day', description: 'Acclimatization, explore Paiju Peak base', activities: ['Rest', 'Acclimatization hike', 'Photography'] },
        { day: 8, title: 'Paiju to Urdukas', description: 'Trek on Baltoro, Trango Towers views (6-7 hours)', activities: ['Glacier trekking', 'Mountain views', 'Camping'] },
        { day: 9, title: 'Urdukas to Goro II', description: 'Deep into Baltoro Glacier (6-7 hours)', activities: ['Trekking', 'Ice formations', 'Camping'] },
        { day: 10, title: 'Goro II to Concordia', description: 'Reach the throne room (4-5 hours)', activities: ['Trekking', '4x8000m peaks', 'Camping'] },
        { day: 11, title: 'K2 Base Camp Day Trip', description: 'Reach K2 BC at 5,150m and return (8-10 hours)', activities: ['Summit push', 'Photography', 'Celebration'] },
        { day: 12, title: 'Begin Return', description: 'Concordia to Urdukas (6-7 hours)', activities: ['Descending', 'Camping'] },
        { day: 13, title: 'Return to Askole & Skardu', description: 'Fast trek and drive back', activities: ['Trekking', 'Drive', 'Hotel'] },
        { day: 14, title: 'Skardu to Islamabad & Departure', description: 'Flight to Islamabad, transfer to airport', activities: ['Flight', 'Departure'] }
      ],
      '18days': [
        { day: 1, title: 'Arrival in Islamabad', description: 'Airport pickup, hotel check-in, detailed briefing', activities: ['Briefing', 'Rest', 'Welcome dinner'] },
        { day: 2, title: 'Islamabad Sightseeing', description: 'Visit Faisal Mosque, Pakistan Monument, local markets', activities: ['Sightseeing', 'Shopping', 'Preparation'] },
        { day: 3, title: 'Islamabad to Skardu', description: 'Scenic flight over Nanga Parbat', activities: ['Flight', 'Check-in'] },
        { day: 4, title: 'Skardu Acclimatization', description: 'Visit Kharpocho Fort, Sadpara Lake, local bazaar', activities: ['Acclimatization', 'City tour', 'Rest'] },
        { day: 5, title: 'Skardu to Askole', description: 'Drive through Shigar Valley to last village', activities: ['Drive', 'Meet team', 'Final prep'] },
        { day: 6, title: 'Askole to Jhola', description: 'Trek begins through Braldu Gorge (6-7 hours)', activities: ['Trekking', 'River views', 'Camping'] },
        { day: 7, title: 'Jhola to Paiju', description: 'Trek along Baltoro Glacier snout (6-7 hours)', activities: ['Trekking', 'Glacier', 'Camping'] },
        { day: 8, title: 'Paiju Rest Day', description: 'Full acclimatization day, explore area', activities: ['Rest', 'Day hikes', 'Photography'] },
        { day: 9, title: 'Paiju to Khoburtse', description: 'Trek on moraine (5-6 hours)', activities: ['Glacier trekking', 'Camping'] },
        { day: 10, title: 'Khoburtse to Urdukas', description: 'Spectacular Trango Towers views (5-6 hours)', activities: ['Trekking', 'Mountain photography', 'Camping'] },
        { day: 11, title: 'Urdukas Rest Day', description: 'Acclimatization, enjoy panoramic views', activities: ['Rest', 'Acclimatization', 'Relaxation'] },
        { day: 12, title: 'Urdukas to Goro II', description: 'Deep into Baltoro Glacier (6-7 hours)', activities: ['Glacier trekking', 'Ice features', 'Camping'] },
        { day: 13, title: 'Goro II to Concordia', description: 'Reach throne room of mountain gods (4-5 hours)', activities: ['Trekking', '360° mountain views', 'Camping'] },
        { day: 14, title: 'Concordia Exploration', description: 'Day hike to viewpoints, photography', activities: ['Exploration', 'Photography', 'Rest'] },
        { day: 15, title: 'K2 Base Camp Day Trip', description: 'Reach K2 BC at 5,150m and return (8-10 hours)', activities: ['Summit push', 'Celebration', 'Photography'] },
        { day: 16, title: 'Return Trek Begins', description: 'Concordia to Paiju via Urdukas (long day)', activities: ['Descending', 'Fast pace', 'Camping'] },
        { day: 17, title: 'Paiju to Askole to Skardu', description: 'Final trek, drive to Skardu', activities: ['Trekking', 'Drive', 'Hotel comfort'] },
        { day: 18, title: 'Skardu to Islamabad & Departure', description: 'Flight to Islamabad, departure', activities: ['Flight', 'Last shopping', 'Departure'] }
      ]
    }
  },

  'hunza-valley': {
    id: 'hunza-valley',
    category: 'adventure',
    name: 'Hunza Valley Adventure',
    slug: 'hunza-valley',
    tagline: 'Mountain Paradise Trek',
    location: 'Hunza, Gilgit-Baltistan',
    duration: '7 Days',
    difficulty: 'moderate',
    rating: 4.8,
    reviews: 243,
    heroImage: '/images/destinations/hunza-hero.jpg',
    
    description: 'Explore the legendary Hunza Valley, known for its stunning mountain vistas, ancient forts, and warm hospitality. This adventure combines moderate trekking with cultural experiences in one of Pakistan\'s most beautiful regions.',
    
    highlights: [
      'Baltit Fort - 700-year-old heritage site',
      'Eagles Nest viewpoint - Panoramic valley views',
      'Attabad Lake - Turquoise glacial lake',
      'Passu Glacier and Cathedral Ridge',
      'Karimabad bazaar and local culture',
      'Apricot orchards and traditional villages'
    ],
    
    itinerary: [
      { day: 1, title: 'Islamabad to Hunza', description: 'Drive via Karakoram Highway (10-12 hours), arrive in Karimabad' },
      { day: 2, title: 'Baltit Fort & Eagles Nest', description: 'Explore ancient fort, hike to Eagles Nest viewpoint for sunset' },
      { day: 3, title: 'Attabad Lake & Gulmit', description: 'Boat ride on turquoise lake, visit Gulmit village and museum' },
      { day: 4, title: 'Passu Glacier Trek', description: 'Trek to Passu Glacier, Cathedral Ridge views, suspension bridge' },
      { day: 5, title: 'Hopper Glacier Trek', description: 'Full day trek to Hopper Valley and glacier viewpoint' },
      { day: 6, title: 'Cultural Experience', description: 'Visit local homes, traditional music, handicraft shopping' },
      { day: 7, title: 'Return to Islamabad', description: 'Scenic drive back via Karakoram Highway' }
    ],
    
    inclusions: [
      'All accommodation (hotels and guesthouses)',
      'All meals (breakfast, lunch, dinner)',
      'Experienced local guide',
      'All ground transportation (SUV/Landcruiser)',
      'Entrance fees to forts and museums',
      'Boat ride on Attabad Lake',
      'Cultural evening with local family',
      'Bottled water during drives',
      'First aid kit'
    ],
    
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal trekking gear',
      'Tips for guides and drivers',
      'Personal expenses',
      'Meals in Islamabad'
    ],
    
    pricing: {
      basic: {
        price: 1799,
        title: 'Basic Package',
        features: [
          'Standard guesthouses',
          'Group tour (6-10 people)',
          'Shared transportation',
          'Standard local meals',
          'Group guide',
          'Basic amenities'
        ]
      },
      premium: {
        price: 2299,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfortable hotels (3-4 star)',
          'Smaller group (4-6 people)',
          'Comfortable SUV transport',
          'Enhanced meal variety',
          'Dedicated guide',
          'Mineral water included',
          'Photography spots guide',
          'Cultural evening with dinner'
        ]
      },
      ultimate: {
        price: 3199,
        title: 'Ultimate Package',
        features: [
          'Luxury hotels and heritage properties',
          'Private tour (1-3 people)',
          'Private Landcruiser',
          'Gourmet meals at best restaurants',
          'Personal guide + photographer',
          'All beverages included',
          'Helicopter ride over Hunza (weather permitting)',
          'Private cultural performance',
          'Souvenir package included',
          'Flexible itinerary'
        ]
      }
    },
    
    bestTime: 'April to October (Spring for blossoms, Autumn for colors)',
    
    whatToBring: [
      'Comfortable trekking shoes',
      'Light jacket (evenings can be cool)',
      'Sunglasses and sunscreen',
      'Camera with extra batteries',
      'Daypack for excursions',
      'Personal medications',
      'Modest clothing (respecting local culture)',
      'Hat and gloves (for higher altitudes)'
    ],
    
    fitnessLevel: 'Moderate fitness required. Ability to walk 3-5 hours on mountain trails.',
    
    gallery: [
      '/images/gallery/hunza-1.jpg',
      '/images/gallery/hunza-2.jpg',
      '/images/gallery/hunza-3.jpg',
      '/images/gallery/hunza-4.jpg',
      '/images/gallery/hunza-5.jpg',
      '/images/gallery/hunza-6.jpg'
    ],

    // Duration-based pricing
    pricingByDuration: {
      '5days': {
        basic: {
          price: 1299,
          title: 'Basic Package',
          popular: false,
          features: [
            'Standard guesthouses',
            'Group tour (6-10 people)',
            'Shared transportation',
            'Standard local meals',
            'Group guide',
            'Basic 5-day highlights tour',
            'Main attractions covered'
          ]
        },
        premium: {
          price: 1699,
          title: 'Premium Package',
          popular: true,
          features: [
            'Comfortable hotels (3-4 star)',
            'Smaller group (4-6 people)',
            'Comfortable SUV transport',
            'Enhanced meal variety',
            'Dedicated guide',
            'Mineral water included',
            'Photography assistance',
            '5-day curated experience'
          ]
        },
        ultimate: {
          price: 2499,
          title: 'Ultimate Package',
          popular: false,
          features: [
            'Luxury hotels',
            'Private tour (1-3 people)',
            'Private Landcruiser',
            'Gourmet meals',
            'Personal guide + photographer',
            'All beverages included',
            'Cultural evening',
            'Flexible 5-day itinerary'
          ]
        }
      },
      '7days': {
        basic: {
          price: 1799,
          title: 'Basic Package',
          popular: false,
          features: [
            'Standard guesthouses',
            'Group tour (6-10 people)',
            'Shared transportation',
            'Standard local meals',
            'Group guide',
            'Basic amenities',
            'Complete 7-day circuit'
          ]
        },
        premium: {
          price: 2299,
          title: 'Premium Package',
          popular: true,
          features: [
            'Comfortable hotels (3-4 star)',
            'Smaller group (4-6 people)',
            'Comfortable SUV transport',
            'Enhanced meal variety',
            'Dedicated guide',
            'Mineral water included',
            'Photography spots guide',
            'Cultural evening with dinner'
          ]
        },
        ultimate: {
          price: 3199,
          title: 'Ultimate Package',
          popular: false,
          features: [
            'Luxury hotels and heritage properties',
            'Private tour (1-3 people)',
            'Private Landcruiser',
            'Gourmet meals at best restaurants',
            'Personal guide + photographer',
            'All beverages included',
            'Helicopter ride over Hunza',
            'Private cultural performance',
            'Souvenir package included',
            'Flexible itinerary'
          ]
        }
      },
      '10days': {
        basic: {
          price: 2499,
          title: 'Basic Package',
          popular: false,
          features: [
            'Standard guesthouses',
            'Group tour (6-10 people)',
            'Shared transportation',
            'Standard local meals',
            'Group guide',
            'Basic amenities',
            'Extended 10-day exploration',
            'Hidden valleys included'
          ]
        },
        premium: {
          price: 3199,
          title: 'Premium Package',
          popular: true,
          features: [
            'Comfortable hotels (3-4 star)',
            'Smaller group (4-6 people)',
            'Comfortable SUV transport',
            'Enhanced meal variety',
            'Dedicated guide',
            'Mineral water included',
            'Photography workshops',
            'Multiple cultural evenings',
            'Off-beaten-path locations'
          ]
        },
        ultimate: {
          price: 4499,
          title: 'Ultimate Package',
          popular: false,
          features: [
            'Luxury hotels and heritage stays',
            'Private tour (1-3 people)',
            'Private Landcruiser',
            'Gourmet meals',
            'Personal guide + photographer',
            'All beverages included',
            'Multiple helicopter rides',
            'Private cultural performances',
            'Souvenir package',
            'Fully flexible itinerary',
            'VIP local connections',
            'Extended exploration time'
          ]
        }
      }
    },

    // Duration-based itineraries
    itineraryByDuration: {
      '5days': [
        { day: 1, title: 'Islamabad to Hunza', description: 'Scenic drive along Karakoram Highway, stop at Rakaposhi viewpoint', activities: ['Scenic drive', 'Photography', 'Check-in'] },
        { day: 2, title: 'Karimabad Highlights', description: 'Baltit Fort, Altit Fort, local bazaar exploration', activities: ['Fort visits', 'Culture', 'Shopping'] },
        { day: 3, title: 'Attabad Lake & Passu', description: 'Boat ride on turquoise lake, Passu Cones photography, suspension bridge', activities: ['Boating', 'Photography', 'Trekking'] },
        { day: 4, title: 'Eagle\'s Nest & Duikar', description: 'Sunset viewpoint, panoramic valley views, village walk', activities: ['Viewpoint', 'Hiking', 'Sunset'] },
        { day: 5, title: 'Return to Islamabad', description: 'Morning relaxation, drive back via KKH', activities: ['Shopping', 'Drive', 'Departure'] }
      ],
      '7days': [
        { day: 1, title: 'Islamabad to Hunza', description: 'Scenic drive via Karakoram Highway, stops at viewpoints', activities: ['Scenic drive', 'Photography', 'Rakaposhi view'] },
        { day: 2, title: 'Karimabad Exploration', description: 'Baltit Fort, Altit Fort, local markets and cafes', activities: ['Fort tours', 'Culture', 'Local cuisine'] },
        { day: 3, title: 'Attabad Lake', description: 'Full day at Attabad - boating, kayaking, lakeside walk', activities: ['Boating', 'Kayaking', 'Relaxation'] },
        { day: 4, title: 'Passu & Gulmit', description: 'Passu Cones, suspension bridge, Gulmit village, traditional house visit', activities: ['Photography', 'Bridge walk', 'Culture'] },
        { day: 5, title: 'Hopper Glacier Trek', description: 'Full day trek to Hopper Valley and glacier viewpoint', activities: ['Trekking', 'Glacier views', 'Nature'] },
        { day: 6, title: 'Cultural Experience', description: 'Visit local homes, traditional music, handicraft shopping, farewell dinner', activities: ['Culture', 'Music', 'Shopping'] },
        { day: 7, title: 'Return to Islamabad', description: 'Leisurely drive back via Karakoram Highway', activities: ['Drive', 'Last photos', 'Departure'] }
      ],
      '10days': [
        { day: 1, title: 'Islamabad to Hunza', description: 'Scenic drive via Karakoram Highway, overnight in Naran or Chilas', activities: ['Long drive', 'Overnight stop', 'Rest'] },
        { day: 2, title: 'Arrival in Hunza', description: 'Continue to Hunza, check-in, evening orientation walk', activities: ['Drive', 'Orientation', 'Sunset views'] },
        { day: 3, title: 'Karimabad Heritage', description: 'Baltit Fort, Altit Fort, local bazaar, traditional lunch', activities: ['Fort tours', 'History', 'Local food'] },
        { day: 4, title: 'Attabad Lake Day', description: 'Full day at Attabad - boating, swimming, cliff jumping, picnic', activities: ['Water sports', 'Relaxation', 'Picnic'] },
        { day: 5, title: 'Passu & Upper Hunza', description: 'Passu Cones, Borith Lake, Sost bazaar, suspension bridge', activities: ['Photography', 'Exploration', 'Shopping'] },
        { day: 6, title: 'Khunjerab Pass Excursion', description: 'Day trip to Pak-China border (15,397 ft), wildlife spotting', activities: ['High altitude', 'Border visit', 'Wildlife'] },
        { day: 7, title: 'Hopper Glacier Trek', description: 'Full day trek to Hopper Valley, glacier views, mountain scenery', activities: ['Trekking', 'Glacier', 'Photography'] },
        { day: 8, title: 'Nagar Valley Exploration', description: 'Cross to Nagar side, visit hidden villages, local apricot orchards', activities: ['Village tour', 'Agriculture', 'Culture'] },
        { day: 9, title: 'Cultural Immersion Day', description: 'Traditional music, dance, local cuisine cooking class, handicrafts', activities: ['Music', 'Cooking', 'Shopping'] },
        { day: 10, title: 'Return to Islamabad', description: 'Leisurely drive back, stops at favorite spots', activities: ['Drive', 'Shopping', 'Departure'] }
      ]
    }
  },

  'swat-valley': {
    id: 'swat-valley',
    category: 'adventure',
    name: 'Swat Valley Trek',
    slug: 'swat-valley',
    tagline: 'Switzerland of Pakistan',
    location: 'Swat, Khyber Pakhtunkhwa',
    duration: '6 Days',
    difficulty: 'easy',
    rating: 4.7,
    reviews: 189,
    heroImage: swatImage1,
    
    description: 'Discover the emerald paradise of Swat Valley, featuring lush green meadows, crystal-clear rivers, Buddhist heritage sites, and the majestic Malam Jabba ski resort. Perfect for families and first-time trekkers.',
    
    highlights: [
      'Malam Jabba - Ski resort and chairlift rides',
      'Mahodand Lake - Pristine alpine lake',
      'Buddhist stupas and ancient ruins',
      'Swat River white water rafting',
      'Ushu Forest and waterfalls',
      'Local handicrafts and gemstones'
    ],
    
    itinerary: [
      { day: 1, title: 'Islamabad to Swat', description: 'Drive to Mingora via Motorway (5-6 hours), hotel check-in' },
      { day: 2, title: 'Malam Jabba', description: 'Full day at ski resort, chairlift, scenic walks, local cuisine' },
      { day: 3, title: 'Mahodand Lake', description: 'Day trip to alpine lake, picnic, optional horse riding' },
      { day: 4, title: 'Ushu Forest & Waterfalls', description: 'Trek through dense forests, visit waterfalls, riverside camp' },
      { day: 5, title: 'Buddhist Heritage & Rafting', description: 'Visit ancient stupas, afternoon white water rafting on Swat River' },
      { day: 6, title: 'Return to Islamabad', description: 'Stop at local bazaar for shopping, drive back' }
    ],
    
    inclusions: [
      'All accommodation (hotels)',
      'All meals during tour',
      'Local guide',
      'All transportation (SUV)',
      'Malam Jabba chairlift tickets',
      'Rafting equipment and safety gear',
      'Entrance fees to heritage sites',
      'Bottled water'
    ],
    
    exclusions: [
      'Ski equipment rental (available separately)',
      'Travel insurance',
      'Personal expenses',
      'Tips for guide and driver',
      'Meals in Islamabad'
    ],
    
    // Duration-based pricing and itineraries
    pricingByDuration: {
      '5days': {
        basic: {
          price: 1299,
          title: 'Basic Package',
          features: [
            'Standard hotels (2-3 star)',
            'Group tour (8-10 people)',
            'Shared transport',
            'Standard meals',
            'Group guide',
            'Malam Jabba visit'
          ]
        },
        premium: {
          price: 1599,
          title: 'Premium Package',
          popular: true,
          features: [
            'Comfortable hotels (3-4 star)',
            'Smaller group (4-6 people)',
            'Comfortable SUV',
            'Better meal variety',
            'Dedicated guide',
            'Chairlift + horse riding',
            'Photography guidance'
          ]
        },
        ultimate: {
          price: 2299,
          title: 'Ultimate Package',
          features: [
            'Luxury resorts',
            'Private tour (1-4 people)',
            'Private 4x4 vehicle',
            'Gourmet meals',
            'Personal guide + photographer',
            'All activities included',
            'Spa access',
            'Flexible itinerary'
          ]
        }
      },
      '7days': {
        basic: {
          price: 1699,
          title: 'Basic Package',
          features: [
            'Standard hotels (2-3 star)',
            'Group tour (8-10 people)',
            'Shared transport',
            'Standard meals',
            'Group guide',
            'All major attractions',
            'Rafting included'
          ]
        },
        premium: {
          price: 2099,
          title: 'Premium Package',
          popular: true,
          features: [
            'Comfortable hotels (3-4 star)',
            'Smaller group (4-6 people)',
            'Comfortable SUV',
            'Enhanced meals',
            'Dedicated guide',
            'Advanced rafting + photos',
            'Horse riding included',
            'Cultural experiences'
          ]
        },
        ultimate: {
          price: 2999,
          title: 'Ultimate Package',
          features: [
            'Luxury resorts',
            'Private tour (1-4 people)',
            'Private 4x4 vehicle',
            'Gourmet meals',
            'Personal guide + photographer',
            'Premium activities',
            'Helicopter tour',
            'Spa & wellness',
            'Shopping expert'
          ]
        }
      },
      '9days': {
        basic: {
          price: 2099,
          title: 'Basic Package',
          features: [
            'Standard hotels (2-3 star)',
            'Group tour (8-10 people)',
            'Shared transport',
            'Standard meals',
            'Group guide',
            'Extended exploration',
            'All major sites',
            'Multiple activities'
          ]
        },
        premium: {
          price: 2599,
          title: 'Premium Package',
          popular: true,
          features: [
            'Comfortable hotels (3-4 star)',
            'Smaller group (4-6 people)',
            'Comfortable SUV',
            'Enhanced meals',
            'Dedicated guide',
            'All premium activities',
            'Cultural immersion',
            'Photography sessions',
            'Local artisan visits'
          ]
        },
        ultimate: {
          price: 3699,
          title: 'Ultimate Package',
          features: [
            'Luxury resorts',
            'Private tour (1-4 people)',
            'Private 4x4 vehicle',
            'Gourmet meals + chef',
            'Personal guide + photographer',
            'All luxury activities',
            'Helicopter tours',
            'Private cultural shows',
            'Spa & wellness retreat',
            'Gemstone expert shopping',
            'Fully flexible itinerary'
          ]
        }
      }
    },

    itineraryByDuration: {
      '5days': [
        { day: 1, title: 'Islamabad to Swat', description: 'Drive to Mingora, hotel check-in, evening city tour', activities: ['Scenic drive', 'City orientation', 'Welcome dinner'] },
        { day: 2, title: 'Malam Jabba', description: 'Full day at ski resort, chairlift rides, mountain walks', activities: ['Chairlift ride', 'Mountain viewing', 'Local cuisine'] },
        { day: 3, title: 'Mahodand Lake', description: 'Day trip to pristine alpine lake, picnic lunch', activities: ['Lake visit', 'Photography', 'Horse riding (optional)'] },
        { day: 4, title: 'Buddhist Heritage', description: 'Explore ancient Buddhist sites and local bazaar', activities: ['Archaeological sites', 'Museum visit', 'Shopping'] },
        { day: 5, title: 'Return to Islamabad', description: 'Leisure morning, drive back to Islamabad', activities: ['Souvenir shopping', 'Scenic drive'] }
      ],
      '7days': [
        { day: 1, title: 'Islamabad to Swat', description: 'Drive to Mingora, hotel check-in, city tour', activities: ['Scenic drive', 'City tour', 'Welcome dinner'] },
        { day: 2, title: 'Malam Jabba', description: 'Full day at ski resort, chairlift, mountain activities', activities: ['Chairlift', 'Trekking', 'Photography'] },
        { day: 3, title: 'Mahodand Lake', description: 'Alpine lake visit, picnic, horse riding', activities: ['Lake exploration', 'Horse riding', 'Fishing'] },
        { day: 4, title: 'Ushu Forest & Waterfalls', description: 'Trek through forests, waterfalls, riverside camp', activities: ['Forest trekking', 'Waterfall visit', 'Camping'] },
        { day: 5, title: 'Buddhist Heritage', description: 'Archaeological sites, museums, ancient stupas', activities: ['Site exploration', 'Museum tour', 'Photography'] },
        { day: 6, title: 'White Water Rafting', description: 'Swat River rafting adventure, local village visit', activities: ['Rafting', 'Village tour', 'Cultural experience'] },
        { day: 7, title: 'Return to Islamabad', description: 'Bazaar shopping, drive back to capital', activities: ['Shopping', 'Leisure', 'Departure'] }
      ],
      '9days': [
        { day: 1, title: 'Arrival in Islamabad', description: 'Airport pickup, hotel check-in, city briefing', activities: ['City tour', 'Trip briefing', 'Dinner'] },
        { day: 2, title: 'Islamabad to Swat', description: 'Scenic drive to Swat Valley, Mingora check-in', activities: ['Karakoram Highway', 'Mountain views', 'Hotel check-in'] },
        { day: 3, title: 'Malam Jabba Resort', description: 'Full day skiing/chairlift, mountain exploration', activities: ['Ski resort activities', 'Chairlift', 'Mountain walks'] },
        { day: 4, title: 'Mahodand Lake', description: 'Alpine lake excursion, horse riding, picnic', activities: ['Lake visit', 'Horse riding', 'Photography'] },
        { day: 5, title: 'Ushu Forest Trek', description: 'Dense forest trekking, waterfalls, camping', activities: ['Forest trek', 'Waterfalls', 'Riverside camping'] },
        { day: 6, title: 'Buddhist Sites', description: 'Ancient ruins, museums, archaeological exploration', activities: ['Buddhist stupas', 'Museums', 'Historical sites'] },
        { day: 7, title: 'White Water Rafting', description: 'Swat River rafting, village cultural tour', activities: ['Rafting adventure', 'Village visit', 'Local culture'] },
        { day: 8, title: 'Local Experiences', description: 'Artisan workshops, gemstone markets, handicrafts', activities: ['Craft workshops', 'Gemstone shopping', 'Cultural dinner'] },
        { day: 9, title: 'Return to Islamabad', description: 'Leisure morning, scenic drive back, departure', activities: ['Final shopping', 'Scenic drive', 'Departure'] }
      ]
    },
    
    pricing: {
      basic: {
        price: 1499,
        title: 'Basic Package',
        features: [
          'Standard hotels (2-3 star)',
          'Group tour (8-10 people)',
          'Shared transport',
          'Standard meals',
          'Group guide',
          'Basic rafting experience'
        ]
      },
      premium: {
        price: 1899,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfortable hotels (3-4 star)',
          'Smaller group (4-6 people)',
          'Comfortable SUV',
          'Better meal variety',
          'Dedicated guide',
          'Advanced rafting with photos',
          'Horse riding at Mahodand included',
          'Shopping guide for handicrafts'
        ]
      },
      ultimate: {
        price: 2699,
        title: 'Ultimate Package',
        features: [
          'Luxury resorts and hotels',
          'Private tour (1-4 people)',
          'Private 4x4 vehicle',
          'Gourmet meals',
          'Personal guide + photographer',
          'Ski lessons and equipment included',
          'Private rafting session',
          'Helicopter tour over valley',
          'Cultural dinner with local family',
          'Gemstone shopping expert',
          'Spa access at resort'
        ]
      }
    },
    
    bestTime: 'May to October (Summer for lakes, Winter for skiing)',
    
    whatToBring: [
      'Comfortable walking shoes',
      'Light jacket and warm layers',
      'Swimwear (for hotel pools)',
      'Sunscreen and sunglasses',
      'Camera',
      'Personal medications',
      'Modest clothing',
      'Extra clothes for rafting'
    ],
    
    fitnessLevel: 'Easy - Suitable for all ages and fitness levels. Minimal trekking required.',
    
    gallery: [
      swatImage1,
      swatImage2,
      '/images/gallery/swat-1.jpg',
      '/images/gallery/swat-2.jpg',
      '/images/gallery/swat-3.jpg',
      '/images/gallery/swat-4.jpg',
      '/images/gallery/swat-5.jpg',
      '/images/gallery/swat-6.jpg'
    ]
  },

  'skardu': {
    id: 'skardu',
    category: 'adventure',
    name: 'Skardu & Baltistan',
    slug: 'skardu',
    tagline: 'Gateway to Giants',
    location: 'Skardu, Gilgit-Baltistan',
    duration: '6 Days',
    difficulty: 'moderate',
    rating: 4.7,
    reviews: 189,
    heroImage: '/images/destinations/skardu-hero.jpg',
    
    description: 'Discover Skardu, the gateway to some of the world\'s highest peaks. Explore pristine lakes, ancient forts, vast deserts, and dramatic mountain landscapes. Experience the unique Balti culture while surrounded by breathtaking natural beauty.',
    
    highlights: [
      'Shangrila Resort - Heaven on Earth',
      'Satpara Lake and Dam - Crystal clear waters',
      'Deosai National Park - Land of Giants (seasonal)',
      'Shigar Fort - Heritage hotel experience',
      'Katpana Desert - Cold desert experience',
      'Kharpocho Fort - Panoramic valley views',
      'Buddha Rock - Ancient carvings',
      'Local Balti culture and cuisine'
    ],
    
    itinerary: [
      { day: 1, title: 'Arrival in Islamabad', description: 'Airport pickup, hotel check-in, briefing and rest' },
      { day: 2, title: 'Fly to Skardu', description: 'Morning flight with mountain views, check-in at Shangrila Resort' },
      { day: 3, title: 'Upper Kachura Lake & Shigar', description: 'Visit Upper Kachura, explore Shigar Fort and village' },
      { day: 4, title: 'Deosai Plateau', description: 'Full day excursion to Deosai National Park (if open), wildlife spotting' },
      { day: 5, title: 'Satpara Lake & Katpana Desert', description: 'Boat ride on Satpara, visit cold desert, Kharpocho Fort sunset' },
      { day: 6, title: 'Return to Islamabad', description: 'Morning flight back, city tour if time permits, departure' }
    ],
    
    inclusions: [
      'All accommodation (Shangrila Resort + hotels)',
      'Domestic flights (Islamabad-Skardu-Islamabad)',
      'All meals during Skardu stay',
      'Private 4x4 vehicle with driver',
      'Experienced local guide',
      'All entrance fees and permits',
      'Boat rides on lakes',
      'Deosai permit and fees',
      'Bottled water during tours'
    ],
    
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Tips for guide and driver',
      'Meals in Islamabad',
      'Items not mentioned in inclusions'
    ],
    
    pricing: {
      basic: {
        price: 1499,
        title: 'Basic Package',
        features: [
          'Standard hotels',
          'Group tour (6-8 people)',
          'Shared transportation',
          'Standard meals',
          'Basic guide services'
        ]
      },
      premium: {
        price: 1899,
        title: 'Premium Package',
        popular: true,
        features: [
          'Shangrila Resort stay',
          'Smaller group (4-6 people)',
          'Private SUV',
          'Enhanced meals',
          'Dedicated guide',
          'Photography assistance',
          'Better room categories'
        ]
      },
      ultimate: {
        price: 2699,
        title: 'Ultimate Package',
        features: [
          'Luxury accommodations',
          'Private tour (1-3 people)',
          'Private 4x4 Landcruiser',
          'Gourmet meals',
          'Personal guide + photographer',
          'Helicopter option (weather permitting)',
          'VIP services',
          'Flexible itinerary'
        ]
      }
    },

    pricingByDuration: {
      '4days': {
        basic: { price: 999, title: 'Basic Package', popular: false, features: ['Standard hotels', 'Group tour', 'Shared transport', 'Standard meals', 'Quick highlights'] },
        premium: { price: 1299, title: 'Premium Package', popular: true, features: ['Shangrila Resort', 'Small group', 'Private SUV', 'Enhanced meals', 'Main attractions'] },
        ultimate: { price: 1899, title: 'Ultimate Package', popular: false, features: ['Luxury hotels', 'Private tour', 'Private 4x4', 'Gourmet meals', 'Premium experience'] }
      },
      '6days': {
        basic: { price: 1499, title: 'Basic Package', popular: false, features: ['Standard hotels', 'Group tour (6-8)', 'Shared transport', 'Standard meals', 'Complete circuit'] },
        premium: { price: 1899, title: 'Premium Package', popular: true, features: ['Shangrila Resort', 'Small group (4-6)', 'Private SUV', 'Enhanced meals', 'Dedicated guide', 'Photography help'] },
        ultimate: { price: 2699, title: 'Ultimate Package', popular: false, features: ['Luxury stays', 'Private tour', 'Private 4x4', 'Gourmet dining', 'Personal guide', 'Helicopter option', 'VIP service'] }
      },
      '8days': {
        basic: { price: 1999, title: 'Basic Package', popular: false, features: ['Standard hotels', 'Group tour', 'Shared transport', 'Standard meals', 'Extended exploration', 'Extra destinations'] },
        premium: { price: 2499, title: 'Premium Package', popular: true, features: ['Shangrila + heritage hotels', 'Small group', 'Private SUV', 'Enhanced meals', 'Expert guide', 'Photography workshops', 'Cultural experiences'] },
        ultimate: { price: 3499, title: 'Ultimate Package', popular: false, features: ['Luxury accommodations', 'Private tour', 'Premium 4x4', 'Gourmet meals', 'Personal guide + photographer', 'Multiple helicopter rides', 'VIP experiences', 'Fully flexible'] }
      }
    },

    itineraryByDuration: {
      '4days': [
        { day: 1, title: 'Fly to Skardu', description: 'Morning flight from Islamabad, check-in at Shangrila', activities: ['Flight', 'Mountain views', 'Check-in'] },
        { day: 2, title: 'Skardu Highlights', description: 'Kachura Lakes, Shigar Fort, local bazaar', activities: ['Lakes', 'Fort visit', 'Shopping'] },
        { day: 3, title: 'Satpara & Desert', description: 'Satpara Lake boat ride, Katpana Desert, Buddha Rock', activities: ['Boating', 'Desert', 'Photography'] },
        { day: 4, title: 'Return Flight', description: 'Morning at leisure, afternoon flight to Islamabad', activities: ['Shopping', 'Flight', 'Departure'] }
      ],
      '6days': [
        { day: 1, title: 'Arrival Islamabad', description: 'Airport pickup, hotel rest, trip briefing', activities: ['Arrival', 'Briefing', 'Rest'] },
        { day: 2, title: 'Fly to Skardu', description: 'Scenic flight over Nanga Parbat, Shangrila check-in', activities: ['Flight', 'Panoramic views', 'Resort'] },
        { day: 3, title: 'Kachura & Shigar', description: 'Upper Kachura Lake, Shigar Fort and village exploration', activities: ['Lakes', 'Heritage', 'Culture'] },
        { day: 4, title: 'Deosai Plateau', description: 'Full day at Deosai National Park, wildlife watching', activities: ['Wildlife', 'Plains', 'Photography'] },
        { day: 5, title: 'Satpara & Katpana', description: 'Satpara Lake, cold desert, Kharpocho Fort sunset', activities: ['Boating', 'Desert', 'Sunset'] },
        { day: 6, title: 'Return to Islamabad', description: 'Morning flight back, city tour, departure', activities: ['Flight', 'Shopping', 'Departure'] }
      ],
      '8days': [
        { day: 1, title: 'Arrival Islamabad', description: 'Airport pickup, hotel, Faisal Mosque visit', activities: ['Arrival', 'Mosque', 'Rest'] },
        { day: 2, title: 'Drive to Skardu', description: 'Scenic drive via Karakoram Highway, overnight stops', activities: ['KKH drive', 'Scenery', 'Adventure'] },
        { day: 3, title: 'Arrive Skardu', description: 'Continue to Skardu, Shangrila Resort check-in, relaxation', activities: ['Arrival', 'Check-in', 'Lake views'] },
        { day: 4, title: 'Shigar Valley', description: 'Full day exploring Shigar Fort, village, ancient mosque', activities: ['Heritage', 'Culture', 'Architecture'] },
        { day: 5, title: 'Deosai National Park', description: 'Full day wildlife safari, Sheosar Lake, picnic', activities: ['Wildlife', 'Lake', 'Plains'] },
        { day: 6, title: 'Manthoka Waterfall', description: 'Jeep safari to Manthoka, trekking, photography', activities: ['Waterfall', 'Trekking', 'Photos'] },
        { day: 7, title: 'Satpara & Katpana', description: 'Boat ride, cold desert exploration, Kharpocho Fort', activities: ['Boating', 'Desert', 'Fort'] },
        { day: 8, title: 'Return Journey', description: 'Flight or drive back to Islamabad, departure', activities: ['Travel', 'Last shopping', 'Departure'] }
      ]
    },
    
    bestTime: 'April to October (Deosai opens June-September)',
    
    whatToBring: [
      'Warm jacket (cold desert nights)',
      'Comfortable walking shoes',
      'Sunglasses and sunscreen',
      'Camera with extra batteries',
      'Personal medications',
      'Binoculars (for wildlife)',
      'Light backpack',
      'Hat and sunblock'
    ],
    
    fitnessLevel: 'Moderate - Suitable for most travelers. Some walking and high altitude (7,500ft).',
    
    gallery: [
      '/images/gallery/skardu-1.jpg',
      '/images/gallery/skardu-2.jpg',
      '/images/gallery/skardu-3.jpg',
      '/images/gallery/skardu-4.jpg',
      '/images/gallery/skardu-5.jpg'
    ]
  },

  'naran-kaghan': {
    id: 'naran-kaghan',
    category: 'adventure',
    name: 'Naran Kaghan Valley',
    slug: 'naran-kaghan',
    tagline: 'Alpine Paradise',
    location: 'Naran & Kaghan, KPK',
    duration: '5 Days',
    difficulty: 'easy',
    rating: 4.6,
    reviews: 312,
    heroImage: '/images/destinations/naran-hero.jpg',
    
    description: 'Experience the enchanting Naran Kaghan valley with its pristine lakes, lush green meadows, roaring rivers, and snow-capped peaks. Perfect for families and nature lovers seeking a peaceful mountain retreat with stunning natural beauty.',
    
    highlights: [
      'Lake Saiful Muluk - Legendary alpine lake at 10,578ft',
      'Babusar Top - High mountain pass at 13,691ft',
      'Lulusar Lake - Crystal clear turquoise waters',
      'Lalazar Meadows - Flower-filled alpine pastures',
      'Shogran & Siri Paye - Pine forests and meadows',
      'River Kunhar - White water rafting option',
      'Traditional Kaghan villages',
      'Local handicrafts and cuisine'
    ],
    
    itinerary: [
      { day: 1, title: 'Islamabad to Naran', description: 'Scenic drive via Mansehra and Balakot, check-in at hotel' },
      { day: 2, title: 'Lake Saiful Muluk', description: 'Jeep ride to the legendary lake, boating, local legends tour' },
      { day: 3, title: 'Babusar Top Excursion', description: 'Day trip to Babusar Pass, Lulusar Lake, panoramic views' },
      { day: 4, title: 'Shogran & Lalazar', description: 'Visit pine forests, meadows, horse riding at Siri Paye' },
      { day: 5, title: 'Return to Islamabad', description: 'Leisurely drive back with stops at viewpoints' }
    ],
    
    inclusions: [
      'All accommodation (hotels in Naran/Shogran)',
      'All meals (breakfast, lunch, dinner)',
      'Private transport (SUV/Coaster)',
      'Experienced driver-guide',
      'Jeep safari to Lake Saiful Muluk',
      'Jeep ride to Babusar Top',
      'All entrance fees',
      'Bottled water during tours'
    ],
    
    exclusions: [
      'International flights',
      'Travel insurance',
      'Horse riding at Siri Paye (optional)',
      'Rafting on Kunhar River (optional)',
      'Personal expenses',
      'Tips for driver and hotel staff'
    ],
    
    pricing: {
      basic: {
        price: 899,
        title: 'Basic Package',
        features: [
          'Standard hotels',
          'Group tour (8-10 people)',
          'Shared coaster transport',
          'Standard meals',
          'Group guide'
        ]
      },
      premium: {
        price: 1199,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfortable hotels (3-star)',
          'Smaller group (4-6 people)',
          'Private SUV',
          'Enhanced meals',
          'Dedicated guide',
          'Better locations'
        ]
      },
      ultimate: {
        price: 1799,
        title: 'Ultimate Package',
        features: [
          'Best hotels and resorts',
          'Private tour (1-4 people)',
          'Luxury SUV',
          'Gourmet meals',
          'Personal guide',
          'Helicopter ride option',
          'Premium services',
          'Flexible timing'
        ]
      }
    },

    pricingByDuration: {
      '3days': {
        basic: { price: 599, title: 'Basic Package', popular: false, features: ['Standard hotels', 'Group tour', 'Shared transport', 'Quick highlights', 'Saiful Muluk only'] },
        premium: { price: 799, title: 'Premium Package', popular: true, features: ['Good hotels', 'Small group', 'Private SUV', 'Enhanced meals', 'Lake + meadows'] },
        ultimate: { price: 1199, title: 'Ultimate Package', popular: false, features: ['Best hotels', 'Private tour', 'Luxury SUV', 'Gourmet meals', 'Premium experience'] }
      },
      '5days': {
        basic: { price: 899, title: 'Basic Package', popular: false, features: ['Standard hotels', 'Group tour (8-10)', 'Shared transport', 'Standard meals', 'Complete circuit'] },
        premium: { price: 1199, title: 'Premium Package', popular: true, features: ['Comfortable hotels', 'Small group (4-6)', 'Private SUV', 'Enhanced meals', 'All attractions', 'Photography guide'] },
        ultimate: { price: 1799, title: 'Ultimate Package', popular: false, features: ['Premium hotels', 'Private tour', 'Luxury SUV', 'Gourmet dining', 'Personal guide', 'Helicopter option', 'Flexible schedule'] }
      },
      '7days': {
        basic: { price: 1299, title: 'Basic Package', popular: false, features: ['Standard hotels', 'Group tour', 'Shared transport', 'Standard meals', 'Extended stay', 'Extra locations'] },
        premium: { price: 1699, title: 'Premium Package', popular: true, features: ['Best hotels', 'Small group', 'Private SUV', 'Enhanced meals', 'All major sites', 'Cultural experiences', 'Adventure activities'] },
        ultimate: { price: 2499, title: 'Ultimate Package', popular: false, features: ['Luxury resorts', 'Private tour', 'Premium vehicles', 'Gourmet meals', 'Personal guide + photographer', 'Multiple helicopter rides', 'VIP services', 'Custom itinerary'] }
      }
    },

    itineraryByDuration: {
      '3days': [
        { day: 1, title: 'Islamabad to Naran', description: 'Drive via Abbottabad and Mansehra, evening arrival', activities: ['Scenic drive', 'Check-in', 'River walk'] },
        { day: 2, title: 'Lake Saiful Muluk', description: 'Full day at the legendary alpine lake, jeep ride, boating', activities: ['Jeep safari', 'Boating', 'Photography'] },
        { day: 3, title: 'Return to Islamabad', description: 'Morning at Kunhar River, drive back to capital', activities: ['River views', 'Shopping', 'Return'] }
      ],
      '5days': [
        { day: 1, title: 'Islamabad to Naran', description: 'Scenic drive through Abbottabad, Mansehra, Balakot', activities: ['Drive', 'Scenery', 'Check-in'] },
        { day: 2, title: 'Lake Saiful Muluk', description: 'Jeep ride to legendary lake, boating, local legends', activities: ['Jeep safari', 'Boating', 'Stories'] },
        { day: 3, title: 'Babusar Top', description: 'Day trip to Babusar Pass, Lulusar Lake, snow activities', activities: ['High pass', 'Lakes', 'Photography'] },
        { day: 4, title: 'Shogran & Lalazar', description: 'Pine forests, meadows, horse riding at Siri Paye', activities: ['Forest walk', 'Meadows', 'Horse riding'] },
        { day: 5, title: 'Return Journey', description: 'Leisurely drive back with photo stops', activities: ['Shopping', 'Photos', 'Return'] }
      ],
      '7days': [
        { day: 1, title: 'Islamabad to Naran', description: 'Scenic drive, stop at Balakot for lunch', activities: ['Drive', 'Lunch stop', 'Evening walk'] },
        { day: 2, title: 'Lake Saiful Muluk', description: 'Full day at alpine lake, multiple view points, boating', activities: ['Jeep ride', 'Boating', 'Hiking'] },
        { day: 3, title: 'Babusar Top Excursion', description: 'High altitude pass, Lulusar Lake, Gitidas meadow', activities: ['Mountain pass', 'Lakes', 'Meadows'] },
        { day: 4, title: 'Shogran Exploration', description: 'Transfer to Shogran, explore pine forests, village walk', activities: ['Forest', 'Village', 'Culture'] },
        { day: 5, title: 'Siri Paye & Lalazar', description: 'Horse riding to Siri Paye meadows, picnic at Lalazar', activities: ['Horse riding', 'Meadows', 'Picnic'] },
        { day: 6, title: 'Kaghan Valley', description: 'Explore lower Kaghan, visit waterfalls, local villages', activities: ['Waterfalls', 'Villages', 'Culture'] },
        { day: 7, title: 'Return to Islamabad', description: 'Relaxed drive back, shopping stops', activities: ['Shopping', 'Rest', 'Departure'] }
      ]
    },
    
    bestTime: 'May to October (Lake Saiful Muluk accessible June-September)',
    
    whatToBring: [
      'Warm jacket (high altitudes are cold)',
      'Comfortable walking shoes',
      'Sunglasses and sunscreen SPF 50+',
      'Camera with extra batteries',
      'Rain jacket (sudden showers)',
      'Personal medications',
      'Snacks and water bottle',
      'Hat and gloves for Babusar Top'
    ],
    
    fitnessLevel: 'Easy - Suitable for families and all ages. Minimal walking required.',
    
    gallery: [
      '/images/gallery/naran-1.jpg',
      '/images/gallery/naran-2.jpg',
      '/images/gallery/naran-3.jpg',
      '/images/gallery/naran-4.jpg',
      '/images/gallery/naran-5.jpg'
    ]
  },

  'siran-valley': {
    id: 'siran-valley',
    category: 'adventure',
    name: 'Siran Valley Escape',
    slug: 'siran-valley',
    tagline: 'Hidden Gem of Mansehra',
    location: 'Siran Valley, Mansehra District, Khyber Pakhtunkhwa',
    duration: '4 Days',
    difficulty: 'easy',
    rating: 4.6,
    reviews: 84,
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',

    description: 'Siran Valley lies along the Siran River in Mansehra District, Khyber Pakhtunkhwa. It is a calm, forested valley with alpine meadows and small villages, reached via Mansehra with common access through Oghi, Ichrian, Baffa, and onward to Jabori. The valley is best known for its cool summers, scenic river views, and easy nature walks.',

    highlights: [
      'Siran River valley landscapes and pine forests',
      'Access route via Oghi, Ichrian, Baffa to Jabori',
      'Meadows like Khandagali, Aram Gali, and Mundi',
      'Local villages and cultural hospitality',
      'Musa ka Musalla and Churko peak viewpoints',
      'Photography-friendly scenery and gentle hikes'
    ],

    itinerary: [
      { day: 1, title: 'Islamabad to Siran Valley', description: 'Drive to Mansehra, continue via Oghi, Ichrian, Baffa, arrive in Jabori area, evening riverside walk' },
      { day: 2, title: 'Meadows Day Trip', description: 'Explore Khandagali and Aram Gali meadows, short hikes, picnic with valley views' },
      { day: 3, title: 'Village & Forest Trails', description: 'Visit local villages, forest walks, and scenic viewpoints toward Musa ka Musalla region' },
      { day: 4, title: 'Return to Islamabad', description: 'Relaxed breakfast, optional local market stop, return via Mansehra' }
    ],

    inclusions: [
      'Comfortable accommodation (3-4 star)',
      'Daily breakfast and dinner',
      'Private transport with driver',
      'Local guide for day trips',
      'Jeep ride where required',
      'Bottled water'
    ],

    exclusions: [
      'Travel insurance',
      'Personal expenses',
      'Lunch meals',
      'Tips for guide/driver',
      'Optional activities'
    ],

    pricing: {
      basic: {
        price: 499,
        title: 'Basic Package',
        features: [
          'Standard hotel stay',
          'Shared transport option',
          'Group tour (6-10 people)',
          'Standard meals',
          'Local guide'
        ]
      },
      premium: {
        price: 699,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfortable hotel stay',
          'Smaller group (4-6 people)',
          'Private vehicle',
          'Enhanced meals',
          'Dedicated guide',
          'Jeep ride included'
        ]
      },
      ultimate: {
        price: 899,
        title: 'Ultimate Package',
        features: [
          'Luxury resort stay',
          'Private tour (1-4 people)',
          'Private 4x4 vehicle',
          'Gourmet meals',
          'Personal guide',
          'Flexible itinerary'
        ]
      }
    },

    bestTime: 'April to October (cool summers and clear views; winters can be very cold)',

    whatToBring: [
      'Warm layer for evenings',
      'Comfortable walking shoes',
      'Sunglasses and sunscreen',
      'Camera/phone for photography',
      'Reusable water bottle',
      'Basic personal medications'
    ],

    fitnessLevel: 'Easy - Suitable for families and all ages. Short hikes with gentle terrain.',

    videos: [
      { src: siranVideo1, title: 'Siran Valley Snow View 1' },
      { src: siranVideo2, title: 'Siran Valley Snow View 2' }
    ],

    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80'
    ]
  },

  'fairy-meadows': {
    id: 'fairy-meadows',
    category: 'adventure',
    name: 'Fairy Meadows & Nanga Parbat',
    slug: 'fairy-meadows',
    tagline: 'Heaven on Earth',
    location: 'Fairy Meadows, Gilgit-Baltistan',
    duration: '5 Days',
    difficulty: 'moderate',
    rating: 4.9,
    reviews: 267,
    heroImage: '/images/destinations/fairy-meadows-hero.jpg',
    
    description: 'Journey to Fairy Meadows, one of the most beautiful places on Earth, with stunning views of Nanga Parbat, the 9th highest mountain in the world. Trek through alpine meadows, pine forests, and experience the raw beauty of the Himalayas.',
    
    highlights: [
      'Nanga Parbat - The Killer Mountain up close',
      'Fairy Meadows - Alpine grassland paradise',
      'Nanga Parbat Base Camp trek (optional)',
      'Beyal Camp - Higher viewpoint at 11,500ft',
      'Raikot Bridge - Starting point adventure',
      'Jeep safari on extreme terrain',
      'Star gazing in Himalayas',
      'Local Dardi culture'
    ],
    
    itinerary: [
      { day: 1, title: 'Islamabad to Chilas', description: 'Drive along Karakoram Highway, overnight in Chilas' },
      { day: 2, title: 'Chilas to Fairy Meadows', description: 'Jeep ride to Raikot Bridge, trek/horse ride to Fairy Meadows' },
      { day: 3, title: 'Nanga Parbat Basecamp', description: 'Day trek to Nanga Parbat Base Camp or Beyal Camp, return to meadows' },
      { day: 4, title: 'Fairy Meadows to Chilas', description: 'Trek down, jeep ride back, overnight in Chilas' },
      { day: 5, title: 'Return to Islamabad', description: 'Drive back via Karakoram Highway' }
    ],
    
    inclusions: [
      'All accommodation (hotels + camping)',
      'All meals during trek',
      'Private transport to Raikot',
      '4x4 jeep safari to trek start',
      'Camping equipment (tents, sleeping bags)',
      'Experienced trekking guide',
      'Porter for luggage',
      'Permits and fees',
      'First aid kit'
    ],
    
    exclusions: [
      'International flights',
      'Travel insurance (mandatory)',
      'Personal trekking gear (boots, poles)',
      'Horse riding (optional, ~$30)',
      'Tips for guides and porters',
      'Personal expenses',
      'Meals in Islamabad/Chilas'
    ],
    
    pricing: {
      basic: {
        price: 1399,
        title: 'Basic Package',
        features: [
          'Basic camping equipment',
          'Simple tents',
          'Group trek (6-10 people)',
          'Standard meals',
          'Group guide',
          'Shared jeep ride'
        ]
      },
      premium: {
        price: 1799,
        title: 'Premium Package',
        popular: true,
        features: [
          'Better camping equipment',
          'Comfortable tents',
          'Smaller group (4-6 people)',
          'Enhanced meals',
          'Dedicated guide',
          'Private jeep available',
          'Porter included'
        ]
      },
      ultimate: {
        price: 2499,
        title: 'Ultimate Package',
        features: [
          'Premium camping gear',
          'Luxury tents with beds',
          'Private trek (1-4 people)',
          'Gourmet camp meals',
          'Personal guide + helper',
          'Private jeep',
          'Full porter service',
          'Satellite phone',
          'Photography assistance'
        ]
      }
    },

    pricingByDuration: {
      '4days': {
        basic: { price: 1199, title: 'Basic Package', popular: false, features: ['Basic camping', 'Simple tents', 'Group trek', 'Quick route', 'Standard meals'] },
        premium: { price: 1499, title: 'Premium Package', popular: true, features: ['Good camping gear', 'Comfort tents', 'Small group', 'Enhanced meals', 'Better guide'] },
        ultimate: { price: 2099, title: 'Ultimate Package', popular: false, features: ['Premium gear', 'Luxury tents', 'Private trek', 'Gourmet meals', 'Personal guide'] }
      },
      '5days': {
        basic: { price: 1399, title: 'Basic Package', popular: false, features: ['Basic camping', 'Simple tents', 'Group trek (6-10)', 'Standard meals', 'Group guide', 'Shared transport'] },
        premium: { price: 1799, title: 'Premium Package', popular: true, features: ['Better camping', 'Comfortable tents', 'Small group (4-6)', 'Enhanced meals', 'Dedicated guide', 'Private jeep option', 'Porter service'] },
        ultimate: { price: 2499, title: 'Ultimate Package', popular: false, features: ['Premium gear', 'Luxury tents', 'Private trek', 'Gourmet meals', 'Personal guide', 'Private jeep', 'Full support', 'Satellite phone'] }
      },
      '7days': {
        basic: { price: 1799, title: 'Basic Package', popular: false, features: ['Basic camping', 'Simple tents', 'Group trek', 'Standard meals', 'Extended stay', 'More exploration time'] },
        premium: { price: 2299, title: 'Premium Package', popular: true, features: ['Better camping', 'Comfort tents', 'Small group', 'Enhanced meals', 'Expert guide', 'Extra exploration', 'Photography time', 'Cultural visits'] },
        ultimate: { price: 3199, title: 'Ultimate Package', popular: false, features: ['Premium gear', 'Luxury tents', 'Private trek', 'Gourmet dining', 'Personal guide + photographer', 'Private transport', 'Flexible schedule', 'VIP services'] }
      }
    },

    itineraryByDuration: {
      '4days': [
        { day: 1, title: 'Islamabad to Chilas', description: 'Fast drive along KKH, evening arrival', activities: ['Drive', 'KKH scenery', 'Rest'] },
        { day: 2, title: 'To Fairy Meadows', description: 'Jeep ride + trek to meadows, camp setup', activities: ['Jeep adventure', 'Trekking', 'Camping'] },
        { day: 3, title: 'Beyal Camp Trek', description: 'Day hike to Beyal, Nanga Parbat views, return', activities: ['Hiking', 'Mountain views', 'Photography'] },
        { day: 4, title: 'Return to Islamabad', description: 'Trek down, jeep ride, long drive back', activities: ['Descent', 'Drive', 'Arrival'] }
      ],
      '5days': [
        { day: 1, title: 'Islamabad to Chilas', description: 'Scenic drive along Karakoram Highway, overnight rest', activities: ['Drive', 'Scenery', 'Rest'] },
        { day: 2, title: 'Chilas to Fairy Meadows', description: 'Jeep safari to Raikot, trek through forests to meadows', activities: ['Jeep ride', 'Trekking', 'Camp setup'] },
        { day: 3, title: 'Nanga Parbat Base Camp', description: 'Full day trek to Base Camp or Beyal, stunning views', activities: ['Trekking', 'Base camp', 'Photography'] },
        { day: 4, title: 'Fairy Meadows to Chilas', description: 'Trek down to Raikot, jeep ride back, hotel rest', activities: ['Descent', 'Jeep', 'Hotel'] },
        { day: 5, title: 'Return to Islamabad', description: 'Leisurely drive back via KKH, photo stops', activities: ['Drive', 'Photos', 'Arrival'] }
      ],
      '7days': [
        { day: 1, title: 'Islamabad to Naran', description: 'Scenic drive, overnight in Naran Valley', activities: ['Drive', 'Naran stay', 'Rest'] },
        { day: 2, title: 'Naran to Chilas', description: 'Drive via Babusar Pass to Chilas', activities: ['High pass', 'Views', 'Arrival'] },
        { day: 3, title: 'To Fairy Meadows', description: 'Jeep safari + trek to meadows, camp setup', activities: ['Adventure ride', 'Trek', 'Camping'] },
        { day: 4, title: 'Exploration Day', description: 'Relax at meadows, short hikes, photography', activities: ['Relaxation', 'Short hikes', 'Photos'] },
        { day: 5, title: 'Nanga Parbat Base Camp', description: 'Full day trek to Base Camp, return to meadows', activities: ['Long trek', 'Base camp', 'Summit views'] },
        { day: 6, title: 'Return to Chilas', description: 'Trek down, jeep ride, hotel comfort', activities: ['Descent', 'Jeep', 'Rest'] },
        { day: 7, title: 'Return to Islamabad', description: 'Drive back via KKH, stops at viewpoints', activities: ['Drive', 'Shopping', 'Arrival'] }
      ]
    },
    
    bestTime: 'May to October (Best: June-September for clear weather)',
    
    whatToBring: [
      'Sturdy trekking boots (broken-in)',
      'Warm sleeping bag (provided if needed)',
      'Trekking poles',
      'Warm layers and windproof jacket',
      'Sunglasses (UV protection)',
      'Headlamp with batteries',
      'Personal medications',
      'Sunscreen SPF 50+ and lip balm',
      'Water bottle',
      'Camera and power bank',
      'Snacks and energy bars'
    ],
    
    fitnessLevel: 'Moderate to Good fitness required. 3-5 hours trekking per day at altitude.',
    
    gallery: [
      '/images/gallery/fairy-meadows-1.jpg',
      '/images/gallery/fairy-meadows-2.jpg',
      '/images/gallery/fairy-meadows-3.jpg',
      '/images/gallery/fairy-meadows-4.jpg',
      '/images/gallery/fairy-meadows-5.jpg'
    ]
  },

  'neelam-valley': {
    id: 'neelam-valley',
    category: 'adventure',
    regionId: 'kashmir',
    subregionId: 'neelum',
    name: 'Neelam Valley Escape',
    slug: 'neelam-valley',
    tagline: 'Emerald River Valley',
    location: 'Neelam Valley, Azad Jammu and Kashmir',
    duration: '5 Days',
    difficulty: 'easy',
    rating: 4.8,
    reviews: 156,
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',

    description: 'Discover the lush beauty of Neelam Valley with riverside stays, pine forests, and panoramic views. Perfect for families, couples, and first time visitors.',

    highlights: [
      'Riverside views and scenic walks',
      'Keran and Upper Neelam viewpoints',
      'Traditional Kashmiri cuisine',
      'Comfortable stays in cozy lodges',
      'Local culture and craft stops',
      'Photography friendly landscapes'
    ],

    itinerary: [
      { day: 1, title: 'Arrival in Muzaffarabad', description: 'Meet and greet, city briefing, evening riverside walk', activities: ['Arrival', 'Briefing', 'Riverside walk'] },
      { day: 2, title: 'Muzaffarabad to Neelam Valley', description: 'Scenic drive to Keran, check in and relax', activities: ['Drive', 'Check in', 'Leisure'] },
      { day: 3, title: 'Upper Neelam Views', description: 'Explore Upper Neelam viewpoints, picnic and photography', activities: ['Viewpoints', 'Picnic', 'Photography'] },
      { day: 4, title: 'Local Culture Day', description: 'Village visits, local crafts, and riverside leisure', activities: ['Village visit', 'Culture', 'Leisure'] },
      { day: 5, title: 'Return to Muzaffarabad', description: 'Morning tea with views, drive back, departure', activities: ['Morning views', 'Drive', 'Departure'] }
    ],

    inclusions: [
      'Accommodation in selected hotels or lodges',
      'Daily breakfast and welcome tea',
      'All ground transportation during the tour',
      'Local guide for key sightseeing',
      'All tolls and permits'
    ],

    exclusions: [
      'Travel insurance',
      'Personal expenses and shopping',
      'Tips for guides and drivers',
      'Meals not listed in inclusions',
      'Any items not mentioned in inclusions'
    ],

    pricing: {
      basic: {
        price: 449,
        title: 'Basic Package',
        features: [
          'Standard hotel stays',
          'Shared transport',
          'Daily breakfast',
          'Local guide support',
          'All tolls and permits'
        ]
      },
      premium: {
        price: 649,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfort hotels with views',
          'Private transport',
          'Breakfast and dinner',
          'Dedicated guide',
          'Flexible sightseeing'
        ]
      },
      ultimate: {
        price: 899,
        title: 'Ultimate Package',
        features: [
          'Premium riverside stays',
          'Private vehicle and driver',
          'All meals included',
          'Personal guide',
          'Flexible itinerary'
        ]
      }
    },

    bestTime: 'April to October for pleasant weather and clear views',

    whatToBring: [
      'Comfortable walking shoes',
      'Light jacket and warm layers',
      'Sunglasses and sunscreen',
      'Personal medications',
      'Camera and power bank'
    ],

    fitnessLevel: 'Easy travel with light walking, suitable for all ages.',

    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80'
    ]
  },

  'arang-kel': {
    id: 'arang-kel',
    category: 'adventure',
    regionId: 'kashmir',
    subregionId: 'arang-kel',
    name: 'Arang Kel Meadows',
    slug: 'arang-kel',
    tagline: 'Hilltop Hamlet Views',
    location: 'Arang Kel, Neelam Valley, Azad Jammu and Kashmir',
    duration: '4 Days',
    difficulty: 'moderate',
    rating: 4.8,
    reviews: 112,
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',

    description: 'A scenic escape to Arang Kel with cable car access and a short trek to lush hilltop meadows. Ideal for hikers and nature lovers.',

    highlights: [
      'Cable car experience to Kel',
      'Short trek to Arang Kel',
      'Alpine meadows and wooden cottages',
      'Peaceful sunrise and sunset views',
      'Local village hospitality',
      'Photography friendly landscapes'
    ],

    itinerary: [
      { day: 1, title: 'Arrival in Neelam Valley', description: 'Drive to Keran, rest and prepare for trek', activities: ['Drive', 'Check in', 'Rest'] },
      { day: 2, title: 'Kel and Arang Kel', description: 'Cable car to Kel, trek to Arang Kel, settle in', activities: ['Cable car', 'Trek', 'Meadow stay'] },
      { day: 3, title: 'Meadow Exploration', description: 'Leisure hikes, viewpoints, and village walk', activities: ['Hiking', 'Viewpoints', 'Village walk'] },
      { day: 4, title: 'Return to Keran', description: 'Trek back, cable car, and drive out', activities: ['Trek back', 'Cable car', 'Drive'] }
    ],

    inclusions: [
      'Accommodation in Keran and Arang Kel',
      'Daily breakfast',
      'Cable car tickets for Kel',
      'Local guide for the trek',
      'All ground transportation'
    ],

    exclusions: [
      'Travel insurance',
      'Personal expenses',
      'Tips for guides and drivers',
      'Meals not listed in inclusions',
      'Any items not mentioned in inclusions'
    ],

    pricing: {
      basic: {
        price: 399,
        title: 'Basic Package',
        features: [
          'Standard guest house',
          'Shared transport',
          'Breakfast included',
          'Local guide'
        ]
      },
      premium: {
        price: 559,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfort stay in Arang Kel',
          'Private transport',
          'Breakfast and dinner',
          'Guide and porter support'
        ]
      },
      ultimate: {
        price: 749,
        title: 'Ultimate Package',
        features: [
          'Best view cottage stay',
          'Private vehicle',
          'All meals included',
          'Personal guide'
        ]
      }
    },

    bestTime: 'May to September for clear weather and meadow blooms',

    whatToBring: [
      'Trekking shoes',
      'Warm layers for evenings',
      'Rain jacket',
      'Water bottle',
      'Camera'
    ],

    fitnessLevel: 'Moderate fitness for short uphill trekking.',

    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80'
    ]
  },

  'ratti-gali': {
    id: 'ratti-gali',
    category: 'trekking',
    regionId: 'kashmir',
    subregionId: 'ratti-gali',
    name: 'Ratti Gali Lake Trek',
    slug: 'ratti-gali',
    tagline: 'Alpine Lake Adventure',
    location: 'Ratti Gali Lake, Azad Jammu and Kashmir',
    duration: '4 Days',
    difficulty: 'moderate',
    rating: 4.9,
    reviews: 98,
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',

    description: 'Trek to the stunning Ratti Gali Lake with alpine meadows, pristine water, and dramatic mountain views.',

    highlights: [
      'Jeep ride to base camp',
      'High altitude lake views',
      'Meadow landscapes and wildflowers',
      'Picnic at the lakeside',
      'Camping under the stars'
    ],

    itinerary: [
      { day: 1, title: 'Drive to Base Camp', description: 'Travel to Dowarian, jeep to base camp, camp setup', activities: ['Drive', 'Jeep ride', 'Camping'] },
      { day: 2, title: 'Trek to Ratti Gali', description: 'Trek to the lake, explore and enjoy views', activities: ['Trekking', 'Lake visit', 'Photography'] },
      { day: 3, title: 'Exploration Day', description: 'Leisure day around the lake and nearby meadows', activities: ['Leisure', 'Hiking', 'Camping'] },
      { day: 4, title: 'Return to Dowarian', description: 'Trek back to base camp, jeep and drive out', activities: ['Trek back', 'Jeep', 'Drive'] }
    ],

    inclusions: [
      'Camping accommodation and basic gear',
      'Daily meals during the trek',
      'Jeep transport to base camp',
      'Local guide and support staff',
      'All permits and fees'
    ],

    exclusions: [
      'Travel insurance',
      'Personal trekking gear',
      'Tips for guide and staff',
      'Snacks and personal items',
      'Any items not mentioned in inclusions'
    ],

    pricing: {
      basic: {
        price: 499,
        title: 'Basic Package',
        features: [
          'Shared tents and camping gear',
          'Shared transport',
          'Basic meals',
          'Group guide'
        ]
      },
      premium: {
        price: 699,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfort camping setup',
          'Private transport',
          'Enhanced meals',
          'Dedicated guide'
        ]
      },
      ultimate: {
        price: 899,
        title: 'Ultimate Package',
        features: [
          'Premium camping',
          'Private vehicle and jeep',
          'All meals included',
          'Personal guide'
        ]
      }
    },

    bestTime: 'June to September for clear trails and lake views',

    whatToBring: [
      'Trekking shoes',
      'Warm jacket and gloves',
      'Water bottle',
      'Sun protection',
      'Power bank'
    ],

    fitnessLevel: 'Moderate fitness required for uphill trekking at altitude.',

    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80'
    ]
  },

  'taobat': {
    id: 'taobat',
    category: 'adventure',
    regionId: 'kashmir',
    subregionId: 'taobat',
    name: 'Taobat Valley Retreat',
    slug: 'taobat',
    tagline: 'Peaceful Last Village',
    location: 'Taobat, Neelam Valley, Azad Jammu and Kashmir',
    duration: '5 Days',
    difficulty: 'easy',
    rating: 4.7,
    reviews: 74,
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',

    description: 'Travel to Taobat, the last village of Neelam Valley, with pristine river views, quiet forests, and serene stays.',

    highlights: [
      'Scenic Neelam River views',
      'Quiet village atmosphere',
      'Forest walks and viewpoints',
      'Local cuisine and hospitality',
      'Photography friendly landscapes'
    ],

    itinerary: [
      { day: 1, title: 'Arrival in Neelam Valley', description: 'Drive to Keran, check in and rest', activities: ['Drive', 'Check in', 'Rest'] },
      { day: 2, title: 'Travel to Taobat', description: 'Scenic drive along the river to Taobat', activities: ['Drive', 'River views', 'Arrival'] },
      { day: 3, title: 'Taobat Exploration', description: 'Village walks and viewpoint photography', activities: ['Village walk', 'Viewpoints', 'Photography'] },
      { day: 4, title: 'Leisure Day', description: 'Relax by the river and enjoy local culture', activities: ['Leisure', 'Culture', 'Relax'] },
      { day: 5, title: 'Return to Muzaffarabad', description: 'Drive back, departure', activities: ['Drive', 'Departure'] }
    ],

    inclusions: [
      'Accommodation in valley lodges',
      'Daily breakfast and tea',
      'All ground transportation',
      'Local guide for key stops',
      'All tolls and permits'
    ],

    exclusions: [
      'Travel insurance',
      'Personal expenses',
      'Tips for guides and drivers',
      'Meals not listed in inclusions',
      'Any items not mentioned in inclusions'
    ],

    pricing: {
      basic: {
        price: 479,
        title: 'Basic Package',
        features: [
          'Standard guest house',
          'Shared transport',
          'Breakfast included',
          'Local guide support'
        ]
      },
      premium: {
        price: 679,
        title: 'Premium Package',
        popular: true,
        features: [
          'Comfort stay with views',
          'Private transport',
          'Breakfast and dinner',
          'Flexible sightseeing'
        ]
      },
      ultimate: {
        price: 899,
        title: 'Ultimate Package',
        features: [
          'Premium lodging',
          'Private vehicle and driver',
          'All meals included',
          'Personal guide'
        ]
      }
    },

    bestTime: 'May to October for pleasant weather and clear views',

    whatToBring: [
      'Comfortable shoes',
      'Light jacket and warm layers',
      'Sunglasses and sunscreen',
      'Camera'
    ],

    fitnessLevel: 'Easy travel with light walking, suitable for all ages.',

    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80'
    ]
  },

  'tolipeer-top': {
    id: 'tolipeer-top',
    category: 'adventure',
    regionId: 'kashmir',
    subregionId: 'tolipeer',
    name: 'Tolipeer Top Viewpoint',
    slug: 'tolipeer-top',
    tagline: 'Panoramic Ridge Views',
    location: 'Tolipeer Top, Azad Jammu and Kashmir',
    duration: '3 Days',
    difficulty: 'easy',
    rating: 4.7,
    reviews: 65,
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80',

    description: 'A short getaway to Tolipeer Top with sweeping ridge views, fresh air, and beautiful sunsets.',

    highlights: [
      'Sunrise and sunset viewpoints',
      'Short nature walks',
      'Ideal for weekend trips',
      'Family friendly travel'
    ],

    itinerary: [
      { day: 1, title: 'Arrival in Rawalakot', description: 'Drive to Rawalakot, local market visit', activities: ['Drive', 'Market', 'Rest'] },
      { day: 2, title: 'Tolipeer Top', description: 'Drive to Tolipeer Top, explore viewpoints', activities: ['Drive', 'Viewpoints', 'Photography'] },
      { day: 3, title: 'Return', description: 'Morning tea with views, return to city', activities: ['Views', 'Drive', 'Departure'] }
    ],

    inclusions: [
      'Accommodation in Rawalakot',
      'Daily breakfast',
      'All ground transportation',
      'Local guide for viewpoints',
      'All tolls and permits'
    ],

    exclusions: [
      'Travel insurance',
      'Personal expenses',
      'Tips for guides and drivers',
      'Meals not listed in inclusions',
      'Any items not mentioned in inclusions'
    ],

    pricing: {
      basic: {
        price: 249,
        title: 'Basic Package',
        features: ['Standard hotel stay', 'Shared transport', 'Breakfast included']
      },
      premium: {
        price: 349,
        title: 'Premium Package',
        popular: true,
        features: ['Comfort hotel', 'Private transport', 'Breakfast and dinner']
      },
      ultimate: {
        price: 449,
        title: 'Ultimate Package',
        features: ['Premium stay', 'Private vehicle', 'All meals included']
      }
    },

    bestTime: 'April to October for clear skies and pleasant weather',

    whatToBring: ['Light jacket', 'Comfortable shoes', 'Sunglasses', 'Camera'],

    fitnessLevel: 'Easy travel with light walking, suitable for all ages.',

    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80'
    ]
  },

  'ganga-choti': {
    id: 'ganga-choti',
    category: 'trekking',
    regionId: 'kashmir',
    subregionId: 'ganga-choti',
    name: 'Ganga Choti Hike',
    slug: 'ganga-choti',
    tagline: 'Cloud Level Views',
    location: 'Ganga Choti, Azad Jammu and Kashmir',
    duration: '3 Days',
    difficulty: 'moderate',
    rating: 4.8,
    reviews: 58,
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',

    description: 'A rewarding hike to Ganga Choti with dramatic ridge views, cool breezes, and a peaceful summit experience.',

    highlights: [
      'Scenic summit trek',
      'Wide valley views',
      'Cool summer weather',
      'Photography and stargazing'
    ],

    itinerary: [
      { day: 1, title: 'Arrival in Bagh', description: 'Drive to Bagh, local orientation', activities: ['Drive', 'Orientation', 'Rest'] },
      { day: 2, title: 'Ganga Choti Trek', description: 'Trek to summit, picnic and views, return', activities: ['Trek', 'Summit', 'Photography'] },
      { day: 3, title: 'Return', description: 'Leisure morning and drive back', activities: ['Leisure', 'Drive', 'Departure'] }
    ],

    inclusions: [
      'Accommodation in Bagh',
      'Daily breakfast',
      'Local guide for the hike',
      'All ground transportation',
      'All permits and fees'
    ],

    exclusions: [
      'Travel insurance',
      'Personal trekking gear',
      'Tips for guides and drivers',
      'Meals not listed in inclusions',
      'Any items not mentioned in inclusions'
    ],

    pricing: {
      basic: {
        price: 269,
        title: 'Basic Package',
        features: ['Standard stay', 'Shared transport', 'Breakfast included']
      },
      premium: {
        price: 369,
        title: 'Premium Package',
        popular: true,
        features: ['Comfort stay', 'Private transport', 'Breakfast and dinner']
      },
      ultimate: {
        price: 469,
        title: 'Ultimate Package',
        features: ['Premium stay', 'Private vehicle', 'All meals included']
      }
    },

    bestTime: 'May to September for stable weather and clear views',

    whatToBring: ['Trekking shoes', 'Warm layers', 'Water bottle', 'Headlamp'],

    fitnessLevel: 'Moderate fitness for a steady uphill hike.',

    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80'
    ]
  }
};

// Helper function to get destination by slug
export const getDestinationBySlug = (slug) => {
  return destinationsData[slug] || null;
};

// Helper function to get all destinations by category
export const getDestinationsByCategory = (category) => {
  return Object.values(destinationsData).filter(dest => dest.category === category);
};

// Helper function to get all destinations
export const getAllDestinations = () => {
  return Object.values(destinationsData);
};
