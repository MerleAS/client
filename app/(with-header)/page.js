import Image from 'next/image'
import Link from 'next/link'

const imageUrls = [
  '/images/landing1.png',
  '/images/landing2.png',
  '/images/landing3.png',
]

import { getAvaliableProducts } from '../../actions/getProducts'

import PopularProducts from '../../components/views/popularProducts'

const Home = async () => {
  const products = await getAvaliableProducts()

  return (
    <div className="w-full flex flex-col">
      <div className="absolute md:hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-white px-8 py-2 rounded-sm shadow-3xl shadow-black z-10">
        <Link
          href="/products?page=1"
          className="cursor-pointer outline-none w-full text-lg lg:text:xl"
        >
          SHOP
        </Link>
      </div>

      <div className="hidden md:flex h-full w-full flex-row justify-evenly mt-4 mb-[5%]">
        {imageUrls.map((imageUrl, index) => {
          return (
            <div className="mt-4 w-[32%] h-[90vh] overflow-hidden" key={index}>
              <Image
                className="h-[90vh] w-[49vw] overflow-hidden aspect-square object-cover object-center "
                src={imageUrl}
                alt="image"
                height={1500}
                width={1000}
                sizes="49vw"
              />
            </div>
          )
        })}
      </div>

      <div className="w-full !h-full md:hidden">
        <Image
          className="w-full !h-full"
          src="/images/landing2.png"
          /* loader={() => '/images/landing2.png'} */
          alt="image"
          height={1500}
          width={1000}
          layout="responsive"
          objectFit="cover"
          priority={true}
        />
      </div>

      <PopularProducts products={products} />
    </div>
  )
}

export default Home
