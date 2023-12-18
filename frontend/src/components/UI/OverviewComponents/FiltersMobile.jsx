import classes from "./FiltersMobile.module.css";

function FiltersMobile({ children, visible, hideFilters }) {
  return (
    <div
      className={`${classes.filters__mobile__container} ${
        visible ? classes.filters__mobile__container__active : ""
      }`}
    >
      <div className={classes.filters__mobile__container__interior}>
        <button
          onClick={hideFilters}
          className={classes.filters__mobile__btn__close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${classes.filters__mobile__svg}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default FiltersMobile;
