const { body, param } = require("express-validator");

module.exports.addUserValidation = [
  body("fullName").isAlpha().withMessage("fullName should be string"),
  body("userName").isString().withMessage("userName should be string"),
  body("password").isString().withMessage("Teacher Password should be strong"),
  body("email").isEmail().withMessage("Email should be in email formate "),
  body("phone").isString().withMessage("should be in phone formate"),
  body("address").isObject().withMessage("address should be object"),
  body("address.city").isAlpha().withMessage("city should be string"),
  body("address.street").isString().withMessage("street should be string"),
];

module.exports.updateUserValidation = [
  body("id").isMongoId().withMessage("Id  should be object id"),
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage("fullName should be string"),
  body("userName").isString().withMessage("userName should be string"),
  body("password")
    .optional()
    .isString()
    .withMessage("Teacher Password should be string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email should be i email formate "),
  body("phone").optional().isString().withMessage("should be in phone formate"),
  body("address").optional().isObject().withMessage("address should be object"),
  body("address.city").isAlpha().withMessage("city should be string"),
  body("address.street").isString().withMessage("street should be string"),
];

module.exports.deleteUserValidation = [
  body("id").isMongoId().withMessage(" Id  should be object id"),
];

module.exports.getUserByIdValidation = [
  param("id").isMongoId().withMessage(" Id  should be object id"),
];
