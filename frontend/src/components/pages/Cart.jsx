import classes from "./Cart.module.css";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useQuery } from "@tanstack/react-query";

import { fetchCartProducts } from "../../util/utilities";
import { processCartData } from "../../util/utilities";

import Placeholder from "../UI/Placeholder";
import CartPlaceholder from "../UI/CartComponents/CartPlaceholder";
import CartItems from "../UI/CartComponents/CartItems";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(cartActions.clearUnavailableItems());
    };
  }, []);

  const cartItems = useSelector((state) => state.cart.items);
  const unavailableItems = useSelector((state) => state.cart.unavailableItems);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cart", cartItems],
    queryFn: ({ signal }) => fetchCartProducts({ signal, items: cartItems }),
  });

  let content;

  if (isPending) content = <Placeholder message="Loading..." />;

  if (isError) content = <Placeholder type="error" message={error.message} />;

  if (data && data.data.data.length <= 0 && unavailableItems.length <= 0) {
    content = <CartPlaceholder />;
  }

  if (data && data.data.data.length <= 0 && unavailableItems.length > 0) {
    content = (
      <span className={classes.unavailable__message}>
        The items inside your cart have been removed because they are no longer
        available.
      </span>
    );
  }

  if (data && data.data.data.length > 0) {
    const { availableItems, unavailableItemsMessage } = processCartData(
      data.data.data,
      unavailableItems,
      dispatch
    );
    content = (
      <>
        {unavailableItemsMessage && (
          <span className={classes.unavailable__message}>
            {unavailableItemsMessage}
          </span>
        )}
        <CartItems items={availableItems} />
      </>
    );
  }

  return (
    <section className="first__section">
      <h2>Your Shopping Cart</h2>
      {content}
    </section>
  );
}

export default Cart;
