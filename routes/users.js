const router = require("express").Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// CREATE
router.post("/", createUser);

// READ
router.get("/", getUsers);
router.get("/:userId", getUsers);

// UPDATE

// DELETE

module.exports = router;
