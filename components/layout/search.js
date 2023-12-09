"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import useIsMobile from "../../util/useIsMobile";

import Sidebar from "../UI/sidebar";
import SearchIcon from "../../public/icons/SVG/searchIcon.svg";

const Search = () => {
  const [searchIsActive, setSearchIsActive] = useState(false);
  const isMobile = useIsMobile();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  /* const [brands, setBrands] = useState([]); */

  const searchHandler = async (e) => {
    const query = e.target.value;
    setSearchInput(query);
    try {
      if (query.length > 1) {
        const prods = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/products/products?query=${query}`
        );
        setProducts(prods.data.products);
        /* const brandsList = []
        prods.data.products.forEach(prod => {
          const b = { brandId: prod.brandId, brand: prod.brand };
          const brandExists = brandsList.find(br => br.brandId === b.brandId)
          if (!brandExists) {
            brandsList.push(b)
          }
        });
        setBrands(brandsList) */
      } else {
        setProducts([]);
        /* setBrands([]); */
      }
    } catch (err) {
      console.log(err);
    }
  };

  const headerContent = (
    <div className="w-4/5 h-full flex items-center justify-center">
      <input
        className="w-full outline-none text-md font-normal h-10 border-[1px solid transparent]"
        onChange={searchHandler}
        autoFocus
        placeholder="Search"
        value={searchInput}
      />
    </div>
  );

  const bodyContent = (
    <div className="w-4/5 h-4/5 my-[5%] mx-[10%] flex flex-col space-x-[1%]">
      {/* {brands.length > 0 &&
        brands.map((brand, index) => {
          return (
            <p
              key={index}
              className="border-b border-black w-fit text-md font-light my-3"
              onClick={() => routeHandler(`/brands/${brand.brandId}`)}
            >
              <strong>{brand.brand}</strong>
            </p>
          );
        })} */}
      {products.length > 0 &&
        products.map((product, index) => {
          return (
            <Link
              key={index}
              href={`/products/${product._id}`}
              className="border-b border-black w-fit text-md font-light my-3"
              onClick={() => setSearchIsActive(false)}
            >
              {product.brand} {product.type} - {product.title}
            </Link>
          );
        })}
    </div>
  );

  return (
    <>
      <div
        className="flex items-center justify-center hover:scale-105 cursor-pointer"
        onClick={() => setSearchIsActive(true)}
      >
        <SearchIcon width="20" height="20" />
      </div>

      <Sidebar
        isActive={searchIsActive}
        setIsActive={setSearchIsActive}
        title="Search"
        headerContent={headerContent}
        bodyContent={bodyContent}
        orientation={isMobile ? "left" : "right"}
      />
    </>
  );
};

export default Search;
