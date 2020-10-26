const openingLogic = require('../business/opening-logic');
const Constants = require('../shared/constants');
const apiResponse = require('../shared/utilities/api-response');

module.exports = {
    /**
     * Gets view with all the openings.
     * @param  {Request} req
     * @param  {Response} res
     */
    async allOpenings(req, res) {
        const allOpenings = await openingLogic.getAllOpenings();
        res.render('index', {
            pageName: './pages/landing.ejs', pageObj: {
                openings: allOpenings,
                user: req.user
            }, title: 'Employee portal', hideNavbar: false, user: req.user
        });
    },

    /**
     * Provides the opening form view for add/update
     * @param  {Request} req
     * @param  {Response} res
     * @param  {import('express').NextFunction} next
     * @param  {Object} pageBinding static binding to ejs
     */
    addOpeningView(req, res, next, pageBinding = null) {
        res.render('index', {
            pageName: './pages/opening-add.ejs',
            pageObj: pageBinding || {
                buttonLabel: 'Add'
            },
            title: 'Employee portal | Opening',
            hideNavbar: false,
            user: req.user
        });
    },

    /**
     * Controls the addition of new opening
     * @param  {Request} req
     * @param  {Response} res
     */
    async addOpening(req, res) {
        const isAdded = await openingLogic.addOpening(req.body, req.user.id);
        if (isAdded) {
            return new apiResponse(200, null, {
                status: 'success',
                message: 'Opening is succesfully created'
            }).send(res);
        } else {
            new apiResponse(500, null, {
                status: 'failure',
                errors: [{ message: 'Failed to create the opening, Please try again' }]
            }).send(res);
        }
    },

    /**
     * Controls the application on opening
     * @param  {Request} req
     * @param  {Response} res
     */
    async applyOpening(req, res) {
        const applyObj = await openingLogic.applyOpening(req.params.id, req.user.id);
        if (applyObj && applyObj.isSuccess) {
            return new apiResponse(200, null, {
                status: 'success',
                message: applyObj.msg
            }).send(res);
        } else {
            new apiResponse(409, null, {
                status: 'failure',
                errors: [{ message: applyObj.msg }]
            }).send(res);
        }
    },

    /**
     * Provides binding and update view for opening
     * @param  {Request} req
     * @param  {Response} res
     * @param  {boolean} isUpdate(Optional)
     */
    async updateViewOpening(req, res, isUpdate = false) {
        const opening = await openingLogic.updateViewOpening(req.params.id);
        if (opening) {
            let pageBinding = {
                buttonLabel: false,
                opening: opening,
                isView: true
            };
            if (isUpdate) {
                pageBinding.buttonLabel = 'Update'
                pageBinding.isView = false;
            }
            this.addOpeningView(req, res, null, pageBinding)
        } else {
            res.redirect('/');
        }
    },

    /**
     * Controls the updation of any opening
     * @param  {Request} req
     * @param  {Response} res
     */
    async updateOpening(req, res) {
        const isUpdated = await openingLogic.updateOpening(req.params.id, req.body);
        if (isUpdated) {
            return new apiResponse(200, null, {
                status: 'success',
                message: 'Opening is succesfully updated'
            }).send(res);
        } else {
            new apiResponse(500, null, {
                status: 'failure',
                errors: [{ message: 'Failed to update the opening, Please try again' }]
            }).send(res);
        }
    }
}