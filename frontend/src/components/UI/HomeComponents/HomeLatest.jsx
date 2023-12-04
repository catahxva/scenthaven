import SwiperElement from "../SwiperElement";
import Placeholder from "../Placeholder";
import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../../../util/utilities";

function HomeLatest() {
  const queryString = "?sort=latest";

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["latestEvents"],
    queryFn: ({ signal }) => fetchProducts({ signal, queryString }),
  });

  console.log(data);

  let content;

  if (isPending) {
    content = <Placeholder message={"Loading..."} />;
  }

  if (isError) {
    content = <Placeholder message={error.message} type="error" />;
  }

  if (data && !isError) {
    const products = data.data.data;

    content = <SwiperElement data={products} />;
  }

  return (
    <section>
      <h2>Latest Products</h2>
      {content}
    </section>
  );
}

export default HomeLatest;
