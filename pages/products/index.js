import Image from "next/image";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

import home from "../../public/home-page/home.png";

import classes from "../../styles/pages/products.module.css";

const Products = () => {
  return (
    <div>
      <Header className={classes.header} color="black"/>

      <div className={classes.imagesContainer}>
          <Image
            src={home}
            alt="first image"
            className={classes.image}
          />
      </div>

      <Footer />
    </div>
  );
};

export default Products;
