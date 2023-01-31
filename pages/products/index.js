import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Cart from "../../components/layout/cart";
import SlideShow from "../../components/UI/slideShow";

import { StateContext } from "../../context/stateContext";
import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/products.module.css";

const Products = (props) => {
  const { serverUrl, routeStackHandler } = useContext(StateContext);
  const { products, site, brands } = props;
  const router = useRouter();

  const isMobile = useIsMobile();

  const [time, setTime] = useState(0);
  const [collections, setCollections] = useState([]);

  const mouseDownHandler = () => {
    setTime(new Date());
  };

  const productClickHandler = (prod) => {
    const newTime = new Date();
    const diff = newTime - time;
    if (diff < 300 || isMobile) {
      router.push(`/products/${prod._id}?site=${site}`);
      routeStackHandler({
        path: `/products/${prod._id}?site=${site}`,
        label: prod.title,
      });
    } else {
      setTimer(0);
    }
  };

  return (
    <div>
      <Header className={classes.header} color="black" />

      {!isMobile && (
        <>
          {products.length > 0 &&
            products.map((prod, index) => {
              const imageUrls = prod.imageUrls.map(
                (url) => `http://localhost:8080/${url}`
              );
              return (
                <div
                  className={classes.imageContainer}
                  key={index}
                  onMouseDown={mouseDownHandler}
                  onMouseUp={() => productClickHandler(prod)}
                >
                  <SlideShow width={785} height={1490} imgs={imageUrls} />
                </div>
              );
            })}
        </>
      )}
      {isMobile && (
        <>
          {products.length > 0 &&
            products.map((prod, index) => {
              const imageUrls = prod.imageUrls.map(
                (url) => `http://localhost:8080/${url}`
              );
              return (
                <div
                  className={classes.mobileImageContainer}
                  key={index}
                  onClick={() => productClickHandler(prod)}
                >
                  <SlideShow width={785} height={1490} imgs={imageUrls} />
                </div>
              );
            })}
        </>
      )}
      <Cart />
      <Footer />
    </div>
  );
};

// preloads products

export async function getServerSideProps(context) {
  const site = context.query.site;
  let prods;
  if (site === "original") {
    prods = await axios.get("http://localhost:8080/products");
  } else {
    prods = await axios.get("http://localhost:8080/second-hand/products");
  }
  const brandsList = [];
  prods.data.products.forEach((prod) => {
    const b = { brandId: prod.brandId, brand: prod.brand };
    const brandExists = brandsList.find((br) => br.brandId === b.brandId);
    if (!brandExists) {
      brandsList.push(b);
    }
  });
  return {
    props: {
      products: prods.data.products,
      site: site,
      brands: brandsList,
    },
  };
}

export default Products;
