const router = require("express").Router();
const {
  createItem,
  getClothingItem,
  //  updateItem,
  updateLikes,
  deleteItem,
  deleteLikes,
} = require("../controllers/clothingItems");
const { auth } = require('../middlewares/auth');

// CREATE
router.post("/", auth, createItem);

// READ
router.get("/", getClothingItem);

// UPDATE
router.put("/:itemId/likes", updateLikes);

// DELETE
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", deleteLikes);

module.exports = router;
