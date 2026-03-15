const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { BookingRequest, House, Package } = require('../models');
const { formatDateYMD } = require('../utils/bookingHelpers');

const listHouses = asyncHandler(async (_req, res) => {
  const houses = await House.find({ isActive: true })
    .sort({ sortOrder: 1, createdAt: 1 })
    .select('-__v')
    .lean();

  res.status(200).json({
    success: true,
    count: houses.length,
    data: houses,
  });
});

const getHouseDetails = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const house = await House.findOne({ slug, isActive: true }).select('-__v').lean();

  if (!house) {
    throw new ApiError(404, `House not found for slug: ${slug}`);
  }

  res.status(200).json({
    success: true,
    data: house,
  });
});

const getHousePackages = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const house = await House.findOne({ slug, isActive: true }).select('_id name slug').lean();

  if (!house) {
    throw new ApiError(404, `House not found for slug: ${slug}`);
  }

  const packages = await Package.find({ houseId: house._id, code: 'standard' })
    .sort({ pricePerNight: 1, createdAt: 1 })
    .select('-__v')
    .lean();

  res.status(200).json({
    success: true,
    house,
    count: packages.length,
    data: packages,
  });
});

const getUnavailableDates = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const house = await House.findOne({ slug, isActive: true }).select('_id slug').lean();

  if (!house) {
    throw new ApiError(404, `House not found for slug: ${slug}`);
  }

  const bookings = await BookingRequest.find({
    houseId: house._id,
    status: { $in: ['pending', 'confirmed'] },
  })
    .sort({ 'stay.checkIn': 1 })
    .select('stay.checkIn stay.checkOut')
    .lean();

  const blockedRanges = bookings.map((booking) => ({
    from: formatDateYMD(booking.stay.checkIn),
    to: formatDateYMD(booking.stay.checkOut),
  }));

  res.status(200).json({
    success: true,
    houseSlug: house.slug,
    blockedRanges,
  });
});

module.exports = {
  listHouses,
  getHouseDetails,
  getHousePackages,
  getUnavailableDates,
};
