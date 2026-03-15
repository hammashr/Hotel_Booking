const express = require('express');

const {
	getHouseDetails,
	getHousePackages,
	getUnavailableDates,
	listHouses,
} = require('../controllers/houseController');
const validateRequest = require('../middleware/validateRequest');
const { houseSlugParamsSchema } = require('../utils/validationSchemas');

const router = express.Router();

router.get('/', listHouses);
router.get('/:slug/packages', validateRequest(houseSlugParamsSchema), getHousePackages);
router.get('/:slug/unavailable-dates', validateRequest(houseSlugParamsSchema), getUnavailableDates);
router.get('/:slug', validateRequest(houseSlugParamsSchema), getHouseDetails);

module.exports = router;
