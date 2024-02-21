const router = require("express").Router();
const {
  login,
  createUser,
  // getUsers,
  // getUserById,
  // updateUser,
  // deleteUser,
} = require("../controllers/users");

//SIGN IN
router.post('/signin', login);

// CREATE
router.post("/signup", createUser);

// READ
// router.get("/", getUsers);
// router.get("/:userId", getUserById);


// UPDATE

// DELETE

module.exports = router;
