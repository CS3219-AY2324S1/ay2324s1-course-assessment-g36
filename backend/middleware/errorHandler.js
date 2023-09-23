const errorHandler = (err, req, res, next) => {
    statusCode = err.statusCode;
    return res.status(statusCode || 500).send(err.message);
}

module.exports = {
    errorHandler,
}