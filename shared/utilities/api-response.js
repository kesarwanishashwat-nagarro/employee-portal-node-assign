const apiResponse = function(status, data, metadata) {
    this.send = function(res){
        res.status(status).send({
            data,
            metadata
        })
    };
}

module.exports = apiResponse;