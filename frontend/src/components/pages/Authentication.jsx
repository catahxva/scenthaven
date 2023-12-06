import classes from "./Authentication.module.css";

import AuthForm from "../UI/AuthenticationComponents/AuthForm";
import AuthPromo from "../UI/AuthenticationComponents/AuthPromo";

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

  const actionData = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(actionData);

  useEffect(() => {
    if (actionData !== undefined) {
      dispatch(
        authActions.login({
          token: actionData[0],
          expiration: actionData[1],
          userName: actionData[2],
        })
      );

      navigate("/");
    }
  }, [actionData]);

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
      <AuthForm
        isSignup={isSignup}
        isLogin={isLogin}
        isForgot={isForgot}
        isForgotReset={isForgotReset}
        isReset={isReset}
        isSubmitting={isSubmitting}
        linkAddress={linkAddress}
        linkText={linkText}
        buttonText={buttonText}
      />
      <AuthPromo />
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

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const { token, userName } = await response.json();
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 90);

  if (mode === "signup" || mode === "forgot") return redirect("/auth-message");

  if (mode === "login" && token) {
    return [token, expiration.toISOString(), userName];
  }

  if (mode === "reset" && token) {
    return [token, expiration.toISOString(), userName];
  }

  if (mode === "forgotReset" && token) {
    return [token, expiration.toISOString(), userName];
  }
}

export default Authentication;
