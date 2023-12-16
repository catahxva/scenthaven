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
      breakpoints={{
        1070: {
          slidesPerView: 4,
        },
        815: {
          slidesPerView: 3,
        },
        561: {
          slidesPerView: 2,
        },
        100: {
          slidesPerView: 1,
        },
      }}
    >
      {data.map((product) => {
        return (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} type="slider" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperElement;
