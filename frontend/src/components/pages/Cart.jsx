import classes from "./Cart.module.css";

import { useEffect } from "react";

import useGetCart from "../../hooks/useGetCart";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { content, numberOfItems } = useGetCart({ key: "cart" });

  return (
    <section className={classes.cart__section}>
      <h2>Your Shopping Cart ({numberOfItems})</h2>
      {content}
    </section>
  );
}

export default Cart;
