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
    <div className="min-h-full flex flex-col justify-center items-center">
      <div className="w-full md:w-[90%] lg:4/5 lg/xl:w-[75%] h-[70%] flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 p-8 md:p-4">
        
        <div className="relative w-full md:w-[55%] md/lg:w-1/2 lg:w-[45%] xl:w-2/5 max-h-full">
          {getTotalStock(product.stock) === 0 && (
            <h3 className="absolute top-1/2 -translate-y-1/2 h-1/5 w-full text-white text:xl md:text-2xl flex items-center justify-center z-[6]">
              SOLD OUT
            </h3>
          )}
          <div className={imageBackdrop} />
          <div className="hidden md:flex"><SlideShow imgs={imageUrls} width={1000} height={1500} navigation={true}/></div>
          <div className="flex md:hidden"><SlideShow imgs={imageUrls} width={1000} height={1500}/></div>
        </div>

        <div className="w-full md:w-[45%] md/lg:w-1/2 lg:w-[55%] xl:w-3/5 h-full space-y-4">
          <h1 className="text-lg md:text-xl md/lg:text-2xl font-semibold">
            {product.title}
          </h1>
          <h2 className="py-1 text-base md/lg:text-xl font-medium m-0">{product.price}Kr</h2>
          <ProductForm product={product} />
        </div>

      </div>
    </div>
  );
};

export default Product;
