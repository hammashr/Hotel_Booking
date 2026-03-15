const mongoose = require('mongoose');

const connectDB = require('../config/database');
const { env } = require('../config/env');
const { House, Package } = require('../models');
const { logger } = require('../utils/logger');

const HOUSE_SLUGS = [
  'apple-1-razoo-creek',
  'apple-2-kona-meadows',
  'triangle-1-catalina-ridge',
  'triangle-2-rani-ridge',
];

const PACKAGE_CODES = ['standard'];

const verifySeed = async () => {
  try {
    await connectDB(env.MONGO_URI);

    const houses = await House.find({ slug: { $in: HOUSE_SLUGS } })
      .select('_id slug name')
      .sort({ sortOrder: 1, slug: 1 })
      .lean();

    const houseIds = houses.map((house) => house._id);

    const packageCount = await Package.countDocuments({
      houseId: { $in: houseIds },
      code: { $in: PACKAGE_CODES },
    });

    const packagesByHouse = await Package.aggregate([
      {
        $match: {
          houseId: { $in: houseIds },
          code: { $in: PACKAGE_CODES },
        },
      },
      {
        $group: {
          _id: '$houseId',
          packageCount: { $sum: 1 },
          codes: { $addToSet: '$code' },
        },
      },
    ]);

    const packageMap = new Map(
      packagesByHouse.map((entry) => [String(entry._id), { packageCount: entry.packageCount, codes: entry.codes }])
    );

    logger.info('Seed verification summary:');
    logger.info(`Houses found: ${houses.length}/${HOUSE_SLUGS.length}`);
    logger.info(`Packages found: ${packageCount}/${HOUSE_SLUGS.length * PACKAGE_CODES.length}`);

    houses.forEach((house) => {
      const details = packageMap.get(String(house._id)) || { packageCount: 0, codes: [] };
      logger.info(
        `- ${house.slug} (${house.name}) => packages: ${details.packageCount}, codes: ${details.codes.sort().join(', ') || 'none'}`
      );
    });
  } catch (error) {
    logger.error(`Seed verification failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

verifySeed();
