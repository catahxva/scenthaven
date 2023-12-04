import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import classes from "./Navigation.module.css";

function Navigation() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const numberOfItems = useSelector((state) => state.cart.items).reduce(
    (acc, c) => acc + c.productQuantity,
    0
  );

  console.log(useSelector((state) => state.cart.items));

  return (
    <div className={classes.container__nav}>
      <nav className={classes.nav}>
        <Link to="/" className={classes.nav__logo}>
          ScentHaven
        </Link>
        <div className={classes.nav__container}>
          <Link className={classes.nav__link}>Shop All</Link>
          <Link className={classes.nav__link}>Unisex</Link>
          <Link className={classes.nav__link}>Men's</Link>
          <Link className={classes.nav__link}>Women's</Link>
        </div>
        <div className={classes.nav__container}>
          <Link>
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
          {!isAuth && (
            <>
              <Link className={classes.nav__link}>Sign Up</Link>
              <Link className={classes.nav__link}>Login</Link>
            </>
          )}
          {isAuth && (
            <>
              <Link>
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
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </Link>
              <Link>
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
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
