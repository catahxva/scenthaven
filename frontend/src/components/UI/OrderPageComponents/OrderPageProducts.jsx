import classes from "./OrderPageProducts.module.css";

import OrderPageProduct from "./OrderPageProduct";

function OrderPageProducts({ products }) {
  return (
    <div>
      <h3 className={classes.products__title}>Products</h3>
      <div className="generic__grid">
        {products.map((product) => {
          return <OrderPageProduct product={product} key={product.productId} />;
        })}
      </div>
    </div>
  );
}

export default OrderPageProducts;
