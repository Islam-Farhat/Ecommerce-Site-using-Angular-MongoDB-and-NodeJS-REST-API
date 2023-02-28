const { body, param, query } = require("express-validator");

module.exports.addProductValidation = [
  body("title").isString().withMessage("Title must be String!"),
  body("description").isString().withMessage("Description must be String!"),
  body("richDescription")
    .optional()
    .isString()
    .withMessage("richDescription must be String!"),
  //body("image").isString().withMessage("Image must be String!"),
  body("price").isInt().withMessage("Price must be number!"),
  body("quantity").isInt().withMessage("Quantity must be number!"),
  body("size").optional().isString().withMessage("Size must be String!"),
  body("color").optional().isString().withMessage("Color must be String!"),
  body("rate").optional().isInt().withMessage("Rate must be number!"),
  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be boolean"),
  body("category").isMongoId().withMessage("Category must be ObjectId!"),
];
module.exports.updateProductValidation = [
  body("id").isMongoId().withMessage("ID must be ObjectId!"),
  body("title").optional().isString().withMessage("Title must be String!"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be String!"),
  body("richDescription")
    .optional()
    .isString()
    .withMessage("richDescription must be String!"),
  body("image").optional().isString().withMessage("Image must be String!"),
  body("size").optional().isString().withMessage("Size must be String!"),
  body("color").optional().isString().withMessage("Color must be String!"),
  body("price").optional().isInt().withMessage("Price must be number!"),
  body("rate").optional().isInt().withMessage("Rate must be number!"),
  body("quantity").optional().isInt().withMessage("Quantity must be number!"),
  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be boolean"),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Category must be ObjectId!"),
];

module.exports.deleteProductValidation = [
  param("id").isMongoId().withMessage("Id must be ObjectId!"),
];

module.exports.getProductByIdValidation = [
  param("id").optional().isMongoId().withMessage("Id must be ObjectId!"),
];
module.exports.getFeatureValidation = [];
