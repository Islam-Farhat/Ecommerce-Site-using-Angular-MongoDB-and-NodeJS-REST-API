const express = require("express");
const checkValidations = require("../core/validations/checkValidations");
const controller = require("./../Controller/UserController");
const authorization = require("./../core/Authroization/authorization");
const userValidation = require("./../core/validations/userValidations");
const UserRoute = express.Router();

UserRoute.route("/users")
  .all(authorization.checkAdmin)
  .get(controller.getAllUsers)
  .delete(
    userValidation.deleteUserValidation,
    checkValidations,
    controller.deleteUser
  );

UserRoute.patch(
  "/users",
  authorization.checkUser,
  userValidation.updateUserValidation,
  checkValidations,
  controller.updateUser
);

UserRoute.get(
  "/users/:id",
  authorization.checkAdminAndUser,
  userValidation.getUserByIdValidation,
  checkValidations,
  controller.getUserById
);

module.exports = UserRoute;
