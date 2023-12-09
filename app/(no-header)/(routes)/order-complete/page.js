import Link from "next/link";

import Merle from "../../../../public/icons/SVG/merle.svg";
import ProductList from "../../../../components/views/productList";
import DropDown from "../../../../components/UI/dropDown";
import Button from "../../../../components/UI/button";

const OrderComplete = ({ searchParams: { order } }) => {
  const orderObject = JSON.parse(order);

  return (
    <div className="w-full md:h-full flex flex-col md:flex-row md:space-x-[10%] lg:space-x-[15%] px-[5%] md:px-[10%] mb-[10%]">
      <div className="w-full my-[5%] md:w-[45%] space-y-[5%]">
        <Link
          className="w-full h-[15%] flex items-center justify-center md:mt-[10%] md:mb-[5%]"
          href="/"
        >
          <Merle height="80" width="200" />
        </Link>

        <DropDown
          placeholder="Order Summary"
          className="w-full !min-h-32 h-fit max-h-[45vh] overflow-scroll border border-gray-300 rounded-sm space-y-4"
        >
          <div className="space-y-12 overflow-scroll ">
            <ProductList products={orderObject.cartItems} type={1} />
          </div>
        </DropDown>
      </div>

      <div className="w-full md:w-[40%] md:mt-[5%] md:mr-[10%] md:h-[70%]">
        <div className="w-full h-full border border-gray-300 rounded-sm mr-[10%] flex mb-[10%]">
          <div className="w-full h-[94%] p-4 flex flex-col justify-evenly ">
            <div className="w-full h-[10%] flex justify-center">
              <p className="text-lg font-medium m-0">Customer information</p>
            </div>
            <div className="w-full">
              <p className="text-sm font-normal my-2">Contact information</p>
              <p className="text-xs font-light my-[2px]">{orderObject.name}</p>
              <p className="text-xs font-light my-[2px]">{orderObject.email}</p>
              <p className="text-xs font-light my-[2px]">{orderObject.phone}</p>
            </div>
            <div className="w-full">
              <p className="text-sm font-normal my-2">Shipping address</p>
              <p className="text-xs font-light my-[2px]">
                {orderObject.country}
              </p>
              <p className="text-xs font-light my-[2px]">{orderObject.city}</p>
              <p className="text-xs font-light my-[2px]">
                {orderObject.address}
              </p>
              <p className="text-xs font-light my-[2px]">
                {orderObject.postalCode}
              </p>
            </div>
            <div>
              <p className="text-sm font-normal my-2">Shipping method</p>
              <p className="text-xs font-light my-[2px]">
                {orderObject.shipping.label} - {orderObject.shipping.price} kr
              </p>
            </div>
            <div>
              <p className="text-sm font-normal my-2">Payment method</p>
              <p className="text-xs font-light my-[2px]">
                {orderObject.paymentMethod.label}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <Link
          className="w-2/5 min-w-fit"
            href="/products"
          >
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link className="text-sm text-gray-400 mt-2" href="/contact">
            Need help? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
