"use client";

import { useStore } from "../../../../util/store";

import ProductList from "../../../../components/views/productList";
import Input from "../../../../components/UI/input";

const OrderSummary = ({
  setDiscountCode,
  getTotalAmount,
  discountCode,
  shippingRadioValue,
  validateDiscount,
}) => {
  const { cartItems, dispatch } = useStore();

  const amountHandler = (item, type) => {
    if (type === "increment" && item.amount + 1 <= item.in_stock) {
      dispatch({
        type: "CHANGE_AMOUNT",
        product: item,
        operation: "increment",
      });
    } else if (type === "decrement" && item.amount - 1 > 0) {
      dispatch({
        type: "CHANGE_AMOUNT",
        product: item,
        operation: "decrement",
      });
    }
  };

  return (
    <aside className="w-full md:w-[45%] lg/xl:w-[35%] md:min-h-full flex flex-col">
      <div
        className="w-full flex flex-col justify-between sticky border border-gray-300 rounded-sm bg-white p-6 min-h-2/5 mb-[8%] 
      md:mb-0 md:h-[80vh] top-[10%]"
      >
        <div className="grid grid-cols-1 gap-x-[3%] m-0 min-h-0 max-h-3/5 overflow-scroll">
          <ProductList
            products={cartItems}
            amountHandler={amountHandler}
            dispatch={dispatch}
          />
        </div>
        <div className="min-h-fit max-h-[95%] w-full flex flex-col">
          <div className="h-1/5 p-[4%] my-[4%] w-full flex flex-row items-center space-x-[5%]  ">
            <Input
              containerClass="ml-[5%] min-w-[150px] max-w-[50%]"
              inputClass="min-h-[20px] rounded-sm focus:outline-none placeholder-opacity-100 placeholder-gray-400"
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
            <p className="text-sm m-0 font-light">
              {getTotalAmount(cartItems) + " kr"}
            </p>
          </div>
          <div className="w-[90%] m-[5%] flex justify-between">
            <p className="text-sm m-0 font-light">Shipping</p>
            <p className="text-sm m-0 font-light">
              {shippingRadioValue.price
                ? shippingRadioValue.price + " kr"
                : "?"}
            </p>
          </div>
          {discountCode.valid && (
            <div className="w-[90%] m-[5%] flex justify-between">
              <p className="text-sm m-0 font-light">Discount</p>
              <p className="text-sm m-0 font-light">
                -{getTotalAmount(cartItems) * discountCode.value + " kr"}
              </p>
            </div>
          )}

          <div className="border border-b-gray-400" />
          <div className="w-[90%] m-[5%] flex justify-between">
            <p className="text-sm m-0 font-light">Total</p>
            <p className="text-sm m-0 font-light">
              {shippingRadioValue.price
                ? parseInt(getTotalAmount(cartItems)) *
                    (1 - discountCode.value) +
                  parseInt(shippingRadioValue.price) +
                  " kr"
                : getTotalAmount(cartItems) * (1 - discountCode.value) +
                  " " +
                  "+ shipping"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
