"use client"

import Image from "next/image";

import IncrementInput from "../UI/incrementInput";

const ProductList = ({ products, type, amountHandler, dispatch }) => {

  return (
    <>
      {products.length > 0 &&
        products.map((prod, index) => {
          return (
            <div className="w-full flex flex-row space-x-3 mb-4" key={index}>
              <div className="h-full min-w-[20%] max-w-[25%]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${prod.imageUrls[0]}`}
                  loader={() => `${process.env.NEXT_PUBLIC_SERVER_URL}/${prod.imageUrls[0]}`}
                  width={1000}
                  height={1500}
                  alt={`${prod.title} image`}
                />
              </div>

              <div className="w-1/2 flex flex-col justify-between">
                <p className="text-black text-lg m-0 font-medium">
                  {prod.title}
                </p>
                {prod.stock > 1 && <p className="text-gray-500 text-sm font-light">{prod.size}</p>}
                {type === 1 && (
                  <p className="text-black text-sm m-0">{prod.amount} item</p>
                )}
                {type === 2 && prod.in_stock > 1 &&  (
                  <IncrementInput
                    count={prod.amount}
                    setCount={(value, operation) =>
                      amountHandler(prod, operation)
                    }
                  />
                )}
              </div>
              <div className="w-1/2 flex flex-col justify-between items-end">
                <div className="w-fit">
                  {type === 2 && (
                    <p className="text-black text-sm m-0">
                      {prod.price * prod.amount} kr
                    </p>
                  )}
                </div>
                <div className="w-fit">
                  {type === 1 && (
                    <p className="text-black text-sm m-0">{prod.price} kr</p>
                  )}
                  {type === 2 && (
                    <p
                      className="text-gray-500 text-sm font-light border-b border-gray-500"
                      onClick={() =>
                        dispatch({ type: "REMOVE", product: prod })
                      }
                    >
                      Remove
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductList;
