const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  createItem,
  getClothingItem,
  updateLikes,
  deleteItem,
  deleteLikes,
} = require("../controllers/clothingItems");
const { validateCreateItem, validateId } = require("../middlewares/validation");

// CREATE
router.post("/", auth, validateCreateItem, createItem);

// READ
router.get("/", validateId, getClothingItem);

// UPDATE
router.put("/:itemId/likes", auth, validateId, updateLikes);

// DELETE
router.delete("/:itemId", auth, validateId, deleteItem);
router.delete("/:itemId/likes", auth, validateId, deleteLikes);

module.exports = router;
