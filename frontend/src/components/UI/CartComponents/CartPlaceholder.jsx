import classes from "./CartPlaceholder.module.css";

import { Link } from "react-router-dom";

function CartPlaceholder() {
  return (
    <div className={classes.cart__container__placeholder}>
      <p className={classes.cart__placeholder__text}>
        You have no items inside your shopping cart yet!{" "}
        <Link to="/overview" className={classes.cart__placeholder__link}>
          Start shopping now.
        </Link>
      </p>
    </div>
  );
}

export default CartPlaceholder;
