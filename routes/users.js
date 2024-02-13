const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  // updateUser,
  // deleteUser,
} = require("../controllers/users");

// CREATE
router.post("/", createUser);

// READ
router.get("/", getUsers);
router.get("/:userId", getUserById);

// UPDATE

// DELETE

module.exports = router;
