const express = require("express");

const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/create-payment-intent", orderController.createPaymentIntent);

module.exports = router;
