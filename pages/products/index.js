import { useContext } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import axios from "axios";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

import { StateContext } from "../../context/stateContext";
import classes from "../../styles/pages/products.module.css";

const Products = (props) => {
  const { serverUrl } = useContext(StateContext);
  const { products } = props;
  const router = useRouter();

  console.log(products)

  const productClickHandler = (id) => {
    router.push(`/products/${id}`)
  };

  return (
    <div>
      <Header className={classes.header} color="black" />

      {products.length > 0 && products.map((prod, index) => {
        return (
          <div className={classes.imageContainer} key={index} onClick={() => productClickHandler(prod._id)}>
            <Image
              loader={() => serverUrl + prod.imageUrl}
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

      <Footer />
    </div>
  );
};

// preloads products
export async function getStaticProps() {
  const prods = await axios.get("http://localhost:8080/products")
  return {
    props: {
      products: prods.data.products
    },
    revalidate: 3600,
  }
}

export default Products;
