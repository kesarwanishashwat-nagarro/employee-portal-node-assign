const { validationResult } = require('express-validator');
const apiResponse = require('../shared/utilities/api-response');

module.exports = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return new apiResponse(400, null, {
            status: 'failed',
            errors: errors.array().map((err) => { return { field: err.param, message: err.msg } }) 
        }).send(res);
    }
    next();
}