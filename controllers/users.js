const User = require("../models/user");
const {
  Bad_Request,
  Unauthorized,
  Forbidden,
  Not_Found,
  Duplicate,
  Default_Error,
} = require("../utils/errors");

//CREATE USER
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(Bad_Request).send({ message: err.message });
      }
      return res
        .status(Default_Error)
        .send({ message: "An error has occurred on the server." });
    });
};

//READ users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(Default_Error)
        .send({ message: "An error has occurred on the server." });
    });
};

//UPDATE USER
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
            return res.status(Not_Found).send({ message: err.message });
          } else if (err.name === "CastError") {
            return res.status(Bad_Request).send({ message: err.message });
          }
          return res
            .status(Default_Error)
            .send({ message: "An error has occured on the server." });
        });
    });
};

//DELETE USER
const deleteUser = (req, res) => {
  const { userId } = req.params;
  User.findByIdAndDelete(userId)
    .orFail()
    .then((user) => res.status(204).send({}))
    .catch((err) => {
      res
        .status(Default_Error)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
