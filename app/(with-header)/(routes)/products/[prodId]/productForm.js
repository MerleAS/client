"use client";

import { useState, useEffect } from "react";

import IncrementInput from "../../../../../components/UI/incrementInput";

import { useStore } from "../../../../../util/store";

import { getTotalStock } from "../../../../../util/getTotalStock";

const ProductForm = ({ product }) => {
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ size: "", in_stock: "" });
  const [descriptionDropdownActive, setDescriptionDropdownActive] =
    useState(false);

  const { dispatch } = useStore();

  const countHandler = (val, type) => {
    if (count < selectedSize.in_stock && type === "increment") {
      setCount(val);
    } else if (count > 0 && type === "decrement") {
      setCount(val);
    }
  };

  const cartHandler = () => {
    /* if (selectedSize.size === "") {
      setErrorObject({ message: "PLEASE SELECT A SIZE", error: true });
      return;
    } */
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
    dispatch({ type: "ADD", product: prod });
  };

  useEffect(() => {
    if (product.stock.length === 1) {
      setSelectedSize(product.stock[0]);
      if (product.stock[0].in_stock === 1) {
        setCount(1);
      }
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-10">
      <div className="h-[15%] min-h-24 w-full flex items-center mt-6">
        {product.stock.length > 1 &&
          product.stock.map((size, index) => {
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
                className="h-full flex flex-col min-w-[10%] mr-[10%] items-center"
                key={index}
              >
                <div
                  className={`w-20 flex items-center justify-center h-fit border-2 border-black rounded-sm px-1 py-0.5 cursor-pointer ${
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


      {getTotalStock(product.stock) > 1 && (
        <div className="w-full flex items-center">
          <IncrementInput count={count} setCount={countHandler} />
        </div>
      )}

      <p
        className="text-base w-fit cursor-pointer flex items-center"
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
      <button
        disabled={getTotalStock(product.stock) === 0 || selectedSize.size === ""}
        className="text-base w-fit cursor-pointer flex items-center"
        onClick={cartHandler}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductForm;
