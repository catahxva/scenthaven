import classes from "./Percentages.module.css";

import { useRef } from "react";

import AddReviewBtn from "./AddReviewBtn";
import AddReview from "./AddReview";

function Percentages({ rating, percentages }) {
  const dialog = useRef();

  const percentagesArray = Object.entries(percentages).sort((a, b) => {
    const numA = Number(a[0]);
    const numB = Number(b[0]);

    return numB - numA;
  });

  const openDialog = function () {
    dialog.current.open();
  };

  return (
    <>
      <div className={classes.product__container__reviews__rating}>
        <span className={classes.product__rating}>{rating}/5</span>
        <AddReviewBtn onClick={openDialog} />
        <AddReview ref={dialog} />
      </div>
      <div className={classes.product__rating__percentages}>
        {percentagesArray.map((entry) => {
          return (
            <div
              className={classes.product__rating__percentage}
              key={Math.random().toString(16).slice(2)}
            >
              <div className={classes.product__rating__percentage__container}>
                <span className={classes.product__rating__small}>
                  {entry[0]}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-6 h-6 ${classes.product__rating__star}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={classes.product__rating__bar}>
                <div
                  style={{ width: `${entry[1]}%` }}
                  className={classes.product__rating__bar__full}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Percentages;
