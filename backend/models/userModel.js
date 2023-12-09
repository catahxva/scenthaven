const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide an username."],
      minlength: [6, "Please provide an username of over 6 characters."],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: [true, "This email is already taken."],
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Password must be at least 8 characters long."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords must be identical.",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    verifyEmailToken: String,
    favorites: {
      items: [
        {
          productId: {
            type: mongoose.Schema.ObjectId,
            ref: "Products",
            required: true,
          },
        },
      ],
    },
    orders: {
      previousOrders: [
        {
          orderId: {
            type: mongoose.Schema.ObjectId,
            ref: "Orders",
          },
        },
      ],
    },
    address: {
      name: {
        type: String,
      },
      number: {
        type: String,
      },
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// middleware.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = resetToken;

  this.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000;

  return resetToken;
};

userSchema.methods.createEmailVerificationToken = function () {
  const verifyToken = crypto.randomBytes(32).toString("hex");

  this.verifyEmailToken = verifyToken;

  return verifyToken;
};

userSchema.methods.modifyFavorites = function (product) {
  const favoritesProductIndex = this.favorites.items.findIndex((fp) => {
    return fp.productId.toString() === product._id.toString();
  });

  let updatedFavoritesItems = [...this.favorites.items];

  if (favoritesProductIndex >= 0) {
    updatedFavoritesItems = this.favorites.items.filter((fp) => {
      return fp.productId.toString() !== product._id.toString();
    });
  } else {
    updatedFavoritesItems.push({
      productId: product._id,
    });
  }

  const updatedFavorites = {
    items: updatedFavoritesItems,
  };

  this.favorites = updatedFavorites;

  return this.save({ validateBeforeSave: false });
};

userSchema.methods.checkForFavorite = function (product) {
  const favoritesProductIndex = this.favorites.items.findIndex((fp) => {
    return fp.productId.toString() === product._id.toString();
  });

  if (favoritesProductIndex >= 0) {
    return true;
  } else {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
