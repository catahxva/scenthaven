import classes from "./CartCheckout.module.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormCheckout from "../UI/CheckoutComponents/FormCheckout";

import useGetCart from "../../hooks/useGetCart";

function CartCheckout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const { items, content } = useGetCart({
    key: "cartCheckout",
  });

  if (items.length <= 0) navigate("/cart");

  return (
    <section className="first__section">
      <div className={classes.checkout__grid}>
        <div>
          <h2>Checkout</h2>
          <FormCheckout />
        </div>
        <div>{content}</div>
      </div>
    </section>
  );
}

export default CartCheckout;
