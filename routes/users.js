const router = require("express").Router();
const {
  getCurrentUser,
  // getUsers,
  // getUserById,
  updateProfile,
  // deleteUser,
} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

//SIGN IN

// CREATE


// READ
router.get("/me", auth, getCurrentUser);
// router.get("/:userId", getUserById);

// UPDATE
router.patch("/me", auth, updateProfile);

// DELETE

module.exports = router;
