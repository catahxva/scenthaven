import classes from "./OrderPageProduct.module.css";

function OrderPageProduct({ product }) {
  return (
    <div className={classes.product__order}>
      <div className={classes.product__order__container__img}>
        <img className={classes.product__order__img} src={product.cover} />
      </div>
      <span className={classes.product__brand}>{product.brand}</span>
      <span className={classes.product__name}>{product.name}</span>
      <span className={classes.product__span}>{product.quantity} ML</span>
      <span className={classes.product__span}>
        Price for one: {product.price}$
      </span>
      <span className={classes.product__span}>
        Total quantity: {product.productQuantity}
      </span>
    </div>
  );
}

export default OrderPageProduct;
