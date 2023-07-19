import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Cart from "../../components/layout/cart";
import Search from "../../components/layout/search";

import { StateContext } from "../../context/stateContext";
import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/products.module.css";

const Products = (props) => {
  const { routeStackHandler } = useContext(StateContext);
  const { products, site } = props;
  const router = useRouter();

  const [imageIndex, setImageIndex] = useState({index: 0, id: null}); 

  const isMobile = useIsMobile();

  const productClickHandler = (prod) => {
    router.push(`/products/${prod._id}?site=${site}`);
    /* routeStackHandler({
        path: `/products/${prod._id}?site=${site}`,
        label: prod.title,
      }); */
  };

  const mouseHoverHandler = (type, id) => {
    if (type === "over") {
      const prod = products.find((p) => p._id === id);
      if (prod.imageUrls.length > 1) {
        setImageIndex({index: 1, id: prod._id});
      }
    } else {
      setImageIndex({index: 0, id: null});
    }
  };

  const rep = () => {
    let fr;
    if (!isMobile) {
      fr = "1fr 1fr 1fr 1fr";
    } else {
      fr = "1fr";
    }
    return fr;
  };

  const getWidth = () => {
    let pictureWidth = 90;

    if (isMobile) {
      pictureWidth = 80;
    }
    return pictureWidth;
  };

  return (
    <div>
      <Header />
      <div
        className={classes.productsContainer}
        style={{ gridTemplateColumns: `${rep()}` }}
      >
        {products.length > 0 &&
          products.map((prod, index) => {
            const totalStock = prod.stock.reduce((acc, cur) => {
              return acc + cur.in_stock;
            }, 0);
            if (totalStock === 0) {
              return;
            }
            let idx = 0
            if (imageIndex.id === prod._id) {
              idx = 1
            } else {
              idx = 0
            }

            const imageUrls = prod.imageUrls.map(
              (url) => `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`
            );
            const containerStyle = isMobile
              ? classes.mobileProductContainer
              : classes.productContainer;

            return (
              <div
                className={containerStyle}
                key={index}
                onMouseOver={() => mouseHoverHandler("over", prod._id)}
                onMouseOut={() => mouseHoverHandler("out")}
                /* onMouseDown={() => mouseDownHandler(prod._id)} */
                onClick={() => productClickHandler(prod)}
              >
                <div className={classes.imageContainer}>
                  <Image
                    width={1000}
                    height={1500}
                    src={imageUrls[idx]}
                    loader={() => imageUrls[idx]}
                    containerStyle={{ width: `${getWidth()}%` }}
                    alt=""
                  />
                </div>
                <div className={classes.infoContainer}>
                  <p className={classes.text}>{prod.title}</p>
                  <p className={classes.text}>{prod.price}kr</p>
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
    prods = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`);
  } else {
    prods = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/second-hand/products`
    );
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
