const router = require("express").Router();
const {
  createItem,
  getClothingItem,
  updateItem,
  updateLikes,
  deleteItem,
  deleteLikes,
} = require("../controllers/clothingItems");

//CREATE
router.post("/", createItem);

//READ
router.get("/", getClothingItem);

//UPDATE
router.put("/:itemId", updateItem);
router.put("/:itemId/likes", updateLikes);

//DELETE
router.delete("/items/:itemId", deleteItem);
router.delete("/items/:itemId/likes", deleteLikes);

module.exports = router;
