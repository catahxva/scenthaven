const Orders = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../util/appError");
const stripe = require("stripe")(
  "sk_test_51OFgTpANFg5WW6bUiQj8KQ643R0CiLDjwfZCDgrzTtvDNvYPrXfvriFMchR326MZT1GznzZu885DcmweTe5YJtLN00xuqU7W7x"
);

exports.createPaymentIntent = async function (req, res, next) {
  try {
    const { shipping: shippingInfo } = req.body;
    const { products: requestProducts } = req.body;

    const email = shippingInfo.email;

    const productPromises = requestProducts.map(async (product) => {
      return await Product.findById(product.id);
    });

    const productsFromDB = await Promise.all(productPromises);

    const prices = productsFromDB.map((product, index) => {
      const [selectedQuantity] = product.quantities.filter((q) => {
        return q.quantity === requestProducts[index].quantity;
      });

      if (!selectedQuantity || selectedQuantity.stock <= 0)
        return next(
          new AppError(
            `This quantity for ${product.name} is no longer available.`,
            400
          )
        );

      return selectedQuantity.price * requestProducts[index].productQuantity;
    });

    const total = prices.reduce((acc, currentPrice) => acc + currentPrice, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        email: email,
      },
      shipping: {
        name: shippingInfo.name,
        address: {
          line1: `${shippingInfo.number} ${shippingInfo.street}`,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postal_code: shippingInfo.postalCode,
          country: shippingInfo.country,
        },
        phone: shippingInfo.phone,
      },
    });

    res.status(200).json({
      status: "success",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async function (req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
};
