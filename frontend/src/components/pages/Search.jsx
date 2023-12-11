import classes from "./Search.module.css";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../util/utilities";

import Placeholder from "../UI/Placeholder";
import ProductCard from "../UI/ProductCard";

function Search() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = function (e) {
    setInputValue(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchResults", inputValue],
    queryFn: ({ signal }) =>
      fetchProducts({ signal, queryString: `?search=${inputValue}` }),
    enabled: inputValue !== "",
  });

  let content = (
    <span className={classes.search__span}>
      Start typing to search for fragrances in our collection
    </span>
  );

  if (isLoading) content = <Placeholder message="Loading..." />;

  if (isError) content = <Placeholder message={error.message} type="error" />;

  if (data) {
    const searchResults = data.data.data;

    content =
      searchResults.length > 0 ? (
        <div className={classes.search__grid}>
          {searchResults.map((result) => {
            return <ProductCard product={result} key={result._id} />;
          })}
        </div>
      ) : (
        <span className={classes.search__span}>
          There are no results for your search
        </span>
      );
  }

  return (
    <section className="first__section">
      <form className={classes.search__form}>
        <button className={classes.search__btn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`"w-6 h-6 ${classes.search__svg}"`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <input
          className={classes.search__input}
          name="search"
          placeholder="Search..."
          value={inputValue}
          onChange={onChangeHandler}
        />
      </form>
      {content}
      <div className={classes.search__grid}></div>
    </section>
  );
}

export default Search;
