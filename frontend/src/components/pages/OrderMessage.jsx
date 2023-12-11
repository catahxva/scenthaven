import { Link } from "react-router-dom";
import classes from "./OrderMessage.module.css";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { addressActions } from "../../store/addressSlice";

function OrderMessage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartActions.clearCart());
    dispatch(addressActions.clearTemporaryAddress());
  }, []);

  return (
    <section className={classes.order__message__container}>
      <span className={classes.order__message}>
        Thank you for your order! You will soon receive a confirmation email
      </span>
      <Link to="/" className={classes.order__link}>
        Back to home
      </Link>
    </section>
  );
}

export default OrderMessage;
