const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/errors/Bad_Request_Error");
const ForbiddenError = require("../utils/errors/Forbidden_Error");
const NotFoundError = require("../utils/errors/Not_Found_Error");


// CREATE ITEM
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

// READ ITEM
const getClothingItem = (req, res, next) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      next(err);
    });
};


// UPDATE LIKES
const updateLikes = (req, res, next) => {
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
        next(new NotFoundError(err.message));
      } else if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

// DELETE ITEM
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  console.log(itemId);
  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        if (err.name === "ForbbidenError") {
          next(new ForbiddenError(err.message));
        };
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .orFail()
        .then((deletedItem) => res.status(200).send(deletedItem));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      next(err);
    });
};

// DELETE LIKES
const deleteLikes = (req, res, next) => {
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
        next(new NotFoundError());
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      next(err);
    });
};

module.exports = {
  createItem,
  getClothingItem,
  updateLikes,
  deleteItem,
  deleteLikes,
};
