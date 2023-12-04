import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const fetchProducts = async function ({ signal, queryString }) {
  const url = queryString
    ? `http://localhost:3000/products${queryString}`
    : `http://localhost:3000/products`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok)
    throw new Error("An error occurred when fetching the products.");

  const data = await response.json();

  return data;
};

export const fetchOneProduct = async function ({ signal, id }) {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    signal,
  });

  if (!response.ok)
    throw new Error("An error occurred when fetching this product.");

  const data = await response.json();

  return data;
};

export const fetchCartProducts = async function ({ signal, items }) {
  const response = await fetch(`http://localhost:3000/products/cart-items`, {
    signal,
    method: "POST",
    body: JSON.stringify({ products: items }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok)
    throw new Error(`Could not get cart products, please try again.`);

  const data = await response.json();

  return data;
};
