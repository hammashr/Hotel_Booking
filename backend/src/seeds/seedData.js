const mongoose = require("mongoose");

const connectDB = require("../config/database");
const { env } = require("../config/env");
const { House, Package } = require("../models");
const { logger } = require("../utils/logger");

const STANDARD_HOME_AMENITIES = [
  "Communal swimming pool",
  "Coffee and light bites",
  "Kitchenette",
  "Microwave",
  "Coffee maker",
  "Mini Fridge/Freezer",
  "Utensils",
  "Dining table",
  "Wine glasses",
  "HVAC",
  "Alexa",
  "Internet",
  "Linens",
  "Outdoor grill/utensils",
  "Ambient lighting",
  "Extra pillows and blankets",
  "Room darkening shades",
  "Smart TV",
  "Smart Check-in",
  "Pets not allowed",
  "Smoke/Carbon Monoxide Detector",
  "First aid kit",
  "Fire Extinguisher",
  "2 Parking spots per home",
  "Standing Shower",
  "Bathroom Essentials",
  "Horseback Riding",
  "Outdoor furniture",
  "Fire pit",
  "Hammock",
  "Pool",
  "Walking Trails",
  "Benchs",
  "Board games",
];

const HOUSE_SEED_DATA = [
  {
    slug: "apple-1-razoo-creek",
    name: "Razzo Creek",
    description:
      "Razzo Creek is a design-forward Apple Home made for quiet resets and easy getaways. Enjoy a warm modern interior, private outdoor space, and effortless access to The Tiny Escape's signature experiences — from Creekside Cafe and the grand fire pit to guided horseback riding and our container pools.",
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&q=80",
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1400&q=80",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1400&q=80",
    ],
    capacity: 3,
    beds: 1,
    baths: 1,
    amenities: [...STANDARD_HOME_AMENITIES],
    baseLocation: "Bruceville-Eddy, TX",
    mapEmbedUrl: null,
    isActive: true,
    sortOrder: 1,
    packages: {
      standard: {
        name: "Standard",
        code: "standard",
        pricePerNight: 205,
        minNights: 1,
        perks: ["Nightly rate", "Self check-in", "Private deck access"],
        isPopular: false,
      },
    },
  },
  {
    slug: "apple-2-kona-meadows",
    name: "Kona Meadows",
    description:
      "Kona Meadow offers a calm, modern retreat designed for slow mornings and peaceful evenings. Thoughtfully styled and comfortably equipped, this Apple Home places you steps away from The Tiny Escape's most loved experiences while still feeling like your own private hideaway.",
    heroImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80",
    ],
    capacity: 3,
    beds: 1,
    baths: 1,
    amenities: [...STANDARD_HOME_AMENITIES],
    baseLocation: "Bruceville-Eddy, TX",
    mapEmbedUrl: null,
    isActive: true,
    sortOrder: 2,
    packages: {
      standard: {
        name: "Standard",
        code: "standard",
        pricePerNight: 205,
        minNights: 1,
        perks: ["Nightly rate", "Outdoor dining area", "Creek access"],
        isPopular: false,
      },
    },
  },
  {
    slug: "triangle-1-catalina-ridge",
    name: "Catalina Ridge",
    description:
      "Catalina Ridge is a spacious A-frame retreat designed for guests who want a little more room to unwind. With its upstairs loft, warm modern finishes, and easy access to on-property experiences, this home is perfect for memory-making stays at The Tiny Escape.",
    heroImage:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1400&q=80",
    ],
    capacity: 4,
    beds: 1,
    baths: 1,
    amenities: [...STANDARD_HOME_AMENITIES],
    baseLocation: "Bruceville-Eddy, TX",
    mapEmbedUrl: null,
    isActive: true,
    sortOrder: 3,
    packages: {
      standard: {
        name: "Standard",
        code: "standard",
        pricePerNight: 215,
        minNights: 1,
        perks: ["Nightly rate", "Stargazing deck", "Self check-in"],
        isPopular: false,
      },
    },
  },
  {
    slug: "triangle-2-rani-ridge",
    name: "Rani Ridge",
    description:
      "Rani Ridge blends cozy comfort with elevated design, featuring an upstairs loft and thoughtfully curated interiors. Ideal for small families or friends traveling together, this A-frame delivers the signature Tiny Escape experience with extra room to relax.",
    heroImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1400&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1400&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&q=80",
    ],
    capacity: 4,
    beds: 1,
    baths: 1,
    amenities: [...STANDARD_HOME_AMENITIES],
    baseLocation: "Bruceville-Eddy, TX",
    mapEmbedUrl: null,
    isActive: true,
    sortOrder: 4,
    packages: {
      standard: {
        name: "Standard",
        code: "standard",
        pricePerNight: 215,
        minNights: 1,
        perks: ["Nightly rate", "Outdoor dining", "Self check-in"],
        isPopular: false,
      },
    },
  },
];

const seed = async () => {
  try {
    await connectDB(env.MONGO_URI);

    const houseOperations = HOUSE_SEED_DATA.map((house) => ({
      updateOne: {
        filter: { slug: house.slug },
        update: {
          $set: {
            name: house.name,
            slug: house.slug,
            description: house.description,
            heroImage: house.heroImage,
            galleryImages: house.galleryImages,
            capacity: house.capacity,
            beds: house.beds,
            baths: house.baths,
            amenities: house.amenities,
            baseLocation: house.baseLocation,
            mapEmbedUrl: house.mapEmbedUrl,
            isActive: house.isActive,
            sortOrder: house.sortOrder,
          },
        },
        upsert: true,
      },
    }));

    await House.bulkWrite(houseOperations);

    const housesBySlug = await House.find({
      slug: { $in: HOUSE_SEED_DATA.map((house) => house.slug) },
    })
      .select("_id slug")
      .lean();

    const houseIdMap = new Map(
      housesBySlug.map((house) => [house.slug, house._id]),
    );

    const packageOperations = [];

    HOUSE_SEED_DATA.forEach((house) => {
      const houseId = houseIdMap.get(house.slug);

      if (!houseId) {
        throw new Error(`Missing seeded house for slug: ${house.slug}`);
      }

      Object.values(house.packages).forEach((pkg) => {
        packageOperations.push({
          updateOne: {
            filter: { houseId, code: pkg.code },
            update: {
              $set: {
                houseId,
                name: pkg.name,
                code: pkg.code,
                pricePerNight: pkg.pricePerNight,
                minNights: pkg.minNights,
                perks: pkg.perks,
                isPopular: pkg.isPopular,
              },
            },
            upsert: true,
          },
        });
      });
    });

    await Package.bulkWrite(packageOperations);

    await Package.deleteMany({
      houseId: { $in: Array.from(houseIdMap.values()) },
      code: { $ne: "standard" },
    });

    const houseCount = await House.countDocuments({
      slug: { $in: HOUSE_SEED_DATA.map((house) => house.slug) },
    });

    const packageCount = await Package.countDocuments({
      code: { $in: ["standard"] },
      houseId: { $in: Array.from(houseIdMap.values()) },
    });

    logger.info(
      `Seed completed successfully. Houses: ${houseCount}, Packages: ${packageCount}`,
    );
  } catch (error) {
    logger.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
