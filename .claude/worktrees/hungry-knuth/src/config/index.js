/**
 * Application Configuration
 * Central place for all environment variables and app settings
 * 
 * To use different environments:
 * 1. Create .env.development, .env.production files
 * 2. Set VITE_API_URL, VITE_SITE_URL, etc.
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000, // 10 seconds
  },

  // Site Configuration
  site: {
    name: 'The Tiny Escape',
    url: import.meta.env.VITE_SITE_URL || 'https://tinyescape.vercel.app',
    tagline: 'Find your next stay',
    email: 'hello@tinyescape.com',
    phone: '+1 (512) 555-0189',
    whatsapp: '+15125550189',
  },

  // Social Media Links
  social: {
    facebook: 'https://facebook.com/paktourzone',
    instagram: 'https://instagram.com/paktourzone',
    twitter: 'https://twitter.com/paktourzone',
    youtube: 'https://youtube.com/@paktourzone',
  },

  // SEO Defaults
  seo: {
    defaultTitle: 'The Tiny Escape',
    defaultDescription: 'Find your ideal stay with curated tiny homes, real photos, and transparent pricing for quick, confident bookings.',
    defaultKeywords: 'The Tiny Escape, tiny homes, boutique stays, cabin rentals, weekend getaways',
    defaultImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80&v=2',
  },

  // Feature Flags (for gradual rollout of new features)
  features: {
    enableOnlineBooking: import.meta.env.VITE_ENABLE_BOOKING === 'true' || false,
    enablePayments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true' || false,
    enableReviews: true,
    enableChat: false,
  },

  // Google Analytics / Tracking
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
    googleTagManagerId: import.meta.env.VITE_GTM_ID || '',
    facebookPixelId: import.meta.env.VITE_FB_PIXEL_ID || '',
  },

  // Map Configuration
  maps: {
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY || '',
    defaultCenter: { lat: 35.8819, lng: 74.5246 }, // Gilgit
    defaultZoom: 8,
  },

  // Pricing & Currency
  pricing: {
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
  },

  // Image CDN (for future optimization)
  cdn: {
    baseUrl: import.meta.env.VITE_CDN_URL || '',
  },
};

export default config;
