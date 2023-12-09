import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Root from "./components/pages/Root";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import CartCheckout from "./components/pages/CartCheckout";
import Product, { loader as productLoader } from "./components/pages/Product";
import Authentication, {
  action as authAction,
} from "./components/pages/Authentication";
import AuthMessage from "./components/pages/AuthMessage";
import AuthVerify, {
  action as authVerifyAction,
} from "./components/pages/AuthVerify";
import Account from "./components/pages/Account";
import Search from "./components/pages/Search";

import { queryClient } from "./util/utilities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
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
    ],
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
