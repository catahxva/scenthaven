import classes from "./AuthForm.module.css";

import { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";

function AuthForm({
  searchParams,
  isSignup,
  isLogin,
  isForgot,
  isForgotReset,
  isReset,
  isSubmitting,
  linkAddress,
  linkText,
  buttonText,
}) {
  const [passState, setPassState] = useState("");
  const [passConfirmState, setPassConfirmState] = useState("");

  useEffect(() => {
    setPassState("");
    setPassConfirmState("");
  }, [searchParams]);

  const onChange = function (e, pass) {
    if (pass === "password") setPassState(e.target.value);
    if (pass === "passwordConfirm") setPassConfirmState(e.target.value);
  };

  console.log(isSignup);

  const enabled =
    isSignup &&
    passState === passConfirmState &&
    passState !== "" &&
    passConfirmState !== "";

  console.log(enabled);

  return (
    <div className={classes.auth__container}>
      {isSignup && <h2>Signup</h2>}
      {isLogin && <h2>Login</h2>}
      {isForgot && <h2>Forgot</h2>}
      {(isForgotReset || isReset) && <h2>Reset</h2>}
      {isForgot && (
        <p>
          Send your email and you will receive a link which you can use to reset
          your password.
        </p>
      )}
      <Form method="post" className={classes.auth__form}>
        {isSignup && (
          <div className={classes.auth__form__group}>
            <label className={classes.auth__form__label} htmlFor="username">
              Username
            </label>
            <input
              className={classes.auth__form__input}
              type="text"
              name="userName"
              id="userName"
              required
              minLength={"6"}
            />
          </div>
        )}
        {(isSignup || isLogin || isForgot) && (
          <div className={classes.auth__form__group}>
            <label className={classes.auth__form__label} htmlFor="email">
              Email
            </label>
            <input
              className={classes.auth__form__input}
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
        )}
        {(isSignup || isLogin || isReset) && (
          <div className={classes.auth__form__group}>
            <label className={classes.auth__form__label} htmlFor="password">
              Password
            </label>
            <input
              className={classes.auth__form__input}
              type="password"
              name="password"
              id="password"
              value={passState}
              onChange={(e) => {
                onChange(e, "password");
              }}
              required
              minLength={"6"}
            />
          </div>
        )}
        {isSignup && (
          <div className={classes.auth__form__group}>
            <label
              className={classes.auth__form__label}
              htmlFor="passwordConfirm"
            >
              Confirm password
            </label>
            <input
              className={classes.auth__form__input}
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passConfirmState}
              onChange={(e) => {
                onChange(e, "passwordConfirm");
              }}
              required
              minLength={"6"}
            />
          </div>
        )}
        {(isReset || isForgotReset) && (
          <div className={classes.auth__form__group}>
            <label className={classes.auth__form__label} htmlFor="newPassword">
              New password
            </label>
            <input
              className={classes.auth__form__input}
              type="password"
              name="newPassword"
              id="newPassword"
              required
            />
          </div>
        )}
        {(isReset || isForgotReset) && (
          <div className={classes.auth__form__group}>
            <label
              className={classes.auth__form__label}
              htmlFor="confirmNewPassword"
            >
              Confirm new password
            </label>
            <input
              className={classes.auth__form__input}
              type="password"
              name="newPasswordConfirm"
              id="newPasswordConfirm"
              required
            />
          </div>
        )}
        <div className={classes.auth__form__container__btns}>
          <button
            disabled={isSubmitting || (!enabled && isSignup)}
            className={classes.auth__form__btn}
          >
            {!isSubmitting ? buttonText : "Submitting..."}
          </button>
          <Link to={linkAddress} className={classes.auth__link}>
            {linkText}
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
