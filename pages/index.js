import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import useIsMobile from "../components/util/useIsMobile";
import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Merle from "../public/icons/SVG/merle.svg";

import intro1 from "../public/videos/mp4/intro1.mp4";
import intro2 from "../public/videos/mp4/intro2.mp4";
import mobileIntro from "../public/videos/mp4/mobile-intro.mp4";
import mobileIntroWebm from "../public/videos/webm/mobile-intro.webm";

import { Suspense } from "react";

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className={classes.container}>
      <Head>
        <title>MERLE</title>
      </Head>
      <div className={classes.header}>
        <Merle height="120" width="280" />
      </div>
      {isMobile && (
        <div className={classes.mobileDiscoverContainer}>
          <Link
            href="/products?site=second-hand"
            className={classes.mobileDiscover}
          >
            <a className={classes.mobileDiscover}>DISCOVER</a>
          </Link>
        </div>
      )}

      {!isMobile && (
        <>
          <div className={classes.videoContainer}>
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
          <div className={classes.contentContainer}>
            <div className={classes.textContainer}>
              <h2 className={classes.heading}>Welcome to MERLE!</h2>
              <p className={classes.paragraph}>
                We share our interest in fashion, and sell popular second hand
                and vintage products from well known brands
              </p>
              <div className={classes.discoverContainer}>
                <Link
                  href="/products?site=second-hand"
                  className={classes.discover}
                >
                  <a className={classes.discover}>DISCOVER</a>
                </Link>
              </div>
            </div>
            <div className={classes.imageContainer}>
              <Image
                className={classes.image}
                src="/images/landing-page-image2.png"
                loader={() => "/images/landing-page-image2.png"}
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className={classes.imageContainer}>
              <Image
                className={classes.image}
                src="/images/landing-page-image3.png"
                loader={() => "/images/landing-page-image3.png"}
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className={classes.imageContainer}>
              <Image
                className={classes.image}
                src="/images/landing-page-image.png"
                loader={() => "/images/landing-page-image.png"}
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
          </div>
          <div className={classes.videoContainer}>
            <Suspense fallback="loading...">
              <video
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                src={intro2}
                type="video/mp4"
              />
            </Suspense>
          </div>
        </>
      )}

      {isMobile && (
        <>
          <div className={classes.videoContainer}>
            <Suspense fallback="loading...">
              <video
                poster=""
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                type="video/mp4"
              >
                <source src={mobileIntro} type="video/mp4" />
                <source src={mobileIntroWebm} type="video/webm" />
              </video>
            </Suspense>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

/* export async function getServerSideProps() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/desktop`
  );
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/mobile`
  );
  return {
    props: {
      pictureUrls: response.data,
      mobilePictureUrls: result.data,
    },
  };
} */

export default Home;
