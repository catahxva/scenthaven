const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    timeStamp: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    products: [
      {
        productQuantity: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        cover: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        name: {
          type: String,
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
      email: {
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

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
