const openingLogic = require('../business/opening-logic');
const Constants = require('../shared/constants');

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
            pageObj: pageBinding || { buttonLabel: 'Add', action: '/opening/add' },
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
        const isAdded = await openinglogic.addOpening(req.body, req.user.id);
        if (isAdded) {
            req.flash(Constants.flashEvents.success, Constants.messages.openingAdded);
            res.redirect('/');
        } else {
            req.flash(Constants.flashEvents.failure, Constants.messages.addFailed);
            res.redirect('/opening/add');
        }
    },

    /**
     * Controls the application on opening
     * @param  {Request} req
     * @param  {Response} res
     */
    async applyOpening(req, res) {
        const applyObj = await openinglogic.applyOpening(req.params.id, req.user.id);
        if (applyObj && applyObj.isSuccess) {
            req.flash('success', applyObj.msg);
        } else {
            req.flash('failure', applyObj.msg);
        }
        res.redirect('/');
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
                action: '/opening/update/' + opening.id,
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
            req.flash(Constants.flashEvents.success, Constants.messages.updateSuccess);
            res.redirect('/');
        } else {
            req.flash(Constants.flashEvents.failure, Constants.messages.updateFailed);
            res.redirect('/opening/update/' + req.params.id);
        }
    }
}