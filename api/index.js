/**
 * Vercel Serverless Entry Point — Express Backend
 *
 * This file wraps the Express app as a Vercel serverless function.
 * All /api/* requests (except /api/contact which has its own handler)
 * are routed here via vercel.json rewrites.
 *
 * Required Vercel Environment Variables:
 *   - MONGO_URI
 *   - NODE_ENV=production
 *   - CORS_ORIGINS (include your Vercel URL, e.g. https://hotel-booking.vercel.app)
 *   - EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO (optional)
 *   - SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID (optional)
 */

import { createRequire } from 'module';

// Backend uses CommonJS — use createRequire to bridge ESM → CJS
const require = createRequire(import.meta.url);

const connectDB = require('../backend/src/config/database');
const { env } = require('../backend/src/config/env');
const app = require('../backend/src/app');

// Cache DB connection across warm serverless invocations
let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB(env.MONGO_URI);
      isConnected = true;
    } catch (error) {
      console.error('[Vercel] Database connection failed:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Database connection failed. Please try again shortly.',
      });
    }
  }

  // Delegate request to Express app
  return app(req, res);
}
