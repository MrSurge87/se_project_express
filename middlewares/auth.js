const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { Unauthorized } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(Unauthorized).send({ message: err.message });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(Unauthorized).send({ message: err.message });
  }

  req.user = payload;
  next();
};

module.exports = { auth };
