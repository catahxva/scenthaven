import { Link } from "react-router-dom";

import useProductData from "../../hooks/useProductData";

import classes from "./ProductCard.module.css";

function ProductCard({ product }) {
  console.log(product);

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
  } = useProductData(product, 0);

  const selectChangeHandler = function (e) {
    setSelectedQuantityIndex(e.target.value);
  };

  return (
    <div className={classes.card}>
      <Link to={`/products/${product._id}`} className={classes.card__link}>
        <div className={classes.container__image}>
          <img src={product.imageCover} className={classes.card__image} />
        </div>
        <span className={classes.card__brand}>{brand}</span>
        <span className={classes.card__name}>{name}</span>
        <span className={classes.card__info}>{info}</span>
        <span className={classes.card__price}>
          {inStockQuantities[selectedQuantityIndex].price}$
        </span>
        {rating && (
          <div className={classes.card__rating}>
            <div className={classes.card__container__stars}>
              {ratingArr.map((_) => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 ${classes.card__star}`}
                    key={Math.random().toString(16).slice(2)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
              })}
              {ratingDifArr.map((_) => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 ${classes.card__star__grey}`}
                    key={Math.random().toString(16).slice(2)}
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
            <span className={classes.card__ratings__amount}>
              ({product.ratingsNumber ? product.ratingsNumber : 0})
            </span>
          </div>
        )}
        {!rating && (
          <div className={classes.card__rating}>
            <span className={classes.card__no__rating}>No rating</span>
            <span className={classes.card__ratings__amount}>
              ({ratingsNumber})
            </span>
          </div>
        )}
      </Link>
      {!outOfStock && (
        <div className={classes.card__buttons}>
          <select
            onChange={selectChangeHandler}
            name="quantities"
            className={classes.card__select}
          >
            {inStockQuantities.map((q, i) => {
              return (
                <option key={q._id} value={i}>
                  {q.quantity} ML
                </option>
              );
            })}
          </select>
          <button className={classes.card__button} onClick={addHandler}>
            Add To Cart
          </button>
        </div>
      )}
      {outOfStock && (
        <>
          <div className={classes.card__no__stock__container}>
            <span className={classes.card__no__stock}>Out of stock</span>
          </div>
          <Link className={classes.card__overlay}></Link>
        </>
      )}
    </div>
  );
}

export default ProductCard;
