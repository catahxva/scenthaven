import classes from "./AuthMessage.module.css";

import { useEffect } from "react";

import { Link } from "react-router-dom";

function AuthMessage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={classes.auth__message__section}>
      <h2 className={classes.auth__message__text}>
        We have sent you an email. Please access the link inside to proceed.
      </h2>
      <Link to="/" className={classes.auth__message__link}>
        Back to home page
      </Link>
    </section>
  );
}

export default AuthMessage;
