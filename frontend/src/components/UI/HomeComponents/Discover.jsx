import { Link } from "react-router-dom";

import classes from "./Discover.module.css";

function Discover() {
  return (
    <section>
      <h2>Discover Now</h2>
      <div className={classes.discover__flex}>
        <div className={classes.discover__category}>
          <img src="/mens.jpg" className={classes.discover__image} />
          <div className={classes.discover__info}>
            <h3>Men's Fragrances</h3>
            <Link className={classes.discover__link}>Shop Now</Link>
          </div>
        </div>
        <div className={classes.discover__category}>
          <img src="/unisex.jpg" className={classes.discover__image} />
          <div className={classes.discover__info}>
            <h3>Unisex Fragrances</h3>
            <Link className={classes.discover__link}>Shop Now</Link>
          </div>
        </div>
        <div className={classes.discover__category}>
          <img src="/womens.jpg" className={classes.discover__image} />
          <div className={classes.discover__info}>
            <h3>Women's Fragrances</h3>
            <Link className={classes.discover__link}>Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Discover;
