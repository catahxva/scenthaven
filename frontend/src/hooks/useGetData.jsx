import Placeholder from "../components/UI/Placeholder";
import SwiperElement from "../components/UI/SwiperElement";
import ProductReviews from "../components/UI/ProductComponents/ProductReviews";
import ProductNoReviews from "../components/UI/ProductComponents/ProductNoReviews";

import { useQuery } from "@tanstack/react-query";

export default function useGetData({
  key,
  id,
  queryString,
  fn,
  dataType,
  rating,
}) {
  console.log(id, queryString);

  const { data, isPending, isError, error } = useQuery({
    queryKey: key,
    queryFn: ({ signal }) => {
      if (id) return fn({ signal, id });
      if (queryString) return fn({ signal, queryString });
    },
  });

  let nestedData;

  if (data) nestedData = data.data.data;

  if (dataType === "swiper") console.log(nestedData);

  let content;

  if (isPending) content = <Placeholder message="Loading..." />;

  if (isError) content = <Placeholder message={error.message} type="error" />;

  if (nestedData && nestedData.length > 0)
    content =
      dataType === "reviews" ? (
        <ProductReviews reviews={nestedData} rating={rating} />
      ) : (
        <SwiperElement data={nestedData} />
      );

  if (nestedData && nestedData.length === 0 && dataType === "reviews")
    content = <ProductNoReviews />;

  return { content };
}
