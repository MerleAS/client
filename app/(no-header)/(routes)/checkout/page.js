"use client";

import Link from "next/link";

import { useState } from "react";
import axios from "axios";

import { useStore } from "../../../../util/store";
import { getTotalAmount } from "../../../../util/getTotalAmount";

import RadioCheckbox from "./radioCheckbox";
import VippsForm from "./vippsForm";
import OrderSummary from "./orderSummary";

import HeltHjem from "../../../../public/icons/SVG/heltHjem.svg";
import Posten from "../../../../public/icons/SVG/posten.svg";
import Card from "../../../../public/icons/SVG/card.svg";
import Vipps from "../../../../public/icons/SVG/vipps.svg";
import Merle from "../../../../public/icons/SVG/merle.svg";

// Option arrays for payments and shipping

const paymentOptions = [
  {
    label: "Card",
    value: "card",
    icon: <Card height="30" width="30" />,
    description: "Ingen ekstra kostnader",
    price: null,
  },
  {
    label: "Vipps",
    value: "vipps",
    icon: <Vipps height="30" width="30" />,
    description: "Ingen ekstra kostnader",
    price: null,
  },
];

const shippingOptions = [
  {
    label: "Helt Hjem",
    value: "helt-hjem",
    icon: <HeltHjem height="30" width="30" />,
    description: "Leveres om 4-7 virkedager",
    price: 139,
  },
  {
    label: "Posten",
    value: "posten",
    icon: <Posten height="30" width="30" />,
    description: "Leveres om 4-7 virkedager",
    price: 129,
  },
];

const Checkout = () => {
  const { cartItems, dispatch } = useStore();

  const [shippingRadioValue, setShippingRadioValue] = useState({
    label: "",
    price: 0,
  });
  const [paymentRadioValue, setPaymentRadioValue] = useState({
    label: "card",
    price: null,
  });

  const [discountCode, setDiscountCode] = useState({
    label: "",
    valid: false,
    value: 0,
    _id: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const vippsHandler = async (customerInfo) => {
    console.log("cc", customerInfo);

    setIsLoading(true);
    try {
      if (
        shippingRadioValue.label === "" ||
        paymentRadioValue.label === "" ||
        cartItems.length === 0
      ) {
        dispatch({
          type: "SET_ERROR",
          value: true,
          message: "Please fill in all the input forms",
        });
        setIsLoading(false);
        return;
      }

      const order = {
        email: customerInfo.email,
        phone: customerInfo.phone,
        name: customerInfo.name,
        country: customerInfo.country,
        city: customerInfo.city,
        address: customerInfo.address,
        address2: customerInfo.address2,
        postalCode: customerInfo.postalCode,
        shipping: shippingRadioValue,
        paymentMethod: paymentRadioValue,
        cartItems: cartItems,
        discountCode: discountCode,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/create-vipps-session`,
        order
      );
      setIsLoading(false);
      window.location.href = response.data.url;
    } catch (error) {
      setIsLoading(false);
      dispatch({
        type: "SET_ERROR",
        message: "Something went wrong, please try again",
        value: true,
      });
    }
  };

  const validateDiscount = async () => {
    console.log(discountCode);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/discount/validate-discount-code`,
      {
        discountCode: discountCode,
      }
    );
    const discount = response.data.discount;
    setDiscountCode(discount);
  };

  return (
    <>
      <Link
        href="/"
        className="w-full h-[30px] mt-5 text-xl flex items-center justify-center md:h-[50px] md:w-[65%]"
      >
        <Merle height="80" width="200" />
      </Link>

      <div className="flex flex-col md:flex-row-reverse w-full gap-x-[10%] mt-8 px-[5%] md:px-[10%] pb-[15%] h-fit ">
        <OrderSummary
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          getTotalAmount={getTotalAmount}
          validateDiscount={validateDiscount}
          cartItems={cartItems}
          shippingRadioValue={shippingRadioValue}
        />

        <div className="flex flex-col space-y-[5%] w-full md:w-[55%]">
          <RadioCheckbox
            optionList={shippingOptions}
            title="Shipping"
            setRadioValue={(e) => setShippingRadioValue(e)}
            radioValue={shippingRadioValue}
          />
          <RadioCheckbox
            title="Payments"
            optionList={paymentOptions}
            setRadioValue={(e) => setPaymentRadioValue(e)}
            radioValue={paymentRadioValue}
          />
          <VippsForm vippsHandler={vippsHandler} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
