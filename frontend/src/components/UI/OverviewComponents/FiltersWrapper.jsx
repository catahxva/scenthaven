import classes from "./FiltersWrapper.module.css";

function FiltersWrapper({ children }) {
  return <div className={classes.filters__wrapper}>{children}</div>;
}

export default FiltersWrapper;
