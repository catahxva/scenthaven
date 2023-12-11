const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    timeStamp: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: [validator.isEmail, "Please provide a valid email."],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Products",
        },
        productQuantity: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      name: {
        type: String,
      },
      number: {
        type: String,
      },
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products.product",
    select: "imageCover name _id",
  });
});

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
