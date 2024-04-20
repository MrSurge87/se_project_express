const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const {  validateUserUpdate } = require("../middlewares/validation");

// READ
router.get("/me", auth, getCurrentUser);

// UPDATE
router.patch("/me", auth, validateUserUpdate, updateProfile);


module.exports = router;
