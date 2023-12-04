import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const addProductToCart = function (productObject, productsList) {
  return async function (dispatch) {
    const checkForProduct = async function () {
      const response = await fetch(
        `http://localhost:3000/products/${productObject.id}`
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

      console.log(product);
      console.log(productsList.find((p) => p.id === productObject.id));

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
          message: "Could not add product to cart, please try again",
        })
      );
    }

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 3000);
  };
};
