import classes from "./Product.module.css";

import SwiperElement from "../UI/SwiperElement";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cartActions";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient, fetchOneProduct } from "../../util/utilities";

const processBrand = function (str) {
  return str
    .split(" ")
    .map((string) => string.toUpperCase())
    .join(" ");
};

const processInfo = function (str1, str2) {
  return `${str1.split("")[0].toUpperCase() + str1.slice(1)} ${str2
    .split(" ")
    .map((string) => string.split("")[0].toUpperCase() + string.slice(1))
    .join(" ")}`;
};

const stockCallback = (q) => q.stock > 0;

function Product() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState(null);

  const productsList = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchOneProduct({ signal, id }),
  });
  const product = data.data.data;

  const imagesArray = product.images;
  const brand = processBrand(product.brand);
  const info = processInfo(product.gender, product.concentration);

  const rating = product.ratingsAverage ? true : false;
  const ratingArr = new Array(product.ratingsAverage).fill(0);
  const ratingDifArr = new Array(5 - product.ratingsAverage).fill(0);

  const outOfStock = !product.quantities.some(stockCallback);
  const inStockQuantities = product.quantities.filter(stockCallback);

  const notes = product.notes;

  const changeImageHandler = function (index) {
    setSelectedImageIndex(index);
  };

  const changeQuantity = function (index) {
    setSelectedQuantityIndex(index);
  };

  const addHandler = function (id, list) {
    const productObject = {
      id,
      quantity: inStockQuantities[selectedQuantityIndex].quantity,
      productQuantity: 1,
    };

    dispatch(addProductToCart(productObject, list));
  };

  console.log(data.data.data);

  return (
    <section className={classes.product__section}>
      <div className={classes.product__header}>
        <div className={classes.product__container__images}>
          <div className={classes.product__container__big__image}>
            <img
              src={imagesArray[selectedImageIndex].imageSrc}
              alt={product.name}
              className={`${classes.product__big__img} ${
                selectedImageIndex === 1
                  ? classes.product__big__img__bigger
                  : ""
              }`}
            />
          </div>
          <div className={classes.product__container__small__images}>
            {imagesArray.map((img, i) => {
              return (
                <div
                  key={img._id}
                  onClick={() => changeImageHandler(i)}
                  className={`${classes.product__container__image__small} ${
                    i === selectedImageIndex
                      ? classes.product__container__image__small__active
                      : ""
                  }`}
                >
                  <img
                    src={img.imageSrc}
                    className={`${classes.product__small__img} ${
                      i === 0 ? classes.product__small__img__smaller : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.product__container__info}>
          <span className={classes.product__brand}>{brand}</span>
          <h2 className={classes.product__title}>{product.name}</h2>
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
                      key={i}
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
              <span className={classes.product__reviews__number}>(20)</span>
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
                onClick={() => addHandler(product._id, productsList)}
                disabled={selectedQuantityIndex === null ? true : false}
              >
                Add to cart
              </button>
            </>
          )}
          <p>{product.description}</p>
          <div className={classes.product__container__notes}>
            {Object.entries(notes).map((entry) => {
              return (
                <div className={classes.product__notes__row}>
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
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={classes.product__others}>
        <div className={classes.product__container__reviews}></div>
      </div>
    </section>
  );
}

export function loader({ params }) {
  const { id } = params;

  return queryClient.fetchQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchOneProduct({ signal, id }),
  });
}

export default Product;
