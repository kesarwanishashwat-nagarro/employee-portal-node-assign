var express = require('express');
var router = express.Router();

const authorizeManager = require('../middlewares/authorizeManager');
const opening = require('../shared/models/openingModel');

/* GET opening add view */
router.get('/add', authorizeManager, function (req, res) {
    res.render('index', {
        pageName: './pages/opening-add.ejs',
        pageObj: {
            buttonLabel: 'Add',
            action: '/opening/add'
        },
        title: 'Employee portal | Add Opening',
        hideNavbar: false,
        user: req.user
    });
});

router.get('/apply/:id', function (req, res) {
    console.log('apply opening' + req.params.id);
    opening.findById(req.params.id, (err, openingDoc) => {
        console.log('opening ' + opening);
        if (openingDoc && openingDoc.isOpen) {
            if (openingDoc.applications && openingDoc.applications.length && openingDoc.applications.indexOf(req.user._id) >= 0) {
                req.flash('failure', 'You have already applied to this opening');
                res.redirect('/');
            } else {
                const applications = openingDoc.applications;
                console.log(applications);
                opening.updateOne({ _id: req.params.id }, { $push: { "applications": req.user.id } }, (err, data) => {
                    req.flash('success', 'You have successfully applied for ' + openingDoc.projectName + '.');
                    res.redirect('/');
                })
            }
        }
    })
});

router.get('/view/:id', function (req, res) {
    opening.findById(req.params.id, (err, opening) => {
        console.log(opening);
        if (opening) {
            res.render('index', {
                pageName: './pages/opening-add.ejs',
                pageObj: {
                    buttonLabel: false,
                    action: '/opening/update/' + opening.id,
                    opening: opening,
                    isView: true
                },
                title: 'Employee portal | Update Opening',
                hideNavbar: false,
                user: req.user
            });
        } else {
            res.redirect('/');
        }
    })
});

router.post('/add', authorizeManager, function (req, res) {
    let { projectName, clientName, technologies, role, description, isOpen } = req.body;
    const createdBy = req.user && req.user.id;
    console.log(req.body);
    technologies = technologies.split(',').map((tech) => tech.trim());
    try {
        opening({ projectName, clientName, technologies, role, description, isOpen, createdBy, applications: [] }).save((err, data) => {
            if (err) throw err;
            req.flash('success', 'New opening added succesfully');
            res.redirect('/');
        });
    } catch (err) {
        req.flash('failure', 'Failed to save the opening, please try after some time.');
        res.redirect('/opening/add');
    }
})

router.get('/update/:id', authorizeManager, function (req, res) {
    opening.findById(req.params.id, (err, opening) => {
        console.log(opening);
        if (opening) {
            res.render('index', {
                pageName: './pages/opening-add.ejs',
                pageObj: {
                    buttonLabel: 'Update',
                    action: '/opening/update/' + opening.id,
                    opening: opening
                },
                title: 'Employee portal | Update Opening',
                hideNavbar: false,
                user: req.user
            });
        } else {
            res.redirect('/');
        }
    })
});

router.post('/update/:id', authorizeManager, function (req, res) {
    const openingObj = req.body;
    openingObj.technologies = openingObj.technologies.split(',').map((tech) => tech.trim());
    console.log(openingObj);
    opening.updateOne({ _id: req.params.id }, { $set: openingObj }, (err, data) => {
        if (err) throw err;
        req.flash('success', 'Opening modified succesfully.');
        res.redirect('/');
    })
});

module.exports = router;
