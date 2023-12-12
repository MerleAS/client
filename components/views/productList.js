"use client";

import Image from "next/image";
import IncrementInput from "../UI/incrementInput";

const ProductList = ({ products, amountHandler, dispatch }) => {
  return (
    <>
      {products.length > 0 &&
        products.map((prod, index) => {
          return (
            <div className="w-full flex flex-row space-x-3 mb-4" key={index}>
              <div className="h-full min-w-[20%] max-w-[25%]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${prod.imageUrls[0]}`}
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/${prod.imageUrls[0]}`
                  }
                  width={1000}
                  height={1500}
                  alt={`${prod.title} image`}
                />
              </div>

              <div className="w-full flex flex-col">
                <div className="h-1/2 w-full flex justify-between">
                  <h3 className="text-black text-md md:text-sm lg/xl:text-lg m-0 font-medium">
                    {prod.title}
                  </h3>
                  {/* <p className="text-black text-sm m-0">
                    {prod.size}
                  </p> */}
                </div>

                <div className="h-1/2 flex justify-between items-end">
                  <p className="text-black text-sm m-0">{prod.price} Kr</p>
                  {prod.in_stock > 1 && (
                    <IncrementInput
                      count={prod.amount}
                      setCount={(value, operation) =>
                        amountHandler(prod, operation)
                      }
                    />
                  )}
                  <p
                    className="text-gray-500 text-sm font-light border-b border-gray-500 cursor-pointer"
                    onClick={() => dispatch({ type: "REMOVE", product: prod })}
                  >
                    Remove
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductList;