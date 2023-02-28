const { body, param } = require("express-validator");

module.exports.addCategoryValidation = [
  body("name").isString().withMessage("Name must be String!"),
  body("icon").optional().isString().withMessage("icon must be String!"),
];
module.exports.updateCategoryValidation = [
  body("id").isMongoId().withMessage("ID must be ObjectId!"),
  body("name").optional().isString().withMessage("Name must be String!"),
  body("icon").optional().isString().withMessage("icon must be String!"),
];

module.exports.deleteCategoryValidation = [
  param("id").isMongoId().withMessage("Id must be ObjectId!"),
];

module.exports.getCategoryByIdValidation = [
  param("id").isMongoId().withMessage("Id must be ObjectId!"),
];
