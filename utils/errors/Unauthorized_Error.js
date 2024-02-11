class Unauthorized_Error extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "UnathorizedError";
  }
}

module.exports = Unauthorized_Error;
