import classes from "./CartCheckout.module.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { cartActions } from "../../store/cartSlice";
import { fetchCartProducts } from "../../util/utilities";
import { processCartData } from "../../util/utilities";

import Placeholder from "../UI/Placeholder";
import FormCheckout from "../UI/CheckoutComponents/FormCheckout";
import CheckoutItems from "../UI/CheckoutComponents/CheckoutItems";

function CartCheckout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const unavailableItems = useSelector((state) => state.cart.unavailableItems);

  useEffect(() => {
    if (cartItems.length <= 0) navigate("/cart");
  }, [cartItems]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["checkout", cartItems],
    queryFn: ({ signal }) => fetchCartProducts({ signal, items: cartItems }),
  });

  let content;

  if (isPending) content = <Placeholder message="Loading..." />;

  if (isError) content = <Placeholder message={error.message} type="error" />;

  if (data) {
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
        <CheckoutItems items={availableItems} />
      </>
    );
  }

  return (
    <section className="first__section">
      <div className={classes.checkout__grid}>
        <div className={classes.checkout__form__mobile}>
          <h2>Checkout</h2>
          <FormCheckout />
        </div>
        <div>{content}</div>
      </div>
    </section>
  );
}

export default CartCheckout;
