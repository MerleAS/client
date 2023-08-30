import Image from "next/image";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

import classes from "../../styles/pages/about.module.css";

const About = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <h2 className={classes.heading}>About Us</h2>
        <div className={classes.textContainer}>
          <p className={classes.paragraph}>
            We share our interest in fashion, and sell popular secondhand and
            vintage products from well known brands
          </p>
          <p className={classes.paragraph}>
            The idea with Merle is to give you a lot of inspiration through
            Instagram, tiktok and the website. You can join the products journey
            with different outfits, styles and fashion. On MERLE´s instagram and
            tiktok you can se how to style the products and you can get a better
            view on how the product looks and the condition to the products
          </p>
          <p className={classes.paragraph}>
            We follow the trends on tiktok and instagram and ensure that you get
            the products you are looking for.
          </p>
        </div>
        <div className={classes.imageContainer}>
          <Image
            src="/images/about-us-image.png"
            loader={() => "/images/about-us-image.png"}
            width={997}
            height={1253}
            objectFit="cover"
            priority={true}
          />
        </div>
        <h3 className={classes.heading}>Our social media</h3>
        <div className={classes.textContainer}>
          <p className={classes.paragraph}>
            The goal with our sosial media is to share content that is
            inspirational. We wont out sosial media like instagram and tiktok to
            be like a typical influencer profile, that share a lot of content,
            have a beautyful feed and share pictures that gives you a lot of
            inspiration. Our sosial media will help you get a better view on how
            the products looks and how you can style it.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
