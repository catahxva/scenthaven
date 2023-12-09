const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

const User = require("./../models/userModel");
const sendEmail = require("./../util/email");
const AppError = require("../util/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 90 * 86400,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    username: user.userName,
  });
};

exports.signUp = async function (req, res, next) {
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const verificationToken = newUser.createEmailVerificationToken();

    await newUser.save({ validateBeforeSave: false });

    const message = `${verificationToken}`;

    await sendEmail({
      email: newUser.email,
      subject: "Verify Email",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "A verification link has been sent to your email address.",
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async function (req, res, next) {
  try {
    const user = await User.findOne({
      verifyEmailToken: req.body.token,
    });

    if (!user) return next(new AppError("No user found.", 404));

    user.verified = true;

    user.verifyEmailToken = undefined;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password)
      return next(
        new AppError("Please provide a valid email and password.", 400)
      );

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("Invalid email or password.", 400));

    if (!user.verified)
      return next(new AppError("Your account has not been verified yet.", 400));

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return next(
        new AppError("Could not find any account for this email address.", 404)
      );

    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    const message = `${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent.",
    });
  } catch (err) {
    next(err);
  }
};

exports.resetForgotPassword = async function (req, res, next) {
  try {
    const user = await User.findOne({
      passwordResetToken: req.body.token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return next(new AppError("Token is invalid or it has expired.", 400));

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async function (req, res, next) {
  try {
    const user = req.user;

    console.log(user);

    if (
      !user ||
      !(await user.correctPassword(req.body.password, user.password))
    ) {
      return next(new AppError(`Invalid email or password`, 400));
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;

    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.isLoggedIn = async function (req, res, next) {
  if (req.body.token) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.body.token,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id).select("+password");

      if (!currentUser) return next(new AppError(`No user found`, 400));

      if (currentUser.changedPasswordAfter(decoded.iat))
        return next(
          new AppError(
            "User has changed the account password, please loging again.",
            400
          )
        );

      res.locals.user = currentUser;

      req.user = currentUser;

      return next();
    } catch (err) {
      return next(err);
    }
  }

  next();
};

exports.protect = async function (req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(
        new AppError("You are not logged in. Log in to gain access.", 400)
      );

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser)
      return next(new AppError("This account no longer exists.", 400));

    if (currentUser.changedPasswordAfter(decoded.iat))
      return next(
        new AppError(
          "User has recently changed the password. Please log in again!",
          400
        )
      );

    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};

exports.getUser = async function (req, res, next) {
  try {
    console.log(req.user);
    const user = {
      userName: req.user.userName,
      email: req.user.email,
      address: req.user.address,
      favoritesAmount: req.user.favorites.items.length,
      ordersAmount: req.user.orders.previousOrders.length,
    };

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserAddress = async function (req, res, next) {
  try {
    const user = req.user;

    user.address = {
      name: req.body.name,
      number: req.body.number,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      phone: req.body.phone,
    };

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Address updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
