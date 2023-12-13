import classes from "./ProductsGrid.module.css";

import ProductCard from "../ProductCard";

function ProductsGrid({ products }) {
  return (
    <div className={classes.overview__container__grid}>
      <div className="generic__grid">
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
      <div className={classes.overview__container__pagination}>
        <div className={classes.overview__pagination}></div>
      </div>
    </div>
  );
}

export default ProductsGrid;
