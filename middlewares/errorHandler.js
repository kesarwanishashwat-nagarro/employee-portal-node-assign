module.exports = function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    if(req.app.get('env') === 'development'){
        res.status(err.status || 500);
        res.render('error');
    } else {
        req.flash('globalError', 'Something failed at our end, Please try again later');
        res.render( req.path);
    }
}