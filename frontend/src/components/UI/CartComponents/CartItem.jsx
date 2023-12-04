import classes from "../../pages/Cart.module.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cartSlice";

import { Link } from "react-router-dom";

function CartItem({ item }) {
  const [message, setMessage] = useState(null);

  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeHandler = function (id, quantity) {
    const itemObj = {
      id,
      quantity,
    };

    dispatch(cartActions.removeProduct(itemObj));
  };

  const increaseHandler = function (id, quantity) {
    const itemObj = {
      id,
      quantity,
    };

    if (
      items.find((i) => i.id === id).productQuantity ===
      item.selectedQuantity.stock
    ) {
      setMessage(
        `The maximum quantity for this product is ${item.selectedQuantity.stock}`
      );
      return;
    }

    dispatch(cartActions.increaseQuantity(itemObj));
  };

  const decreaseHandler = function (id, quantity, productQuantity) {
    const itemObj = {
      id,
      quantity,
    };

    if (productQuantity > 1) dispatch(cartActions.decreaseQuantity(itemObj));

    if (productQuantity <= 1) dispatch(cartActions.removeProduct(itemObj));

    setMessage(null);
  };

  return (
    <div className={classes.cart__item__container}>
      <div className={classes.cart__item}>
        <Link
          to={`/products/${item.id}`}
          className={classes.cart__item__container__img}
        >
          <img src={item.imageCover} className={classes.cart__item__img} />
        </Link>
        <div className={classes.cart__item__info}>
          <span className={classes.cart__item__name}>{item.name}</span>
          <span className={classes.cart__item__brand}>
            {item.brand
              .split(" ")
              .map((string) => string.toUpperCase())
              .join(" ")}
          </span>
        </div>
        <div>
          <span className={classes.cart__item__selected__quantity}>
            {item.selectedQuantity.quantity} ML
          </span>
        </div>
        <div>
          <span className={classes.cart__item__price}>{item.price}$</span>
        </div>
        <div className={classes.cart__item__quantity__controller}>
          <button
            onClick={() =>
              decreaseHandler(
                item.id,
                item.selectedQuantity.quantity,
                item.productQuantity
              )
            }
            className={classes.cart__item__button}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.cart__item__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>
          <span className={classes.cart__item__quantity}>
            {item.productQuantity}
          </span>
          <button
            onClick={() =>
              increaseHandler(item.id, item.selectedQuantity.quantity)
            }
            className={classes.cart__item__button}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.cart__item__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div>
          <button
            className={classes.cart__item__remove}
            onClick={() =>
              removeHandler(item.id, item.selectedQuantity.quantity)
            }
          >
            Remove
          </button>
        </div>
      </div>
      {message && <p className={classes.cart__warning__stock}>{message}</p>}
    </div>
  );
}

export default CartItem;
