import { Link } from "react-router-dom";
import classes from "./Orders.module.css";

import OrderItem from "./OrderItem";

function Orders({ orders }) {
  const ordersLength = orders.length;

  let content;

  if (ordersLength === 0)
    content = (
      <>
        <span className={classes.account__orders__span}>
          You have no orders yet!
        </span>
        <Link to="/overview" className={classes.account__orders__link}>
          Start shopping
        </Link>
      </>
    );

  if (ordersLength > 0)
    content = (
      <div className="generic__grid">
        {orders.map((order) => {
          return <OrderItem order={order} key={order._id} />;
        })}
      </div>
    );

  return <div className={classes.account__orders__container}>{content}</div>;
}

export default Orders;
