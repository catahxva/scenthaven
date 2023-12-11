import { createSlice } from "@reduxjs/toolkit";

const itemsLocalStorage = JSON.parse(localStorage.getItem("items"));

const initialCartState = {
  items: itemsLocalStorage ? itemsLocalStorage : [],
};

const getIndexHelper = function (arr, payload) {
  const index = arr.findIndex(
    (product) =>
      product.quantity === payload.quantity && product.id === payload.id
  );

  return index;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      const index = getIndexHelper(state.items, action.payload);

      if (index >= 0)
        state.items[index] = {
          ...state.items[index],
          productQuantity: state.items[index].productQuantity + 1,
        };

      if (index < 0) state.items.push(action.payload);
    },
    removeProduct(state, action) {
      const index = getIndexHelper(state.items, action.payload);

      if (index >= 0) state.items.splice(index, 1);

      if (index < 0) return;
    },
    increaseQuantity(state, action) {
      const index = getIndexHelper(state.items, action.payload);

      if (index >= 0)
        state.items[index] = {
          ...state.items[index],
          productQuantity: state.items[index].productQuantity + 1,
        };

      if (index < 0) return;
    },
    decreaseQuantity(state, action) {
      const index = getIndexHelper(state.items, action.payload);

      if (index >= 0)
        state.items[index] = {
          ...state.items[index],
          productQuantity: state.items[index].productQuantity - 1,
        };

      if (index < 0) return;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    cartActions.addProduct.match(action) ||
    cartActions.removeProduct.match(action) ||
    cartActions.increaseQuantity.match(action) ||
    cartActions.decreaseQuantity.match(action)
  ) {
    localStorage.setItem(`items`, JSON.stringify(store.getState().cart.items));
  }

  if (cartActions.clearCart.match(action)) {
    localStorage.removeItem(`item`);
  }

  return result;
};
