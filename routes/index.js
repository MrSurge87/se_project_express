const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const NotFoundError  = require("../utils/errors/Not_Found_Error");
const { login, createUser } = require("../controllers/users");
const { validateCreateUser, validateAuth } = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", validateAuth, login,);
router.post("/signup", validateCreateUser, createUser);

router.use((req, res, next) => {
  next(new NotFoundError('Not found route'));
});

module.exports = router;
