import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import Placeholder from "../components/UI/Placeholder";

import { fetchCartProducts } from "../util/utilities";

import CartPlaceholder from "../components/UI/CartComponents/CartPlaceholder";
import CartItems from "../components/UI/CartComponents/CartItems";
import CheckoutItems from "../components/UI/CheckoutComponents/CheckoutItems";

export default function useGetCart({ key, type }) {
  const items = useSelector((state) => state.cart.items);
  const numberOfItems = items.reduce((acc, c) => acc + c.productQuantity, 0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: [key, items],
    queryFn: ({ signal }) => fetchCartProducts({ signal, items }),
  });

  let content;

  if (numberOfItems <= 0 && key === "cart") {
    content = <CartPlaceholder />;
  }

  if (isPending) {
    content = <Placeholder message={"Loading..."} />;
  }

  if (isError) {
    content = <Placeholder message={error.message} type={"error"} />;
  }

  if (numberOfItems > 0 && data && key === "cart") {
    const itemsFromDB = data.data.data;

    content = <CartItems items={itemsFromDB} />;
  }

  if (data && key === "cartCheckout") {
    console.log("last check");
    const itemsFromDB = data.data.data;

    content = <CheckoutItems items={itemsFromDB} />;
  }

  return {
    items,
    numberOfItems,
    content,
  };
}
