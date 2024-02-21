const router = require("express").Router();
const {
  login,
  getCurrentUser,
  createUser,
  // getUsers,
  // getUserById,
  updateProfile,
  // deleteUser,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

//SIGN IN
router.post("/signin", login);

// CREATE
router.post("/signup", createUser);

// READ
router.get("/me", auth, getCurrentUser);
// router.get("/:userId", getUserById);

// UPDATE
router.patch("/me", auth, updateProfile);

// DELETE

module.exports = router;
