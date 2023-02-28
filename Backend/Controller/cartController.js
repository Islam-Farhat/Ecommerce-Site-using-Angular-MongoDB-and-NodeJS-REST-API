const mongoose = require("mongoose");
require("../Model/cart");
const cartSchema = mongoose.model("cart");

module.exports.getAllCarts = (request, response, next) => {
    cartSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addtoCart = (request, response, next) => {
  let cartObject = new cartSchema({
    items: request.body.items,
    totalCost: request.body.totalCost,
    user: request.body.user,
    createdAt: request.body.createdAt,
  });
  cartObject
    .save()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteFromCart = (request, response, next) => {
  cartSchema.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

