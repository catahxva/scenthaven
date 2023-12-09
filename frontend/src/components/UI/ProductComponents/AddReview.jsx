import classes from "./AddReview.module.css";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useContext,
} from "react";
import { useSelector } from "react-redux";
import { queryClient, sendReview } from "../../../util/utilities";
import { useMutation } from "@tanstack/react-query";

import { ProductIdContext } from "../../pages/Product";

const AddReview = forwardRef(function (props, ref) {
  const token = useSelector((state) => state.auth.token);
  const ctx = useContext(ProductIdContext);

  const dialogRef = useRef();

  const [activeIndex, setActiveIndex] = useState(null);
  const isRatingActive = activeIndex === null ? false : true;

  const [textareaState, setTextareaState] = useState("");
  const [buttonText, setButtonText] = useState("Send");

  const [contentState, setContentState] = useState("normal");
  const [error, setError] = useState("");

  const arr = new Array(5).fill(0);

  const { mutate } = useMutation({
    mutationFn: sendReview,
    onMutate() {
      setButtonText("Submitting");
    },
    onSuccess() {
      setTextareaState("");
      setActiveIndex(null);
      setContentState("success");
    },
    onError(error) {
      setError(error);
      setContentState("error");
    },
    onSettled() {
      setButtonText("Send");
    },
  });

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  const ratingClickHandler = function (i) {
    setActiveIndex(i);
  };

  const ratingResetHandler = function () {
    setActiveIndex(null);
  };

  const changeHandler = function (e) {
    setTextareaState(e.target.value);
  };

  const closeModalHandler = function () {
    dialogRef.current.close();
    queryClient.invalidateQueries(["reviews", ctx.id]);
    setContentState("normal");
  };

  const sendReviewHandler = function (e) {
    e.preventDefault(e);

    mutate({
      token,
      id: ctx.id,
      rating: activeIndex + 1,
      review: textareaState,
    });
  };

  let content;

  if (contentState === "normal") {
    content = (
      <form>
        <div className={classes.product__form__group}>
          <label className={classes.product__review__label}>
            Your rating of the fragrance
          </label>
          <div className={classes.product__review__container__rating}>
            <div
              className={`${classes.product__review__container__stars} ${
                isRatingActive
                  ? classes.product__review__container__stars__active
                  : ""
              } ${
                isRatingActive
                  ? classes.product__review__container__stars__disabled
                  : ""
              }`}
            >
              {arr.map((el, i) => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    key={i}
                    className={`w-6 h-6 ${
                      classes.product__review__modal__svg
                    } ${
                      isRatingActive && activeIndex === i
                        ? classes.product__review__modal__svg__active
                        : ""
                    } ${
                      isRatingActive
                        ? classes.product__review__modal__svg__disabled
                        : ""
                    }`}
                    onClick={() => ratingClickHandler(i)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
              })}
            </div>
            <button
              type="button"
              className={classes.product__review__button}
              onClick={ratingResetHandler}
            >
              Reset rating
            </button>
          </div>
        </div>
        <div className={classes.product__form__group}>
          <label className={classes.product__review__label}>Your review</label>
          <textarea
            maxLength={500}
            className={classes.product__review__textarea}
            value={textareaState}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.product__form__group__btns}>
          <button
            className={`${classes.product__review__button} ${classes.product__review__button__send}`}
            onClick={sendReviewHandler}
          >
            {buttonText}
          </button>
          <button
            type="button"
            onClick={closeModalHandler}
            className={classes.product__review__button}
          >
            Close
          </button>
        </div>
      </form>
    );
  }

  if (contentState === "error") {
    content = (
      <div
        className={`${classes.product__modal__message} ${classes.product__modal__error}`}
      >
        <h3 className={classes.product__title__message}>{error.message}</h3>
        <div className={classes.product__btn__holder}>
          <button
            type="button"
            onClick={closeModalHandler}
            className={classes.product__review__button}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (contentState === "success") {
    content = (
      <div
        className={`${classes.product__modal__message} ${classes.product__modal__success}`}
      >
        <h3 className={classes.product__title__message}>
          Thank you for the review! It will soon be posted to the website!
        </h3>
        <div className={classes.product__btn__holder}>
          <button
            type="button"
            onClick={closeModalHandler}
            className={classes.product__review__button}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <dialog ref={dialogRef} className={classes.product__review__modal}>
      {content}
    </dialog>
  );
});

export default AddReview;
