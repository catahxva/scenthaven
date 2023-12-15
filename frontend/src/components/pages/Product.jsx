import classes from "./Product.module.css";

import ProductImages from "../UI/ProductComponents/ProductImages";
import ProductInfo from "../UI/ProductComponents/ProductInfo";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient, fetchOneProduct } from "../../util/utilities";

import { fetchReviews, fetchProducts } from "../../util/utilities";
import useGetData from "../../hooks/useGetData";

import { createContext } from "react";

export const ProductIdContext = createContext({
  id: "",
});

const ProductIdContextProvider = function ({ children, id }) {
  const contextValue = {
    id,
  };

  return (
    <ProductIdContext.Provider value={contextValue}>
      {children}
    </ProductIdContext.Provider>
  );
};

function Product() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchOneProduct({ signal, id }),
  });
  const product = data.data.data;

  const { content: reviewsContent } = useGetData({
    key: ["reviews", id],
    id,
    fn: fetchReviews,
    dataType: "reviews",
    rating: product.ratingsAverage,
  });

  const { content: swiperContent } = useGetData({
    key: ["related", id],
    fn: fetchProducts,
    queryString: `?brand=${product.brand}`,
  });

  return (
    <>
      <section className="first__section">
        <div className={classes.product__header}>
          <ProductImages imagesArray={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
        <ProductIdContextProvider id={id}>
          {reviewsContent}
        </ProductIdContextProvider>
      </section>
      <section>
        <h2>From the same brand</h2>
        {swiperContent}
      </section>
    </>
  );
}

export function loader({ params }) {
  const { id } = params;

  return queryClient.fetchQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchOneProduct({ signal, id }),
  });
}

export default Product;
