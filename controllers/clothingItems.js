const clothingItem = require("../models/clothingItem");
const {
  Bad_Request,
  Default_Error,
  Duplicate,
  Forbiden,
  Not_Found,
  Unauthorized,
} = require("../utils/errors");

//CREATE ITEM
const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  clothingItem
    .create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch(() => {
      res
        .status(Default_Error)
        .send({ message: "An error has occurred on the server" });
    });
};

//READ ITEM
const getClothingItem = (req, res) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.status(200).res.send(clothingItems))
    .catch(() => {
      res
        .status(Default_Error)
        .send({ message: "An error has occurred on the server." });
    });
};

//UPDATE ITEM
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch(() => {
      res
        .status(Default_Error)
        .send({ message: "An error has occurred on the server." });
    });
};

//UPDATE LIKES
const updateLikes = (req, res) => {
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    { $addToSet: { likes: req.user_id } },
    { new: true },
  );
};

//DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((item) =>
      res
        .status(204)
        .send({ messasge: "An error has occurred when deleting the item." }),
    )
    .catch(() => {
      res
        .status(Default_Error)
        .send({ message: "An error has occurred on the server." });
    });
};

//DELETE LIKES
const deleteLikes = (req, res) => {
  const { itemId } = req.params;

  clothingItem.findByIdAndUpdate(
    { $pull: { likes: req.user_id } },
    { new: true },
  );
};

module.exports = {
  createItem,
  getClothingItem,
  updateItem,
  updateLikes,
  deleteItem,
  deleteLikes,
};
