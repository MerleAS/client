'use client'

import { useRef, useCallback } from 'react'
import useIsMobile from '../../util/useIsMobile'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const PopularProducts = ({ products, containerClass }) => {
  const sliderRef = useRef(null)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  const width = useIsMobile('dynamic')

  const modules = [A11y]

  if (width > 800) modules.push(Navigation)

  return (
    <div
      className={`flex flex-col md:px-6 space-y-12 w-full max-w-[100vw] py-12 bg-dark/5 ${
        width < 800 ? 'px-8' : ''
      }`}
    >
      <h4 className="w-full flex items-center justify-center font-medium text-lg md:text-2xl">
        Populære Produkter
      </h4>

      <div className="flex items-center">
        {width > 800 && (
          <span
            className={`swiper-button-prev`}
            style={{
              position: 'relative',
              marginRight: width > 800 ? '32px' : '22px',
            }}
            onClick={handlePrev}
          />
        )}

        <Swiper
          slidesPerView={width > 1100 ? 3 : width > 800 ? 2 : 1}
          modules={modules}
          ref={sliderRef}
        >
          {products.map((prod, idx) => {
            return (
              <SwiperSlide key={idx} className="w-full h-full md:px-2">
                <Link
                  href={`/products/${prod._id}`}
                  className="w-full h-full space-y-2"
                >
                  <Image
                    className=""
                    id="container"
                    loader={() =>
                      `${process.env.NEXT_PUBLIC_SERVER_URL}/${prod.imageUrls[0]}`
                    }
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${prod.imageUrls[0]}`}
                    alt="image"
                    width={1000}
                    height={1500}
                    objectFit="cover"
                    draggable={false}
                  />
                  <p className="font-medium text-base md:text-lg">
                    {prod.title}
                  </p>

                  <p className="font-semibold text-sm md:text-base">
                    {prod.price} kr
                  </p>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
        {width > 800 && (
          <span
            className="swiper-button-next"
            onClick={handleNext}
            style={{
              position: 'relative',
              marginLeft: width > 800 ? '32px' : '22px',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default PopularProducts
