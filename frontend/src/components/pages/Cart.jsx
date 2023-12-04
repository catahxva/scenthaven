import { Link } from "react-router-dom";
import CartItems from "../UI/CartComponents/CartItems";
import Placeholder from "../UI/Placeholder";
import classes from "./Cart.module.css";

import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { fetchCartProducts } from "../../util/utilities";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const numberOfItems = items.reduce((acc, c) => acc + c.productQuantity, 0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cart", items],
    queryFn: ({ signal }) => fetchCartProducts({ signal, items }),
  });

  let content;

  if (numberOfItems <= 0) {
    content = (
      <div className={classes.cart__container__placeholder}>
        <p className={classes.cart__placeholder__text}>
          You have no items inside your shopping cart yet!{" "}
          <Link className={classes.cart__placeholder__link}>
            Start shopping now.
          </Link>
        </p>
      </div>
    );
  }

  if (numberOfItems > 0 && isPending) {
    content = <Placeholder message={"Loading..."} />;
  }
  if (numberOfItems > 0 && isError) {
    content = <Placeholder message={error.message} type={"error"} />;
  }

  if (numberOfItems > 0 && data) {
    console.log(data);
    const itemsFromDB = data.data.data;

    content = <CartItems items={itemsFromDB} />;
  }

  return (
    <section className={classes.cart__section}>
      <h2>Your Shopping Cart ({numberOfItems})</h2>
      {content}
    </section>
  );
}

export default Cart;
