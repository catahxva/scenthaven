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

export const fetchReviews = async function ({ signal, id }) {
  const response = await fetch(`http://localhost:3000/reviews/${id}`, {
    signal,
  });

  if (!response.ok) throw new Error(`Could not get reviews for this product.`);

  const data = await response.json();

  return data;
};

export const rateReviewFn = async function ({ userOpinion, id }) {
  const response = await fetch(`http://localhost:3000/reviews/rate-review`, {
    method: "POST",
    body: JSON.stringify({ id, userOpinion }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error(`Could not send request`);
};

export function calculateRatingPercentages(reviews) {
  const ratingCounts = {};

  reviews.forEach((review) => {
    const rating = review.rating;

    if (!ratingCounts[rating]) {
      ratingCounts[rating] = 1;
    } else {
      ratingCounts[rating]++;
    }
  });

  const totalReviews = reviews.length;

  const percentageResults = {};

  for (let rating = 5; rating >= 1; rating--) {
    const count = ratingCounts[rating];

    if (count !== undefined) {
      const percentage = (count / totalReviews) * 100;
      percentageResults[String(rating)] = percentage.toFixed(2);
    }
  }

  return percentageResults;
}
