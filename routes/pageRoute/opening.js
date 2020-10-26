const express = require('express');
const router = express.Router();

const authorizeManager = require('../../middlewares/authorizeManager');
const openingController = require('../../controllers/opening-controller');

/* GET opening add view */
router.get('/add', authorizeManager, openingController.addOpeningView);

/* GET view opening */
router.get('/view/:id', function (req, res) {
    openingController.updateViewOpening(req, res);
});

/* GET opening update view */
router.get('/update/:id', authorizeManager, function (req, res) {
    openingController.updateViewOpening(req, res, true);
});

module.exports = router;
