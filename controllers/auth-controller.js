const authLogic = require('../business/auth-logic');
const Constants = require('../shared/constants');
const apiResponse = require('../shared/utilities/api-response');

module.exports = {
    /**Returns the login page view.
     * @param  {Request} req
     * @param  {Response} res
     */
    loginView(req, res) {
        req.logOut();
        res.render('index',
            { pageName: './pages/login.ejs', pageObj: {}, title: 'Employee portal | Login', hideNavbar: true });
    },

    /**Logs out the user.
     * @param  {Request} req
     * @param  {Response} res
     */
    logoutUser(req, res) {
        req.logOut();
        res.redirect('/');
    },

    /**Returns the register page view.
     * @param  {Request} req
     * @param  {Response} res
     */
    registerView(req, res) {
        req.logOut();
        res.render('index',
            {
                pageName: './pages/register.ejs', pageObj: {
                    error: false
                }, title: 'Employee portal | Signup', hideNavbar: true
            }
        );
    },

    /** Registers a users.
     * @param  {Request} req
     * @param  {Response} res
     */
    async registerUser(req, res) {
        await authLogic.registerUser(req.body);
            return new apiResponse(200, null, {
                status: 'success'
            }).send(res);
    }
}