const express = require("express");
const checkValidations = require("../core/validations/checkValidations");
const controller = require("./../Controller/orderController");
const authorization = require("./../core/Authroization/authorization");
const orderValidation = require("./../core/validations/orderValidations");

const OrderRoute = express.Router();
OrderRoute.route("/orders")
  .post(
    authorization.checkUser,
    orderValidation.addOrderValidation,
    checkValidations,
    controller.addOrder
  )
  .get(authorization.checkAdmin, controller.getAllOrders);

module.exports = OrderRoute;
