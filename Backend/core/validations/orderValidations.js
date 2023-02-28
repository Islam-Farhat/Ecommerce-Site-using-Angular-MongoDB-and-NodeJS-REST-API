const { body, param } = require("express-validator");

module.exports.addOrderValidation = [
  body("fullName").isAlpha().withMessage("fullName should be string"),
  body("shippingAddress1").isString().withMessage("address should be string"),
  body("shippingAddress2")
    .optional()
    .isString()
    .withMessage("address2 should be string"),
  body("city").isString().withMessage("city should be string"),
  body("zip").isString().withMessage("zip should be string"),
  body("country").isString().withMessage("country should be number"),

  body("phone").isString().withMessage("phone should be string "),
  body("status").optional().isString().withMessage("status should be string"),
  body("totalPrice")
    .optional()
    .isInt()
    .withMessage("total Price should be number"),
];
