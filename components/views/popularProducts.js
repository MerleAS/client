'use client'

import { useRef } from 'react'
import useIsMobile from '../../util/useIsMobile'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const PopularProducts = ({ products, containerClass }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const width = useIsMobile('dynamic')


  return (
    <div className={`hidden md:flex md:flex-col px-4 md:px-6 space-y-12 w-full max-w-[100vw] py-12 ${containerClass}`}>
      <h4 className="w-full flex items-center justify-center font-medium text-2xl">
        Populære Produkter
      </h4>

      <div className="flex items-center">
        <span
          className={`swiper-button-prev`}
          style={{ position: 'relative', marginRight: '32px' }}
          ref={prevRef}
        />
        <Swiper
          slidesPerView={width > 1100 ? 3 : width > 800 ? 2 : 1}
          modules={[A11y, Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }}
        >
          {products.map((prod, idx) => {
            return (
              <SwiperSlide key={idx} className="w-full h-full px-2">
                <Link href={`/products/${prod._id}`} className="w-full h-full space-y-2">
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
                  <p className="font-medium text-lg">{prod.title}</p>
                  <p className="text-dark opacity-70">{prod.description}</p>
                  <p className="font-semibold">{prod.price} kr</p>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <span
          className="swiper-button-next"
          ref={nextRef}
          style={{ position: 'relative', marginLeft: '32px' }}
        />
      </div>
    </div>
  )
}

export default PopularProducts
/* 'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation } from 'swiper/modules'

import "../../public/styles/swiper.css";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const PopularProducts = ({ products }) => {
  console.log('prods', products)

  return (
    <div className="hidden md:flex px-12">
      <Swiper
        slidesPerView={3}
        modules={[A11y, Navigation]}
        navigation={true}
      >
        {products.map((prod, idx) => {
          return (
            <SwiperSlide key={idx} className="w-full h-full px-2 space-y-2">
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
              <p className="font-medium text-lg">{prod.title}</p>
              <p className="text-dark opacity-70">{prod.description}</p>
              <p className="font-semibold">{prod.price} kr</p>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
    </>
  )
}

export default PopularProducts
 */
