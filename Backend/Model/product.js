const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  richDescription: { type: String, default: "" },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, require: true, min: 0, max: 255 },
  category: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "category",
    required: true,
  },

  size: { type: String, default: "" },
  color: { type: String, default: "" },
  rate: { type: Number, default: 5 },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("product", ProductSchema);
