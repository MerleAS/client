import { useState, useEffect } from "react";
import Image from "next/image";

import classes from "../../styles/components/UI/slideShow.module.css";
import useIsMobile from "../util/useIsMobile";

let walk = 0;

const SlideShow = ({ imgs, width, height, containerStyle, containerClass }) => {
  const isMobile = useIsMobile();

  const [pixelWalk, setPixelWalk] = useState(120);
  const [index, setIndex] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState();
  const [x, setX] = useState();

  const next = () => {
    if (index === imgs.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index === 0) {
      setIndex(imgs.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  const mouseDownHandler = (e) => {
    const doc = document.getElementById("container");
    setIsDown(true);
    if (!isMobile) {
      setStartX(e.pageX - doc.offsetLeft);
    } else if (isMobile) {
      if (e.targetTouches) {
        setStartX(e.targetTouches[0].pageX - doc.offsetLeft);
      }
    }
  };

  const mouseLeaveHandler = (e) => {
    setIsDown(false);
    setStartX(undefined);
    setX(undefined);
  };

  const mouseMoveHandler = (e) => {
    const doc = document.getElementById("container");
    if (!isDown) {
      return;
    }
    /* e.preventDefault() */
    if (!isMobile) {
      setX(e.pageX - doc.offsetLeft);
    } else if (isMobile) {
      setX(e.targetTouches[0].pageX - doc.offsetLeft);
    }
  };

  const indexHandler = (idx) => {
    setIndex(idx);
    setStartX(undefined);
    setX(undefined);
  };

  useEffect(() => {
    if (isMobile) {
      setPixelWalk(90);
    }
  });

  useEffect(() => {
    walk = x - startX;
    if (walk > pixelWalk) {
      prev();
      setStartX(x);
    }
    if (walk < pixelWalk * -1) {
      next();
      setStartX(x);
    }
  }, [x, startX]);

  return (
    <div
      className={`${classes.container} ${containerClass}`}
      style={containerStyle}
      onMouseDown={mouseDownHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseUp={() => setIsDown(false)}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseDownHandler}
      onTouchCancel={mouseLeaveHandler}
      onTouchEnd={() => setIsDown(false)}
      onTouchMove={mouseMoveHandler}
    >
      <Image
        className={classes.image}
        id="container"
        loader={() => imgs[index]}
        alt="product"
        src={imgs[index]}
        width={width}
        height={height}
        draggable={false}
      ></Image>
      <div className={classes.indexContainer}>
        {imgs.map((img, idx) => {
          let style = classes.index;
          if (idx === index) {
            style = `${classes.index} ${classes.indexActive}`;
          }
          return (
            <div
              className={style}
              key={idx}
              onClick={() => indexHandler(idx)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SlideShow;
