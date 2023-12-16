import classes from "./OrderItem.module.css";

import { Link } from "react-router-dom";

function OrderItem({ order }) {
  const orderNumber = order._id.slice(-4).toUpperCase();
  const date = new Date(order.timeStamp).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const totalProducts = order.products.reduce((acc, product) => {
    return acc + product.productQuantity;
  }, 0);

  return (
    <Link to={`/order/${order._id}`} className={classes.order__item}>
      <div>
        <span className={classes.order__title}>Order {orderNumber}</span>
        <span className={classes.order__date}>{date}</span>
      </div>
      <div>
        <span className={classes.order__number__products}>
          Products: {totalProducts}
        </span>
        <span className={classes.order__total}>Total: {order.total}$</span>
      </div>
    </Link>
  );
}

export default OrderItem;
