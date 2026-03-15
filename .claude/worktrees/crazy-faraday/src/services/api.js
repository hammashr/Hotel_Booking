/**
 * API Service Layer
 * Central place for all API calls - ready for backend integration
 *
 * Uses apiClient so base URL comes from VITE_API_BASE_URL.
 */
import { apiClient } from './apiClient';

// Generic API request handler
export const apiRequest = async (endpoint, options = {}) => {
  try {
    return await apiClient(endpoint, options);
  } catch (error) {
    const message = error?.message || 'Request failed. Please try again.';
    console.error('API Request Failed:', message);
    throw new Error(message);
  }
};

// Tours API
export const toursAPI = {
  // Get all tours
  getAll: async () => {
    // TODO: Replace with actual API call
    // return apiRequest('/tours', { method: 'GET' });
    const { toursData } = await import('../data/toursData');
    return Promise.resolve(toursData);
  },

  // Get single tour by ID
  getById: async (id) => {
    // TODO: Replace with actual API call
    // return apiRequest(`/tours/${id}`);
    const { toursData } = await import('../data/toursData');
    return Promise.resolve(toursData.find(tour => tour.id === id));
  },

  // Get tours by category
  getByCategory: async (category) => {
    // TODO: Replace with actual API call
    // return apiRequest(`/tours/category/${category}`);
    const { toursData } = await import('../data/toursData');
    return Promise.resolve(toursData.filter(tour => tour.category === category));
  },
};

// Stays API
export const staysAPI = {
  // Get all stays
  getAll: async () => {
    // TODO: Replace with actual API call
    const { staysData } = await import('../data/staysData');
    return Promise.resolve(staysData);
  },

  // Get single stay by slug
  getBySlug: async (slug) => {
    // TODO: Replace with actual API call
    const { staysData } = await import('../data/staysData');
    return Promise.resolve(staysData.find(stay => stay.slug === slug));
  },
};

// Houses API (backend-integrated)
export const housesAPI = {
  getAll: async () => apiRequest('/houses', { method: 'GET' }),

  getBySlug: async (slug) => apiRequest(`/houses/${slug}`, { method: 'GET' }),

  getPackagesBySlug: async (slug) => apiRequest(`/houses/${slug}/packages`, { method: 'GET' }),

  getUnavailableDates: async (slug) => apiRequest(`/houses/${slug}/unavailable-dates`, { method: 'GET' }),
};

// Gallery API
export const galleryAPI = {
  // Get all photos
  getAll: async () => {
    // TODO: Replace with actual API call
    const { galleryData } = await import('../data/galleryData');
    return Promise.resolve(galleryData);
  },
};

// Reviews API
export const reviewsAPI = {
  // Get all reviews
  getAll: async () => {
    // TODO: Replace with actual API call
    // return apiRequest('/reviews');
    return Promise.resolve([]);
  },

  // Submit new review
  submit: async (reviewData) => {
    // TODO: Replace with actual API call
    // return apiRequest('/reviews', { method: 'POST', body: JSON.stringify(reviewData) });
    console.log('Review submitted:', reviewData);
    return Promise.resolve({ success: true });
  },
};

// Bookings API
export const bookingsAPI = {
  checkAvailability: async (payload) =>
    apiRequest('/bookings/check-availability', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Create new booking
  create: async (bookingData) => {
    return apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Get booking by ID
  getById: async (bookingId) => apiRequest(`/bookings/${bookingId}`, { method: 'GET' }),
};

// Contact API
export const contactAPI = {
  // Send contact form
  sendMessage: async (contactData) => {
    // TODO: Replace with actual API call
    // return apiRequest('/contact', { method: 'POST', body: JSON.stringify(contactData) });
    console.log('Contact message sent:', contactData);
    return Promise.resolve({ 
      success: true, 
      message: 'Thank you! We will get back to you soon.' 
    });
  },
};

export default {
  tours: toursAPI,
  stays: staysAPI,
  houses: housesAPI,
  gallery: galleryAPI,
  reviews: reviewsAPI,
  bookings: bookingsAPI,
  contact: contactAPI,
};
