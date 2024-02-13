const User = require("../models/user");
const {
  BadRequest,
  // Unauthorized,
  // Forbidden,
  NotFound,
  // Duplicate,
  DefaultError,
} = require("../utils/errors");

// CREATE USER
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BadRequest).send({ message: err.message });
      }
      return res
        .status(DefaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

// READ users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DefaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NotFound).send({ message: "Invalid user Id." });
      } else {
        res.status(BadRequest).send({ message: "Cannot find user with Id." });
      }
    });
};

// UPDATE USER
const updateUser = (req, res) => {
  const { userId } = req.params;
  User.findByIdAndUpdate(userId)
    .orFail()
    .then((user) => {
      res
        .status(200)
        .send(user)
        .catch((err) => {
          console.error(err);
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

module.exports = { createUser, getUsers, updateUser, getUserById }; // {deleteUser}
