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
    .select("+password")
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.log(err);
      if (!email || !password) {
        return res.status(BadRequest).send({ message: err.message });
      }
      return res.status(Unauthorized).send({ message: err.message });
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
const updateProfile = (req, res) => {
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

module.exports = {
  login,
  createUser,
  getCurrentUser,
  getUsers,
  updateProfile,
  getUserById,
}; // {deleteUser}
