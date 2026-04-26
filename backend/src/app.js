const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const { env } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const {
  authLimiter,
  paymentLimiter,
  generalLimiter,
  contactLimiter,
  bookingLimiter,
  lookupLimiter,
  availabilityLimiter,
} = require('./middleware/rateLimiters');
const apiRoutes = require('./routes');
const ApiError = require('./utils/ApiError');

const app = express();

app.set('trust proxy', 1);

// Strip localhost origins from CORS allowlist in production to avoid
// local development environments being treated as trusted origins on the live site
const rawOrigins = env.CORS_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins =
  env.NODE_ENV === 'production'
    ? rawOrigins.filter((o) => !o.includes('localhost') && !o.includes('127.0.0.1'))
    : rawOrigins;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new ApiError(403, `CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// General backstop limiter for all API traffic
app.use('/api', generalLimiter);

// Legacy limiters kept in case auth/payment routes are added later
app.use('/api/auth', authLimiter);
app.use('/api/payments', paymentLimiter);

// Targeted limiters on the routes that actually exist
app.use('/api/contact', contactLimiter);
app.use('/api/bookings/check-availability', availabilityLimiter);
app.use('/api/bookings/price-preview', availabilityLimiter);
app.use('/api/bookings', bookingLimiter); // covers POST create + GET lookup

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
