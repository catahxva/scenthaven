import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem(`token`));
const expiration = JSON.parse(localStorage.getItem("expiration"));
const userName = JSON.parse(localStorage.getItem("userName"));

const initialAuthState = {
  token,
  expiration,
  isAuthenticated: token ? true : false,
  userName,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.expiration = action.payload.expiration;
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
    },
    logout(state) {
      state.token = undefined;
      state.expiration = undefined;
      state.isAuthenticated = false;
      state.userName = undefined;
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
  }

  if (authActions.logout.match(action)) {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`expiration`);
    localStorage.removeItem(`userName`);
  }

  return result;
};
