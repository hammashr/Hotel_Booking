const express = require('express');
const bookingRoutes = require('./bookingRoutes');
const contactRoutes = require('./contactRoutes');
const healthRoutes = require('./healthRoutes');
const houseRoutes = require('./houseRoutes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/houses', houseRoutes);
router.use('/bookings', bookingRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
