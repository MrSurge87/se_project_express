const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  createItem,
  getClothingItem,
  //  updateItem,
  updateLikes,
  deleteItem,
  deleteLikes,
} = require("../controllers/clothingItems");
const { validateCreateItem, validateId } = require("../middlewares/validation");

// CREATE
router.post("/", auth, createItem, validateCreateItem);

// READ
router.get("/", getClothingItem);

// UPDATE
router.put("/:itemId/likes", auth, updateLikes, validateId);

// DELETE
router.delete("/:itemId", auth, deleteItem, validateId);
router.delete("/:itemId/likes", auth, deleteLikes, validateId);

module.exports = router;
