
const apiResponse = require('../shared/utilities/api-response');
const jwt = require('jsonwebtoken');

module.exports = ((req, res, next) => {
    if (req.isAuthenticated()) {
        const jwtToken = req.cookies.token;
        try {
            const decoded = jwt.verify(jwtToken, 'NAGP');
            if (decoded.user) {
                next();
            } else {
                return new apiResponse(401, null, {
                    status: 'failure',
                    error: [{ message: 'Unauthenticated Request' }]
                }).send(res);
            }
        } catch (error) {
            return new apiResponse(401, null, {
                status: 'failure',
                error: [{ message: error.message }]
            }).send(res);
        }
    } else {
        return new apiResponse(401, null, {
            status: 'failure',
            error: [{ message: 'Unauthenticated Request' }]
        }).send(res);
    }
});