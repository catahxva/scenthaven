import classes from "./Sorting.module.css";

function SortingForm({ onChange, activeSort }) {
  return (
    <form className={classes.overview__sorting__form}>
      <label className={classes.overview__sorting__form__label}>Sort:</label>
      <select
        defaultValue={activeSort}
        onChange={onChange}
        className={classes.overview__sorting__select}
      >
        <option value="default">Default</option>
        <option value="priceAscending">Price (ascending)</option>
        <option value="priceDescending">Price (descending)</option>
        <option value="ratingAscending">Rating (ascending)</option>
        <option value="ratingDescending">Rating (descending)</option>
        <option value="latest">Latest</option>
      </select>
    </form>
  );
}

export default SortingForm;
