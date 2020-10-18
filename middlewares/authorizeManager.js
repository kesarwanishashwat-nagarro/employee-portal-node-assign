
module.exports = ((req, res, next) => {
    if(req.isAuthenticated() && req.user && req.user.role === 'Manager'){
        return next();
    }
    res.redirect('/');
});