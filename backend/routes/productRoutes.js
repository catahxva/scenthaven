const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/cart-items").post(productController.getCartProducts);

router.route("/get-filters/:gender?").get(productController.getFilters);

router.route("/one-product/:id").get(productController.getOneProduct);

router
  .route("/:gender?")
  .get(productController.getAllProducts)
  .post(authController.isLoggedIn, productController.createProduct);

module.exports = router;
