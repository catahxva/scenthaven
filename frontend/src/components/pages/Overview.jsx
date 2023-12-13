import classes from "./Overview.module.css";

import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchFilters } from "../../util/utilities";

import Placeholder from "../UI/Placeholder";
import Filters from "../UI/OverviewComponents/Filters";
import ProductsGrid from "../UI/OverviewComponents/ProductsGrid";
import SortingForm from "../UI/OverviewComponents/SortingForm";
import Pagination from "../UI/OverviewComponents/Pagination";

function Overview() {
  const [searchParams, setSearchParams] = useSearchParams();

  const entries = Object.entries(Object.fromEntries(searchParams));

  const activeValues = entries
    .reduce((acc, entry) => {
      if (
        entry[0] === "brand" ||
        entry[0] === "concentration" ||
        entry[0] === "gender"
      ) {
        acc.push(entry[1].split(","));
      }
      return acc;
    }, [])
    .flat();

  const entrySort = entries.find((entry) => entry[0] === "sort");
  const activeSort = entrySort ? entrySort[1] : "default";

  const queryStr = entries.map((entry) => entry.join("=")).join("&");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryStr]);

  const filterValueClickHandler = function (categoryType, value) {
    setSearchParams((prevParams) => {
      const paramsObj = Object.fromEntries(prevParams);
      const paramsValueArray = paramsObj[categoryType]?.split(",");

      const keys = Object.keys(paramsObj);

      const index = keys.findIndex((key) => key === categoryType);
      const pageIndex = keys.findIndex((key) => key === "page");

      const valueExists = paramsValueArray?.find((val) => val === value);

      if (index >= 0 && !valueExists) {
        return {
          ...paramsObj,
          [categoryType]: `${paramsObj[categoryType]},${value}`,
        };
      }

      if (index < 0 && !valueExists) {
        return {
          ...paramsObj,
          [categoryType]: `${value}`,
        };
      }

      if (index >= 0 && valueExists && paramsValueArray.length > 1) {
        const existingIndex = paramsValueArray.findIndex(
          (val) => val === valueExists
        );

        const paramsValueArrayCopy = [...paramsValueArray];
        paramsValueArrayCopy.splice(existingIndex, 1);

        const newValue = paramsValueArrayCopy.join(",");

        return {
          ...paramsObj,
          [categoryType]: newValue,
        };
      }

      if (index >= 0 && valueExists && paramsValueArray.length === 1) {
        delete paramsObj[keys[index]];

        return {
          ...paramsObj,
        };
      }

      if (pageIndex >= 0) {
        delete paramsObj.page;

        return {
          ...paramsObj,
        };
      }
    });
  };

  const sortChangeHandler = function (e) {
    const value = e.target.value;

    setSearchParams((prevParams) => {
      const paramsObj = Object.fromEntries(prevParams);

      if (value === "default") {
        delete paramsObj.sort;

        return {
          ...paramsObj,
        };
      }

      return {
        ...paramsObj,
        sort: value,
      };
    });
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allProducts", queryStr],
    queryFn: ({ signal }) =>
      fetchProducts({ signal, queryString: `?${queryStr}` }),
  });

  const {
    data: dataFilters,
    isPending: pendingFilters,
    isError: isErrorFilters,
    error: errorFilters,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: ({ signal }) => fetchFilters({ signal }),
  });

  let filtersContent;
  let productsContent;

  if (isPending) {
    productsContent = <Placeholder message="Loading..." />;
  }

  if (isError) {
    productsContent = <Placeholder message={error.message} type="error" />;
  }

  if (data) {
    const products = data.data.data;

    console.log(data);

    productsContent =
      products.length > 0 ? (
        <ProductsGrid products={products} />
      ) : (
        <Placeholder message="There are no products for your query" />
      );
  }

  if (pendingFilters) filtersContent = <Placeholder message="Loading..." />;

  if (isErrorFilters)
    filtersContent = <Placeholder message={errorFilters.message} />;

  if (dataFilters) {
    const { brandValues, genderValues, concentrationValues } = dataFilters.data;

    const valuesObj = {
      brand: brandValues,
      gender: genderValues,
      concentration: concentrationValues,
    };

    filtersContent = (
      <Filters
        valuesObj={valuesObj}
        activeValues={activeValues}
        onClick={filterValueClickHandler}
      />
    );
  }

  return (
    <section className="first__section">
      <h2>All products</h2>
      <div className={classes.overview__grid}>
        {filtersContent}
        <div className={classes.overview__container__grid}>
          <SortingForm onChange={sortChangeHandler} activeSort={activeSort} />
          {productsContent}
          <Pagination />
        </div>
      </div>
    </section>
  );
}

export default Overview;
