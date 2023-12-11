import classes from "./PaymentForm.module.css";

import { useState } from "react";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { fetchCartProducts } from "../../../util/utilities";

function PaymentForm() {
  const items = useSelector((state) => state.cart.items);
  const stripe = useStripe();
  const elements = useElements();

  const { data } = useQuery({
    queryKey: ["totalAmount"],
    queryFn: ({ signal }) => fetchCartProducts({ signal, items }),
  });

  let amount;

  if (data) amount = data.data.data.reduce((acc, item) => acc + item.price, 0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState();

  const btnText = isProcessing ? "Processing..." : "Pay Now";

  const submitHandler = async function (e) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    console.log(window.location.origin);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-message`,
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsProcessing(false);
  };

  return (
    <form className={classes.payment__form} onSubmit={submitHandler}>
      <PaymentElement />
      <div className={classes.payment__form__container}>
        {amount && (
          <span className={classes.payment__amount}>Amount: {amount}$</span>
        )}
        <button
          disabled={isProcessing}
          className={classes.payment__form__button}
        >
          {btnText}
        </button>
      </div>
      {message && <span className={classes.payment__message}>{message}</span>}
    </form>
  );
}

export default PaymentForm;
