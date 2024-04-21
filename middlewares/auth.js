const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization || !authorization.startsWith("Bearer ")) {
      next(new UnauthorizedError("Authorization Required"));

  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === "UnauthorizedError") {
      next(new UnauthorizedError("Authorization Required"));
    }
  }

  req.user = payload;
  return next();
};

module.exports = { auth };
