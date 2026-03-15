const ApiError = require('../utils/ApiError');

const validateRequest = (schema) => (req, _res, next) => {
  const parsed = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!parsed.success) {
    return next(new ApiError(400, 'Validation failed', parsed.error.issues));
  }

  req.body = parsed.data.body ?? req.body;
  req.query = parsed.data.query ?? req.query;
  req.params = parsed.data.params ?? req.params;

  return next();
};

module.exports = validateRequest;
