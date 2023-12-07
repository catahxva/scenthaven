const express = require("express");

const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.get("/:id", reviewController.getReviews);

router.post(
  "/upload-review",
  authController.protect,
  reviewController.verifyExistingReview,
  reviewController.createReview
);

router.post("/rate-review", reviewController.rateReview);

module.exports = router;
