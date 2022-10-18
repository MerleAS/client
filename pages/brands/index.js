import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import { StateContext } from "../../context/stateContext";
import classes from "../../styles/pages/brands.module.css";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";

const Brands = (props) => {
  const { brands } = props;
  const { serverUrl } = useContext(StateContext);
  const router = useRouter();

  const routeHandler = (id) => {
    router.push(`/brands/${id}`)
  };
  return (
    <>
      <Header color="black" className={classes.header}/>
      <div className={classes.container}>
        {brands.map((brand, index) => {
          return (
            <div className={classes.imageContainer} key={index} onClick={() => routeHandler(brand._id)}>
              <Image
                loader={() => serverUrl + brand.imageUrl}
                width={1500}
                height={1000}
                src={serverUrl + brand.imageUrl}
                alt="brand"
                className={classes.image}
              />
              <div className={classes.brand}><p>{brand.brand}</p></div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const brands = await axios.get("http://localhost:8080/brands");
  return {
    props: {
      brands: brands.data.brands,
    },
    revalidate: 3600,
  };
}

export default Brands;
