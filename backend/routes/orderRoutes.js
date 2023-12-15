const express = require("express");

const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/", authController.isLoggedIn, orderController.getOrders);

router.post(
  "/create-payment-intent",
  authController.isLoggedIn,
  orderController.createPaymentIntent
);

module.exports = router;
