const success = function (req, res, message = '', status=200) {
    res.status(status).send({
        error: false,
        status: status,
        body: message
    });
}

const error = function (req, res, message = 'Error Interno', status = 500) {
    res.status(status).send({
        error: true,
        status: status,
        body: message
    });
}

module.exports = {
    success,
    error
}