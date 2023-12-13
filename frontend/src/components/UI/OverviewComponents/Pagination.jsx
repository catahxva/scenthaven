import classes from "./Pagination.module.css";

function Pagination({ maxPage }) {
  return (
    <div className={classes.overview__pagination__container}>
      <div className={classes.overview__pagination}>
        <button className={classes.overview__pagination__btn}>
          <span className={classes.overview__pagination__span}>1</span>
        </button>
        <button
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__span}>2</span>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
