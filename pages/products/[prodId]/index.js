import { useContext, useState } from "react";
import axios from "axios";

import IncrementInput from "../../../components/UI/incrementInput";
import SlideShow from "../../../components/UI/slideShow";

import { StateContext } from "../../../context/stateContext";

const Product = ({ product, imageUrls }) => {
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ size: "", in_stock: "" });
  const [descriptionDropdownActive, setDescriptionDropdownActive] =
    useState(false);

  const { addToCartHandler, setCartIsActive, setErrorObject } =
    useContext(StateContext);

  const countHandler = (val, type) => {
    if (count < selectedSize.in_stock && type === "increment") {
      setCount(val);
    } else if (count > 0 && type === "decrement") {
      setCount(val);
    }
  };

  const cartHandler = () => {
    if (selectedSize.size === "") {
      setErrorObject({ message: "PLEASE SELECT A SIZE", error: true });
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
    <div className="min-h-full flex flex-col justify-center items-center md:my-[10%]">
      
      <div className="w-full md:w-4/5 lg:[65%] lg/xl:w-1/2 h-[70%] flex flex-col md:flex-row space-x-8 p-4">
        <div className="w-full md:w-1/2 max-h-full">
          <SlideShow imgs={imageUrls} width={1000} height={1500} />
        </div>
        <div className="w-full md:w-1/2 h-full">
          <p className="text-2xl font-medium my-2">
            {product.brand} - {product.title}
          </p>
          <p className="py-1 text-base m-0">{product.price}Kr</p>

          <div className="h-[15%] min-h-24 w-full flex items-center my-6">
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
                <div
                  className="h-full flex flex-col min-w-[15%] mr-[10%] items-center"
                  key={index}
                >
                  <div
                    className={`w-full h-fit border border-2 border-black rounded-sm px-1 py-0.5 ${
                      size.in_stock === 0 ? "text-gray-300 border-gray-300" : ""
                    }
                    ${
                      size.size === selectedSize.size
                        ? "bg-gray-200 opacity-60"
                        : ""
                    }`}
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
                    <p className="my-1 text-[10px]">
                      {size.in_stock} {stockText}
                    </p>
                  )}
                  {size.in_stock === 0 && (
                    <p className="my-1 text-[10px]" style={stockStyle}>
                      {stockText}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full mb-8">
            <IncrementInput count={count} setCount={countHandler} />
          </div>

          <p
            className="border-b border-b-gray-400 mt-12 text-base w-fit"
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
          <p
            className="border-b border-b-gray-400 mt-12 text-base w-fit"
            onClick={cartHandler}
          >
            ADD TO CART
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const prodId = context.params.prodId;
  const site = context.query;
  let product;
  if (site === "original") {
    product = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/product/` + prodId
    );
  } else {
    product = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/second-hand/products/` + prodId
    );
  }
  const imageUrls = product.data.product.imageUrls.map(
    (url) => `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`
  );
  return {
    props: {
      product: product.data.product,
      imageUrls: imageUrls,
    },
  };
}

export default Product;
