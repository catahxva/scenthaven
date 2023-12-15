import classes from "./AccountData.module.css";

import { useRef } from "react";

import { Link } from "react-router-dom";

import UpdateAddress from "./UpdateAddress";
import { useSelector } from "react-redux";

function AccountData({ accountData }) {
  const { address } = accountData;
  const doesAddressExist = Object.keys(address).length > 0;

  const updateAddressRef = useRef();

  const openHandler = function () {
    updateAddressRef.current.open();
  };

  return (
    <div className={classes.account__data}>
      <div className={classes.account__data__info}>
        <h3 className={classes.account__data__title}>Account general info</h3>
        <span className={classes.account__span}>
          Username: {accountData.userName}
        </span>
        <span className={classes.account__span}>
          Email: {accountData.email}
        </span>
        <span className={classes.account__span}>
          Favorite products:{" "}
          {accountData.favoritesAmount > 0
            ? accountData.favoritesAmount
            : "No favorite products"}
        </span>
        <span className={classes.account__span}>
          Orders:{" "}
          {accountData.ordersAmount > 0
            ? accountData.ordersAmount
            : "No orders yet"}
        </span>
        <Link to="/auth?mode=reset" className={classes.account__link}>
          Reset password
        </Link>
        <Link to="/logout" className={classes.account__link}>
          Logout
        </Link>
      </div>
      <div className={classes.account__data__address}>
        <h3 className={classes.account__data__title}>Address info</h3>
        {!doesAddressExist && (
          <span className={classes.account__span}>No address set yet</span>
        )}
        {doesAddressExist && (
          <>
            <span className={classes.account__span}>
              Contact name: {address.name}
            </span>
            <span className={classes.account__span}>
              Email: {address.email}
            </span>
            <span className={classes.account__span}>
              Street: {address.street}
            </span>
            <span className={classes.account__span}>
              Street number: {address.number}
            </span>
            <span className={classes.account__span}>City: {address.city}</span>
            <span className={classes.account__span}>
              State: {address.state}
            </span>
            <span className={classes.account__span}>
              Postal Code: {address.postalCode}
            </span>
            <span className={classes.account__span}>
              Country: {address.country}
            </span>
            <span className={classes.account__span}>
              Contact phone: {address.phone}
            </span>
          </>
        )}
        <button onClick={openHandler} className={classes.account__address__btn}>
          Modify address
        </button>
        <UpdateAddress address={address} ref={updateAddressRef} />
      </div>
    </div>
  );
}

export default AccountData;
