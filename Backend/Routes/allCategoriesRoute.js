const express = require("express");
const controller = require("./../Controller/categoryController");

const allCategoryRoute = express.Router();
allCategoryRoute.route("/categories")
  .get(controller.getAllCategories)


  module.exports = allCategoryRoute;