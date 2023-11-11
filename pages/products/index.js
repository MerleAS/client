import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const Products = ({ products }) => {
  const router = useRouter();

  const [imageIndex, setImageIndex] = useState({ index: 0, id: null });

  const productClickHandler = (prod) => {
    router.push(`/products/${prod._id}`);
  };

  const mouseHoverHandler = (type, id) => {
    if (type === "over") {
      const prod = products.find((p) => p._id === id);
      if (prod.imageUrls.length > 1) {
        setImageIndex({ index: 1, id: prod._id });
      }
    } else {
      setImageIndex({ index: 0, id: null });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative  w-full px-4 my-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg/xl:grid-cols-4">
        {products.length > 0 &&
          products.map((prod, index) => {
            const totalStock = prod.stock.reduce((acc, cur) => {
              return acc + cur.in_stock;
            }, 0);
            let idx = 0;
            if (imageIndex.id === prod._id) {
              idx = 1;
            } else {
              idx = 0;
            }

            const imageUrls = prod.imageUrls.map(
              (url) => `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`
            );

            const imageBackdrop =
              totalStock === 0
                ? `absolute opacity-40 bg-black w-full h-full z-[5]`
                : "";
            return (
              <div
                className="w-full flex flex-col justify-center items-center space-[3%] m-4"
                key={index}
                onMouseOver={() => mouseHoverHandler("over", prod._id)}
                onMouseOut={() => mouseHoverHandler("out")}
                /* onMouseDown={() => mouseDownHandler(prod._id)} */
                onClick={() => productClickHandler(prod)}
              >
                {totalStock === 0 && (
                  <h3 className="absolute h-1/5 w-full text-white text:xl md:text-2xl flex items-center justify-center z-[6]">
                    SOLD OUT
                  </h3>
                )}
                <div className="relative w-full m-0">
                  <div className={imageBackdrop} />
                  <Image
                    width={1000}
                    height={1500}
                    src={imageUrls[idx]}
                    loader={() => imageUrls[idx]}
                    alt=""
                  />
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="m-0">{prod.title}</p>
                  <p className="m-0">{prod.price}kr</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

// preloads products

export async function getServerSideProps() {
  const prods = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/second-hand/products`
  );
  const brandsList = [];
  prods.data.products.forEach((prod) => {
    const b = { brandId: prod.brandId, brand: prod.brand };
    const brandExists = brandsList.find((br) => br.brandId === b.brandId);
    if (!brandExists) {
      brandsList.push(b);
    }
  });
  return {
    props: {
      products: prods.data.products,
      brands: brandsList,
    },
  };
}

export default Products;
