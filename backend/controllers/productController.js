const {
  createFilters,
  createSort,
  createPagination,
} = require("../util/APIFeatures");
const Product = require("../models/productModel");
const AppError = require("../util/appError");

exports.getAllProducts = async function (req, res, next) {
  try {
    const filters = createFilters(req.query);
    const sortCriteria = createSort(req.query);
    const [skip, limit] = createPagination(req.query);

    const docs = await Product.find(filters)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getFilters = async function (req, res, next) {
  try {
    const brandValues = await Product.distinct("brand");
    const genderValues = await Product.distinct("gender");
    const concentrationValues = await Product.distinct("concentration");

    const result = await Product.aggregate([
      { $unwind: "$quantities" },
      {
        $group: {
          _id: null,
          maxPrice: { $max: "$quantities.price" },
          minPrice: { $min: "$quantities.price" },
        },
      },
    ]);

    const priceRange = {
      maxPrice: result[0].maxPrice,
      minPrice: result[0].minPrice,
    };

    res.status(200).json({
      status: "success",
      data: {
        brandValues,
        genderValues,
        concentrationValues,
        priceRange,
      },
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
    // get objects containing the item ids from inside the request body.
    const cartItems = req.body.products;

    // create array of promises by looping over the array of
    // objects and calling the findById function.
    const cartPromises = cartItems.map(async (item) => {
      try {
        const foundItem = await Product.findById(item.id);

        if (!foundItem) {
          return {
            notFound: true,
            itemId: item.id,
          };
        }

        return foundItem;
      } catch (err) {
        return {
          error: true,
          itemId: item.id,
          errorMessage: err.message,
        };
      }
    });

    // using promise.all to settle the array of promises and
    // get the actual data.
    const cartItemsDB = await Promise.all(cartPromises);

    // creating the array of items which will be sent to the
    // frontend and used to render the cart.
    // using both the current element in the iteration and the
    // index fo the current element to gets its equivalent from
    // the cartItems array.
    const newCartItems = cartItemsDB.map((cartItem, index) => {
      if (cartItem.notFound === true || cartItem.error === true)
        return cartItem;

      // getting the current object from the cartItems array based
      // on the current index.
      const requestCartItem = cartItems[index];

      // the selectedQuantity should be the quantity that is
      // on the requestCartItem, because that is coming from the
      // user, so we are trying to find it inside the item
      // found in the db.
      const selectedQuantity = cartItem.quantities.find((q) => {
        return q.quantity === requestCartItem.quantity;
      });

      // if the selectedQuantity does not exist, or its stock is
      // equal to 0, we want to return for that item an object
      // with the name, brand and the outOfStock property set
      // to true.
      if (!selectedQuantity || selectedQuantity.stock === 0) {
        return {
          name: cartItem.name,
          brand: cartItem.brand,
          outOfStock: true,
        };
      }

      // if the actual stock is bigger than the quantity the
      // frontend is asking for, the quantity is the one that
      // the frontend is asking for, if not, it is the max
      // value of the stock.
      const productQuantity =
        selectedQuantity.stock >= requestCartItem.productQuantity
          ? requestCartItem.productQuantity
          : selectedQuantity.stock;

      // creating the price based on the quantity and using the
      // price coming from the db.
      const price = selectedQuantity.price * productQuantity;

      // return an object for each object coming from the
      // request.
      return {
        id: requestCartItem.id,
        name: cartItem.name,
        brand: cartItem.brand,
        productQuantity,
        selectedQuantity,
        price,
        imageCover: cartItem.imageCover,
      };
    });

    // sending the data.
    res.status(200).json({
      status: "success",
      data: {
        data: newCartItems,
      },
    });
  } catch (err) {
    // sending any error further to our global error handler.
    next(err);
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
