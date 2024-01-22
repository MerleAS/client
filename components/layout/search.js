"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import useIsMobile from "../../util/useIsMobile";

import Sidebar from "../UI/sidebar";
import SearchIcon from "../../public/icons/SVG/searchIcon.svg";
import Cross from "../../public/icons/SVG/cross.svg";

const Search = () => {
  const [searchIsActive, setSearchIsActive] = useState(false);
  const isMobile = useIsMobile();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [isClosing, setIsClosing] = useState(false);

  const closeModalHandler = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSearchIsActive(false);
    }, 600);
  };

  const searchHandler = async (e) => {
    const query = e.target.value;
    setSearchInput(query);
    try {
      if (query.length > 1) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/products/get-products?query=${query}`
        );
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const headerContent = (
    <div className="w-[70%] h-full flex items-center justify-center">
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
    <div className="w-full h-4/5 my-[5%] px-[10%] flex flex-col space-x-2">
      <div className="w-full flex justify-between items-center space-x-4 md:hidden mb-8">
        <SearchIcon width="25" height="25" />
        <input
          className="w-full outline-none text-md font-normal h-10 border-[1px solid transparent]"
          onChange={searchHandler}
          autoFocus
          placeholder="Search"
          value={searchInput}
        />
      </div>
      {products.length > 0 &&
        products.map((product, index) => {
          return (
            <Link
              key={index}
              href={`/products/${product._id}`}
              className="border-b border-black w-fit text-md font-light my-3 mx-0"
              onClick={() => setSearchIsActive(false)}
            >
              {product.brand.label} {product.type} - {product.title}
            </Link>
          );
        })}
    </div>
  );

  return (
    <>
      {!searchIsActive && (
        <div
          className="flex items-center justify-center hover:scale-105 cursor-pointer"
          onClick={() => setSearchIsActive(true)}
        >
          <SearchIcon width="20" height="20" />
        </div>
      )}
      {searchIsActive && (
        <Cross
          height="20"
          width="20"
          onClick={() => closeModalHandler()}
          className="hover:scale-105 cursor-pointer"
        />
      )}

      <Sidebar
        isActive={searchIsActive}
        isClosing={isClosing}
        setIsActive={setSearchIsActive}
        title="Search"
        headerContent={headerContent}
        bodyContent={bodyContent}
        orientation={isMobile ? "left" : "right"}
        closeModalHandler={closeModalHandler}
      />
    </>
  );
};

export default Search;
