const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/database');
const { env } = require('./config/env');
const { logger } = require('./utils/logger');

let httpServer;

const startServer = async () => {
  try {
    await connectDB(env.MONGO_URI);

    const port = process.env.PORT || env.PORT;

    httpServer = app.listen(port, () => {
      logger.info(`API server running on port ${port} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error(`Startup failed: ${error.message}`);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  if (httpServer) {
    httpServer.close(async () => {
      try {
        await mongoose.connection.close(false);
        logger.info('MongoDB connection closed');
        process.exit(0);
      } catch (error) {
        logger.error(`Error during MongoDB shutdown: ${error.message}`);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

startServer();
