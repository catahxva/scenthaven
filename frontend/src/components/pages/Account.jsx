import classes from "./Account.module.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import TabbedComp from "../UI/AccountComponents/TabbedComp";

function Account() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { username } = useParams();
  const navigate = useNavigate();

  if (!username) navigate("/");

  return (
    <section className={classes.account__section}>
      <h2 className={classes.account__title}>Welcome {username}</h2>
      <TabbedComp />
    </section>
  );
}

export default Account;
