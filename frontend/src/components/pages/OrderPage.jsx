import classes from "./OrderPage.module.css";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchOneOrder } from "../../util/utilities";

import Placeholder from "../UI/Placeholder";
import OrderPageAddress from "../UI/OrderPageComponents/OrderPageAddress";
import OrderPageProducts from "../UI/OrderPageComponents/OrderPageProducts";

function OrderPage() {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["order", id],
    queryFn: ({ signal }) => fetchOneOrder({ signal, id }),
  });

  let content;

  if (isPending) content = <Placeholder message="Loading..." />;

  if (isError) content = <Placeholder message={error.message} type="error" />;

  if (data) {
    const order = data.data.data;

    const { address, products } = order;

    console.log(order);

    content = (
      <>
        <h2>Order {order._id.slice(-4).toUpperCase()}</h2>
        <div className={classes.order__page__grid}>
          <OrderPageAddress address={address} />
          <OrderPageProducts products={products} />
        </div>
      </>
    );
  }

  return <section className="first__section">{content}</section>;
}

export default OrderPage;
