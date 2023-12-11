import { createSlice } from "@reduxjs/toolkit";

const initialAddressState = {
  address: undefined,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: initialAddressState,
  reducers: {
    setTemporaryAddress(state, action) {
      state.address = action.payload.address;
    },
    clearTemporaryAddress(state) {
      state.address = undefined;
    },
  },
});

export const addressActions = addressSlice.actions;
