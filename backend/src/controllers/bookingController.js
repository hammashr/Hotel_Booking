const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { BookingRequest, House, Package } = require('../models');
const {
  calculateNights,
  formatBookingSummary,
  generateBookingId,
  hasOverlapBooking,
} = require('../utils/bookingHelpers');

const ADD_ON_PRICE_MAP = {
  'horse-riding': 150, // flat fee for two guests (per request)
  atv: 50,
};

const STATE_TAX_RATE = 0.06;
const FIXED_CLEANING_FEE = 50;
const CANCELLATION_POLICY =
  '100% refund up to 30 days before arrival, 50% refund up to 14 days before arrival.';

const resolveHouse = async ({ houseId, slug }) => {
  if (houseId) {
    return House.findOne({ _id: houseId, isActive: true }).lean();
  }

  return House.findOne({ slug, isActive: true }).lean();
};

const resolvePackage = async ({ packageId, packageCode, houseId }) => {
  if (packageId) {
    return Package.findOne({ _id: packageId, houseId }).lean();
  }

  const safePackageCode = packageCode === 'standard' ? packageCode : 'standard';
  return Package.findOne({ houseId, code: safePackageCode }).lean();
};

const checkAvailability = asyncHandler(async (req, res) => {
  const { houseId, houseSlug, slug, checkIn, checkOut, packageCode } = req.body;

  if (packageCode && packageCode !== 'standard') {
    throw new ApiError(400, 'Only standard package is currently available');
  }

  const normalizedSlug = houseSlug || slug;
  const house = await resolveHouse({ houseId, slug: normalizedSlug });

  if (!house) {
    throw new ApiError(404, 'House not found or inactive');
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = calculateNights(checkInDate, checkOutDate);

  if (nights <= 0) {
    return res.status(200).json({
      success: true,
      available: false,
      reason: 'checkOut must be after checkIn',
      nights,
    });
  }

  if (packageCode) {
    const selectedPackage = await resolvePackage({
      packageCode,
      houseId: house._id,
    });

    if (!selectedPackage) {
      throw new ApiError(404, 'Package not found for the selected house');
    }

    if (nights < selectedPackage.minNights) {
      return res.status(200).json({
        success: true,
        available: false,
        reason: `Minimum ${selectedPackage.minNights} night(s) required for ${selectedPackage.name}`,
        nights,
      });
    }
  }

  const overlappingBooking = await hasOverlapBooking({
    houseId: house._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
  });

  if (overlappingBooking) {
    return res.status(200).json({
      success: true,
      available: false,
      reason: 'These dates are already booked. Please choose different dates.',
      nights,
    });
  }

  return res.status(200).json({
    success: true,
    available: true,
    reason: null,
    nights,
  });
});

const computePricingForStay = ({ house, checkInDate, checkOutDate, addOns = [] }) => {
  // Determine per-night price depending on house slug/category and weekday vs weekend
  const nights = calculateNights(checkInDate, checkOutDate);

  const isWeekendNightUtc = (date) => {
    const dow = date.getUTCDay(); // 0 Sun .. 6 Sat
    return dow === 5 || dow === 6; // Fri(5) or Sat(6) treated as weekend nights
  };

  // Default rates (fallback to package pricePerNight when available)
  const appleWeekday = 205;
  const appleWeekend = 255;
  const aFrameWeekday = 215;
  const aFrameWeekend = 285;

  let subtotal = 0;
  let weekdayNights = 0;
  let weekendNights = 0;
  let category = 'default';

  const cursor = new Date(Date.UTC(
    checkInDate.getUTCFullYear(),
    checkInDate.getUTCMonth(),
    checkInDate.getUTCDate()
  ));

  for (let i = 0; i < nights; i += 1) {
    const weekend = isWeekendNightUtc(cursor);

    if (house.slug && house.slug.startsWith('apple-')) {
      category = 'apple';
      subtotal += weekend ? appleWeekend : appleWeekday;
    } else if (house.slug && house.slug.startsWith('triangle-')) {
      category = 'a-frame';
      subtotal += weekend ? aFrameWeekend : aFrameWeekday;
    } else {
      // fallback: use first package pricePerNight if present on house.packages
      // house.packages might not be present on lean house; fallback to 0
      const base = (house.packages && house.packages.standard && house.packages.standard.pricePerNight) || 0;
      subtotal += base;
    }

    if (weekend) {
      weekendNights += 1;
    } else {
      weekdayNights += 1;
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  const normalizedAddOns = Array.isArray(addOns) ? addOns.filter((item) => Object.prototype.hasOwnProperty.call(ADD_ON_PRICE_MAP, item)) : [];
  const addOnsFee = normalizedAddOns.reduce((sum, item) => sum + (ADD_ON_PRICE_MAP[item] || 0), 0);
  const cleaningFee = FIXED_CLEANING_FEE;
  const tax = Number(((subtotal + addOnsFee + cleaningFee) * STATE_TAX_RATE).toFixed(2));
  const total = Number((subtotal + addOnsFee + cleaningFee + tax).toFixed(2));

  return {
    nights,
    subtotal: Number(subtotal.toFixed(2)),
    addOnsFee: Number(addOnsFee.toFixed(2)),
    cleaningFee: Number(cleaningFee.toFixed(2)),
    tax,
    taxRate: STATE_TAX_RATE,
    total,
    category,
    weekdayNights,
    weekendNights,
    rateCard: {
      apple: { weekday: appleWeekday, weekend: appleWeekend },
      aFrame: { weekday: aFrameWeekday, weekend: aFrameWeekend },
    },
  };
};

const pricePreview = asyncHandler(async (req, res) => {
  const { houseId, houseSlug, checkIn, checkOut, addOns = [] } = req.body;

  const normalizedSlug = houseSlug || req.body.slug;
  const house = await resolveHouse({ houseId, slug: normalizedSlug });

  if (!house) {
    throw new ApiError(404, 'House not found or inactive');
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = calculateNights(checkInDate, checkOutDate);

  if (nights <= 0) {
    return res.status(200).json({ success: true, nights, available: false, reason: 'checkOut must be after checkIn' });
  }

  const pricing = computePricingForStay({ house, checkInDate, checkOutDate, addOns });

  return res.status(200).json({ success: true, pricing });
});

const createBookingRequest = asyncHandler(async (req, res) => {
  const {
    houseId,
    houseSlug,
    packageId,
    packageCode,
    guest,
    stay,
    preferences = {},
    pricing,
  } = req.body;

  if (packageCode && packageCode !== 'standard') {
    throw new ApiError(400, 'Only standard package is currently available');
  }

  const house = await resolveHouse({ houseId, slug: houseSlug });

  if (!house) {
    throw new ApiError(404, 'House not found or inactive');
  }

  const selectedPackage = await resolvePackage({
    packageId,
    packageCode,
    houseId: house._id,
  });

  if (!selectedPackage) {
    throw new ApiError(404, 'Package not found for the selected house');
  }

  const checkInDate = new Date(stay.checkIn);
  const checkOutDate = new Date(stay.checkOut);
  const nights = calculateNights(checkInDate, checkOutDate);

  if (nights < selectedPackage.minNights) {
    throw new ApiError(400, `Minimum ${selectedPackage.minNights} night(s) required for ${selectedPackage.name}`);
  }

  const overlappingBooking = await hasOverlapBooking({
    houseId: house._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
  });

  if (overlappingBooking) {
    throw new ApiError(409, 'Selected dates are not available due to overlapping booking');
  }

  const bookingId = await generateBookingId();

  const normalizedAddOns = Array.isArray(preferences.addOns)
    ? preferences.addOns.filter((item) => Object.prototype.hasOwnProperty.call(ADD_ON_PRICE_MAP, item))
    : [];

  // Use computePricingForStay to derive official pricing (handles weekday/weekend rates)
  const pricingCalc = computePricingForStay({
    house,
    checkInDate,
    checkOutDate,
    addOns: normalizedAddOns,
  });

  const computedSubtotal = pricingCalc.subtotal;
  const computedAddOnsFee = pricingCalc.addOnsFee;
  const normalizedCleaningFee = pricingCalc.cleaningFee;
  const computedTax = pricingCalc.tax;
  const computedTotal = pricingCalc.total;

  const booking = await BookingRequest.create({
    bookingId,
    houseId: house._id,
    packageId: selectedPackage._id,
    guest,
    stay: {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: stay.guests,
      nights,
    },
    preferences: {
      unitType: preferences.unitType || '',
      viewType: preferences.viewType || '',
      addOns: normalizedAddOns,
      notes: preferences.notes || '',
    },
    pricing: {
      subtotal: computedSubtotal,
      addOnsFee: computedAddOnsFee,
      cleaningFee: normalizedCleaningFee,
      tax: computedTax,
      taxRate: STATE_TAX_RATE,
      cancellationPolicy: CANCELLATION_POLICY,
      total: computedTotal,
    },
    status: 'pending',
    paymentStatus: 'none',
    square: {
      paymentId: null,
      checkoutUrl: null,
    },
  });

  const populated = await BookingRequest.findById(booking._id)
    .populate('houseId', 'name slug')
    .populate('packageId', 'name code pricePerNight minNights')
    .lean();

  res.status(201).json({
    success: true,
    message: 'Booking request created successfully',
    bookingId,
    summary: formatBookingSummary(populated),
  });
});

const getBookingByBookingId = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await BookingRequest.findOne({ bookingId: bookingId.toUpperCase() })
    .populate('houseId', 'name slug')
    .populate('packageId', 'name code pricePerNight minNights')
    .lean();

  if (!booking) {
    throw new ApiError(404, `Booking not found for ID: ${bookingId}`);
  }

  res.status(200).json({
    success: true,
    summary: formatBookingSummary(booking),
  });
});

module.exports = {
  checkAvailability,
  createBookingRequest,
  getBookingByBookingId,
  pricePreview,
};
