exports.createFilters = (query) => {
  const filters = {};

  if (query.search) {
    filters.$or = [
      { name: { $regex: new RegExp(query.search, "i") } },
      { brand: { $regex: new RegExp(query.search, "i") } },
    ];
  }

  if (query.brand) {
    filters.brand = {
      $in: query.brand.split(",").map((b) => new RegExp(b, "i")),
    };
  }

  if (query.concentration) {
    filters.concentration = {
      $in: query.concentration.split(",").map((c) => new RegExp(c, "i")),
    };
  }

  if (query.gender) {
    filters.gender = {
      $in: query.gender.split(",").map((g) => new RegExp(g, "i")),
    };
  }

  if (query.minimum && query.maximum) {
    filters.quantities = {
      $elemMatch: {
        price: {
          $gte: Number(query.minimum),
          $lte: Number(query.maximum),
        },
      },
    };
  }

  return filters;
};

exports.createSort = (query) => {
  let sortCriteria = {};

  if (query.sort === "priceAscending") {
    sortCriteria = { "quantities.price": 1 };
  }

  if (query.sort === "priceDescending") {
    sortCriteria = { "quantities.price": -1 };
  }

  if (query.sort === "ratingAscending") {
    sortCriteria = { ratingsAverage: 1 };
  }

  if (query.sort === "ratingDescending") {
    sortCriteria = { ratingsAverage: -1 };
  }

  if (query.sort === "latest") {
    sortCriteria = { timeStamp: -1 };
  }

  return sortCriteria;
};

exports.createPagination = (query) => {
  let skip = 0;
  let limit = 10;

  if (query.limit) {
    limit = query.limit;
  }

  if (query.page) {
    skip = query.page * 10 - limit;
  }

  return [skip, limit];
};
