import classes from "./OrderItem.module.css";

import { Link } from "react-router-dom";

function OrderItem({ order }) {
  const orderNumber = order._id.slice(-4).toUpperCase();
  const date = new Date(order.timeStamp).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link className={classes.order__item}>
      <div>
        <span className={classes.order__title}>Order {orderNumber}</span>
        <span className={classes.order__date}>{date}</span>
      </div>
      <div>
        <span className={classes.order__number__products}>
          Products: {order.products.length}
        </span>
        <span className={classes.order__total}>Total: {order.total}$</span>
      </div>
    </Link>
  );
}

export default OrderItem;
