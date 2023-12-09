import classes from "./CartCheckout.module.css";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { fetchCartProducts } from "../../util/utilities";

import Placeholder from "../UI/Placeholder";
import FormCheckout from "../UI/CheckoutComponents/FormCheckout";
import CheckoutItems from "../UI/CheckoutComponents/CheckoutItems";

function CartCheckout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  if (items.length <= 0) navigate("/cart");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cartCheckout", items],
    queryFn: ({ signal }) => fetchCartProducts({ signal, items }),
  });

  let content;

  if (isPending) content = <Placeholder message="Loading..." />;

  if (isError) content = <Placeholder message={error.message} type="error" />;

  if (data) content = <CheckoutItems items={data.data.data} />;

  return (
    <section className={classes.checkout__section}>
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
