import { Link } from "react-router-dom";
import classes from "./Orders.module.css";

function Orders({ orders }) {
  const ordersLength = orders.length;

  let content;

  if (ordersLength === 0)
    content = (
      <>
        <span className={classes.account__orders__span}>
          You have no orders yet!
        </span>
        <Link>Start shopping</Link>
      </>
    );

  if (ordersLength > 0)
    content = (
      <div className={classes.account__orders__grid}>
        <Link className={classes.account__order}></Link>
      </div>
    );

  return <div className={classes.account__orders__container}>{content}</div>;
}

export default Orders;
