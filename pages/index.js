import Head from "next/head";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";

import { StateContext } from "../context/stateContext";
import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Anchor from "../components/UI/anchor";

import axios from "axios";

const Home = (props) => {
  const { isMobile, serverUrl } = useContext(StateContext);
  
  const { pictureUrls } = props;

  return (
    <div className={classes.container}>
      <Head>
        <title>MERLE.</title>
      </Head>

      <Header color="white" />

      <div className={classes.discoverContainer}>
        <Anchor href="/discover" color="black" className={classes.discover}>
          Discover Brands
        </Anchor>
      </div>

      <div className={classes.imagesContainer}>
        {pictureUrls.map((pictureUrl, index) => {
          return (
            <Image
              key={index}
              loader={() => serverUrl + pictureUrl}
              width={500}
              height={350}
              layout="responsive"
              src={serverUrl + pictureUrl}
              alt="image"
              className={classes.image}
            />
          );
        })}
      </div>

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
