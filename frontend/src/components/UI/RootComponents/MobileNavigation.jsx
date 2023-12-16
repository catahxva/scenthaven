import { Link } from "react-router-dom";
import classes from "./MobileNavigation.module.css";

import { useSelector } from "react-redux";

function MobileNavigation({ active, onClick }) {
  const username = useSelector((state) => state.auth.userName);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <div
        className={`${classes.overview} ${
          active ? classes.overview__active : ""
        }`}
        onClick={onClick}
      ></div>
      <div
        className={`${classes.mobile__nav} ${
          active ? classes.mobile__nav__active : ""
        }`}
      >
        <div className={classes.mobile__nav__interior}>
          <button className={classes.mobile__nav__close__btn} onClick={onClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.mobile__nav__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className={classes.mobile__nav__list}>
            <li>
              <Link
                onClick={onClick}
                to="/overview"
                className={classes.mobile__nav__link}
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                onClick={onClick}
                to="/overview/men's"
                className={classes.mobile__nav__link}
              >
                Men's
              </Link>
            </li>
            <li>
              <Link
                onClick={onClick}
                to="/overview/unisex"
                className={classes.mobile__nav__link}
              >
                Women's
              </Link>
            </li>
            <li>
              <Link
                onClick={onClick}
                to="/overview/women's"
                className={classes.mobile__nav__link}
              >
                Unisex
              </Link>
            </li>
            {!isAuth && (
              <>
                <li>
                  <Link
                    onClick={onClick}
                    to="/auth?mode=signup"
                    className={classes.mobile__nav__link}
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={onClick}
                    to="/auth?mode=login"
                    className={classes.mobile__nav__link}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {isAuth && (
              <li>
                <Link
                  onClick={onClick}
                  to={`/account/${username}`}
                  className={classes.mobile__nav__link}
                >
                  Account
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MobileNavigation;
