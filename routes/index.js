var express = require('express');
var router = express.Router();

const opening = require('../shared/models/openingModel');
const checkAuth = require('../middlewares/checkAuth');
/* GET home page. */
router.get('/',checkAuth, function (req, res, next) {
  var openingCursor = opening.find().exec((err, data) => {
    console.log(data);
    res.render('index', {
      pageName: './pages/landing.ejs', pageObj: {
        openings: data,
        user: req.user
      }, title: 'Employee portal', hideNavbar: false, user: req.user
    });
  });
});

module.exports = router;
