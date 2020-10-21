module.exports = (req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('failure');
    res.locals.error = req.flash('error');
    res.locals.globalError = req.flash('globalError');
    res.locals.isAuthenticated = req.flash('isAuthenticated');
    next();
}