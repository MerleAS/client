import Image from "next/image";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import Link from '../../components/UI/link';

import classes from "../../styles/pages/discover.module.css";

import discover from "../../public/discover-page/discover.png";

const Discover = () => {
  return (
    <div>
      <Header color="white"/>

      <div className={classes.discoverContainer}>
        <Link className={classes.link} color="white" href="brands">BRANDS</Link>
        <Link className={classes.link} color="white" href="products">PRODUCTS</Link>
        <Link className={classes.link} color="white" >COMING SOON</Link>
      </div>

      <div className={classes.imagesContainer}>
        <Image src={discover} alt="first image" className={classes.image} />
      </div>
      <Footer />
    </div>
  );
};

export default Discover;
