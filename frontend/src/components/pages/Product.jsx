import classes from "./Product.module.css";

import SwiperElement from "../UI/SwiperElement";
import ProductImages from "../UI/ProductComponents/ProductImages";
import ProductInfo from "../UI/ProductComponents/ProductInfo";
import ProductReviews from "../UI/ProductComponents/ProductReviews";
import ProductNoReviews from "../UI/ProductComponents/ProductNoReviews";
import Placeholder from "../UI/Placeholder";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient, fetchOneProduct } from "../../util/utilities";

import { fetchReviews, fetchProducts } from "../../util/utilities";
import useGetData from "../../hooks/useGetData";

function Product() {
  const { id } = useParams();

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
      <section className={classes.product__section}>
        <div className={classes.product__header}>
          <ProductImages imagesArray={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
        {reviewsContent}
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
