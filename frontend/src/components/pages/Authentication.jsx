import classes from "./Authentication.module.css";

import { useEffect } from "react";

import {
  useSearchParams,
  Form,
  Link,
  useNavigation,
  json,
  redirect,
  useActionData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

function Authentication() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  console.log(isAuth);

  const actionData = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData !== undefined) {
      dispatch(
        authActions.login({ token: actionData[0], expiration: actionData[1] })
      );

      navigate("/");
    }
  }, [actionData]);

  // const loginHandler = function () {
  //   submit(null, { method: "post" });
  // };

  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const isSignup = searchParams.get("mode") === "signup";
  const isLogin = searchParams.get("mode") === "login";
  const isForgot = searchParams.get("mode") === "forgot";
  const isForgotReset = searchParams.get("mode") === "forgotReset";
  const isReset = searchParams.get("mode") === "reset";

  useEffect(() => {
    if ((isSignup || isLogin || isForgot || isForgotReset) && isAuth)
      navigate("/");
  }, [isSignup, isLogin, isForgot, isForgotReset, isAuth]);

  let linkAddress;
  let linkText;
  let buttonText;

  if (isSignup) {
    linkAddress = "/auth?mode=login";
    linkText = "Login";
    buttonText = "Signup";
  }
  if (isLogin) {
    linkAddress = "/auth?mode=forgot";
    linkText = "Forgot password";
    buttonText = "Login";
  }
  if (isForgot) {
    buttonText = "Send email";
  }
  if (isForgotReset || isReset) {
    buttonText = "Reset";
  }

  return (
    <section className={classes.auth__grid}>
      <div className={classes.auth__container}>
        {isSignup && <h2>Signup</h2>}
        {isLogin && <h2>Login</h2>}
        {isForgot && <h2>Forgot</h2>}
        {(isForgotReset || isReset) && <h2>Reset</h2>}
        {isForgot && (
          <p>
            Send your email and you will receive a link which you can use to
            reset your password.
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
                type="text"
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
                required
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
                required
              />
            </div>
          )}
          {(isReset || isForgotReset) && (
            <div className={classes.auth__form__group}>
              <label
                className={classes.auth__form__label}
                htmlFor="newPassword"
              >
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
            <button disabled={isSubmitting} className={classes.auth__form__btn}>
              {!isSubmitting ? buttonText : "Submitting..."}
            </button>
            <Link to={linkAddress} className={classes.auth__link}>
              {linkText}
            </Link>
          </div>
        </Form>
      </div>
      <div className={classes.auth__promo}>
        <h3 className={classes.auth__promo__title}>Welcome to Scent Haven</h3>
        <p>
          Your aromatic oasis for indulging in a world of captivating
          fragrances! At Scent Haven, we curate a diverse collection of premium
          perfumes, ensuring there's a perfect scent for every mood. Register
          today for a streamlined checkout experience and access to a
          personalized dashboard, where you can conveniently track previous
          orders and keep your favorite scents at your fingertips.
        </p>
        <p>
          Experience the convenience of registering at Scent Haven. Unlock a
          streamlined checkout process with securely stored delivery details for
          quick and efficient shopping. Registering also lets you create a wish
          list, making it easy to bookmark and revisit your favorite fragrances.
          Elevate your shopping experience by joining our exclusive community
          that values your choices and preferences. Register today for a scented
          adventure tailored just for you!
        </p>
        <p>
          Scent Haven – where fragrance meets convenience! Register now for
          streamlined checkout and easy access to a personalized dashboard.
          Track your orders effortlessly, store your preferred address securely,
          and create a wish list to bookmark and revisit your favorite scents.
          Join our exclusive community that values your choices – register today
          for a tailored and convenient shopping experience.
        </p>
      </div>
    </section>
  );
}

export async function action({ request, params }) {
  const searchParams = new URL(request.url).searchParams;
  const { token: resetToken } = params;

  const mode = searchParams.get("mode");

  if (
    mode !== "signup" &&
    mode !== "login" &&
    mode !== "forgot" &&
    mode !== "forgotReset" &&
    mode !== "reset"
  ) {
    throw json({ message: "Unsupported mode" }, { status: 400 });
  }

  const data = Object.fromEntries(await request.formData());

  if (mode === "reset") {
    const existingToken = JSON.parse(localStorage.getItem(`token`));
    data.token = existingToken;
  }

  if (mode === "forgotReset") {
    data.token = resetToken;
  }

  const response = await fetch(`http://localhost:3000/user/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 400) {
    // console.log(await response.json());
    return response;
  }

  if (!response.ok) {
    console.log(await response.json());
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const { token } = await response.json();
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 90);

  if (mode === "signup" || mode === "forgot") return redirect("/auth-message");

  if (mode === "login" && token) {
    return [token, expiration.toISOString()];
  }

  if (mode === "reset" && token) {
    return [token, expiration.toISOString()];
  }

  if (mode === "forgotReset" && !token) console.log(token);

  if (mode === "forgotReset" && token) {
    return [token, expiration.toISOString()];
  }
}

export default Authentication;
