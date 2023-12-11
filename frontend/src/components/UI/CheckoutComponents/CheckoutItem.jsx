import classes from "./CheckoutItem.module.css";

function CheckoutItem({ item }) {
  return (
    <div className={classes.checkout__item}>
      <div>
        <span className={classes.checkout__item__brand}>{item.brand}</span>
        <span className={classes.checkout__item__name}>{item.name}</span>
        <span className={classes.checkout__item__span}>
          {item.selectedQuantity.quantity} ML
        </span>
      </div>
      <div className={classes.checkout__item__details}>
        <span className={classes.checkout__item__span}>
          Quantity: {item.productQuantity}
        </span>
        <span className={classes.checkout__item__span}>
          Price: {item.price}$
        </span>
      </div>
    </div>
  );
}

export default CheckoutItem;
