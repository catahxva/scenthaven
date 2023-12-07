import classes from "./ProductNoReviews.module.css";

import { useRef } from "react";

import AddReviewBtn from "./AddReviewBtn";
import AddReview from "./AddReview";

function ProductNoReviews() {
  const dialog = useRef();

  const openModal = function () {
    dialog.current.open();
  };

  return (
    <div className={classes.product__no__reviews}>
      <h3 className={classes.product__no__reviews__title}>
        There are no reviews yet.
      </h3>
      <AddReviewBtn onClick={openModal} />
      <AddReview ref={dialog} />
    </div>
  );
}

export default ProductNoReviews;
