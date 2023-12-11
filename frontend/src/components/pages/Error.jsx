import classes from "./Error.module.css";

import { useRouteError } from "react-router-dom";

import Navigation from "../UI/RootComponents/Navigation";
import Footer from "../UI/RootComponents/Footer";

function Error() {
  const error = useRouteError();

  const message = error?.data?.message
    ? error.data.message
    : "Something went wrong. Please try again later!";

  return (
    <>
      <Navigation />
      <section className={classes.error__section}>
        <p className={classes.error__message}>{message}</p>
      </section>
      <Footer />
    </>
  );
}

export default Error;
