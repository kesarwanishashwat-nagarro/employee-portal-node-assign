const express = require('express');
const router = express.Router();

const authorizeManager = require('../../middlewares/authorizeManager');
const openingController = require('../../controllers/opening-controller');
const BadRequestErrorHandler = require('../../middlewares/badRequestErrorHandler');
const { body } = require('express-validator');

/* POST new opening details save */
router.post('/add', authorizeManager, [
    body('projectName')
        .notEmpty()
        .withMessage('project name is required'),
    body('clientName')
        .notEmpty()
        .withMessage('client name is required'),
    body('technologies')
        .notEmpty()
        .withMessage('technologies are required'),
    body('role')
        .notEmpty()
        .withMessage('role is required'),
    body('isOpen')
        .notEmpty()
        .isIn([true, false]).withMessage('status is required')
], BadRequestErrorHandler, openingController.addOpening)

/* GET apply for any opening based on id */
router.get('/apply/:id', openingController.applyOpening);


/* PUT update and save opening details */
router.put('/update/:id', authorizeManager, [
    body('projectName')
        .notEmpty()
        .withMessage('project name is required'),
    body('clientName')
        .notEmpty()
        .withMessage('client name is required'),
    body('technologies')
        .notEmpty()
        .withMessage('technologies are required'),
    body('role')
        .notEmpty()
        .withMessage('role is required'),
    body('isOpen')
        .notEmpty()
        .isIn([true, false]).withMessage('status is required')
], BadRequestErrorHandler, openingController.updateOpening);

router.use('*', (req, res) => res.status(404).send());

module.exports = router;
