import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import useIsMobile from "../components/util/useIsMobile";

import Footer from "../components/layout/footer";
import Merle from "../public/icons/SVG/merle.svg";

import intro1 from "../public/videos/mp4/intro1.mp4";

import { Suspense } from "react";

const imageUrls = [
  "/images/landing-page-image2.png",
  "/images/landing-page-image3.png",
  "/images/landing-page-image.png",
];

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-full w-full">
      
      <Head>
        <title>MERLE</title>
      </Head>

      <div className="fixed h-24 w-full flex items-center justify-center z-20 bg-white">
        <Merle height="120" width="280" />
      </div>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-2 rounded-sm shadow-3xl shadow-black z-10">
        <Link
          href="/products?site=second-hand"
          className="cursor-pointer outline-none w-full"
        >
          <a className="text-lg lg:text:xl">SHOP</a>
        </Link>
      </div>

      {!isMobile && (
        <>
          <div className="h-full w-full">
            <Suspense fallback="loading...">
              <video
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                src={intro1}
                type="video/mp4"
              />
            </Suspense>
          </div>
          <div className="h-full w-full flex flex-row justify-evenly my-[5%]">
            {imageUrls.map((imageUrl, index) => {
              return (
                <div
                  className="w-[33%] h-full"
                  /* style={{left: `calc(${index} / ${imageUrls.length} * 100%)`}} */ key={
                    index
                  }
                >
                  <Image
                    className="h-full w-full"
                    src={imageUrl}
                    loader={() => imageUrl}
                    height={1500}
                    width={1000}
                    layout="responsive"
                    objectFit="cover"
                    priority={true}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {isMobile && (
        <div className="w-full !h-full">
          <Image
            className="w-full !h-full"
            src="/images/landing-page-image3.png"
            loader={() => "/images/landing-page-image3.png"}
            height={1500}
            width={1000}
            layout="responsive"
            objectFit="cover"
            priority={true}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
