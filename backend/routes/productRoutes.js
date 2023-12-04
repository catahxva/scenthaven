const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/get-filters").get(productController.getFilters);

router
  .route("/")
  .get(authController.isLoggedIn, productController.getAllProducts)
  .post(productController.createProduct);

router.route("/:id").get(productController.getOneProduct);

router.route("/cart-items").post(productController.getCartProducts);

module.exports = router;
