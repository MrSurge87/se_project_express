const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NotFound } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");
const { validateCreateUser, validateAuth } = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", validateAuth, login,);
router.post("/signup", validateCreateUser, createUser);

router.use((req, res) => {
  next(new NoutFoundError('Not found route'));
});

module.exports = router;
