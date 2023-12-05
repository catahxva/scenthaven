import { useEffect } from "react";

import { useActionData, useSubmit } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./AuthVerify.module.css";

function AuthVerify() {
  const data = useActionData();
  const submit = useSubmit();
  const dispatch = useDispatch();

  useEffect(() => {
    submit(null, { method: "post" });
  }, []);

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
    console.log(res);
  }

  console.log(res);

  return null;
}

export default AuthVerify;
