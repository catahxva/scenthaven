import classes from "./Filters.module.css";

function Filters({ valuesObj, activeValues, range, onClick }) {
  console.log(valuesObj);
  const valuesObjEntries = Object.entries(valuesObj);

  console.log(valuesObjEntries);

  const safeValuesObjEntries = valuesObjEntries.filter((entry) => {
    return entry[1] !== undefined;
  });

  return (
    <div className={classes.container__filters}>
      {safeValuesObjEntries.map((entry, i) => {
        return (
          <div className={classes.filters__group} key={entry[0]}>
            <h3 className={classes.filters__group__title}>{entry[0]}</h3>
            <div className={classes.filters__container__btns}>
              {entry[1].map((value) => {
                if (!value) return;

                return (
                  <button
                    onClick={() => onClick(entry[0], value)}
                    className={classes.filters__btn}
                    key={value}
                  >
                    <div
                      className={`${classes.filters__btn__deco} ${
                        activeValues.findIndex((active) => active === value) >=
                        0
                          ? classes.filters__btn__deco__active
                          : ""
                      }`}
                    ></div>
                    <span className={classes.filters__btn__span}>{value}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Filters;
