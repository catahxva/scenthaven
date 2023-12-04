import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { authSlice } from "./authSlice";
import { cartSlice, cartMiddleware } from "./cartSlice";
import { uiSlice } from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cartMiddleware);
  },
});

export default store;
