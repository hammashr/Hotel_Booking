const express = require('express');

const {
  checkAvailability,
  createBookingRequest,
  getBookingByBookingId,
  pricePreview,
} = require('../controllers/bookingController');
const validateRequest = require('../middleware/validateRequest');
const { lookupLimiter } = require('../middleware/rateLimiters');
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
// lookupLimiter applied here as a second layer specifically to prevent token brute-force
router.get('/:bookingId', lookupLimiter, validateRequest(bookingIdParamsSchema), getBookingByBookingId);

module.exports = router;
