var express = require('express');
var router = express.Router();

const authorizeManager = require('../middlewares/authorizeManager');
const openingController = require('../controllers/opening-controller');

/* GET opening add view */
router.get('/add', authorizeManager, openingController.addOpeningView);

/* POST new opening details save */
router.post('/add', authorizeManager, openingController.addOpening)

/* GET apply for any opening based on id */
router.get('/apply/:id', openingController.applyOpening);

/* GET view opening */
router.get('/view/:id', function (req, res) {
    openingController.updateViewOpening(req, res);
});

/* GET opening update view */
router.get('/update/:id', authorizeManager, function (req, res) {
    openingController.updateViewOpening(req, res, true);
});

/* POST update and save opening details */
router.post('/update/:id', authorizeManager, openingController.updateOpening);

module.exports = router;
