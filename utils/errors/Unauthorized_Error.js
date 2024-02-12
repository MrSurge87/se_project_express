class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "UnathorizedError";
  }
}

module.exports = UnauthorizedError;
