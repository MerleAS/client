import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import Cart from '../../components/layout/cart';

import { StateContext } from "../../context/stateContext";
import classes from "../../styles/pages/products.module.css";

const Products = (props) => {
  const { serverUrl } = useContext(StateContext);
  const { products, site } = props;
  const router = useRouter();

  const productClickHandler = (id) => {
    router.push(`/products/${id}?site=${site}`);
  };

  return (
    <div>
      <Header className={classes.header} color="black" />

      {products.length > 0 &&
        products.map((prod, index) => {
          return (
            <div
              className={classes.imageContainer}
              key={index}
              onClick={() => productClickHandler(prod._id)}
            >
              <Image
                loader={() => serverUrl + prod.imageUrls[0]}
                layout="intrinsic"
                width={700}
                height={400}
                src={serverUrl + prod.imageUrl}
                alt="product"
                className={classes.image}
              />
            </div>
          );
        })}

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
  return {
    props: {
      products: prods.data.products,
      site: site
    },
  };
}

export default Products;
