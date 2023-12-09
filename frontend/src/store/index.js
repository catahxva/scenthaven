import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { authSlice, authMiddleware } from "./authSlice";
import { cartSlice, cartMiddleware } from "./cartSlice";
import { addressSlice } from "./addressSlice";
import { uiSlice } from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    tempAddress: addressSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cartMiddleware).concat(authMiddleware);
  },
});

export default store;
