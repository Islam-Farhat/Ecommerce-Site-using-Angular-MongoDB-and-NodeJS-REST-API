const mongoose = require("mongoose");
require("./../Model/user");
const UserSchema = mongoose.model("users");

module.exports.getAllUsers = (request, response, next) => {
  UserSchema.find({})
    .select("fullName email phone ")
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getUserById = (request, response, next) => {
  UserSchema.findOne({ _id: request.params.id })
    .select("-passwordHash")
    .then((data) => {
      if (data == null) throw new Error("User not found");
      else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateUser = (request, response, next) => {
  if (request.id == request.body.id) {
    UserSchema.updateOne(
      { _id: request.body.id },
      {
        $set: {
          fullName: request.body.fullName,
          userName: request.body.userName,
          password: request.body.password,
          email: request.body.email,
          phone: request.body.phone,
          address: request.body.address,
        },
      }
    )
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.deleteUser = (request, response, next) => {
  UserSchema.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
