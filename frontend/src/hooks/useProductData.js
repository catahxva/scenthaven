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

  const [productFavorite, setProductFavorite] = useState(false);

  const [productFavoriteLoading, setProductFavoriteLoading] = useState(false);

  const productsList = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const brand = processBrand(product.brand);
  const info = processInfo(product.gender, product.concentration);

  const ratingArr = new Array(Math.round(product.ratingsAverage)).fill(0);
  const ratingDifArr = new Array(5 - Math.round(product.ratingsAverage)).fill(
    0
  );

  const outOfStock = !product.quantities.some(stockCallback);
  const inStockQuantities = product.quantities.filter(stockCallback);

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
    productFavorite,
    setProductFavorite,
    productFavoriteLoading,
    setProductFavoriteLoading,
    addHandler,
    productsList,
    dispatch,
    brand,
    info,
    rating: product.ratingsAverage ? true : false,
    ratingArr,
    ratingDifArr,
    ratingsNumber: product.ratingsNumber,
    outOfStock,
    inStockQuantities,
    id: product._id,
    name: product.name,
    description: product.description,
    notes: product.notes,
  };
}
