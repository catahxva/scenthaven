import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../store/cartActions";

const processBrand = function (str) {
  return str
    .split(" ")
    .map((string) => string.toUpperCase())
    .join(" ");
};

const processInfo = function (str1, str2) {
  return `${str1.split("")[0].toUpperCase() + str1.slice(1)} ${str2
    .split(" ")
    .map((string) =>
      string ? string.split("")[0].toUpperCase() + string.slice(1) : string
    )
    .join(" ")}`;
};

const stockCallback = (q) => q.stock > 0;

export default function useProductData(product, defaultIndex) {
  const [selectedQuantityIndex, setSelectedQuantityIndex] =
    useState(defaultIndex);

  const productsList = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const brand = processBrand(product.brand);
  const info = processInfo(product.gender, product.concentration);

  const rating = product.ratingsAverage ? true : false;
  const ratingArr = new Array(Math.round(product.ratingsAverage)).fill(0);
  const ratingDifArr = new Array(5 - Math.round(product.ratingsAverage)).fill(
    0
  );
  const ratingsNumber = product.ratingsNumber;

  const outOfStock = !product.quantities.some(stockCallback);
  const inStockQuantities = product.quantities.filter(stockCallback);

  const id = product._id;
  const name = product.name;
  const description = product.description;
  const notes = product.notes;

  const addHandler = function () {
    const productObject = {
      id: product._id,
      quantity: inStockQuantities[selectedQuantityIndex].quantity,
      productQuantity: 1,
    };

    dispatch(addProductToCart(productObject, productsList));
  };

  return {
    selectedQuantityIndex,
    setSelectedQuantityIndex,
    addHandler,
    productsList,
    dispatch,
    brand,
    info,
    rating,
    ratingArr,
    ratingDifArr,
    ratingsNumber,
    outOfStock,
    inStockQuantities,
    id,
    name,
    description,
    notes,
  };
}
