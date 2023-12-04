import classes from "./Product.module.css";

import SwiperElement from "../UI/SwiperElement";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient, fetchOneProduct } from "../../util/utilities";

function Product() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchOneProduct({ signal, id }),
  });

  console.log(data);

  return (
    <section className={classes.product__section}>
      <div className={classes.product__header}>
        <div className={classes.product__container__images}>
          <div className={classes.product__image__big}></div>
          <div className={classes.product__container__small__images}>
            <div className={classes.product__container__image__small}></div>
            <div className={classes.product__container__image__small}></div>
          </div>
        </div>
        <div className={classes.product__container__info}>
          <span className={classes.product__brand}>Dior</span>
          <h2 className={classes.product__title}>Title</h2>
          <span className={classes.product__concentration}></span>
          <div className={classes.product__container__quantities}>
            <div className={classes.product__quantity}>
              <span className={classes.product__quantity__span}>50 ML</span>
            </div>
            <div className={classes.product__quantity}>
              <span className={classes.product__quantity__span}>50 ML</span>
            </div>
          </div>
          <button className={classes.product__button__add}>Add to cart</button>
          <p>Description</p>
        </div>
      </div>
      <div className={classes.product__others}>
        <div className={classes.product__container__reviews}></div>
        <div className={classes.product__container__notes}>
          <div></div>
          <div></div>
          <div></div>
        </div>
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
