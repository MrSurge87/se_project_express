module.exports.errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ name: err.name, message: err.message });
  }
  return res.status(500).send({ message: "An error has occurred on the server." });
};

