const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  // Forbidden,
  NotFoundError,
  DuplicateError,
  DefaultError,
} = require("../utils/errors");

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
      if (err.name === "Incorrect email or password.") {
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
      if (err.name === "DuplicateError") {
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
      }
      return res
        .status(DefaultError)
        .send({ message: "An error has occured on the server." });
    });
};

// DELETE USER
// const deleteUser = (req, res) => {
//   const { userId } = req.params;
//   User.findByIdAndDelete(userId)
//     .orFail()
//     .then((user) => res.status(204).send({}))
//     .catch((err) => {
//       res
//         .status(DefaultError)
//         .send({ message: "An error has occurred on the server." });
//     });
// };

module.exports = {
  login,
  createUser,
  getCurrentUser,
  // getUsers,
  updateProfile,
  // getUserById,
}; // {deleteUser}
