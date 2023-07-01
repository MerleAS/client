import { useContext, useState } from "react";
import axios from "axios";

import Footer from "../../../components/layout/footer";
import Header from "../../../components/layout/header";
import Cart from "../../../components/layout/cart";

import IncrementInput from "../../../components/UI/incrementInput";
import Modal from "../../../components/UI/modal";
import SlideShow from "../../../components/UI/slideShow";

import useIsMobile from "../../../components/util/useIsMobile";
import classes from "../../../styles/pages/product.module.css";
import { StateContext } from "../../../context/stateContext";

const ProductDetail = (props) => {
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ size: "", in_stock: "" });
  const [descriptionDropdownActive, setDescriptionDropdownActive] =
    useState(false);

  const [error, setError] = useState(false);

  const { serverUrl, addToCartHandler, setCartIsActive } =
    useContext(StateContext);

  const { product, imageUrls } = props;

  const isMobile = useIsMobile();

  const countHandler = (val, type) => {
    if (count < selectedSize.in_stock && type === "increment") {
      setCount(val);
    } else if (count > 0 && type === "decrement") {
      setCount(val);
    }
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
      in_stock: selectedSize.in_stock,
    };
    addToCartHandler(prod);
    setCartIsActive(true);
  };

  return (
    <div className={classes.container}>
      <Header color="black" className={classes.header} />

      {!isMobile && (
        <>
          <div className={classes.contentContainer}>
            <div className={classes.imageContainer}>
              <SlideShow imgs={imageUrls} width={1000} height={1500} />
            </div>
            <div className={classes.infoContainer}>
              <p className={classes.heading}>
                {product.brand} - {product.title}
              </p>
              <p className={classes.text}>{product.price}Kr</p>

              <div className={classes.sizeButtonsContainer}>
                {product.stock.map((size, index) => {
                  let style, stockStyle;
                  let stockText = "in stock";
                  if (size.size === selectedSize.size) {
                    style = { backgroundColor: "e4e4e4", opacity: "0.6" };
                  }
                  if (size.in_stock === 0) {
                    style = { color: "#CAC8C8", borderColor: "#CAC8C8" };
                    stockStyle = style;
                    stockText = "Sold out";
                  }
                  return (
                    <div className={classes.sizeButtonContainer} key={index}>
                      <div
                        className={classes.sizeButton}
                        style={style}
                        onClick={() => {
                          if (size.in_stock > 0) {
                            setSelectedSize({
                              size: size.size,
                              in_stock: size.in_stock,
                            });
                            setCount(1);
                          }
                        }}
                      >
                        {size.size}
                      </div>
                      {size.in_stock > 0 && (
                        <p className={classes.in_stock}>
                          {size.in_stock} {stockText}
                        </p>
                      )}
                      {size.in_stock === 0 && (
                        <p className={classes.in_stock} style={stockStyle}>
                          {stockText}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={classes.incrementContainer}>
                <IncrementInput count={count} setCount={countHandler} />
              </div>

              <p
                className={classes.text2}
                onClick={() => setDescriptionDropdownActive((prev) => !prev)}
              >
                DESCRIPTION
              </p>
              {descriptionDropdownActive && (
                <div>
                  {product.description.map((prodDesc, index) => {
                    return (
                      <div key={index}>
                        <p>{prodDesc}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <p className={classes.text2} onClick={cartHandler}>
                ADD TO CART
              </p>
            </div>
          </div>
        </>
      )}

      {isMobile && (
        <>
          <div className={classes.mobileContentContainer}>
            <div className={classes.mobileImageContainer}>
              <SlideShow imgs={imageUrls} width={1000} height={1500} />
            </div>
            <div className={classes.mobileInfoContainer}>
              <p className={classes.heading}>
                {product.brand} - {product.title}
              </p>
              <p className={classes.text}>{product.price}Kr</p>

              <div className={classes.sizeButtonsContainer}>
                {product.stock.map((size, index) => {
                  let style, stockStyle;
                  let stockText = "in stock";
                  if (size.size === selectedSize.size) {
                    style = { backgroundColor: "#e4e4e4", opacity: "0.6" };
                  }
                  if (size.in_stock === 0) {
                    style = { color: "#CAC8C8", borderColor: "#CAC8C8" };
                    stockStyle = style;
                    stockText = "Sold out";
                  }
                  return (
                    <div className={classes.sizeButtonContainer} key={index}>
                      <div
                        className={classes.sizeButton}
                        style={style}
                        onClick={() => {
                          if (size.in_stock > 0) {
                            setSelectedSize({
                              size: size.size,
                              in_stock: size.in_stock,
                            });
                            setCount(1);
                          }
                        }}
                      >
                        {size.size}
                      </div>
                      {size.in_stock > 0 && (
                        <p className={classes.in_stock}>
                          {size.in_stock} {stockText}
                        </p>
                      )}
                      {size.in_stock === 0 && (
                        <p className={classes.in_stock} style={stockStyle}>
                          {stockText}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={classes.incrementContainer}>
                <IncrementInput count={count} setCount={countHandler} />
              </div>

              <p
                className={classes.text2}
                onClick={() => setDescriptionDropdownActive((prev) => !prev)}
              >
                DESCRIPTION
              </p>
              {descriptionDropdownActive && (
                <div>
                  {product.description.map((prodDesc, index) => {
                    return (
                      <div key={index}>
                        <p>{prodDesc}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <p className={classes.text2} onClick={cartHandler}>
                ADD TO CART
              </p>
            </div>
          </div>
        </>
      )}

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
    product = await axios.get(
      "http://localhost:8080/second-hand/products/" + prodId
    );
  }
  const imageUrls = product.data.product.imageUrls.map(
    (url) => `http://localhost:8080/${url}`
  );
  return {
    props: {
      product: product.data.product,
      imageUrls: imageUrls,
    },
  };
}

export default ProductDetail;
