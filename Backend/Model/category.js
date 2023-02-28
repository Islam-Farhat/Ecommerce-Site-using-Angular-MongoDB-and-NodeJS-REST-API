const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
});

mongoose.model("category", CategorySchema);
