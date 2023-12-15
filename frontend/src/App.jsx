import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Root from "./components/pages/Root";
import Error from "./components/pages/Error";
import Home from "./components/pages/Home";
import Overview from "./components/pages/Overview";
import Cart from "./components/pages/Cart";
import CartCheckout from "./components/pages/CartCheckout";
import Payment from "./components/pages/Payment";
import Product, { loader as productLoader } from "./components/pages/Product";
import Authentication, {
  action as authAction,
} from "./components/pages/Authentication";
import AuthMessage from "./components/pages/AuthMessage";
import AuthVerify, {
  action as authVerifyAction,
} from "./components/pages/AuthVerify";
import Account from "./components/pages/Account";
import { loader as logoutLoader } from "./components/pages/Logout";
import Search from "./components/pages/Search";
import OrderMessage from "./components/pages/OrderMessage";

import { queryClient } from "./util/utilities";
import OrderPage from "./components/pages/OrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/overview/:gender?",
        element: <Overview />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/cart-checkout",
        element: <CartCheckout />,
      },
      {
        path: "/products/:id",
        element: <Product />,
        loader: productLoader,
      },
      {
        path: "/auth/:token?",
        element: <Authentication />,
        action: authAction,
      },
      {
        path: "/auth-message",
        element: <AuthMessage />,
      },
      {
        path: "/auth-verify/:token",
        element: <AuthVerify />,
        action: authVerifyAction,
      },
      {
        path: "/account/:username",
        element: <Account />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/order-message",
        element: <OrderMessage />,
      },
      {
        path: "/order/:id",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/logout",
    loader: logoutLoader,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
