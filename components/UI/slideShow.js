import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

import classes from "../../styles/components/UI/slideShow.module.css";
import 'swiper/css';
import 'swiper/css/pagination';

const SlideShow = ({ imgs, width, height, containerStyle, containerClass }) => {
  return (
    <div
      className={`${classes.container} ${containerClass}`}
      style={containerStyle}
    >
      <div className={classes.imageContainer}>
        <Swiper
          slidesPerView={1}
          modules={[Pagination, A11y]}
          pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {imgs.map((img, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Image
                  className={classes.image}
                  id="container"
                  loader={() => img}
                  alt="product"
                  src={img}
                  width={width}
                  height={height}
                  draggable={false}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SlideShow;
