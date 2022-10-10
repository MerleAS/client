import Image from "next/image";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import Anchor from '../../components/UI/anchor';

import classes from "../../styles/pages/discover.module.css";

import discover from "../../public/discover-page/discover.png";

const Discover = () => {
  return (
    <div>
      <Header color="white"/>

      <div className={classes.discoverContainer}>
        <Anchor className={classes.link} color="white" href="brands">BRANDS</Anchor>
        <Anchor className={classes.link} color="white" href="products">PRODUCTS</Anchor>
        <Anchor className={classes.link} color="white" href="coming-soon">COMING SOON</Anchor>
      </div>

      <div className={classes.imagesContainer}>
        <Image src={discover} alt="first image" className={classes.image} />
      </div>
      <Footer />
    </div>
  );
};

export default Discover;
