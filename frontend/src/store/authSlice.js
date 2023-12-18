import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem(`token`));
const expiration = JSON.parse(localStorage.getItem("expiration"));
const userName = JSON.parse(localStorage.getItem("userName"));
const address = JSON.parse(localStorage.getItem("address"));
const email = JSON.parse(localStorage.getItem(`email`));

const initialAuthState = {
  token,
  email,
  expiration,
  isAuthenticated: token ? true : false,
  userName,
  address,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.expiration = action.payload.expiration;
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.address = action.payload.address;
    },
    logout(state) {
      state.token = undefined;
      state.email = action.payload.email;
      state.expiration = undefined;
      state.isAuthenticated = false;
      state.userName = undefined;
      state.address = undefined;
    },
    saveAddress(state, action) {
      state.address = action.payload.address;
    },
  },
});

export const authActions = authSlice.actions;

export const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (authActions.login.match(action)) {
    localStorage.setItem(`token`, JSON.stringify(store.getState().auth.token));
    localStorage.setItem(
      `expiration`,
      JSON.stringify(store.getState().auth.expiration)
    );
    localStorage.setItem(
      `userName`,
      JSON.stringify(store.getState().auth.userName)
    );
    localStorage.setItem(
      `address`,
      JSON.stringify(store.getState().auth.address)
    );
    localStorage.setItem(`email`, JSON.stringify(store.getState().auth.email));
  }

  if (authActions.saveAddress.match(action)) {
    localStorage.setItem(
      `address`,
      JSON.stringify(store.getState().auth.address)
    );
  }

  if (authActions.logout.match(action)) {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`email`);
    localStorage.removeItem(`expiration`);
    localStorage.removeItem(`userName`);
    localStorage.removeItem(`address`);
  }

  return result;
};
