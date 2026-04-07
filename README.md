# The Tiny Escape 🌿

> A full-stack tourism & glamping booking platform — live at [thetinyescape.com](https://www.thetinyescape.com)

![Status](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)

## 🌐 Live Site

🔗 **[https://www.thetinyescape.com](https://www.thetinyescape.com)**
📅 **Booking:** [book.thetinyescape.com](https://book.thetinyescape.com)

---

## 📖 About

**The Tiny Escape** is a luxury glamping & outdoor retreat experience based in **Central Texas**. This repository contains the full-stack web platform — a production-grade application handling everything from property listings and availability calendars to contact forms and booking management.

The platform features a modern React frontend with an Express.js + MongoDB backend, deployed on Vercel (frontend) and a Hostinger VPS (backend API).

---

## ✨ Features

- **Multi-property Stays** — Showcase glamping cabins with availability calendars
- **Online Booking** — Integrated Hostfully booking widget with live availability
- **Experiences** — Horse riding, hiking, campfires and more
- **Creekside Cafe & Fireside Pavilion** — Dedicated venue pages
- **Live Chat Widget** — Real-time visitor support
- **Gallery** — Full photo gallery of the property
- **Contact Form** — Serverless form via Vercel + Nodemailer (Office 365)
- **SEO Optimized** — Schema.org structured data, react-helmet-async meta tags
- **Dark/Light Theme** — System preference detection
- **Fully Responsive** — Mobile-first design across all devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.0 | UI Framework |
| Vite | 7.2.4 | Build Tool |
| Tailwind CSS | 4.1.17 | Styling |
| React Router DOM | 7.9.6 | Client-side Routing |
| Framer Motion | 12.x | Animations |
| React Hook Form + Zod | Latest | Form Validation |
| React Helmet Async | 2.0.5 | SEO Meta Tags |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 | Runtime |
| Express.js | 4.21.2 | API Framework |
| MongoDB + Mongoose | 8.9.0 | Database |
| Nodemailer | 8.0.4 | Email (Office 365) |
| Helmet | 8.0.0 | Security Headers |
| Express Rate Limit | 7.5.0 | Rate Limiting |
| PM2 | Latest | Process Manager |

### Infrastructure
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting + Serverless functions |
| Hostinger VPS | Backend API server (Ubuntu 24 + Nginx) |
| MongoDB Atlas | Database hosting |
| GoDaddy / DNS | Domain: thetinyescape.com |

---

## 📁 Project Structure

```
hotel-sample/
├── src/                        # React frontend
│   ├── components/
│   │   ├── booking/            # Booking components
│   │   ├── common/             # PageHero, SEO, FilterBar
│   │   ├── layout/             # Navbar, Footer, PageLayout
│   │   ├── home/               # HeroSection, FeaturedTours
│   │   └── stays/              # AvailabilityCalendar
│   ├── pages/                  # Route-level page components
│   ├── services/               # API service layer
│   ├── hooks/                  # Custom React hooks
│   ├── config/                 # App configuration
│   ├── utils/                  # Helper functions
│   ├── context/                # ThemeContext
│   └── data/                   # Static data
├── backend/
│   └── src/
│       ├── controllers/        # Route controllers
│       ├── models/             # Mongoose models
│       ├── routes/             # Express routes
│       ├── middleware/         # Error handling, rate limiting
│       └── config/             # DB & env config
├── api/
│   └── contact.js              # Vercel serverless contact form
├── deploy/
│   └── nginx/                  # Nginx server config
├── vercel.json                 # Vercel deployment config
└── backend/ecosystem.config.cjs # PM2 config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- npm

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/hammashr/Hotel_Booking.git
cd Hotel_Booking

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with MongoDB URI, email credentials, etc.

# Start development server
npm run dev
```

### Available Scripts

```bash
# Frontend
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint

# Backend
npm run dev        # Start with nodemon
npm run start      # Production start
npm run seed       # Seed database
```

---

## ⚙️ Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SITE_URL=https://thetinyescape.com
VITE_GA_ID=
VITE_GOOGLE_MAPS_KEY=
```

### Backend (`backend/.env`)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGINS=https://thetinyescape.com,https://www.thetinyescape.com
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=hello@thetinyescape.com
EMAIL_PASS=your_email_password
```

---

## 🚢 Deployment

### Frontend → Vercel
```bash
# Push to main branch — Vercel auto-deploys
git push origin main
```

### Backend → Hostinger VPS
```bash
# SSH into server
ssh root@your-server-ip

# Pull latest code
cd /var/www/thetinyescape
git pull origin main

# Install new dependencies (if any)
cd backend && npm install

# Restart backend
pm2 restart tiny-escape-api
```

---

## 📞 Contact

**The Tiny Escape** — hello@thetinyescape.com
**Developer** — [Hammad Ashraf](https://github.com/hammashr)

---

⭐ Star this repo if you find it helpful!
