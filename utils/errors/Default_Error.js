class Default_Error extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = "DefaultError";
  }
}

module.exports = Default_Error;
