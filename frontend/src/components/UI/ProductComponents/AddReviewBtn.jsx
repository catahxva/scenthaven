import classes from "./AddReviewBtn.module.css";

function AddReviewBtn({ onClick }) {
  return (
    <button onClick={onClick} className={classes.product__add__review}>
      Add review
    </button>
  );
}

export default AddReviewBtn;
