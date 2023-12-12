"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import { useStore } from "../../../../util/store";
import { getTotalAmount } from "../../../../util/getTotalAmount";

import ZodForm from "./zodForm";
import OrderSummary from "./orderSummary";
import Merle from "../../../../public/icons/SVG/merle.svg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../../constants";

const Checkout = () => {
  const { cartItems, dispatch } = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState({
    label: "",
    valid: false,
    value: 0,
    _id: null,
  });

  const vippsHandler = async (formData) => {
    setIsLoading(true);
    try {
      if (cartItems.length === 0) {
        dispatch({
          type: "SET_ERROR",
          value: true,
          message: "Please fill in all the input forms",
        });
        setIsLoading(false);
        return;
      }

      const order = {
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        address2: formData.address2,
        postalCode: formData.postalCode,
        shipping: formData.shipping,
        paymentMethod: formData.payment,
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

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: null,
      country: "",
      city: "",
      address: "",
      address2: "",
      postalCode: null,
      shipping: {
        label: "helt-hjem",
        price: 139,
      },
      payment: "card",
    },
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Link
        href="/"
        className="w-full h-[30px] mt-5 text-xl flex items-center justify-center md:h-[50px] md:w-[65%]"
      >
        <Merle height="80" width="200" />
      </Link>

      <div className="flex flex-col md:flex-row-reverse w-full gap-x-[5%] lg:gap-x-[10%] mt-8 px-[5%] lg:px-[10%] pb-[15%] h-fit ">

        <OrderSummary
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          getTotalAmount={getTotalAmount}
          validateDiscount={validateDiscount}
          cartItems={cartItems}
          shippingRadioValue={watch("shipping")}
        />

        <div className="flex flex-col space-y-[5%] w-full md:w-[50%] lg/xl:w-[55%]">
          <ZodForm
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            handleSubmit={handleSubmit}
            vippsHandler={vippsHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
