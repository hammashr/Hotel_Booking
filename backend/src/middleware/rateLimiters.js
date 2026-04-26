const rateLimit = require('express-rate-limit');

// ── General API limiter ───────────────────────────────────────────────────────
// Catch-all backstop for all /api/* routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// ── Contact form ──────────────────────────────────────────────────────────────
// Prevents contact-form spam and email relay abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many contact requests. Please try again later.' },
});

// ── Booking creation ──────────────────────────────────────────────────────────
// Prevents booking spam / availability probing
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many booking requests. Please try again later.' },
});

// ── Booking lookup ────────────────────────────────────────────────────────────
// Prevents brute-force enumeration of bookingId + lookupToken pairs
const lookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many lookup requests. Please try again later.' },
});

// ── Availability check ────────────────────────────────────────────────────────
const availabilityLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many availability requests. Please try again later.' },
});

// Legacy exports kept so existing app.js imports don't break
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many auth attempts. Please try again later.' },
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many payment requests. Please try again later.' },
});

module.exports = {
  generalLimiter,
  contactLimiter,
  bookingLimiter,
  lookupLimiter,
  availabilityLimiter,
  authLimiter,
  paymentLimiter,
};
