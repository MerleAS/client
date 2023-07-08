import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Cart from "../../components/layout/cart";
import Search from '../../components/layout/search';
import SlideShow from "../../components/UI/slideShow";

import { StateContext } from "../../context/stateContext";
import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/products.module.css";

const Products = (props) => {
  const { routeStackHandler } = useContext(StateContext);
  const { products, site, brands } = props;
  const router = useRouter();

  const isMobile = useIsMobile();

  const [time, setTime] = useState(0);
  const [productsPerRow, setProductsPerRow] = useState(4);

  const mouseDownHandler = () => {
    setTime(new Date());
  };

  const handleProductsPerRowChange = (value) => {
    setProductsPerRow(parseInt(value));
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
      setTime(0);
    }
  };

  const rep = () => {
    let fr;
    if (productsPerRow === 1 || isMobile) {
      fr = "1fr";
    } else if (productsPerRow === 2) {
      fr = "1fr 1fr";
    } else if (productsPerRow === 3) {
      fr = "1fr 1fr 1fr";
    } else if (productsPerRow === 4) {
      fr = "1fr 1fr 1fr 1fr";
    }
    return fr;
  };

  const getWidth = () => {
    let pictureWidth;
    if (productsPerRow === 1) {
      pictureWidth = 30;
    } else if (productsPerRow === 2) {
      pictureWidth = 80;
    } else if (productsPerRow === 3) {
      pictureWidth = 90;
    } else if (productsPerRow === 4) {
      pictureWidth = 90;
    }
    if (isMobile) {
      pictureWidth = 80;
    }
    return pictureWidth;
  };

  return (
    <div>
      <Header/>

      {/* {!isMobile && (
        <div className={classes.radioButtonContainer}>
          <select
            value={productsPerRow}
            onChange={(event) => handleProductsPerRowChange(event.target.value)}
          >
            <option value={1}>1 product per row</option>
            <option value={2}>2 products per row</option>
            <option value={3}>3 products per row</option>
            <option value={4}>4 products per row</option>
          </select>
        </div>
      )} */}

      <div
        className={classes.productsContainer}
        style={{ gridTemplateColumns: `${rep()}` }}
      >
        {products.length > 0 &&
          products.map((prod, index) => {
            const imageUrls = prod.imageUrls.map(
              (url) => `http://localhost:8080/${url}`
            );
            const containerStyle = isMobile
              ? classes.mobileImageContainer
              : classes.imageContainer;

            return (
              <div
                className={containerStyle}
                key={index}
                onMouseDown={mouseDownHandler}
                onMouseUp={() => productClickHandler(prod)}
              >
                <SlideShow
                  width={1000}
                  height={1500}
                  imgs={imageUrls}
                  containerStyle={{ width: `${getWidth()}%` }}
                />
                <div className={classes.infoContainer} style={{ width: `${getWidth()}%` }} >
                  <p>{prod.title}</p>
                  <p>{prod.price}kr</p>
                </div>
              </div>
            );
          })}
      </div>
      <Search />
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
