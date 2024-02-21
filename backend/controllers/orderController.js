const Orders = require("../models/orderModel");
const Product = require("../models/productModel");
const AppError = require("../util/appError");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const itemsDBScent = require("../util/itemsDBScent");
const sendEmail = require("../util/email");
const emailTemplate = require("../util/emailTemplate");

exports.createPaymentIntent = async function (req, res, next) {
  try {
    const { shipping: shippingInfo, products: cartItems } = req.body;

    const email = shippingInfo.email;

    const awaitedCartItemsDB = await itemsDBScent(cartItems, Product);

    const availableItems = awaitedCartItemsDB.filter((item) => {
      return !item.notFound || !item.noStock || !item.error;
    });

    if (availableItems.length <= 0) {
      return next(new AppError("No products inside cart", 400));
    }

    const availableRequestItems = cartItems.filter((item, i) => {
      return item.id === availableItems[i]._id.toString();
    });

    const prices = availableItems.map((product, index) => {
      const selectedQuantity = product.quantities.find((q) => {
        return q.quantity === availableRequestItems[index].quantity;
      });

      const finalQuantity =
        selectedQuantity.stock > availableRequestItems[index].productQuantity
          ? availableRequestItems[index].productQuantity
          : selectedQuantity.stock;

      return finalQuantity * selectedQuantity.price;
    });

    const total = prices.reduce((acc, currentPrice) => acc + currentPrice, 0);

    const finalPaymentItems = availableItems.map((product, i) => {
      return {
        productId: product._id,
        productQuantity: availableRequestItems[i].productQuantity,
        quantity: product.quantities.filter((q) => {
          return q.quantity === availableRequestItems[i].quantity;
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
        products: JSON.stringify(finalPaymentItems),
        user: JSON.stringify(req.user?._id),
        address: JSON.stringify(shippingInfo),
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
      products: finalPaymentItems,
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
      from: "<test@gmail.com>",
      email: email,
      subject: "Order confirmation",
      html,
    });

    res.status(200).json({
      status: "success",
      clientSecret: paymentIntent.client_secret,
      message:
        finalPaymentItems.reduce((acc, item) => acc + item.productQuantity, 0) <
        cartItems.reduce((acc, item) => acc + item.productQuantity, 0)
          ? "Some items inside of your cart have been removed"
          : "",
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async function (req, res, next) {
  try {
    const { email } = req.body;

    let filtersObj;

    if (req.user) {
      filtersObj = {
        $or: [{ "address.email": email }, { user: req.user._id }],
      };
    }

    if (!req.user) filtersObj = { "address.email": email };

    const orders = await Orders.find(filtersObj);

    res.status(200).json({
      status: "success",
      data: {
        data: orders,
      },
    });
  } catch (err) {
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
