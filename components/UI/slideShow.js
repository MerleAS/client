import { useState, useEffect } from "react";
import Image from "next/image";

import classes from "../../styles/components/UI/slideShow.module.css";

let walk = 0

const SlideShow = (props) => {
  const { imgs, width, height } = props;

  const [index, setIndex] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState();
  const [x, setX] = useState()

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
    const doc = document.getElementById('container')
    setIsDown(true)
    setStartX(e.pageX - doc.offsetLeft)
  };

  const mouseLeaveHandler = (e) => {
    setIsDown(false)
    setStartX(undefined)
    setX(undefined)
  }

  const mouseMoveHandler = (e) => {
    const doc = document.getElementById('container')
    if (!isDown) {
      return
    }
    e.preventDefault()
    setX(e.pageX - doc.offsetLeft)
  };

  const indexHandler = (idx) => {
    setIndex(idx)
    setStartX(undefined)
    setX(undefined)
  };

  useEffect(() => {
    walk = x - startX
    console.log(walk)
    if (walk > 120) {
      prev()
      setStartX(x)
    }
    if (walk < -120) {
      next()
      setStartX(x)
    }
  }, [x, startX]);

  return (
    <div
      className={classes.container}
      onMouseDown={mouseDownHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseUp={() => setIsDown(false)}
      onMouseMove={mouseMoveHandler}
    >
      <Image
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
          let style = classes.index
          if (idx === index) {
            style = `${classes.index} ${classes.indexActive}`
          }
          return <div className={style} onClick={() => indexHandler(idx)}></div>
        })}
      </div>
    </div>
  );
};

export default SlideShow;
