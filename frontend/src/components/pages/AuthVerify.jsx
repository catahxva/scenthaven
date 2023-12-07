import { useEffect } from "react";

import { useActionData, useSubmit, json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import classes from "./AuthVerify.module.css";

function AuthVerify() {
  const actionData = useActionData();
  const submit = useSubmit();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData === undefined) {
      submit(null, { method: "post" });
    }

    if (actionData !== undefined) {
      dispatch(
        authActions.login({ token: actionData[0], expiration: actionData[1] })
      );

      navigate("/");
    }
  }, [actionData]);

  let content;

  return (
    <section className={classes.auth__verify__section}>
      <h2 className={classes.auth__verify__text}>Verifying...</h2>
    </section>
  );
}

export async function action({ params }) {
  const { token } = params;

  const bodyData = {
    token,
  };

  const response = await fetch(`http://localhost:3000/user/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const res = await response.json();

  if (!response.ok) {
    throw json(
      {
        message:
          "There has been a problem with verifying your email, try again later.",
      },
      { status: 500 }
    );
  }

  const { token: userToken, username } = res;

  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 90);

  return [userToken, expiration.toISOString(), username];
}

export default AuthVerify;
