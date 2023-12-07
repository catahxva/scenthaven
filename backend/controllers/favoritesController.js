const Product = require("../models/productModel");
const AppError = require("../util/appError");

exports.modifyFavorites = async function (req, res, next) {
  try {
    const productId = req.body.productId;

    console.log(productId);

    const product = await Product.findById(productId);

    if (!product)
      return next(new AppError("No product found with this ID.", 404));

    req.user.modifyFavorites(product);

    res.status(200).json({
      status: "success",
      data: {
        data: req.user.favorites.items,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getFavorites = async function (req, res, next) {
  try {
    const favorites = req.user.favorites.items;

    const productPromises = favorites.map(async (product) => {
      return await Product.findById(product.productId);
    });

    const products = await Promise.all(productPromises);

    res.status(200).json({
      status: "success",
      data: {
        data: products,
      },
    });
  } catch (err) {
    next(err);
  }
};
