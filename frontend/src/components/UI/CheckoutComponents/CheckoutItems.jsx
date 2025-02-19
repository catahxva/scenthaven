import classes from "./CheckoutItems.module.css";

import CheckoutItem from "./CheckoutItem";

function CheckoutItems({ items }) {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={classes.checkout__container__items}>
      <h2>Your items</h2>
      <div className={classes.checkout__flex__items}>
        {items.length > 0 &&
          items.map((item) => {
            return (
              <CheckoutItem item={item} key={`${item.id}${item.quantity}`} />
            );
          })}
      </div>
      <div className={classes.checkout__container__total}>
        <span className={classes.checkout__total}>Total: {totalPrice}$</span>
      </div>
    </div>
  );
}

export default CheckoutItems;
