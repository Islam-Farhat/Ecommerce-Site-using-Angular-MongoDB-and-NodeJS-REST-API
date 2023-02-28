const mongoose = require("mongoose");
require("./../Model/orderItem");
require("./../Model/order");
const OrderSchema = mongoose.model("order");
const OrderItemSchema = mongoose.model("orderItem");

module.exports.getAllOrders = (request, response, next) => {
  OrderSchema.find({})
    .populate("user", "fullName")
    .sort({ dateOrdered: -1 })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getOrderById = (request, response, next) => {
  OrderSchema.findOne({ _id: request.params.id })
    .populate("user", "fullName")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    })
    .then((data) => {
      if (data == null) throw new Error("order not found");
      else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addOrder = (request, response, next) => {
  const orderItemsIds = request.body.orderItems.map((orderItem) => {
    let newOrderObject = new OrderItemSchema({
      quantity: orderItem.quantity,
      product: orderItem.product,
    })
      .save()
      .then((data) => {})
      .catch((error) => {
        next(error);
      });
    return newOrderObject._id;
  });

  const totalPrices = orderItemsIds.map(async (orderItemId) => {
    const orderItem = await OrderItemSchema.findById(orderItemId).populate(
      "product",
      "price"
    );
    const totalPrice = orderItem.product.price * orderItem.quantity;
    return totalPrice;
  });

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  //////////////////////////////////change///////////
  console.log(totalPrice);
  let orderObject = new OrderSchema({
    orderItems: orderItemsIds,
    shippingAddress1: request.body.shippingAddress1,
    shippingAddress2: request.body.shippingAddress2,
    city: request.body.city,
    zip: request.body.zip,
    country: request.body.country,
    phone: request.body.phone,
    status: request.body.status,
    totalPrice: totalPrice,
    user: request.body.user,
  });
  orderObject
    .save()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
