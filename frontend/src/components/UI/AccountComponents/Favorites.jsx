import classes from "./Favorites.module.css";

import ProductCard from "../ProductCard";

function Favorites({ favorites }) {
  const favoritesLength = favorites.length;

  let content;

  if (favoritesLength === 0)
    content = (
      <span className={classes.account__favorites__span}>
        You have no favorite products yet
      </span>
    );

  if (favoritesLength > 0) {
    content = (
      <div className={classes.account__favorites__grid}>
        {favorites.map((fav) => {
          return <ProductCard product={fav} type="favorite" key={fav._id} />;
        })}
      </div>
    );
  }

  return <div className={classes.account__favorites}>{content}</div>;
}

export default Favorites;
