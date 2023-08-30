import Image from "next/image";

import classes from "../../styles/pages/authenticity.module.css";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";

const Authenticity = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <h2 className={classes.heading}>AUTHENTICITY</h2>
        <div className={classes.contentContainer}>
          <div className={classes.infoContainer}>
            <p className={classes.paragraph}>
              “We share our interest in fashion, and sell popular secondhand and
              vintage products from well known brands”
            </p>
            <p className={classes.paragraph}> 
              The idea with Merle is to give you a lot of inspiration through
              Instagram, tiktok and the website. You can join the products
              journey with different outfits, styles and fashion. On MERLE´s
              instagram and tiktok you can se how to style the products and you
              can get a better view on how the product looks and the condition
              to the products.
            </p>
            <p className={classes.paragraph}>
              We follow the trends on tiktok and instagram and ensure that you
              get the products you are looking for.
            </p>
          </div>
          <div className={classes.imagesContainer}>{/* <Image /> */}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Authenticity;
