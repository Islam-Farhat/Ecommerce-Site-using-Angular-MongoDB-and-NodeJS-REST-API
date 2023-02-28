const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    city: { type: String },
    street: { type: String },
  },
  { _id: false }
);
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [
      /^[\_]*[A-Za-z0-9]+([\._-][A-Za-z0-9]+)*[@][A-Za-z0-9]{3,50}([\.][a-z]{2,5})+$/,
      "Please fill a valid email address",
    ],
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

mongoose.model("users", UserSchema);
