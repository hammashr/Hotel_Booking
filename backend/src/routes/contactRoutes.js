const express = require('express');
const { submitContact } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

// POST /api/contact — second-layer rate limit on the router itself
router.post('/', contactLimiter, submitContact);

module.exports = router;
