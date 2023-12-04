const Product = require("../models/productModel");
const AppError = require("../util/appError");

exports.modifyFavorites = async function (req, res, next) {
  try {
    const productId = req.body.productId;

    const product = await Product.findById(productId);

    if (!product)
      return next(new AppError("No product found with this ID.", 404));

    req.user.modifyFavorites(product);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
