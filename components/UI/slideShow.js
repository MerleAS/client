import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper/modules";

import classes from "../../styles/components/UI/slideShow.module.css";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

const SlideShow = ({
  imgs,
  width,
  height,
  containerStyle,
  containerClass,
  navigation,
}) => {
  const modules = [Pagination, A11y, Pagination];
  if (navigation) {
    modules.push(Navigation);
  }
  return (
    <div
      className={`${classes.container} ${containerClass}`}
      style={containerStyle}
    >
      <div className={classes.imageContainer}>
        <Swiper
          slidesPerView={1}
          modules={modules}
          navigation={navigation}
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
                  alt="image"
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
