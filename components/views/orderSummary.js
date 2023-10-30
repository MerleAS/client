import ProductList from "./productList";
import Input from "../UI/input";

const OrderSummary = ({
  setDiscountCode,
  getTotalAmount,
  discountCode,
  cartItems,
  shippingRadioValue,
  validateDiscount
}) => {
  return (
    <div
      className="flex flex-col min-h-2/5 mb-[8%] p-6 border border-gray-300 rounded-sm justify-between  
    md:fixed md:top-[4rem] md:right-[10%] md:h-4/5 md:min-w-[250px] md:w-1/4 bg-white"
    >
      <div className="grid grid-cols-1 gap-x-[3%] m-0 min-h-0 max-h-3/5 overflow-scroll">
        <ProductList products={cartItems} type={1} />
      </div>
      <div className="min-h-fit max-h-[95%] w-full flex flex-col">
        <div className="h-1/5 p-[4%] my-[4%] w-full flex flex-row items-center space-x-[5%]  ">
          <Input
            containerClass="ml-[5%] min-w-[150px] max-w-[50%]"
            inputClass="w-full min-h-[20px] py-[10px] pl-[15px] text-black border border-gray-400 rounded-sm focus:outline-none placeholder-opacity-100 placeholder-gray-400"
            labelClass="!left-[15px]"
            label="Discount code"
            value={discountCode.label}
            onChange={(e) =>
              setDiscountCode((prev) => ({ ...prev, label: e.target.value }))
            }
          />
          <button
            className="bg-white p-0 border-b-gray-400 h-[20px]"
            onClick={() => validateDiscount()}
          >
            Apply
          </button>
        </div>
        <div className="border border-b-gray-400" />
        <div className="w-[90%] m-[5%] flex justify-between">
          <p className="text-sm m-0 font-light">Subtotal</p>
          <p className="text-sm m-0 font-light">{getTotalAmount() + " kr"}</p>
        </div>
        <div className="w-[90%] m-[5%] flex justify-between">
          <p className="text-sm m-0 font-light">Shipping</p>
          <p className="text-sm m-0 font-light">
            {shippingRadioValue.price ? shippingRadioValue.price + " kr" : "?"}
          </p>
        </div>
        {discountCode.valid && (
          <div className="w-[90%] m-[5%] flex justify-between">
            <p className="text-sm m-0 font-light">Discount</p>
            <p className="text-sm m-0 font-light">
              -{getTotalAmount() * discountCode.value + " kr"}
            </p>
          </div>
        )}

        <div className="border border-b-gray-400"/>
        <div className="w-[90%] m-[5%] flex justify-between">
          <p className="text-sm m-0 font-light">Total</p>
          <p className="text-sm m-0 font-light">
            {shippingRadioValue.price
              ? parseInt(getTotalAmount()) * (1 - discountCode.value) +
                parseInt(shippingRadioValue.price) +
                " kr"
              : getTotalAmount() * (1 - discountCode.value) +
                " " +
                "+ shipping"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
