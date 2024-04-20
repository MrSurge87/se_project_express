const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NotFound } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");
const { validateCreateUser, validateAuth, validateId } = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", login, validateAuth, validateId);
router.post("/signup", createUser, validateCreateUser);

router.use((req, res) => {
  if (err.name === "NotFoundError") {
  next(new NoutFoundError(err.message));
  }
});

module.exports = router;
