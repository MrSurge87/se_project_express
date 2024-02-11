class Forbidden_Error extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = "ForbiddenError";
  }
}

module.exports = Forbidden_Error;
