import classes from "./Account.module.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import TabbedComp from "../UI/AccountComponents/TabbedComp";

function Account() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const token = useSelector((state) => state.auth.token);

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || token === null) navigate("/");
  }, [username, token]);

  return (
    <section className="first__section">
      <h2 className={classes.account__title}>Welcome {username}</h2>
      <TabbedComp />
    </section>
  );
}

export default Account;
