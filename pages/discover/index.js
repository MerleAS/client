import Image from "next/image";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";

import classes from "../../styles/pages/discover.module.css";

import discover from "../../public/discover-page/discover.png";

const Discover = () => {
  return (
    <div>
      <Header/>

      <div className={classes.discoverContainer}>
        <a className={classes.link}>BRANDS</a>
        <a className={classes.link}>PRODUCTS</a>
        <a className={classes.link}>COMING SOON</a>
      </div>

      <div className={classes.imagesContainer}>
        <Image src={discover} alt="first image" className={classes.image} />
      </div>
      <Footer />
    </div>
  );
};

export default Discover;
