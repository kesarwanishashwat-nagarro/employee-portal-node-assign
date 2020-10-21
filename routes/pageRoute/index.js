var express = require('express');
var router = express.Router();
const checkAuth = require('../../middlewares/checkAuth');
const openingController = require('../../controllers/opening-controller');

/* GET home page. */
router.get('/', checkAuth, openingController.allOpenings);

module.exports = router;
