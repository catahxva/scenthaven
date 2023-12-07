const Review = require("../models/reviewModel");
const AppError = require("../util/appError");

exports.getReviews = async function (req, res, next) {
  try {
    const reviews = await Review.find({ product: req.params.id }).sort({
      timeStamp: -1,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: reviews,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyExistingReview = async function (req, res, next) {
  try {
    const review = await Review.find({
      user: req.user,
      product: req.body.product,
    });

    if (review.length > 0)
      return next(
        new AppError("You have already posted a review for this product.", 400)
      );

    next();
  } catch (err) {
    next(err);
  }
};

exports.createReview = async function (req, res, next) {
  try {
    const newReview = await Review.create({
      review: req.body.review,
      rating: req.body.rating,
      product: req.body.id,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        data: newReview,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.rateReview = async function (req, res, next) {
  try {
    const { id } = req.body;
    const { userOpinion } = req.body;

    const review = await Review.findById(id);

    if (!review)
      return next(new AppError("No review found with this ID.", 404));

    review[userOpinion]++;

    await review.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
