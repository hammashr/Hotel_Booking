import { apiClient } from './apiClient';

export const checkBookingAvailability = async (payload) =>
  apiClient('/bookings/check-availability', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const createBookingRequest = async (payload) =>
  apiClient('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// lookupToken is required by the API — pass the token received at booking creation
export const getBookingById = async (bookingId, lookupToken) => {
  if (!lookupToken) throw new Error('A lookup token is required to retrieve booking details.');
  return apiClient(`/bookings/${encodeURIComponent(bookingId)}?token=${encodeURIComponent(lookupToken)}`);
};

export const pricePreview = async (payload) =>
  apiClient('/bookings/price-preview', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export default {
  checkBookingAvailability,
  createBookingRequest,
  getBookingById,
};
