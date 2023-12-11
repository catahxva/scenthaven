import classes from "./Payment.module.css";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPaymentIntent } from "../../util/utilities";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../UI/PaymentComponents/PaymentForm";
import Placeholder from "../UI/Placeholder";

function Payment() {
  const address = useSelector((state) => state.tempAddress.address);
  const products = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !address ||
      Object.keys(address).length !== 9 ||
      !products ||
      products.length <= 0
    )
      navigate("/cart");
  }, []);

  const stripePromise = loadStripe(
    "pk_test_51OFgTpANFg5WW6bUtKBKsr9WtptmMNFYp9GohG43Yrzy1uCIwmfkON9mIPo9hLj2szRLi09RJxjJkFYBvvrgJVki00HPT8mgUl"
  );

  const [clientSecret, setClientSecret] = useState();

  const { data, isError, error } = useQuery({
    queryKey: ["clientSecret", { address, products }],
    queryFn: ({ signal }) =>
      getPaymentIntent({ signal, shipping: address, products }),
  });

  useEffect(() => {
    setClientSecret(data);
  }, [data]);

  return (
    <section className={classes.payment__section}>
      <div className={classes.payment__container}>
        <h2>Payment</h2>
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
