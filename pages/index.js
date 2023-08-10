import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import useIsMobile from "../components/util/useIsMobile";
import classes from "../styles/index.module.css";

import Footer from "../components/layout/footer";
import Merle from "../public/icons/SVG/merle.svg";

const Home = (props) => {
  /* const { routeStackHandler } = useContext(StateContext);
  const routeHandler = (path) => {
    router.push(path);
    routeStackHandler({ path: path, label: "Products" });
  }; */


  const isMobile = useIsMobile();

  const { pictureUrls, mobilePictureUrls } = props;
  

  return (
    <div className={classes.container}>
      <Head>
        <title>MERLE</title>
      </Head>
      <div className={classes.header}>
        <Merle height="120" width="280" />
      </div>
      <div className={classes.discoverContainer}>
        {/* <Anchor href="/products?site=original" color="black" className={classes.discover}>
          DISCOVER
        </Anchor>  */}
        {/* <div
          onClick={() => routeHandler("/products?site=second-hand")}
          color="black"
          className={classes.discover}
        >
        </div> */}
        <Link href="/products?site=second-hand" className={classes.discover}>
          <a className={classes.discover}>DISCOVER</a>
        </Link>
      </div>
      {!isMobile && (
        <div className={classes.imagesContainer}>
          {pictureUrls.map((pictureUrl, index) => {
            return (
              <Image
                key={index}
                src={process.env.NEXT_PUBLIC_SERVER_URL + "/" + pictureUrl}
                loader={() =>
                  process.env.NEXT_PUBLIC_SERVER_URL + "/" + pictureUrl
                }
                layout={"responsive"}
                width={1500}
                height={1000}
                alt="image"
                className={classes.image}
              />
            );
          })}
        </div>
      )}
      {isMobile && (
        <div className={classes.imagesContainer}>
          {mobilePictureUrls.map((mobilePictureUrl, index) => {
            return (
              <Image
                key={index}
                src={
                  process.env.NEXT_PUBLIC_SERVER_URL + "/" + mobilePictureUrl
                }
                loader={() =>
                  process.env.NEXT_PUBLIC_SERVER_URL + "/" + mobilePictureUrl
                }
                layout={"responsive"}
                width={1000}
                height={1550}
                alt="image"
                className={classes.image}
              />
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/desktop`
  );
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/mobile`
  );
  return {
    props: {
      pictureUrls: response.data,
      mobilePictureUrls: result.data,
    },
  }; 
}

export default Home;
