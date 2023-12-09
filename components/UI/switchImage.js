"use client";

import { useState } from "react";

import Image from "next/image";

const SwitchImage = ({ imageUrls, alt, width, height }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const mouseHoverHandler = (type) => {
    if (type === "over" && imageUrls.length > 1) {
      setImageIndex(1);
    } else {
      setImageIndex(0);
    }
  };

  return (
    <Image
      width={width}
      height={height}
      src={imageUrls[imageIndex]}
      loader={() => imageUrls[imageIndex]}
      alt={alt}
      onMouseOver={() => mouseHoverHandler("over")}
      onMouseOut={() => mouseHoverHandler("out")}
    />
  );
};

export default SwitchImage;
