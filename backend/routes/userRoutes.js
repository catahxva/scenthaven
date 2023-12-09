const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/get-account", authController.protect, authController.getUser);
router.post(
  "/address",
  authController.protect,
  authController.updateUserAddress
);
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/verify-email", authController.verifyEmail);
router.post("/reset", authController.isLoggedIn, authController.resetPassword);
router.post("/forgot", authController.forgotPassword);
router.post("/forgotReset", authController.resetForgotPassword);

module.exports = router;
