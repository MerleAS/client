import { getTotalStock } from "../../../../../util/getTotalStock";
import IncrementInput from "../../../../../components/UI/incrementInput";

const SizePicker = ({
  product,
  stock,
  selectedSize,
  setCount,
  setSelectedSize,
}) => {
  const countHandler = (val, type) => {
    if (count < selectedSize.in_stock && type === "increment") {
      setCount(val);
    } else if (count > 0 && type === "decrement") {
      setCount(val);
    }
  };

  return (
    <>
      {stock.length > 1 &&
        stock.map((size, index) => {
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
              className="h-[15%] min-h-24 w-full flex items-center mt-6"
              key={index}
            >
              <div className="h-full flex flex-col min-w-[10%] mr-[10%] items-center">
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
            </div>
          );
        })}
      {getTotalStock(product.stock) > 1 && (
        <div className="w-full flex items-center">
          <IncrementInput count={count} setCount={countHandler} />
        </div>
      )}
    </>
  );
};

export default SizePicker;
