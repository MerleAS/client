import { useRouter } from "next/router";
import { useContext, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { StateContext } from "../../context/stateContext";
import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/checkout.module.css";

import Modal from "../../components/UI/modal";
import RadioButton from "../../components/UI/radioButton";
import Input from "../../components/UI/input";

import HeltHjem from "../../public/icons/SVG/heltHjem.svg";
import Posten from "../../public/icons/SVG/posten.svg";

const Checkout = () => {
  const { getTotalAmount, cartItems, serverUrl } = useContext(StateContext);
  const router = useRouter();
  const isMobile = useIsMobile();

  const [error, setError] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const [shippingRadioValue, setShippingRadioValue] = useState("");
  const [paymentRadioValue, setPaymentRadioValue] = useState("card");

  const orderHandler = async () => {
    try {
      if (
        email.includes("@") &&
        firstName !== "" &&
        lastName !== "" &&
        address !== "" &&
        postalCode &&
        city !== "" &&
        country !== "" &&
        phone !== "" &&
        cartItems.length > 0
      ) {
        const response = await axios.post(serverUrl + "orders/create-order", {
          cartItems: cartItems,
          email: email,
          firstName: firstName,
          lastName: lastName,
          address: address,
          postalCode: postalCode,
          city: city,
          country: country,
          phone: phone,
        });
        console.log(response);
      } else {
        throw new Error("Missing customer information");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const stripeHandler = async () => {
    try {
      const response = await axios.post(
        serverUrl + "orders/create-checkout-session",
        {
          cartItems: cartItems,
        }
      );
      const url = response.data.url;
      console.log(url);
      window.location = url;
    } catch (error) {}
  };

  const cardNotSelected =
    paymentRadioValue === "card" ? "" : classes.cardNotSelected;
  const vippsNotSelected =
    paymentRadioValue === "vipps" ? "" : classes.vippsNotSelected;

  const orderSummary = (
    <>
      <div className={classes.cartItemsContainer}>
        {cartItems.length > 0 &&
          cartItems.map((item, index) => (
            <div className={classes.cartItemContainer} key={index}>
              <div className={classes.imageContainer}>
                <Image
                  src={serverUrl + item.imageUrls[0]}
                  loader={() => serverUrl + item.imageUrls[0]}
                  layout="responsive"
                  alt="image"
                  width={1000}
                  height={1500}
                />
              </div>
              <div className={classes.cartItemInfoContainer}>
                <div className={classes.cartItemInfo}>
                  <p className={classes.textBold}>{item.title}</p>
                  <p className={classes.textGrey}>{item.size}</p>
                  <p className={classes.text}>{item.amount} item</p>
                </div>
                <div className={classes.cartItemInfo}>
                  <p className={classes.text}></p>
                  <p className={classes.text}></p>
                  <p className={classes.text}>{item.price} kr</p>
                </div>
              </div>
            </div>
          ))}
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
          <p className={classes.text2}>{getTotalAmount()}</p>
        </div>
        <div className={classes.orderSummaryInfoRow}>
          <p className={classes.text2}>Shipping</p>
          <p className={classes.text2}>?</p>
        </div>
        <div className={classes.line}></div>
        <div className={classes.orderSummaryInfoRow}>
          <p className={classes.text2}>Total</p>
          <p className={classes.text2}>?</p>
        </div>
      </div>
    </>
  );

  const customerInformationForm = (
    <>
      <div className={classes.inputHeading}>
        <p className={classes.textBoldLarge}>Shipping information</p>
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.innerInputContainer}>
          <div className={classes.emailContainer}>
            <Input
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              inputClass={classes.input}
            />
          </div>
          <div className={classes.inputCluster}>
            <Input
              label="First name"
              inputClass={classes.input}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <Input
              label="Last name"
              inputClass={classes.input}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className={classes.inputCluster}>
            <Input
              label="Address"
              inputClass={classes.input}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <Input
              label="Postal Code"
              inputClass={classes.input}
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
              type="number"
            />
          </div>
          <div className={classes.inputCluster}>
            <Input
              label="City"
              inputClass={classes.input}
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <Input
              label="Country"
              inputClass={classes.input}
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>

          <div className={classes.inputCluster2}>
            <div className={classes.input}>
              <p className={classes.phoneCode}>+47</p>
            </div>
            <Input
              label="Phone Number"
              inputClass={classes.input}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="number"
            />
          </div>
        </div>
      </div>
    </>
  );

  const shippingInformation = (
    <>
      <div className={classes.shippingHeading}>
        <p className={classes.textBoldLarge}>Shipping</p>
      </div>
      <div className={classes.shippingInfoContainer}>
        <div className={classes.shippingOptionContainer}>
          <RadioButton
            value="helt-hjem"
            radioValue={shippingRadioValue}
            setRadioValue={setShippingRadioValue}
          />
          <div className={classes.shippingInfo}>
            <p className={classes.textBold}>Helt hjem</p>
            <p className={classes.textGrey}>Leveres om 4-7 virkedager</p>
          </div>
          <div className={classes.shippingPrice}>
            <p className={classes.text2}>80kr</p>
          </div>
          <div className={classes.shippingIcon}>
            <HeltHjem height="35" width="35" />
          </div>
        </div>

        <div className={classes.shippingOptionContainer}>
          <RadioButton
            value="posten"
            radioValue={shippingRadioValue}
            setRadioValue={setShippingRadioValue}
          />
          <div className={classes.shippingInfo}>
            <p className={classes.textBold}>Posten</p>
            <p className={classes.textGrey}>Leveres om 4-7 virkedager</p>
          </div>
          <div className={classes.shippingPrice}>
            <p className={classes.text2}>80kr</p>
          </div>
          <div className={classes.shippingIcon}>
            <Posten width="28" height="28" />
          </div>
        </div>
      </div>
    </>
  );

  const paymentInformation = (
    <>
      <div className={classes.paymentHeading}>
        <p className={classes.textBoldLarge}>Payments</p>
      </div>

      <div className={classes.paymentInfoContainer}>
        <div className={classes.paymentHeadersContainer}>
          <div
            className={`${classes.paymentHeaderContainer} ${cardNotSelected}`}
          >
            <div className={classes.radioButtonContainer}>
              <RadioButton
                value="card"
                radioValue={paymentRadioValue}
                setRadioValue={setPaymentRadioValue}
              />
            </div>
            <div className={classes.paymentHeader}>
              Kredittkort eller debetkort
              <button onClick={stripeHandler}>checkout</button>
            </div>
          </div>
          <div
            className={`${classes.paymentHeaderContainer} ${vippsNotSelected}`}
          >
            <div className={classes.radioButtonContainer}>
              <RadioButton
                value="vipps"
                radioValue={paymentRadioValue}
                setRadioValue={setPaymentRadioValue}
              />
            </div>
            <div className={classes.paymentHeader}>Vipps</div>
          </div>
        </div>

        <div className={classes.paymentBodyContainer}>
          <div className={classes.cardBody}></div>
          <div className={classes.vippsBody}></div>
        </div>
      </div>
    </>
  );

  const mobileCustomerInformationForm = (
    <>
      <div className={classes.inputHeading}>
        <p className={classes.textBoldLarge}>Shipping information</p>
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.innerInputContainer}>
          <Input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            inputClass={classes.input}
          />
          <Input
            label="First name"
            inputClass={classes.input}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <Input
            label="Last name"
            inputClass={classes.input}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <Input
            label="Address"
            inputClass={classes.input}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <Input
            label="Postal Code"
            inputClass={classes.input}
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            type="number"
          />
          <Input
            label="City"
            inputClass={classes.input}
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <Input
            label="Country"
            inputClass={classes.input}
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />

          <div className={classes.inputCluster2}>
            <div className={classes.input}>
              <p className={classes.phoneCode}>+47</p>
            </div>
            <Input
              label="Phone Number"
              inputClass={classes.input}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="number"
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {!isMobile && (
        <>
          <div onClick={() => router.push("/")} className={classes.header}>
            MERLE
          </div>
          <div className={classes.contentContainer}>
            <div className={classes.customerInformationContainer}>
              {customerInformationForm}
            </div>
            <div className={classes.shippingContainer}>
              {shippingInformation}
            </div>
            <div className={classes.paymentContainer}>{paymentInformation}</div>

            <div className={classes.orderSummaryContainer}>{orderSummary}</div>
          </div>
        </>
      )}

      {isMobile && (
        <>
          <div
            onClick={() => router.push("/")}
            className={classes.mobileHeader}
          >
            MERLE
          </div>

          <div className={classes.mobileContentContainer}>
            <div className={classes.mobileOrderSummaryContainer}>
              {orderSummary}
            </div>

            <div className={classes.mobileCustomerInformationContainer}>
              {mobileCustomerInformationForm}
            </div>
            <div className={classes.mobileShippingContainer}>
              {shippingInformation}
            </div>
            <div className={classes.mobilePaymentContainer}>
              {paymentInformation}
            </div>
          </div>
        </>
      )}
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
