import { useContext, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Footer from "../../../components/layout/footer";
import Header from "../../../components/layout/header";
import Anchor from "../../../components/UI/anchor";
import IncrementInput from "../../../components/UI/incrementInput";
import SelectButton from "../../../components/UI/selectButton";

import classes from "../../../styles/pages/product.module.css";
import { StateContext } from "../../../context/stateContext";

const ProductDetail = (props) => {
  const [count, setCount] = useState(1);
  const [sizeDropdownActive, setSizeDropdownActive] = useState(false);
  const [descriptionDropdownActive, setDescriptionDropdownActive] =
    useState(false);

  const { serverUrl } = useContext(StateContext);
  const { product } = props;

  console.log(product);
  return (
    <div>
      <Header color="black" className={classes.header} />
      <div className={classes.contentContainer}>
  
          <p className={classes.heading}>{product.brand} - {product.title}</p>
        
        <Image
          loader={() => serverUrl + product.imageUrl}
          width={1200}
          height={700}
          src={serverUrl + product.imageUrl}
          alt="product"
          className={classes.image}
        />
        <div className={classes.textContainer}>
          <div className={classes.text}>
            <Anchor href="/how-to-wear" color="white">
              HOW TO WEAR {product.brand}?
            </Anchor>
          </div>
        </div>
        <SelectButton
          dropdownActive={sizeDropdownActive}
          setDropdownActive={setSizeDropdownActive}
          type="select"
          placeholder="SELECT SIZE"
          options={product.stock}
        >
        </SelectButton>
        <SelectButton
          dropdownActive={descriptionDropdownActive}
          setDropdownActive={setDescriptionDropdownActive}
          type="info"
          placeholder="DESCRIPTION"
        >
          <p>PRODUCT DETAIL:</p>
          <br />
          <p>fit: {product.description.fit}</p>
          <p>material: {product.description.material}</p>
        </SelectButton>
        <IncrementInput count={count} setCount={setCount} />
        <div className={classes.textContainer}>
          <p className={classes.text}>ADD TO CART</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const prods = await axios.get("http://localhost:8080/products");
  const queries = prods.data.products.map((prod) => {
    return { params: { prodId: prod._id } };
  });
  return {
    fallback: false,
    paths: queries,
  };
}

export async function getStaticProps(context) {
  const prodId = context.params.prodId;
  const product = await axios.get(
    "http://localhost:8080/products/product/" + prodId
  );
  return {
    props: {
      product: product.data.product,
    },
  };
}

export default ProductDetail;
