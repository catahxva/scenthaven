import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import "swiper/css/bundle";

import ProductCard from "./ProductCard";

function SwiperElement({ data }) {
  return (
    <Swiper
      modules={[Navigation, Keyboard, A11y]}
      navigation
      keyboard
      spaceBetween={30}
      slidesPerView={4}
    >
      {data.map((product) => {
        return (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperElement;
