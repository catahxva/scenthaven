import classes from "./Payment.module.css";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPaymentIntent } from "../../util/utilities";
import { fetchCartProducts } from "../../util/utilities";
import { processCartData } from "../../util/utilities";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../UI/PaymentComponents/PaymentForm";
import Placeholder from "../UI/Placeholder";

function Payment() {
  const token = useSelector((state) => state.auth.token);
  const address = useSelector((state) => state.tempAddress.address);
  const products = useSelector((state) => state.cart.items);
  const unavailableItems = useSelector((state) => state.cart.unavailableItems);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cartData } = useQuery({
    queryKey: ["payment", products],
    queryFn: ({ signal }) => fetchCartProducts({ signal, items: products }),
  });

  if (cartData) {
    processCartData(cartData.data.data, unavailableItems, dispatch);
  }

  useEffect(() => {
    if (
      !address ||
      Object.keys(address).length !== 9 ||
      !products ||
      products.length <= 0
    )
      navigate("/cart");
  }, [products]);

  const stripePromise = loadStripe(
    "pk_test_51OFgTpANFg5WW6bUtKBKsr9WtptmMNFYp9GohG43Yrzy1uCIwmfkON9mIPo9hLj2szRLi09RJxjJkFYBvvrgJVki00HPT8mgUl"
  );

  const [clientSecret, setClientSecret] = useState();

  const { data, isError, error } = useQuery({
    queryKey: ["clientSecret", { address, products }],
    queryFn: ({ signal }) =>
      getPaymentIntent({ signal, shipping: address, products, token }),
  });

  useEffect(() => {
    setClientSecret(data);
  }, [data]);

  return (
    <section className={classes.payment__section}>
      <div className={classes.payment__container}>
        <h2>Payment</h2>
        <span className={classes.payment__span}>
          Please keep in mind that this is just a project website, please use
          this card information to perform an order:
        </span>
        <ul className={classes.payment__list}>
          <li className={classes.payment__list__item}>
            Card number: 4242 4242 4242 4242
          </li>
          <li className={classes.payment__list__item}>Expiration: 04/24</li>
          <li className={classes.payment__list__item}>CVC: 424</li>
        </ul>
        {data && data.message && (
          <span className={classes.payment__message}>{data.message}</span>
        )}
        {stripePromise && clientSecret && !isError && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
          </Elements>
        )}
        {isError && <Placeholder message={error.message} type="error" />}
      </div>
    </section>
  );
}

export default Payment;
