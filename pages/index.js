import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { StateContext } from "../context/stateContext";
import useIsMobile from "../components/util/useIsMobile";
import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Anchor from "../components/UI/anchor";

const Home = (props) => {
  const { serverUrl } = useContext(StateContext);
  const isMobile = useIsMobile();
  const [imageLayout, setImageLayout] = useState("responsive")

  useEffect(() => {
    if (isMobile) {
      setImageLayout("fixed")
    } else {
      setImageLayout("responsive")
    }
  }, [isMobile]);

  const { pictureUrls } = props;

  return (
    <div className={classes.container}>
      <Head>
        <title>MERLE.</title>
      </Head>

      <div className={classes.header}>
        <p>MERLE.</p>
      </div>

      <div className={classes.discoverContainer}>
        <Anchor href="/discover" color="black" className={classes.discover}>
          DISCOVER PRODUCTS
        </Anchor>
      </div>

      {
        <div className={classes.imagesContainer}>
          {pictureUrls.map((pictureUrl, index) => {
            return (
              <Image
                key={index}
                loader={() => serverUrl + pictureUrl}
                layout={imageLayout}
                width={1500}
                height={1000}
                src={serverUrl + pictureUrl}
                alt="image"
                className={classes.image}
              />
            );
          })}
        </div>
      }
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const response = await axios.get("http://localhost:8080/home/desktop");
  return {
    props: {
      pictureUrls: response.data,
    },
    revalidate: 3600,
  };
}

export default Home;
