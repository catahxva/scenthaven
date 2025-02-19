import { useSelector } from "react-redux";
import { useState } from "react";

import { Link } from "react-router-dom";

import MobileNavigation from "./MobileNavigation";

import classes from "./Navigation.module.css";

function Navigation() {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const openMobileHandler = function () {
    setMobileNavActive(true);
  };

  const closeMobileHandler = function () {
    setMobileNavActive(false);
  };

  const username = useSelector((state) => state.auth.userName);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const numberOfItems = useSelector((state) => state.cart.items).reduce(
    (acc, c) => acc + c.productQuantity,
    0
  );

  return (
    <div className={classes.container__nav}>
      <nav className={classes.nav}>
        <Link to="/" className={classes.nav__logo}>
          ScentHaven
        </Link>
        <div
          className={`${classes.nav__container} ${classes.nav__container__hidden}`}
        >
          <Link to="/overview" className={classes.nav__link}>
            Shop All
          </Link>
          <Link to="/overview/unisex" className={classes.nav__link}>
            Unisex
          </Link>
          <Link to="/overview/men's" className={classes.nav__link}>
            Men's
          </Link>
          <Link to="/overview/women's" className={classes.nav__link}>
            Women's
          </Link>
        </div>
        <div className={classes.nav__container}>
          <Link to="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-6 h-6 ${classes.nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
          <Link className={classes.nav__link__cart} to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <div className={classes.nav__link__cart__deco}>
              <span className={classes.nav__link__cart__deco__number}>
                {numberOfItems}
              </span>
            </div>
          </Link>
          <button
            className={`${classes.nav__menu}`}
            onClick={openMobileHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          {!isAuth && (
            <>
              <Link
                className={`${classes.nav__link} ${classes.nav__link__hidden}`}
                to="/auth?mode=signup"
              >
                Sign Up
              </Link>
              <Link
                className={`${classes.nav__link} ${classes.nav__link__hidden}`}
                to="/auth?mode=login"
              >
                Login
              </Link>
            </>
          )}
          {isAuth && (
            <Link
              to={`/account/${username}`}
              className={classes.nav__link__hidden}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${classes.nav__svg}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          )}
        </div>
      </nav>
      <MobileNavigation active={mobileNavActive} onClick={closeMobileHandler} />
    </div>
  );
}

export default Navigation;
