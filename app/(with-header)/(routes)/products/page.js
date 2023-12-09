import Image from "next/image";
import Link from "next/link";
import { getProducts } from "../../../../actions/getProducts";

import SwitchImage from "../../../../components/UI/switchImage";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col">
      <div className="relative  w-full px-4 my-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg/xl:grid-cols-4 gap-2">
        {products.length > 0 &&
          products.map((prod, index) => {
            const totalStock = prod.stock.reduce((acc, cur) => {
              return acc + cur.in_stock;
            }, 0);

            const imageUrls = prod.imageUrls.map(
              (url) => `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`
            );

            const imageBackdrop =
              totalStock === 0
                ? `absolute opacity-40 bg-black w-full h-full z-[5]`
                : "";
            return (
              <div className="w-full" key={index}>
                <Link
                  href={`/products/${prod._id}`}
                  className="w-full flex flex-col justify-center items-center relative"
                >
                  {totalStock === 0 && (
                    <h3 className="absolute h-1/5 w-full text-white text:xl md:text-2xl flex items-center justify-center z-[6]">
                      SOLD OUT
                    </h3>
                  )}
                  <div className="relative w-full m-0">
                    <div className={imageBackdrop} />
                    <SwitchImage
                      imageUrls={imageUrls}
                      alt={prod.title}
                      width={1000}
                      height={1500}
                    />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p className="mx-2 my-1">{prod.title}</p>
                    <p className="mx-2 my-1">{prod.price}kr</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
