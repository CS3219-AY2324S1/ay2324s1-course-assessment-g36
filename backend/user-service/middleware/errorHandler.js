const errorHandler = (err, req, res, next) => {
  statusCode = err.statusCode;
  return res.status(statusCode || 500).json({ error: err.message });
};

module.exports = {
  errorHandler,
};
