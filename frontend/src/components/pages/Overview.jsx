import classes from "./Overview.module.css";

import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Placeholder from "../UI/Placeholder";
import ProductCard from "../UI/ProductCard";

function Overview() {
  const [searchParams] = useSearchParams();

  console.log(Object.fromEntries(searchParams));

  return (
    <section className="first__section">
      <h2>All products</h2>
      <div className={classes.overview__grid}>
        <div className={classes.overview__container__filters}>
          <div className={classes.overview__filters__group}></div>
        </div>
        <div className={classes.overview__container__grid}>
          <div className={classes.overview__container__sorting}></div>
          <div className="generic__grid"></div>
          <div className={classes.overview__container__pagination}>
            <div className={classes.overview__pagination}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Overview;
