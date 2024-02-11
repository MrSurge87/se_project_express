class Not_Found_Error extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

module.exports = Not_Found_Error;
