import { useState } from "react";
import { useRouter } from "next/router";

import ArrowUp from "../../public/icons/SVG/arrowUp.svg";
import ArrowDown from "../../public/icons/SVG/arrowDown.svg";
import Merle from "../../public/icons/SVG/merle.svg";

import ProductList from "../../components/views/productList";

const OrderComplete = () => {
  const router = useRouter();
  let order = {
    name: "",
    email: "",
    country: "Norge",
    city: "",
    address: "",
    postalCode: "",
    cartItems: [],
    shipping: {
      label: "",
      price: null,
    },
    paymentMethod: {
      label: "",
      price: 0,
    },
  };
  if (router.query.order) {
    order = JSON.parse(router.query.order);
    console.log(order);
  }

  const [dropdownActive, setDropdownActive] = useState(true);

  return (
    <div className="w-full md:h-full flex flex-col md:flex-row md:space-x-[10%] lg:space-x-[15%] px-[5%] md:px-[10%] mb-[10%]">
      <div className="w-full my-[5%] md:w-[45%] space-y-[5%]">
        <div
          className="w-full h-[15%] flex items-center justify-center md:mt-[10%] md:mb-[5%]"
          onClick={() => router.push("/")}
        >
          <Merle height="80" width="200" />
        </div>
        <div className="w-full !min-h-32 h-fit max-h-[45vh] overflow-scroll border border-gray-300 rounded-sm p-4 space-y-4">
          <div
            className="h-10 w-full flex justify-between "
            onClick={() => setDropdownActive((prev) => !prev)}
          >
            <p className="flex items-center justify-center">Order Summary</p>
            <div className="h-full flex items-center justify-center">
              {dropdownActive && <ArrowUp height="20" width="20" />}
              {!dropdownActive && <ArrowDown height="20" width="20" />}
            </div>
          </div>

          {dropdownActive && order.cartItems.length > 0 && (
            <div className="space-y-12 overflow-scroll ">
              <ProductList products={order.cartItems} type={1} />
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-[40%] md:mt-[5%] md:mr-[10%] md:h-[70%]">
        <div className="w-full h-full border border-gray-300 rounded-sm mr-[10%] flex mb-[10%]">
          <div className="w-full h-[94%] p-4 flex flex-col justify-evenly ">
            <div className="w-full h-[10%] flex justify-center">
              <p className="text-lg font-medium m-0">Customer information</p>
            </div>
            <div className="w-full">
              <p className="text-sm font-normal my-2">Contact information</p>
              <p className="text-xs font-light my-[2px]">{order.name}</p>
              <p className="text-xs font-light my-[2px]">{order.email}</p>
              <p className="text-xs font-light my-[2px]">{order.phone}</p>
            </div>
            <div className="w-full">
              <p className="text-sm font-normal my-2">Shipping address</p>
              <p className="text-xs font-light my-[2px]">{order.country}</p>
              <p className="text-xs font-light my-[2px]">{order.city}</p>
              <p className="text-xs font-light my-[2px]">{order.address}</p>
              <p className="text-xs font-light my-[2px]">{order.postalCode}</p>
            </div>
            <div>
              <p className="text-sm font-normal my-2">Shipping method</p>
              <p className="text-xs font-light my-[2px]">
                {order.shipping.label} - {order.shipping.price} kr
              </p>
            </div>
            <div>
              <p className="text-sm font-normal my-2">Payment method</p>
              <p className="text-xs font-light my-[2px]">
                {order.paymentMethod.label}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <button
            className="bg-black text-white w-2/5 min-w-fit h-10 px-4 py-2 border border-black rounded flex items-center justify-center"
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </button>
          <p className="text-xs text-gray-400 mt-1">Need help? Contact us</p>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
