const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const BadRequestError = require("../utils/errors/Bad_Request_Error");
const UnauthorizedError = require("../utils/errors/Unauthorized_Error");
const NotFoundError = require("../utils/errors/Not_Found_Error");
const DuplicateError = require("../utils/errors/Duplicate_Error");

// LOGIN
const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError("Invalid Credentials"));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password.") {
        next(new UnauthorizedError("Invalid Credentials"));
      } else {
        next(err);
      }
    });
};

// CREATE USER - SIGNUP
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res
        .status(201)
        .send({ name: user.name, avatar: user.avatar, email: user.email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateError(err.message));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

// READ users
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  console.log(req.user);
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

// UPDATE USER
const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new UnauthorizedError("Authorization Required"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};


module.exports = {
  login,
  createUser,
  getCurrentUser,
  // getUsers,
  updateProfile,
  // getUserById,
}; // {deleteUser}
