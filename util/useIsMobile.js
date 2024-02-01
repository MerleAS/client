'use client'

import { useEffect, useState } from 'react'

const useIsMobile = (type) => {
  const [widthSize, setWidthSize] = useState(undefined)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidthSize(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (type === 'dynamic') {
    return widthSize
  }

  if (widthSize <= 800) {
    return true
  }
  return false
}

export default useIsMobile
