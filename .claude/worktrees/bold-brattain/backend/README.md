# HOTEL-SAMPLE Backend (Phase 1)

Production-ready backend foundation for Tiny Escape built with Express + MongoDB (Mongoose).

## Features

- Express API with security middleware (`helmet`, `cors`, rate limiting)
- Request logging with `morgan`
- Response compression with `compression`
- MongoDB Atlas connection via Mongoose
- Centralized error handling
- Health check route: `GET /api/health`
- Environment validation with `zod`

## Project Structure

backend/
  src/
    config/
    models/
    routes/
    controllers/
    middleware/
    utils/
  package.json
  .env.example
  server.js

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```

3. Update `.env` with your MongoDB Atlas `MONGO_URI`.

4. Run in development:
   ```bash
   npm run dev
   ```

5. Verify health endpoint:
   - `GET http://localhost:5000/api/health`

## Environment Variables

- `NODE_ENV` - `development | production | test`
- `PORT` - API port (default `5000`)
- `MONGO_URI` - MongoDB Atlas connection string
- `CORS_ORIGINS` - Comma-separated allowed origins (Phase 6 default: `http://localhost:5173,http://localhost:3000,https://tinyescape.vercel.app`)
- `SQUARE_ACCESS_TOKEN` - Placeholder for future Square integration
- `SQUARE_LOCATION_ID` - Placeholder for future Square integration
- `SQUARE_WEBHOOK_SIGNATURE_KEY` - Placeholder for future Square webhook verification

## Security + Deployment Notes (Phase 6)

- Keep all secrets in backend `.env` only.
- Do not expose payment or private API credentials in frontend env files.
- Restrict CORS to approved frontend origins via `CORS_ORIGINS`.
