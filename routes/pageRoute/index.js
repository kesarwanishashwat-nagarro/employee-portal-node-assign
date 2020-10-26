const express = require('express');
const router = express.Router();
const checkAuthPage = require('../../middlewares/checkAuthPage');
const openingController = require('../../controllers/opening-controller');

/* GET home page. */
router.get('/', checkAuthPage, openingController.allOpenings);

module.exports = router;
