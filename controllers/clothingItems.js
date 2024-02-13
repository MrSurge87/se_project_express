const clothingItem = require("../models/clothingItem");
const {
  BadRequest,
  DefaultError,
  // Duplicate,
  // Forbiden,
  NotFound,
  // Unauthorized,
} = require("../utils/errors");

// CREATE ITEM
const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BadRequest).send({ message: "Bad Request" });
        return err;
      }
      return res
        .status(DefaultError)
        .send({ message: "An error has occurred on the server. " });
    });
};

// READ ITEM
const getClothingItem = (req, res) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch(() => {
      res
        .status(DefaultError)
        .send({ message: "An error has occurred on the server." });
    });
};

// UPDATE ITEM
// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageURL } = req.body;

//   clothingItem
//     .findByIdAndUpdate(itemId, { $set: { imageURL } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch(() => {
//       res
//         .status(DefaultError)
//         .send({ message: "An error has occurred on the server." });
//     });
// };

// UPDATE LIKES
const updateLikes = (req, res) => {
  console.log(req.user._id);
  // const userId = req.user._id;
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res
          .status(NotFound)
          .send({ message: `${err.name} Error on liking item.` });
      } else if (err.name === "CastError") {
        res
          .status(BadRequest)
          .send({ message: "Invalid credentials, cannot add like." });
      } else {
        res
          .status(DefaultError)
          .send({ message: "An error occurred on the server." });
      }
    });
};

// DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(
      (item) => res.status(200).send(item),
      // .send({ messasge: "An error has occurred when deleting the item." }),
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res
          .status(NotFound)
          .send({ message: `${err.name} Error deleting item` });
      } else if (err.name === "CastError") {
        res.status(BadRequest).send({ message: err.message });
      } else {
        res
          .status(DefaultError)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

// DELETE LIKES
const deleteLikes = (req, res) => {
  console.log(req.user._id);
  // const userId = req.user._id;
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res
          .status(NotFound)
          .send({ message: `${err.name} Error disliking item.` });
      } else if (err.name === "CastError") {
        res.status(BadRequest).send({ message: err.message });
      } else {
        res
          .status(DefaultError)
          .send({ message: "An error has occurred on the server." });
      }
    });
};

module.exports = {
  createItem,
  getClothingItem,
  // updateItem,
  updateLikes,
  deleteItem,
  deleteLikes,
};
