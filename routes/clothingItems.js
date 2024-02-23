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

// CREATE
router.post("/", auth, createItem);

// READ
router.get("/", getClothingItem);

// UPDATE
router.put("/:itemId/likes", auth, updateLikes);

// DELETE
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, deleteLikes);

module.exports = router;
