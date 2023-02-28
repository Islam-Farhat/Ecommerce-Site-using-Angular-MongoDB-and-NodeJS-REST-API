const express = require("express");
const checkValidations = require("../core/validations/checkValidations");
const controller = require("./../Controller/categoryController");
const authorization = require("./../core/Authroization/authorization");
const categoryValidation = require("./../core/validations/categoryValidation");

const CategoryRoute = express.Router();

CategoryRoute.route("/categories")
  .all(authorization.checkAdmin)
  .get(controller.getAllCategories)
  .post(
    controller.uploadOptions.single('icon'),
    categoryValidation.addCategoryValidation,
    checkValidations,
    controller.addCategory
  )
  .patch(
    controller.uploadOptions.single('icon'),
    categoryValidation.updateCategoryValidation,
    checkValidations,
    controller.updatecategory
  )
  CategoryRoute.route("/categories/:id").delete(
    categoryValidation.deleteCategoryValidation,
    checkValidations,
    controller.deleteCategory
  );
  CategoryRoute.route("/categories/:id").get(
    categoryValidation.getCategoryByIdValidation,
    checkValidations,
    controller.getCategorytById
  );

module.exports = CategoryRoute;
