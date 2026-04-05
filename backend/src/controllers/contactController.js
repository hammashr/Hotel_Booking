const { sendContactEmail } = require('../services/emailService');
const { logger } = require('../utils/logger');

/**
 * POST /api/contact
 * Handles contact form submissions and sends email to hello@thetinyescape.com
 */
const submitContact = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      countryCode,
      numberOfTravelers,
      travelType,
      stayInterest,
      preferredMonth,
      message,
    } = req.body;

    // Basic validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    await sendContactEmail({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone,
      countryCode,
      numberOfTravelers,
      travelType,
      stayInterest,
      preferredMonth,
      message,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    logger.error(`Contact form error: ${error.message}`);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};

module.exports = { submitContact };
