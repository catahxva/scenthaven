import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const addProductToCart = function (productObject, productsList) {
  return async function (dispatch) {
    const checkForProduct = async function () {
      const response = await fetch(
        `http://localhost:3000/mainapi/scent-haven/products/one-product/${productObject.id}`
      );

      if (!response.ok) throw new Error(`Could not add to cart`);

      const data = await response.json();

      if (data.data === null || data.data === undefined)
        throw new Error(`Could not add to cart`);

      return data;
    };

    dispatch(
      uiActions.showNotification({
        status: "pending",
        message: "Pending...",
      })
    );

    try {
      const data = await checkForProduct();
      const product = data.data.data;

      const prod = productsList?.find((p) => p.id === productObject.id);
      const prodQuantity = prod?.productQuantity;
      const stockQuantity = product.quantities.find(
        (q) => q.quantity === productObject.quantity
      ).stock;

      if (prodQuantity === stockQuantity)
        throw new Error(`Couldn't add product, max quantity reached`);

      dispatch(cartActions.addProduct(productObject));

      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "Product added to cart!",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: err.message,
        })
      );
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 4000);
  };
};
