import classes from "./ProductNoReviews.module.css";

function ProductNoReviews() {
  return (
    <div className={classes.product__no__reviews}>
      <h3 className={classes.product__no__reviews__title}>
        There are no reviews yet.
      </h3>
      <button className={classes.product__add__review}>Add review</button>
    </div>
  );
}

export default ProductNoReviews;
