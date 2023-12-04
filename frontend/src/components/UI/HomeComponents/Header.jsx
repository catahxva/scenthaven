import classes from "./Header.module.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.header__bg}></div>
      <div className={classes.header__container__text}>
        <div className={classes.header__text}>
          <h1 className={classes.header__title}>
            Indulge Your Senses, Evoke Your Essence: Where Luxury Meets
            Fragrance.
          </h1>
          <p className={classes.header__p}>
            Welcome to a world where each scent tells a story, and every
            fragrance becomes a cherished memory. Explore our curated
            collection, crafted with passion and precision, designed to elevate
            your senses and embody the artistry of perfumery. Immerse yourself
            in the allure of fine fragrances – a journey that transcends time,
            captivates hearts, and defines your unique essence.
          </p>
          <div className={classes.header__container__buttons}>
            <Link className={classes.header__link}>Shop Now</Link>
            <Link className={classes.header__link__text}>Register</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
