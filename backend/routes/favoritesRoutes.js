const express = require("express");

const authController = require("../controllers/authController");
const favoritesController = require("../controllers/favoritesController");

const router = express.Router();

router.get("/", authController.protect, favoritesController.getFavorites);

router.post(
  "/change-favs",
  authController.protect,
  favoritesController.modifyFavorites
);

module.exports = router;
