import classes from "../../pages/Cart.module.css";

import CartItem from "./CartItem";

function CartItems({ items }) {
  const totalPrice = items.reduce((acc, c) => acc + c.price, 0);

  return (
    <>
      <div className={classes.cart__items__container}>
        {items.map((item) => {
          return (
            <CartItem
              item={item}
              key={`${item.id}${item.selectedQuantity.quantity}`}
            />
          );
        })}
      </div>
      <div className={classes.cart__total__container}>
        <div>
          <span className={classes.cart__total}>Total: {totalPrice}$</span>
          <button className={classes.cart__checkout}>Checkout</button>
        </div>
      </div>
    </>
  );
}

export default CartItems;
