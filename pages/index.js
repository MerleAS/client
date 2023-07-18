import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import axios from "axios";


import { StateContext } from "../context/stateContext";
import useIsMobile from "../components/util/useIsMobile";
import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Merle from "../public/icons/SVG/merle.svg";

const Home = (props) => {
  const { serverUrl, routeStackHandler } = useContext(StateContext);
  const isMobile = useIsMobile();
  const router = useRouter();

  const { pictureUrls, mobilePictureUrls } = props;

  const routeHandler = (path) => {
    router.push(path);
    routeStackHandler({ path: path, label: "Products" });
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>MERLE</title>
      </Head>
      <div className={classes.header}>
        <Merle height="120" width="280" />
      </div>
      <div className={classes.discoverContainer}>
        {/* <Anchor href="/products?site=original" color="black" className={classes.discover}>
          DISCOVER
        </Anchor>  */}
        <div
          onClick={() => routeHandler("/products?site=second-hand")}
          color="black"
          className={classes.discover}
        >
          DISCOVER
        </div>
      </div>
      {!isMobile && (
        <div className={classes.imagesContainer}>
          {pictureUrls.map((pictureUrl, index) => {
            return (
              <Image
                key={index}
                loader={() => serverUrl + pictureUrl}
                layout={"responsive"}
                width={1500}
                height={1000}
                src={serverUrl + pictureUrl}
                alt="image"
                className={classes.image}
              />
            );
          })}
        </div>
      )}
      {isMobile && (
        <div className={classes.imagesContainer}>
          {mobilePictureUrls.map((mobilePictureUrl, index) => {
            return (
              <Image
                key={index}
                loader={() => serverUrl + mobilePictureUrl}
                layout={"responsive"}
                width={1000}
                height={1550}
                src={serverUrl + mobilePictureUrl}
                alt="image"
                className={classes.image}
              />
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get("http://localhost:8080/home/desktop");
  const result = await axios.get("http://localhost:8080/home/mobile");
  return {
    props: {
      pictureUrls: response.data,
      mobilePictureUrls: result.data,
    },
    revalidate: 3600,
  };
}

export default Home;
