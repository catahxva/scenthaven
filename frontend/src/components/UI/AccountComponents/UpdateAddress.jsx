import classes from "./UpdateAddress.module.css";

import { forwardRef, useRef, useImperativeHandle, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUserAddress, queryClient } from "../../../util/utilities";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";

const UpdateAddress = forwardRef(function ({ address }, ref) {
  const dialog = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();

  const dispatch = useDispatch();

  const [contentState, setContentState] = useState("normal");
  const [errorState, setErrorState] = useState();
  const [buttonText, setButtonText] = useState("Submit");

  const token = useSelector((state) => state.auth.token);

  const addressTest = useSelector((state) => state.auth.address);

  const { mutate } = useMutation({
    mutationFn: updateUserAddress,
    onMutate() {
      setButtonText("Submitting...");
    },
    onError(error) {
      setErrorState(error);
      setContentState("error");
    },
    onSuccess(data) {
      const address = data.data.data;

      setContentState("success");

      dispatch(authActions.saveAddress({ address }));
    },
    onSettled() {
      setButtonText("Submit");
    },
  });

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const closeHandler = function () {
    dialog.current.close();
    console.log(addressTest);
    setContentState("normal");
    queryClient.invalidateQueries([`userData`, token]);
  };

  const submitHandler = function (e) {
    e.preventDefault();

    mutate({
      token,
      name: nameRef.current.value,
      email: emailRef.current.value,
      number: numberRef.current.value,
      street: streetRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postalCodeRef.current.value,
      country: countryRef.current.value,
      phone: phoneRef.current.value,
    });
  };

  let content;

  if (contentState === "normal") {
    content = (
      <form className={classes.address__form} onSubmit={submitHandler}>
        <div className={classes.address__form__group}>
          <label htmlFor="name" className={classes.address__form__label}>
            Contact name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={address ? address.name : ""}
            className={classes.address__form__input}
            ref={nameRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="name" className={classes.address__form__label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            defaultValue={address ? address.email : ""}
            className={classes.address__form__input}
            ref={emailRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="number" className={classes.address__form__label}>
            Street number
          </label>
          <input
            type="text"
            name="number"
            defaultValue={address ? address.number : ""}
            className={classes.address__form__input}
            ref={numberRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="street" className={classes.address__form__label}>
            Street
          </label>
          <input
            type="text"
            name="street"
            defaultValue={address ? address.street : ""}
            className={classes.address__form__input}
            ref={streetRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="city" className={classes.address__form__label}>
            City
          </label>
          <input
            type="text"
            name="city"
            defaultValue={address ? address.city : ""}
            className={classes.address__form__input}
            ref={cityRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="state" className={classes.address__form__label}>
            State
          </label>
          <input
            type="text"
            name="state"
            defaultValue={address ? address.state : ""}
            className={classes.address__form__input}
            ref={stateRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="postalCode" className={classes.address__form__label}>
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            defaultValue={address ? address.postalCode : ""}
            className={classes.address__form__input}
            ref={postalCodeRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="country" className={classes.address__form__label}>
            Country
          </label>
          <input
            type="text"
            name="country"
            defaultValue={address ? address.country : ""}
            className={classes.address__form__input}
            ref={countryRef}
            required
          />
        </div>
        <div className={classes.address__form__group}>
          <label htmlFor="phone" className={classes.address__form__label}>
            Phone
          </label>
          <input
            type="text"
            name="phone"
            defaultValue={address ? address.phone : ""}
            className={classes.address__form__input}
            ref={phoneRef}
            required
          />
        </div>
        <div className={classes.address__form__container__btns}>
          <button
            className={`${classes.address__form__btn} ${classes.address__form__btn__submit}`}
          >
            {buttonText}
          </button>
          <button
            onClick={closeHandler}
            className={classes.address__form__btn}
            type="button"
          >
            Close
          </button>
        </div>
      </form>
    );
  }

  if (contentState === "error") {
    content = (
      <div
        className={`${classes.address__container__message} ${classes.address__container__message__error}`}
      >
        <h3 className={classes.address__message}>{errorState.message}</h3>
        <div className={classes.address__btn__holder}>
          <button
            type="button"
            onClick={closeHandler}
            className={classes.address__form__btn}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (contentState === "success") {
    content = (
      <div
        className={`${classes.address__container__message} ${classes.address__container__message__success}`}
      >
        <h3 className={classes.address__message}>Updated successfully!</h3>
        <div className={classes.address__btn__holder}>
          <button
            type="button"
            onClick={closeHandler}
            className={classes.address__form__btn}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <dialog ref={dialog} className={classes.address__dialog}>
      {content}
    </dialog>
  );
});

export default UpdateAddress;
