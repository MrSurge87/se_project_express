const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BadRequest,
  Unauthorized,
  // Forbidden,
  NotFound,
  Duplicate,
  DefaultError,
} = require("../utils/errors");

//LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(() => {
      if (!email || !password) {
        return res.status(BadRequest).send({ message: err.message });
      }
      return res.status(Unauthorized).send({ message: err.message });
    })
    .select("+password")
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.log(err);
    });
};

// CREATE USER - SIGNUP
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res.status(Duplicate).send({ message: err.message });
      }
      if (err.name === "ValidationError") {
        return res.status(BadRequest).send({ message: err.message });
      }
      return res
        .status(DefaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

// READ users
const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  console.log(req.user);
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NotFound).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BadRequest).send({ message: err.message });
      }
      return res.status(DefaultError).send({ message: err.message });
    });
};

// UPDATE USER
const updateProfile = (req, res) => {
  const { userId } = req.user._id;
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
        return res.status(BadRequest).send({ message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NotFound).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BadRequest).send({ message: err.message });
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
