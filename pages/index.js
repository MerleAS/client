import Head from "next/head";
import Image from "next/image";

import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Link from '../components/UI/link';

import home from "../public/home-page/home.png";

const Home = () => {

  return (
    <div className={classes.container}>
      <Head>
        <title>MERLE.</title>
      </Head>

      <Header color="white" />

      <div className={classes.discoverContainer}>
        <Link href="/discover" color="black" className={classes.discover}>Discover Brands</Link>
      </div>

      <div className={classes.imagesContainer}>
        <Image src={home} alt="first image" className={classes.image} />
        <Image src={home} alt="first image" className={classes.image} />
        <Image src={home} alt="first image" className={classes.image} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
