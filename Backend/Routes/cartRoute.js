const express = require("express");
const checkValidations = require("../core/validations/checkValidations");
const controller = require("./../Controller/cartController");
const authorization = require("./../core/Authroization/authorization");
//const userValidation = require("./../core/validations/");
const cartRoute = express.Router();

cartRoute.route("/carts")
  .all(authorization.checkAdmin)
  .get(controller.getAllCarts)
  .delete(checkValidations,controller.deleteFromCart);

cartRoute.route("/")
  .post(authorization.checkAdmin,checkValidations,controller.addtoCart);


// UserRoute.patch(
//   "/users",
//   authorization.checkUser,
//   userValidation.updateUserValidation,
//   checkValidations,
//   controller.updateUser
// );

// UserRoute.get(
//   "/users/:id",
//   authorization.checkAdminAndUser,
//   userValidation.getUserByIdValidation,
//   checkValidations,
//   controller.getUserById
// );

module.exports = cartRoute;
