import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import { StateContext } from "../../context/stateContext";
import classes from "../../styles/pages/checkout.module.css";
import useIsMobile from "../../components/util/useIsMobile";

import Modal from "../../components/UI/modal";
import Input from "../../components/UI/input";

import RadioCheckbox from "../../components/views/radioCheckbox";
import CheckoutForm from "../../components/views/checkoutForm";
import ProductList from "../../components/views/productList";

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
    price: "80",
  },
  {
    label: "Posten",
    value: "posten",
    icon: <Posten height="30" width="30" />,
    description: "Leveres om 4-7 virkedager",
    price: "80",
  },
];

const Checkout = ({ publishableKey, clientSecret }) => {
  const { getTotalAmount, cartItems, serverUrl } = useContext(StateContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingRadioValue, setShippingRadioValue] = useState({
    label: "",
    price: null,
  });
  const [paymentRadioValue, setPaymentRadioValue] = useState({
    label: "card",
    price: null,
  });

  const [error, setError] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  const router = useRouter();
  const isMobile = useIsMobile();

  const vippsHandler = async () => {
    console.log("vipps");
  };

  const stripeHandler = async (e, stripe, elements, setIsLoading) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

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
      setError(true);
      setIsLoading(false);
      return;
    }

    localStorage.clear();

    const order = {
      email: email,
      phone: phone,
      name: name,
      country: country,
      city: city,
      address: address,
      postalCode: postalCode,
      shipping: shippingRadioValue,
      paymentMethod: paymentRadioValue,
      cartItems: cartItems,
    };

    console.log(
      "url",
      `${serverUrl}/orders/order-complete?order=${encodeURIComponent(
        JSON.stringify(order)
      )}`
    );

   /*  const { error } = await stripe.confirmPayment({
      type: "card",
      elements,
      confirmParams: {
        return_url: `${serverUrl}/orders/order-complete?order=${encodeURIComponent(
          JSON.stringify(order)
        )}`,
      },
      shipping: {
        address: {
          line1: address,
          city: city,
          postal_code: postalCode,
          country: country,
        },
      },
    }); */

    if (error.type === "card_error" || error.type === "validation_error") {
      console.log("error", error);
    } else {
      console.log("error2", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setStripePromise(loadStripe(publishableKey));
  }, []);

  const orderSummary = (
    <>
      <div className={classes.cartItemsContainer}>
        <ProductList products={cartItems} type={1} />
      </div>
      <div className={classes.orderSummaryInfoContainer}>
        <div className={classes.discountContainer}>
          <Input
            containerClass={classes.discountInputContainer}
            inputClass={`${classes.input} ${classes.discountInput}`}
            labelClass={classes.discountLabel}
            label="Discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button className={classes.discountButton}>Apply</button>
        </div>
        <div className={classes.line}></div>
        <div className={classes.orderSummaryInfoRow}>
          <p className={classes.text2}>Subtotal</p>
          <p className={classes.text2}>{getTotalAmount() + " kr"}</p>
        </div>
        <div className={classes.orderSummaryInfoRow}>
          <p className={classes.text2}>Shipping</p>
          <p className={classes.text2}>
            {shippingRadioValue.price + " kr" || "?"}
          </p>
        </div>
        <div className={classes.line}></div>
        <div className={classes.orderSummaryInfoRow}>
          <p className={classes.text2}>Total</p>
          <p className={classes.text2}>
            {parseInt(getTotalAmount()) +
              parseInt(shippingRadioValue.price) +
              " kr" || getTotalAmount() + " " + "+ shipping"}
          </p>
        </div>
      </div>
    </>
  );

  // dynamic classes

  const headerClass = isMobile ? classes.mobileHeader : classes.header;
  const contentContainerClass = isMobile
    ? classes.mobileContentContainer
    : classes.contentContainer;
  const orderSummaryContainerClass = isMobile
    ? classes.mobileOrderSummaryContainer
    : classes.orderSummaryContainer;
  const shippingContainerClass = isMobile
    ? classes.mobileShippingContainer
    : classes.shippingContainer;
  const paymentContainerClass = isMobile
    ? classes.mobilePaymentContainer
    : classes.paymentContainer;
  const buttonContainerClass = isMobile
    ? `${classes.buttonContainer} ${classes.mobileButtonContainer}`
    : classes.buttonContainer;
  const buttonClass = isMobile
    ? `${classes.button} ${classes.mobileButton}`
    : classes.button;

  return (
    <>
      <>
        <div onClick={() => router.push("/")} className={headerClass}>
          <Merle height="80" width="200" />
        </div>
        <div className={contentContainerClass}>
          <div className={orderSummaryContainerClass}>{orderSummary}</div>
          <div className={shippingContainerClass}>
            <RadioCheckbox
              optionList={shippingOptions}
              title="Shipping"
              setRadioValue={setShippingRadioValue}
              radioValue={shippingRadioValue}
            />
          </div>
          <div className={paymentContainerClass}>
            <RadioCheckbox
              title="Payments"
              optionList={paymentOptions}
              setRadioValue={setPaymentRadioValue}
              radioValue={paymentRadioValue}
            />
          </div>
          <div className={classes.stripeContainer}>
            {stripePromise && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  pm={paymentRadioValue.label}
                  setEmail={setEmail}
                  setName={setName}
                  setPhone={setPhone}
                  setCountry={setCountry}
                  setCity={setCity}
                  setAddress={setAddress}
                  setPostalCode={setPostalCode}
                  handleSubmit={stripeHandler}
                />
              </Elements>
            )}
          </div>
          {paymentRadioValue.label === "vipps" && (
            <div className={buttonContainerClass}>
              <button className={buttonClass} onClick={vippsHandler}>
                Buy
              </button>
            </div>
          )}
        </div>
      </>

      {error && (
        <Modal>
          <p>Please fill in all the shipping information</p>
          <button
            className={classes.deliveryButton}
            onClick={() => setError(false)}
          >
            Ok
          </button>
        </Modal>
      )}
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const cartItems = context.query.cartItems;

  const publishableKeyResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/get-publishable-key`
  );
  const publishableKey = publishableKeyResponse.data.publishableKey;

  const clientSecretResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/client-secret`,
    {
      cartItems: JSON.parse(cartItems),
    }
  );
  const clientSecret = clientSecretResponse.data.clientSecret;

  return {
    props: {
      publishableKey: publishableKey,
      clientSecret: clientSecret,
    },
  };
}
