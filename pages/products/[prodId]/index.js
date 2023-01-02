import { useContext, useState } from "react";
import axios from "axios";

import Footer from "../../../components/layout/footer";
import Header from "../../../components/layout/header";
import Cart from '../../../components/layout/cart';

import Anchor from "../../../components/UI/anchor";
import IncrementInput from "../../../components/UI/incrementInput";
import SelectButton from "../../../components/UI/selectButton";
import Modal from "../../../components/UI/modal";
import SlideShow from "../../../components/UI/slideShow";

import classes from "../../../styles/pages/product.module.css";
import { StateContext } from "../../../context/stateContext";

const ProductDetail = (props) => {
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ size: "", in_stock: "" });
  const [sizeDropdownActive, setSizeDropdownActive] = useState(false);
  const [descriptionDropdownActive, setDescriptionDropdownActive] =
    useState(false);

  const [error, setError] = useState(false);

  const { serverUrl, addToCartHandler } = useContext(StateContext);
  const { product, imageUrls } = props;

  const sizeHandler = (item) => {
    setSelectedSize(item);
  };

  const cartHandler = () => {
    if (selectedSize.size === "") {
      setError(true);
      return;
    }
    const prod = {
      brand: product.brand,
      brandId: product.brandId,
      imageUrls: product.imageUrls,
      price: product.price,
      type: product.type,
      title: product.title,
      _id: product._id,
      amount: count,
      size: selectedSize.size,
    };
    addToCartHandler(prod);
  };

  return (
    <div>
      <Header color="black" className={classes.header} />
      <div className={classes.contentContainer}>
        <p className={classes.heading}>
          {product.brand} - {product.title}
        </p>
        <SlideShow
          imgs={imageUrls}
          width={1200}
          height={700}
        />
        <div className={classes.textContainer}>
          <div className={classes.text}>
            <Anchor href="/how-to-wear" color="white" className={classes.link}>
              HOW TO WEAR {product.brand}?
            </Anchor>
          </div>
        </div>
        <SelectButton
          dropdownActive={sizeDropdownActive}
          setDropdownActive={setSizeDropdownActive}
          type="select"
          placeholder={
            selectedSize.size === "" ? "SELECT SIZE" : selectedSize.size
          }
          options={product.stock}
          onChange={sizeHandler}
        ></SelectButton>
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
        <div className={classes.textContainer} onClick={cartHandler}>
          <p className={classes.text}>ADD TO CART</p>
        </div>
      </div>
      <Cart />
      <Footer />
      {error && (
        <Modal onClose={() => setError(false)}>
          <h4>PLEASE SELECT A SIZE</h4>
          <button className={classes.button} onClick={() => setError(false)}>
            OK
          </button>
        </Modal>
      )}
    </div>
  );
};

/* export async function getStaticPaths() {
  const originalProds = await axios.get("http://localhost:8080/products");
  const secondHandProds =  await axios.get("http://localhost:8080/second-hand/products")
  const originalQueries = originalProds.data.products.map((prod) => {
    return { params: { prodId: prod._id } };
  });
  const secondHandQueries = secondHandProds.data.products.map((prod) => {
    return { params: { prodId: prod._id } };
  });
  const queries = [...originalQueries, ...secondHandQueries]
  return {
    fallback: false,
    paths: queries,
  };
} */

export async function getServerSideProps(context) {
  const prodId = context.params.prodId;
  const site = context.query;
  let product;
  if (site === "original") {
    product = await axios.get(
      "http://localhost:8080/products/product/" + prodId
    );
  } else {
    product = await axios.get("http://localhost:8080/second-hand/products/" + prodId);
  }
  const imageUrls = product.data.product.imageUrls.map(url => `http://localhost:8080/${url}`)
  return {
    props: {
      product: product.data.product,
      imageUrls: imageUrls
    },
  };
}

export default ProductDetail;
