const { ZodError } = require('zod');
const { env } = require('../config/env');
const { logger } = require('../utils/logger');

const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  let details = error.details || null;

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    details = error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
  }

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Mongoose validation failed';
    details = Object.values(error.errors).map((mongooseError) => mongooseError.message);
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for ${error.path}`;
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
    details = error.keyValue;
  }

  if (statusCode >= 500) {
    logger.error(error.stack || message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    details,
    ...(env.NODE_ENV !== 'production' && { stack: error.stack }),
  });
};

module.exports = errorHandler;
