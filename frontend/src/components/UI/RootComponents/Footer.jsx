import { Link } from "react-router-dom";

import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <section className={classes.footer__section}>
        <div className={classes.footer__link__container}>
          <Link to={"/"} className={classes.footer__logo}>
            ScentHaven
          </Link>
          <div className={classes.footer__links}>
            <Link className={classes.footer__link}>Shop</Link>
            <Link className={classes.footer__link}>Register</Link>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
