const express = require("express");
const controller = require("./../Controller/productController");
const checkValidations = require("../core/validations/checkValidations");
const productValidation = require("./../core/validations/productValidations");

const allProductsRoute = express.Router();

allProductsRoute
  .route("/products/:categoryid")
  .get(controller.getProductswithCategoryID);

allProductsRoute.get("/Featured/", controller.getFeatured);

allProductsRoute
  .route("/productdetails/:productid")
  .get(controller.getProductById);

module.exports = allProductsRoute;
