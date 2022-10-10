import Head from "next/head";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";

import { StateContext } from "../context/stateContext";
import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Anchor from "../components/UI/anchor";

import axios from 'axios';

const Home = () => {
  const { isMobile, serverUrl } = useContext(StateContext);
  const [pictureUrls, setPictureUrls] = useState([]);

  useEffect(() => {
    try {
    const fetchDesktopPictures = async () => {
      const response = await axios.get(serverUrl + '/home/desktop')
      console.log(response.data);
      setPictureUrls(response.data);
    }
    fetchDesktopPictures();
    } catch (err) {
      console.log(err)
    }
  },[])


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
         return <Image key={index} loader={() => serverUrl + pictureUrl} width={500} height={300} layout="responsive"  src={serverUrl + pictureUrl} alt="image" className={classes.image} />
        })}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
