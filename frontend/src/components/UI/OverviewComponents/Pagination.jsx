import classes from "./Pagination.module.css";

function Pagination({ maxPage, currentPage, onClick }) {
  const currentPageNumber = Number(currentPage);
  const multiplePages = maxPage > 1;

  console.log(maxPage, currentPageNumber);

  let buttons;

  if (currentPageNumber === 1 && multiplePages && maxPage === 2) {
    buttons = (
      <>
        <button
          onClick={() => onClick(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPageNumber + 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber + 1}
          </span>
        </button>
      </>
    );
  }

  if (currentPageNumber === 1 && multiplePages && maxPage >= 3) {
    buttons = (
      <>
        <button
          onClick={() => onClick(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPageNumber + 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber + 1}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPageNumber + 2)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber + 2}
          </span>
        </button>
      </>
    );
  }

  if (currentPageNumber !== 1 && multiplePages && currentPageNumber < maxPage) {
    buttons = (
      <>
        <button
          onClick={() => onClick(currentPageNumber - 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPageNumber)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPageNumber + 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber + 1}
          </span>
        </button>
      </>
    );
  }

  if (currentPageNumber === maxPage && multiplePages && maxPage === 2) {
    buttons = (
      <>
        <button
          onClick={() => onClick(currentPage - 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPage)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber}
          </span>
        </button>
      </>
    );
  }

  if (currentPageNumber === maxPage && multiplePages && maxPage >= 3) {
    buttons = (
      <>
        <button
          onClick={() => onClick(currentPage - 2)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber - 2}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPage - 1)}
          className={classes.overview__pagination__btn}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber - 1}
          </span>
        </button>
        <button
          onClick={() => onClick(currentPage)}
          className={`${classes.overview__pagination__btn} ${classes.overview__pagination__btn__active}`}
        >
          <span className={classes.overview__pagination__span}>
            {currentPageNumber}
          </span>
        </button>
      </>
    );
  }

  if (!multiplePages) {
    buttons = <></>;
  }

  return (
    <div className={classes.overview__pagination__container}>
      <div className={classes.overview__pagination}>{buttons}</div>
    </div>
  );
}

export default Pagination;
