import classes from "./ProductInfo.module.css";

import useProductData from "../../../hooks/useProductData";

function ProductInfo({ product }) {
  const {
    selectedQuantityIndex,
    setSelectedQuantityIndex,
    addHandler,
    brand,
    info,
    rating,
    ratingArr,
    ratingDifArr,
    ratingsNumber,
    outOfStock,
    inStockQuantities,
    name,
    description,
    notes,
  } = useProductData(product, null);

  const changeQuantity = function (index) {
    setSelectedQuantityIndex(index);
  };

  return (
    <div className={classes.product__container__info}>
      <button className={classes.product__btn__fave}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-6 h-6 ${classes.product__svg__fave}`}
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </button>
      <span className={classes.product__brand}>{brand}</span>
      <h2 className={classes.product__title}>{name}</h2>
      <span className={classes.product__concentration}>{info}</span>
      {rating && (
        <div className={classes.product__container__rating}>
          <div className={classes.product__container__stars}>
            {ratingArr.map((el, i) => {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  key={Math.random().toString(16).slice(2)}
                  className={`w-6 h-6 ${classes.product__star} ${classes.product__star__full}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              );
            })}
            {ratingDifArr.map((el, i) => {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  key={i}
                  className={`w-6 h-6 ${classes.product__star} ${classes.product__star__empty}`}
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
          <span className={classes.product__reviews__number}>
            ({ratingsNumber})
          </span>
        </div>
      )}
      {!rating && (
        <span className={classes.product__no__rating}>No rating</span>
      )}
      {!outOfStock && (
        <>
          <div className={classes.product__container__quantities}>
            {inStockQuantities.map((q, i) => {
              return (
                <div
                  className={`${classes.product__quantity} ${
                    selectedQuantityIndex === i
                      ? classes.product__quantity__active
                      : ""
                  }`}
                  key={q._id}
                  onClick={() => changeQuantity(i)}
                >
                  <span className={classes.product__quantity__span}>
                    {q.quantity} ML
                  </span>
                </div>
              );
            })}
          </div>
          <button
            className={classes.product__button__add}
            onClick={addHandler}
            disabled={selectedQuantityIndex === null ? true : false}
          >
            Add to cart
          </button>
        </>
      )}
      {outOfStock && (
        <span className={classes.product__no__stock}>Out of stock</span>
      )}
      <p>{description}</p>
      <div className={classes.product__container__notes}>
        {Object.entries(notes).map((entry, i) => {
          return (
            <div className={classes.product__notes__row} key={i}>
              <span className={classes.product__notes__title}>
                {entry[0]
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .split(" ")
                  .map((el) => el[0].toUpperCase() + el.slice(1))
                  .join(" ")}
              </span>
              <span className={classes.product__notes}>
                {entry[1]
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(", ")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductInfo;
