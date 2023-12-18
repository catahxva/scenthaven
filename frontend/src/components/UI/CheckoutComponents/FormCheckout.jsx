import classes from "./FormCheckout.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addressActions } from "../../../store/addressSlice";

function FormCheckout() {
  const address = useSelector((state) => state.auth.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();

  const addressExists = !address ? false : true;

  const submitHandler = function (e) {
    e.preventDefault();

    const tempAddress = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      number: numberRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postalCodeRef.current.value,
      country: countryRef.current.value,
      phone: phoneRef.current.value,
    };

    dispatch(addressActions.setTemporaryAddress({ address: tempAddress }));

    navigate("/payment");
  };

  return (
    <form className={classes.checkout__form} onSubmit={submitHandler}>
      <div className={classes.checkout__form__group}>
        <label htmlFor="name" className={classes.checkout__form__label}>
          Contact name
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.name : ""}
          className={classes.checkout__form__input}
          name="name"
          ref={nameRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="name" className={classes.checkout__form__label}>
          Email
        </label>
        <input
          type="email"
          defaultValue={addressExists ? address.email : ""}
          className={classes.checkout__form__input}
          name="email"
          ref={emailRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="number" className={classes.checkout__form__label}>
          Street number
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.number : ""}
          className={classes.checkout__form__input}
          name="number"
          ref={numberRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="street" className={classes.checkout__form__label}>
          Street name
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.street : ""}
          className={classes.checkout__form__input}
          name="street"
          ref={streetRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="city" className={classes.checkout__form__label}>
          City
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.city : ""}
          className={classes.checkout__form__input}
          name="city"
          ref={cityRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="state" className={classes.checkout__form__label}>
          State
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.state : ""}
          className={classes.checkout__form__input}
          name="state"
          ref={stateRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="postalCode" className={classes.checkout__form__label}>
          Postal code
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.postalCode : ""}
          className={classes.checkout__form__input}
          name="postalCode"
          ref={postalCodeRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="country" className={classes.checkout__form__label}>
          Country
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.country : ""}
          className={classes.checkout__form__input}
          name="country"
          ref={countryRef}
          required
        />
      </div>
      <div className={classes.checkout__form__group}>
        <label htmlFor="phone" className={classes.checkout__form__label}>
          Contact phone
        </label>
        <input
          type="text"
          defaultValue={addressExists ? address.phone : ""}
          className={classes.checkout__form__input}
          name="phone"
          ref={phoneRef}
          required
        />
      </div>
      <button className={classes.checkout__form__btn}>Go to payment</button>
    </form>
  );
}

export default FormCheckout;
