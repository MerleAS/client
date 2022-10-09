import Head from "next/head";
import Image from "next/image";

import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Header from '../components/layout/header';

import home from "../public/home-page/home.png";

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>MERLE.</title>
      </Head>

      <Header />

      <div className={classes.discoverContainer}>
        <a className={classes.discover}>Discover Brands</a>
      </div>


      <div className={classes.imagesContainer}>
        <Image src={home} alt="first image" className={classes.image} />
        <Image src={home} alt="first image" className={classes.image} />
        <Image src={home} alt="first image" className={classes.image} />
      </div>

      <Footer />
    </div>
  );
}
