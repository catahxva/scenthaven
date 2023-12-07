import { useState } from "react";

import classes from "./ProductReviews.module.css";

import { calculateRatingPercentages } from "../../../util/utilities";

import Review from "./Review";
import Percentages from "./Percentages";

function ProductReviews({ reviews, rating }) {
  const [amountOfReviews, setAmountOfReviews] = useState(3);

  const visibleReviews = reviews.slice(0, amountOfReviews);

  const percentages = calculateRatingPercentages(reviews);

  return (
    <div className={classes.product__reviews}>
      <div className={classes.product__container__all__ratings}>
        <Percentages rating={rating} percentages={percentages} />
      </div>
      <div className={classes.product__all__reviews}>
        {visibleReviews.map((review) => {
          return <Review key={review._id} review={review} />;
        })}
        {reviews.length !== amountOfReviews && (
          <button
            className={classes.product__reviews__more}
            onClick={() => setAmountOfReviews((prevState) => prevState + 3)}
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
