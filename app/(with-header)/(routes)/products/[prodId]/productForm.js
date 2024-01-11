"use client";

import { useState, useEffect } from "react";

import Button from "../../../../../components/UI/button";
import SizePicker from "./sizePicker";
import ProductDetail from "./productDetail";

import { useStore } from "../../../../../util/store";
import { getTotalStock } from "../../../../../util/getTotalStock";

const ProductForm = ({ product }) => {
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ size: "", in_stock: "" });

  const { dispatch } = useStore();

  const cartHandler = () => {
    const prod = {
      title: product.title,
      price: product.price,
      brand: product.brand,
      type: product.type,
      imageUrls: product.imageUrls,
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
    <div className="w-full h-full flex flex-col justify-between space-y-8">
      <SizePicker
        product={product}
        stock={product.stock}
        selectedSize={selectedSize}
        setCount={setCount}
        setSelectedSize={setSelectedSize}
      />

      <ProductDetail product={product} />

      <div className="w-full flex justify-center md:justify-start">
        <Button
          disabled={
            getTotalStock(product.stock) === 0 || selectedSize.size === ""
          }
          className="text-base w-fit cursor-pointer flex items-center text-white"
          onClick={cartHandler}
        >
          Legg til i handlekurven
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
