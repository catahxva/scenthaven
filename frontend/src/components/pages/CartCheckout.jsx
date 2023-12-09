import classes from "./CartCheckout.module.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import FormCheckout from "../UI/CheckoutComponents/FormCheckout";

function CartCheckout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  if (items.length <= 0) navigate("/cart");

  return (
    <section className={classes.checkout__section}>
      <div className={classes.checkout__grid}>
        <div>
          <h2>Checkout</h2>
          <FormCheckout />
        </div>
      </div>
    </section>
  );
}

export default CartCheckout;
