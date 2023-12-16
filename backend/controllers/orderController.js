const Orders = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../util/appError");
const stripe = require("stripe")(
  "sk_test_51OFgTpANFg5WW6bUiQj8KQ643R0CiLDjwfZCDgrzTtvDNvYPrXfvriFMchR326MZT1GznzZu885DcmweTe5YJtLN00xuqU7W7x"
);

const sendEmail = require("../util/email");
const emailTemplate = require("../util/emailTemplate");

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

    const productsForOrder = productsFromDB.map((product, i) => {
      return {
        productId: product._id,
        productQuantity: requestProducts[i].productQuantity,
        quantity: product.quantities.filter((q) => {
          return q.quantity === requestProducts[i].quantity;
        })[0].quantity,
        cover: product.imageCover,
        name: product.name,
        brand: product.brand,
        price: prices[i],
      };
    });

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

    const newOrder = await Orders.create({
      user: req.user?._id,
      products: productsForOrder,
      address: shippingInfo,
      total,
    });

    const preheaderText = "Order confirmation";
    const message =
      "Your order has been created and we are going to deliver it to you soon! Click on the button below to see your order";
    const ctaText = "See order";
    const ctaLink = `http://localhost:5173/order/${newOrder._id}`;

    const html = emailTemplate(preheaderText, message, ctaText, ctaLink);

    await sendEmail({
      email: email,
      subject: "Order confirmation",
      html,
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
    const { email } = req.body;

    const orders = await Orders.find({ "address.email": email });

    res.status(200).json({
      status: "success",
      data: {
        data: orders,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getOneOrder = async function (req, res, next) {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      return next(new AppError("No order found with this ID.", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: order,
      },
    });
  } catch (err) {
    next(err);
  }
};
