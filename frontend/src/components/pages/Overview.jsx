import classes from "./Overview.module.css";

import { useEffect, useState } from "react";

import { useSearchParams, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchFilters } from "../../util/utilities";

import Placeholder from "../UI/Placeholder";
import Filters from "../UI/OverviewComponents/Filters";
import ProductsGrid from "../UI/OverviewComponents/ProductsGrid";
import SortingForm from "../UI/OverviewComponents/SortingForm";
import Pagination from "../UI/OverviewComponents/Pagination";
import FiltersMobile from "../UI/OverviewComponents/FiltersMobile";
import FiltersWrapper from "../UI/OverviewComponents/FiltersWrapper";

function Overview() {
  const [mobileVisibleFilters, setMobileVisibleFilters] = useState(false);

  const showMobileFilters = function () {
    setMobileVisibleFilters(true);
  };

  const hideMobileFilters = function () {
    setMobileVisibleFilters(false);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const { gender } = useParams();

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

  const entryPage = entries.find((entry) => entry[0] === "page");
  const activePage = entryPage ? entryPage[1] : 1;

  const queryStr = entries.map((entry) => entry.join("=")).join("&");

  useEffect(() => {
    setMobileVisibleFilters(false);
    window.scrollTo(0, 0);
  }, [queryStr]);

  const filterValueClickHandler = function (categoryType, value) {
    setSearchParams((prevParams) => {
      const paramsObj = Object.fromEntries(prevParams);
      const paramsValueArray = paramsObj[categoryType]?.split(",");

      const keys = Object.keys(paramsObj);

      const index = keys.findIndex((key) => key === categoryType);

      const valueExists = paramsValueArray?.find((val) => val === value);

      delete paramsObj.page;

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
    });
  };

  const sortChangeHandler = function (e) {
    const value = e.target.value;

    setSearchParams((prevParams) => {
      const paramsObj = Object.fromEntries(prevParams);

      delete paramsObj.page;

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

  const paginationHandler = function (page) {
    setSearchParams((prevParams) => {
      const paramsObj = Object.fromEntries(prevParams);

      if (page === 1) {
        delete paramsObj.page;

        return {
          ...paramsObj,
        };
      }

      return {
        ...paramsObj,
        page: page,
      };
    });
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["allProducts", queryStr, gender],
    queryFn: ({ signal }) => {
      if (!gender) {
        return fetchProducts({ signal, queryString: `?${queryStr}` });
      } else {
        return fetchProducts({ signal, gender, queryString: `?${queryStr}` });
      }
    },
  });

  const {
    data: dataFilters,
    isPending: pendingFilters,
    isError: isErrorFilters,
    error: errorFilters,
  } = useQuery({
    queryKey: ["filters", gender],
    queryFn: ({ signal }) => {
      if (!gender) {
        return fetchFilters({ signal });
      } else {
        return fetchFilters({ signal, gender });
      }
    },
  });

  let filtersContent;
  let productsContent;
  let maxPages;

  if (isPending) {
    productsContent = <Placeholder message="Loading..." />;
  }

  if (isError) {
    productsContent = <Placeholder message={error.message} type="error" />;
  }

  if (data) {
    const products = data.data.data;
    maxPages = data.data.maxPages;

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
      <>
        <FiltersMobile
          visible={mobileVisibleFilters}
          hideFilters={hideMobileFilters}
        >
          <Filters
            valuesObj={valuesObj}
            activeValues={activeValues}
            onClick={filterValueClickHandler}
          />
        </FiltersMobile>
        <FiltersWrapper>
          <Filters
            valuesObj={valuesObj}
            activeValues={activeValues}
            onClick={filterValueClickHandler}
          />
        </FiltersWrapper>
      </>
    );
  }

  return (
    <section className="first__section">
      <div
        className={
          mobileVisibleFilters
            ? classes.overview__active__bg
            : classes.overview__inactive__bg
        }
      ></div>
      <h2>All products</h2>
      <div className={classes.overview__grid}>
        {filtersContent}
        <div className={classes.overview__container__grid}>
          <button
            onClick={showMobileFilters}
            className={classes.overview__mobile__filter__btn}
          >
            Filters
          </button>
          <SortingForm onChange={sortChangeHandler} activeSort={activeSort} />
          {productsContent}
          {data && (
            <Pagination
              maxPage={maxPages}
              currentPage={activePage}
              onClick={paginationHandler}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Overview;
