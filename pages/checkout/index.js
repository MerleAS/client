import { useRouter } from "next/router";
import { useContext, useState } from "react";
import axios from "axios";

import { StateContext } from "../../context/stateContext";

import Error from "../../components/layout/error";

import RadioCheckbox from "../../components/views/radioCheckbox";
import VippsForm from "../../components/views/vippsForm";
import OrderSummary from "../../components/views/orderSummary";

import HeltHjem from "../../public/icons/SVG/heltHjem.svg";
import Posten from "../../public/icons/SVG/posten.svg";
import Card from "../../public/icons/SVG/card.svg";
import Vipps from "../../public/icons/SVG/vipps.svg";
import Merle from "../../public/icons/SVG/merle.svg";

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
    price: 80,
  },
  {
    label: "Posten",
    value: "posten",
    icon: <Posten height="30" width="30" />,
    description: "Leveres om 4-7 virkedager",
    price: 80,
  },
];

const Checkout = () => {
  const { getTotalAmount, cartItems, setErrorObject } =
    useContext(StateContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
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
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const vippsHandler = async () => {
    setIsLoading(true);
    try {
      if (
        !email.includes("@") ||
        phone === "" ||
        name === "" ||
        address === "" ||
        postalCode === "" ||
        city === "" ||
        country === "" ||
        shippingRadioValue.label === "" ||
        paymentRadioValue.label === "" ||
        cartItems.length === 0
      ) {
        setErrorObject({
          error: true,
          message: "Please fill in all the input forms",
        });
        setIsLoading(false);
        return;
      }

      const order = {
        email: email,
        phone: phone,
        name: name,
        country: country,
        city: city,
        address: address,
        address2: address2,
        postalCode: postalCode,
        shipping: shippingRadioValue,
        paymentMethod: paymentRadioValue,
        cartItems: cartItems,
        discountCode: discountCode,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/create-vipps-session`,
        order
      );
      window.location.href = response.data.url;
    } catch (error) {
      setIsLoading(false);
      setErrorObject({
        message: "Something went wrong, please try again",
        error: true,
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
      <div
        onClick={() => router.push("/")}
        className="w-full h-[30px] mt-5 text-xl flex items-center justify-center md:h-[50px] md:w-[65%]"
      >
        <Merle height="80" width="200" />
      </div>
      <div className="flex flex-col space-y-[5%] mt-[30px] mx-[5%] md:ml-[10%] pb-[15%] w-[90%] md:w-[45%]">
        <OrderSummary
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          getTotalAmount={getTotalAmount}
          validateDiscount={validateDiscount}
          cartItems={cartItems}
          shippingRadioValue={shippingRadioValue}
        />
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
        <VippsForm
          vippsHandler={vippsHandler}
          setEmail={setEmail}
          setName={setName}
          setPhone={setPhone}
          setCountry={setCountry}
          setCity={setCity}
          setAddress={setAddress}
          setAddress2={setAddress2}
          setPostalCode={setPostalCode}
          setErrorObject={setErrorObject}
          isLoading={isLoading}
        />
      </div>
      <Error />
    </>
  );
};

export default Checkout;
