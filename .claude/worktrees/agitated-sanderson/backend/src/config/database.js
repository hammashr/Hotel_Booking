const mongoose = require('mongoose');
const { logger } = require('../utils/logger');

const connectDB = async (mongoUri) => {
  mongoose.set('strictQuery', true);

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    logger.info(`MongoDB connected: ${connection.connection.host}`);

    mongoose.connection.on('error', (error) => {
      logger.error(`MongoDB runtime error: ${error.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
