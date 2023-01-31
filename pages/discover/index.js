import Image from "next/image";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";

import classes from "../../styles/pages/discover.module.css";

import discover from "../../public/discover-page/discover.png";

const Discover = () => {
  return (
    <div className={classes.container}>
      <Header color="black" className={classes.header}/>

      <div className={classes.discoverWrapper}>
        <div className={classes.discoverContainer}>
          <div className={classes.link} color="white" href="brands">
            BRANDS
          </div>
          <div className={classes.link} color="white" href="products">
            PRODUCTS
          </div>
          <div className={classes.link} color="white" href="coming-soon">
            COMING SOON
          </div>
        </div>
      </div>

      <div className={classes.imageContainer}>
        <Image src={discover} layout="fixed" alt="first image" width={1500} height={1000} className={classes.image} />
      </div>
      <Footer />
    </div>
  );
};

export default Discover;
