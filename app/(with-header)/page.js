"use client";

import Image from "next/image";
import Link from "next/link";

import useIsMobile from "../../util/useIsMobile";

const imageUrls = [
  "/images/landing-page-image2.png",
  "/images/landing-page-image7.png",
  "/images/landing-page-image3.png",
];

const imageUrls2 = [
  "/images/landing-page-image8.png",
  "/images/landing-page-image14.png",
  "/images/newproduct2.png",
];

const Home = () => {

  const isMobile = useIsMobile()

  return (
    <>
      <div className="w-full flex flex-col">
        {isMobile && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-white px-8 py-2 rounded-sm shadow-3xl shadow-black z-10">
            <Link
              href="/products"
              className="cursor-pointer outline-none w-full text-lg lg:text:xl"
            >
              SHOP
            </Link>
          </div>
        )}

        <div className="hidden md:flex md:flex-col w-full">
          <hr className="mb-4 height-[3px] border-1bg-grey mt-[4%]" />
          <h3 className="flex flex-col items-center text-xl justify-center">
            OUTFIT OF THE WEEK
          </h3>
          <hr className="mt-4 mb-4" />
        </div>

        {!isMobile && (
          <div className="h-full w-full flex flex-row justify-evenly mt-4 mb-[5%]">
            {imageUrls.map((imageUrl, index) => {
              return (
                <div
                  className="mt-4 w-[32%] h-[90vh] overflow-hidden"
                  key={index}
                >
                  <Image
                    className="h-[90vh] w-[49vw] overflow-hidden aspect-square object-cover object-center "
                    src={imageUrl}
                    alt="image"
                    height={1500}
                    width={1000}
                    sizes="49vw"
                  />
                </div>
              );
            })}
          </div>
        )}
        {/* 
  <div className="hidden md:flex md:flex-col w-full">
    <hr className="mb-4 mt-12 height-[3px] border-1bg-grey" />
    <h3 className="my-1 flex flex-col items-center text-xl justify-center">
      THIS WEEKS INSPIRATION
    </h3>
    <hr className="mb-4 mt-4" />
  </div>

  {!isMobile && (
    <div className="h-full w-full flex flex-row mt-12 mb-2 justify-evenly mb-[5%]">
      <div className="w-[15%] h-[10%]overflow-hidden flex flex-col !space-y-18">
        <div className="hover:scale-105 cursor-pointer flex flex-col !space-y-18">
          <Image
            className="hover:scale-105 cursor-pointer object-cover object-center"
            src={"/images/landing-page-image8.png"}
            alt="image"
            height={1500}
            width={1000}
            sizes="49vw"
          />
         <h3 className="flex flex-col items-center justify-center">
            Fall outfit
          </h3>
          <p className="flex flex-col mb-12 text-sm mt-2 items-center justify-center">
            This fall outfit with our black chanel ballerinas and dior
            lady bag
          </p>
        </div>

        <div className="hover:scale-105 cursor-pointer flex flex-col !space-y-18">
          <Image
            className="overflow-hidden aspect-square object-cover object-center "
            src={"/images/landing-page-image11.png"}
            alt="image"
            height={1500}
            width={1000}
            sizes="49vw"
          />
         <h3 className="flex flex-col items-center justify-center">
            Chloe Tote bag
          </h3>
          <p className="flex flex-col mb-14 items-center text-sm mt-2 justify-center">
            The Chloe tote bag is perfect for every seasons, and every
            outfits!
          </p>
        </div>
      </div>

      <div className="w-[40%] h-[100%] overflow-hidden">
        <Image
          className="h-[90vh] w-[49vw] overflow-hidden aspect-square object-cover object-center "
          src={"/images/landing-page-image.png"}
          alt="image"
          height={1500}
          width={1000}
          sizes="49vw"
        />
      </div>

      <div className=" w-[15%] h-[10%]overflow-hidden flex flex-col !space-y-18">
        <div className="hover:scale-105 cursor-pointer flex flex-col !space-y-18">
          <Image
            className="overflow-hidden aspect-square object-cover object-center "
            src={"/images/landing-page-image6.png"}
            alt="image"
            height={1500}
            width={1000}
            sizes="49vw"
          />
          <h3 className="flex flex-col items-center justify-center">
            Dior
          </h3>
          <p className="flex flex-col mb-14 items-center text-sm mt-2 justify-center">
            The Dior Trotter Boston Canvas bag is really popular atm! The
            perfect bag for everything!
          </p>
        </div>

        <div className="hover:scale-105 cursor-pointer flex flex-col !space-y-18">
          <Image
            className="overflow-hidden aspect-square space-y-4 object-cover object-center "
            src={"/images/landing-page-image1.png"}
            alt="image"
            height={1500}
            width={1000}
            sizes="49vw"
          />
          <h3 className="flex flex-col items-center justify-center">
            Elegant style
          </h3>
          <p className="flex flex-col mb-12 text-sm mt-2 items-center justify-center">
            How to style elegant with the Dior lady bag! Simple black
            coat, silk scarf and you got it!
          </p> 
        </div>
      </div>
    </div>
  )}
*/}
        <div className="hidden md:flex md:flex-col w-full">
          <hr className="mb-4 mt-12 height-[3px] border-1bg-grey" />
          <h3 className="my-1 flex flex-col items-center text-xl justify-center">
            LOOKS FOR FALL
          </h3>
          <hr className="mb-2 mt-4" />
        </div>

        {!isMobile && (
          <div className="h-full w-full flex flex-row justify-evenly mb-[5%]">
            {imageUrls2.map((imageUrl, index) => {
              return (
                <div
                  className="mt-20 w-[32%] h-[90vh] overflow-hidden"
                  key={index}
                >
                  <Image
                    className="h-[90vh] w-[49vw] overflow-hidden aspect-square object-cover object-center "
                    src={imageUrl}
                    alt="image"
                    height={1500}
                    width={1000}
                    sizes="49vw"
                  />
                </div>
              );
            })}
          </div>
        )}

        {isMobile && (
          <div className="w-full !h-full">
            <Image
              className="w-full !h-full"
              src="/images/landing-page-mobile.png"
              loader={() => "/images/landing-page-mobile.png"}
              alt="image"
              height={1500}
              width={1000}
              layout="responsive"
              objectFit="cover"
              priority={true}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
