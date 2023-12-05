const express = require("express");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const favoritesRouter = require("./routes/favoritesRoutes");
const reviewsRouter = require("./routes/reviewRoutes");
const ordersRouter = require("./routes/orderRoutes");

const AppError = require("./util/appError");
const globalErroHandler = require("./controllers/errorController");

app.use(helmet());
app.use(
  "/",
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests, please try again later.",
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.status(200).send();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use("/products", productRouter);
app.use("/user", userRouter);
app.use("/favorites", favoritesRouter);
app.use("/reviews", reviewsRouter);
app.use("/orders", ordersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErroHandler);

module.exports = app;
