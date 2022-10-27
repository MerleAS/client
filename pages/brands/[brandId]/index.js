import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import Header from "../../../components/layout/header";
import { StateContext } from "../../../context/stateContext";

import classes from "../../../styles/pages/products.module.css";

const Brand = (props) => {
  const { products } = props;
  const { serverUrl } = useContext(StateContext);
  const router = useRouter()

  const productClickHandler = (id) => {
    router.push(`/products/${id}`)
  };

  return (
    <div>
      <Header color="black" className={classes.header} />

      {products.length > 0 &&
        products.map((prod, index) => {
          return (
            <div
              className={classes.imageContainer}
              key={index}
              onClick={() => productClickHandler(prod._id)}
            >
              <Image
                loader={() => serverUrl + prod.imageUrl}
                width={700}
                height={400}
                src={serverUrl + prod.imageUrl}
                alt="product"
                className={classes.image}
              />
            </div>
          );
        })}
    </div>
  );
};

export async function getStaticPaths() {
  const brands = await axios.get("http://localhost:8080/brands");
  const queries = brands.data.brands.map((brand) => {
    return { params: { brandId: brand._id } };
  });
  return {
    fallback: false,
    paths: queries,
  };
}

export async function getStaticProps(context) {
  const brandId = context.params.brandId;
  const brandProducts = await axios.get(
    "http://localhost:8080/products/brand/" + brandId
  );
  return {
    props: {
      products: brandProducts.data.products,
    },
  };
}

export default Brand;
