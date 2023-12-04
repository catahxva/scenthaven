const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  brand: String,
  gender: String,
  concentration: String,
  quantities: [
    {
      quantity: Number,
      price: Number,
      stock: Number,
    },
  ],
  imageCover: String,
  images: [
    {
      imageSrc: String,
    },
  ],
  ratingsNumber: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    max: [5, "Rating must be below 5"],
    set: (val) => Math.round(val * 10) / 10,
  },
  notes: {
    topNotes: [String],
    middleNotes: [String],
    baseNotes: [String],
  },
  description: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
