"use client"

import { useEffect, useState } from 'react';

const useIsMobile = () => {

  const [widthSize, setWidthSize] = useState(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidthSize(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); 

  if (widthSize <= 800) {
    return true;
  }
  return false;
};

export default useIsMobile;
