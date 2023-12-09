import { useState } from "react";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserAccount, getFavorites } from "../../../util/utilities";

import classes from "./TabbedComp.module.css";

import TabbedButton from "./TabbedButton";
import Placeholder from "../Placeholder";
import AccountData from "./AccountData";
import Favorites from "./Favorites";

function TabbedComp() {
  const token = useSelector((state) => state.auth.token);
  const [enabledQuery, setEnabledQuery] = useState();

  const [activeTab, setActiveTab] = useState("data");

  const clickHandler = function (tab) {
    setActiveTab(tab);

    if (tab === "favorites" || tab === "orders") {
      setEnabledQuery(tab);
    }
  };

  const {
    data: userData,
    isPending: userPending,
    isError: userIsError,
    error: userError,
  } = useQuery({
    queryKey: [`userData`, token],
    queryFn: ({ signal }) => getUserAccount({ signal, token }),
  });

  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    isError: favoritesIsError,
    error: favoritesError,
  } = useQuery({
    queryKey: [`userFavorites`, token],
    queryFn: ({ signal }) => getFavorites({ signal, token }),
    enabled: enabledQuery === "favorites",
  });

  let content;
  let errorMessage;

  if (activeTab === "data") errorMessage = userError?.message;
  if (activeTab === "favorites") errorMessage = favoritesError?.message;
  if (activeTab === "orders") errorMessage = favoritesError?.message;

  if (userPending || favoritesLoading) {
    content = <Placeholder message="Loading..." />;
  }

  if (
    (userIsError && activeTab === "data") ||
    (favoritesIsError && activeTab === "favorites")
  ) {
    content = <Placeholder type="error" message={errorMessage} />;
  }

  if (userData && activeTab === "data") {
    const accountData = userData.data.data;

    content = <AccountData accountData={accountData} />;
  }

  if (favoritesData && activeTab === "favorites") {
    const favoritesList = favoritesData.data.data;
    console.log(favoritesList);

    content = <Favorites favorites={favoritesList} />;
  }

  return (
    <div className={classes.tabbed__comp}>
      <div className={classes.tabbed__comp__container__btns}>
        <TabbedButton
          className={`${classes.tabbed__btn} ${
            activeTab === "data" ? classes.tabbed__btn__active : ""
          }`}
          onClick={() => clickHandler("data")}
        >
          Account info
        </TabbedButton>
        <TabbedButton
          className={`${classes.tabbed__btn} ${
            activeTab === "favorites" ? classes.tabbed__btn__active : ""
          }`}
          onClick={() => clickHandler("favorites")}
        >
          Favorites
        </TabbedButton>
        <TabbedButton
          className={`${classes.tabbed__btn} ${
            activeTab === "orders" ? classes.tabbed__btn__active : ""
          }`}
          onClick={() => clickHandler("orders")}
        >
          Orders
        </TabbedButton>
      </div>
      {content}
    </div>
  );
}

export default TabbedComp;
