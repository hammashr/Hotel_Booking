const crypto = require('crypto');
const { BookingRequest } = require('../models');

const getDateOnly = (value) => {
  const date = new Date(value);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

const calculateNights = (checkIn, checkOut) => {
  const normalizedCheckIn = getDateOnly(checkIn);
  const normalizedCheckOut = getDateOnly(checkOut);
  const diffMs = normalizedCheckOut.getTime() - normalizedCheckIn.getTime();
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return nights;
};

const formatDateYMD = (dateValue) => {
  const date = getDateOnly(dateValue);
  return date.toISOString().slice(0, 10);
};

const hasOverlapBooking = async ({ houseId, checkIn, checkOut, excludeBookingId = null }) => {
  const overlapQuery = {
    houseId,
    status: { $in: ['pending', 'confirmed'] },
    'stay.checkIn': { $lt: checkOut },
    'stay.checkOut': { $gt: checkIn },
  };

  if (excludeBookingId) {
    overlapQuery._id = { $ne: excludeBookingId };
  }

  const existing = await BookingRequest.findOne(overlapQuery).select('bookingId status stay').lean();

  return existing;
};

const generateBookingId = async () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const randomPart = crypto.randomInt(100000, 999999);
    const bookingId = `BK-${datePart}-${randomPart}`;
    const alreadyUsed = await BookingRequest.exists({ bookingId });

    if (!alreadyUsed) {
      return bookingId;
    }
  }

  throw new Error('Failed to generate unique bookingId');
};

const formatBookingSummary = (booking) => ({
  bookingId: booking.bookingId,
  status: booking.status,
  paymentStatus: booking.paymentStatus,
  house: {
    id: booking.houseId?._id || booking.houseId,
    name: booking.houseId?.name,
    slug: booking.houseId?.slug,
  },
  package: {
    id: booking.packageId?._id || booking.packageId,
    name: booking.packageId?.name,
    code: booking.packageId?.code,
    pricePerNight: booking.packageId?.pricePerNight,
    minNights: booking.packageId?.minNights,
  },
  guest: booking.guest,
  stay: booking.stay,
  preferences: booking.preferences,
  pricing: booking.pricing,
  square: booking.square,
  createdAt: booking.createdAt,
  updatedAt: booking.updatedAt,
});

module.exports = {
  calculateNights,
  formatDateYMD,
  hasOverlapBooking,
  generateBookingId,
  formatBookingSummary,
};
