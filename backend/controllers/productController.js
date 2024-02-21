const {
  createFilters,
  createSort,
  createPagination,
} = require("../util/APIFeatures");
const Product = require("../models/productModel");
const AppError = require("../util/appError");

const itemsDBScent = require("../util/itemsDBScent");

exports.getAllProducts = async function (req, res, next) {
  try {
    const { gender } = req.params;

    const filters = createFilters(req.query, gender);
    const sortCriteria = createSort(req.query);
    const [skip, limit] = createPagination(req.query);

    const [totalProducts, docs] = await Promise.all([
      Product.countDocuments(filters),
      Product.find(filters).sort(sortCriteria).skip(skip).limit(limit).lean(),
    ]);

    const maxPages = Math.ceil(totalProducts / 15);

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        totalProducts,
        maxPages,
        data: docs,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getFilters = async function (req, res, next) {
  try {
    const { gender } = req.params;

    let brandValues;
    let concentrationValues;

    if (!gender) {
      brandValues = await Product.distinct("brand");
      concentrationValues = await Product.distinct("concentration");
    }
    if (gender) {
      brandValues = await Product.distinct("brand", { gender: gender });
      concentrationValues = await Product.distinct("concentration", {
        gender: gender,
      });
    }

    const genderValues = await Product.distinct("gender");

    let data;

    if (!gender)
      data = {
        brandValues,
        genderValues,
        concentrationValues,
      };

    if (gender)
      data = {
        brandValues,
        concentrationValues,
      };

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneProduct = async function (req, res, next) {
  try {
    const doc = await Product.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No product found with this ID.", 404));
    }

    let product;

    if (req.user) {
      doc.userFavorite = req.user.checkForFavorite(doc);
      product = doc;
    } else {
      product = doc;
    }

    res.status(200).json({
      status: "success",
      data: {
        data: product,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getCartProducts = async function (req, res, next) {
  try {
    const cartItems = req.body.products;

    const awaitedCartItemsDB = await itemsDBScent(cartItems, Product);

    const finalCartItems = awaitedCartItemsDB.map((cartItem, i) => {
      if (cartItem.notFound || cartItem.noStock || cartItem.error) {
        return cartItem;
      }

      const selectedQuantity = cartItem.quantities.find((q) => {
        return q.quantity === cartItems[i].quantity;
      });

      const reachedMaxStockLimit =
        cartItems[i].productQuantity >= selectedQuantity.stock;
      const productQuantity = reachedMaxStockLimit
        ? selectedQuantity.stock
        : cartItems[i].productQuantity;
      const quantity = cartItems[i].quantity;

      const price = selectedQuantity.price * productQuantity;

      return {
        id: cartItem.id,
        name: cartItem.name,
        brand: cartItem.brand,
        imageCover: cartItem.imageCover,
        productQuantity,
        reachedMaxStockLimit,
        quantity,
        price,
      };
    });

    res.status(200).json({
      status: "success",
      data: {
        data: finalCartItems,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err,
    });
  }
};

exports.createProduct = async function (req, res, next) {
  try {
    const newDoc = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  } catch (err) {
    next(err);
  }
};
