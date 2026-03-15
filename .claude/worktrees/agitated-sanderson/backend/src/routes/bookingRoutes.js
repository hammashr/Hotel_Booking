const express = require('express');

const {
  checkAvailability,
  createBookingRequest,
  getBookingByBookingId,
  pricePreview,
} = require('../controllers/bookingController');
const validateRequest = require('../middleware/validateRequest');
const {
  bookingIdParamsSchema,
  checkAvailabilitySchema,
  pricePreviewSchema,
  createBookingSchema,
} = require('../utils/validationSchemas');

const router = express.Router();

router.post('/check-availability', validateRequest(checkAvailabilitySchema), checkAvailability);
router.post('/price-preview', validateRequest(pricePreviewSchema), pricePreview);
router.post('/', validateRequest(createBookingSchema), createBookingRequest);
router.get('/:bookingId', validateRequest(bookingIdParamsSchema), getBookingByBookingId);

module.exports = router;
