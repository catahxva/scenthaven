import { QueryClient } from "@tanstack/react-query";

const baseUrl = `http://localhost:3000/mainapi/scent-haven/`;

export const queryClient = new QueryClient();

export const fetchProducts = async function ({ signal, gender, queryString }) {
  let url = `${baseUrl}products`;

  console.log(queryString);

  console.log(gender);

  if (queryString && queryString !== "?" && !gender) {
    console.log("CASE ONE");

    url = `${url}${queryString}`;
  }

  if (queryString && queryString !== "?" && gender) {
    console.log("CASE TWO");

    url = `${url}/${gender}${queryString}`;
  }

  if (queryString === "?" && gender) {
    console.log("CASE THREE");

    url = `${url}/${gender}`;
  }

  console.log(url);

  const response = await fetch(url, {
    signal,
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const fetchFilters = async function ({ signal, gender }) {
  const url = gender
    ? `${baseUrl}products/get-filters/${gender}`
    : `${baseUrl}products/get-filters`;

  const response = await fetch(url, {
    signal,
  });
  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const fetchOneProduct = async function ({ signal, id }) {
  const response = await fetch(`${baseUrl}products/one-product/${id}`, {
    signal,
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const fetchCartProducts = async function ({ signal, items }) {
  const response = await fetch(`${baseUrl}products/cart-items`, {
    signal,
    method: "POST",
    body: JSON.stringify({ products: items }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const fetchReviews = async function ({ signal, id }) {
  const response = await fetch(`${baseUrl}reviews/${id}`, {
    signal,
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const sendReview = async function ({ token, review, rating, id }) {
  if (!token) throw new Error("You must be logged in to perform this action");
  if (!review) throw new Error("You must provide a review");
  if (!rating) throw new Error("You must provide a rating");
  const dataToSend = {
    review,
    rating,
    id,
  };

  const response = await fetch(`${baseUrl}reviews/upload-review`, {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);
};

export const rateReviewFn = async function ({ userOpinion, id }) {
  const response = await fetch(`${baseUrl}reviews/rate-review`, {
    method: "POST",
    body: JSON.stringify({ id, userOpinion }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);
};

export const changeFavorites = async function ({ token, id }) {
  if (!token) throw new Error("You must register to perform this action");

  const response = await fetch(`${baseUrl}favorites/change-favs`, {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);
};

export const getFavorites = async function ({ signal, token }) {
  if (!token) throw new Error("You must regist to see your favorites");

  const response = await fetch(`${baseUrl}favorites`, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const getUserAccount = async function ({ signal, token }) {
  if (!token) throw new Error(`You must be logged in to perform this action`);

  const response = await fetch(`${baseUrl}user/get-account`, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const updateUserAddress = async function ({
  token,
  name,
  email,
  number,
  street,
  city,
  state,
  postalCode,
  country,
  phone,
}) {
  if (!token) throw new Error("You must be logged in to perform this action");
  if (!name) throw new Error("You must provide a contact name");
  if (!email) throw new Error("You must provide an email");
  if (!number) throw new Error("You must provide a street number");
  if (!city) throw new Error("You must provide a city name");
  if (!state) throw new Error("You must provide a state name");
  if (!postalCode) throw new Error("You must provide a postal code");
  if (!country) throw new Error("You must provide a country");
  if (!phone) throw new Error("You must provide a contact phone");

  const addressData = {
    name,
    email,
    number,
    street,
    city,
    state,
    postalCode,
    country,
    phone,
  };

  const response = await fetch(`${baseUrl}user/address`, {
    method: "POST",
    body: JSON.stringify(addressData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
};

export const getPaymentIntent = async function ({
  signal,
  shipping,
  products,
  token,
}) {
  if (!shipping) throw new Error("You must provide a shipping address");
  if (!products)
    throw new Error(
      "You must have products inside your cart to complete a payment"
    );

  const response = await fetch(`${baseUrl}orders/create-payment-intent`, {
    signal,
    method: "POST",
    body: JSON.stringify({ shipping, products, token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  const { clientSecret } = data;

  return clientSecret;
};

export const getOrders = async function ({ signal, email, token }) {
  if (!email) throw new Error(`You must provide a valid email`);

  const response = await fetch(`${baseUrl}orders`, {
    signal,
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail")
    throw new Error("There was a problem with getting your orders");

  return data;
};

export const fetchOneOrder = async function ({ signal, id }) {
  if (!id) {
    throw new Error("You must provide a valid id for your order");
  }
  const response = await fetch(`${baseUrl}orders/one-order/${id}`, {
    signal,
  });

  const data = await response.json();

  if (data.status === "fail") throw new Error(data.message);

  return data;
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
