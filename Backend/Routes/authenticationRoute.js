const express = require("express");
const controller = require("./../Controller/athenticationController");
const userValidation = require("./../core/validations/userValidations");
const checkValidations = require("../core/validations/checkValidations");
const autthenticationRoute = express.Router();
autthenticationRoute.post("/login", controller.login);
autthenticationRoute.post(
  "/register",
  userValidation.addUserValidation,
  checkValidations,
  controller.register
);

module.exports = autthenticationRoute;
