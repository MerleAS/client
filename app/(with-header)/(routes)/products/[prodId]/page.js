import SlideShow from "../../../../../components/UI/slideShow";
import { getProductById } from "../../../../../actions/getProduct";
import { getTotalStock } from "../../../../../util/getTotalStock";

import ProductForm from "./productForm";

const Product = async ({ params: { prodId } }) => {
  const product = await getProductById(prodId);

  const imageUrls = product.imageUrls.map(
    (url) => `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`
  );

  const imageBackdrop =
    getTotalStock(product.stock) === 0
      ? `absolute opacity-40 bg-black w-full h-full z-[5]`
      : "";

  return (
    <div className="min-h-full flex flex-col justify-center items-center md:my-[10%]">
      <div className="w-full md:w-4/5 lg:[65%] lg/xl:w-1/2 h-[70%] flex flex-col md:flex-row md:space-x-8 p-4">
        <div className="relative w-full md:w-1/2 max-h-full">
          {getTotalStock(product.stock) === 0 && (
            <h3 className="absolute top-1/2 -translate-y-1/2 h-1/5 w-full text-white text:xl md:text-2xl flex items-center justify-center z-[6]">
              SOLD OUT
            </h3>
          )}
          <div className={imageBackdrop} />
          <SlideShow imgs={imageUrls} width={1000} height={1500} />
        </div>
        <div className="w-full md:w-1/2 h-full">
          <p className="text-2xl font-medium my-2">
            {product.brand} - {product.title}
          </p>
          <p className="py-1 text-base m-0">{product.price}Kr</p>
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
