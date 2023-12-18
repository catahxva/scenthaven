import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const fetchProducts = async function ({ signal, gender, queryString }) {
  let url;

  if (!queryString && !gender) url = `http://localhost:3000/products`;

  if (queryString && !gender)
    url = `http://localhost:3000/products${queryString}`;

  if (queryString && gender)
    url = `http://localhost:3000/products/${gender}${queryString}`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok)
    throw new Error("An error occurred when fetching the products.");

  const data = await response.json();

  return data;
};

export const fetchFilters = async function ({ signal, gender }) {
  const url = gender
    ? `http://localhost:3000/products/get-filters/${gender}`
    : `http://localhost:3000/products/get-filters`;

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) throw new Error("Could not get filter values");

  const data = await response.json();

  return data;
};

export const fetchOneProduct = async function ({ signal, id }) {
  const response = await fetch(
    `http://localhost:3000/products/one-product/${id}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    throw new Error("An error occurred when fetching this product.");
  }
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

  if (!response.ok) {
    throw new Error(`Could not get cart products, please try again.`);
  }

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

export const sendReview = async function ({ token, review, rating, id }) {
  if (!token) throw new Error("You must be logged in to perform this action");
  if (!review) throw new Error("You must provide a review");
  if (!rating) throw new Error("You must provide a rating");
  const dataToSend = {
    review,
    rating,
    id,
  };

  const response = await fetch(`http://localhost:3000/reviews/upload-review`, {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();

  if (!response.ok) throw new Error(resData.message);
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

export const changeFavorites = async function ({ token, id }) {
  if (!token) throw new Error("You must register to perform this action");

  const response = await fetch(`http://localhost:3000/favorites/change-favs`, {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Couldn't update your favorite products`);
  }
};

export const getFavorites = async function ({ signal, token }) {
  if (!token) throw new Error("You must regist to see your favorites");

  const response = await fetch(`http://localhost:3000/favorites`, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not get your favorite products");
  }

  const data = await response.json();

  return data;
};

export const getUserAccount = async function ({ signal, token }) {
  if (!token) throw new Error(`You must be logged in to perform this action`);

  const response = await fetch(`http://localhost:3000/user/get-account`, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not get your account data");
  }

  const data = await response.json();

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

  const response = await fetch(`http://localhost:3000/user/address`, {
    method: "POST",
    body: JSON.stringify(addressData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Error(
      "There was an erorr with updating your address. Please try later"
    );

  const data = await response.json();

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

  const response = await fetch(
    `http://localhost:3000/orders/create-payment-intent`,
    {
      signal,
      method: "POST",
      body: JSON.stringify({ shipping, products, token }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("There has been an error.");
  }

  const { clientSecret } = await response.json();

  return clientSecret;
};

export const getOrders = async function ({ signal, email, token }) {
  if (!email) throw new Error(`You must provide a valid email`);

  const response = await fetch(`http://localhost:3000/orders`, {
    signal,
    method: "POST",
    body: JSON.stringify({ email, token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("There was a problem with getting your orders");
  }

  const data = await response.json();

  return data;
};

export const fetchOneOrder = async function ({ signal, id }) {
  if (!id) {
    throw new Error("You must provide a valid id for your order");
  }
  const response = await fetch(`http://localhost:3000/orders/one-order/${id}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("There has been an error with getting your order");
  }
  const data = await response.json();

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
