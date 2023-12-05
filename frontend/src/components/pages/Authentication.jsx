import classes from "./Authentication.module.css";

import {
  useSearchParams,
  Form,
  Link,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

function Authentication() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const isSignup = searchParams.get("mode") === "signup";
  const isLogin = searchParams.get("mode") === "login";
  const isForgot = searchParams.get("mode") === "forgot";
  const isForgotReset = searchParams.get("mode") === "forgotReset";
  const isReset = searchParams.get("mode") === "reset";

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
                name="confirmNewPassword"
                id="confirmNewPassword"
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
    </section>
  );
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;

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

  const response = await fetch(`http://localhost:3000/user/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const resData = await response.json();

  return redirect("/auth-message");
}

export default Authentication;
