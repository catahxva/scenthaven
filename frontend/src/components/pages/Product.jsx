import classes from "./Product.module.css";

import SwiperElement from "../UI/SwiperElement";
import ProductImages from "../UI/ProductComponents/ProductImages";
import ProductInfo from "../UI/ProductComponents/ProductInfo";
import ProductReviews from "../UI/ProductComponents/ProductReviews";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient, fetchOneProduct } from "../../util/utilities";

function Product() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchOneProduct({ signal, id }),
  });
  const product = data.data.data;

  return (
    <section className={classes.product__section}>
      <div className={classes.product__header}>
        <ProductImages imagesArray={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>
      <div className={classes.product__others}>
        <div className={classes.product__container__reviews}></div>
      </div>
    </section>
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
