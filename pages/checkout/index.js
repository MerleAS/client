import { useContext, useState } from "react";
import Image from "next/image";

import { StateContext } from "../../context/stateContext";
import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/checkout.module.css";

import Header from "../../components/layout/header";

const Checkout = () => {
  const { totalAmount } = useContext(StateContext);
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [countryPhoneCode, setCountryPhoneCode] = useState();
  const [phone, setPhone] = useState();

  const stepHandler = (type) => {
    if (type === "increment" && step < 3) {
      setStep((prev) => prev + 1);
    } else if (type === "decrement" && step >= 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <Header color="black" className={classes.header} />

      {!isMobile && (
        <div className={classes.contentContainer}>
          {step === 0 && (
            <div className={classes.infoContainer}>
              <p className={classes.heading}>Shipping information</p>
              <div className={classes.inputContainer}>
                <div className={classes.emailContainer}>
                  <input
                    placeholder="Email"
                    className={classes.input}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></input>
                </div>
                <div className={classes.inputCluster}>
                  <input
                    placeholder="First Name"
                    className={classes.input}
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  ></input>
                  <input
                    placeholder="Last Name"
                    className={classes.input}
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  ></input>
                </div>
                <div className={classes.inputCluster}>
                  <input
                    placeholder="Address"
                    className={classes.input}
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  ></input>
                  <input
                    placeholder="Postal Code"
                    className={classes.input}
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                  ></input>
                </div>
                <div className={classes.inputCluster}>
                  <input
                    placeholder="City"
                    className={classes.input}
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  ></input>
                  <input
                    placeholder="Country"
                    className={classes.input}
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  ></input>
                </div>

                <div className={classes.inputCluster}>
                  <input
                    placeholder="Country Phone Code (+47)"
                    className={classes.input}
                    onChange={(e) => setCountryPhoneCode(e.target.value)}
                    value={countryPhoneCode}
                  ></input>
                  <input
                    placeholder="Phone Number"
                    className={classes.input}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  ></input>
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <>
              <div className={classes.shippingContainer}>
                <h3>Shipping information</h3>
                <div className={classes.shippingInfoContainer} onClick={() => stepHandler('decrement')}>test</div>
                <h3>Delivery information</h3>
                <div className={classes.shippingInfoContainer}>test</div>
                <h3>Payment method</h3>
                <div  className={classes.shippingInfoContainer}>test</div>
              </div>
            </>
          )}

          <div className={classes.checkoutContainer}>
            <div className={classes.checkoutInfoContainer}>
              <p className={classes.checkoutText}>Total</p>
              <p className={classes.checkoutText}>{totalAmount}</p>
            </div>
            <div className={classes.checkoutInfoContainer}>
              <p className={classes.checkoutText}>Shipping</p>
              <p className={classes.checkoutText}>?</p>
            </div>
            <div className={classes.line}></div>
            <div className={classes.checkoutInfoContainer}>
              <p className={classes.checkoutText}>Total sum(inkl. MVA)</p>
              <p className={classes.checkoutText}>?</p>
            </div>
            <div className={classes.buttonContainer}>
              <button
                className={classes.button}
                onClick={() => stepHandler("increment")}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {isMobile && (
        <div className={classes.mobileContentContainer}>
          <div className={classes.mobileCartContainer}>
            <p className={classes.mobileHeading}>Your Cart</p>

            <div className={classes.mobileCartItemsContainer}>
              {cartItems.length > 0 &&
                cartItems.map((item) => (
                  <div className={classes.mobileCartItemContainer}>
                    <Image
                      src={serverUrl + item.imageUrl}
                      layout="fixed"
                      width={130}
                      height={80}
                    />
                    <div className={classes.mobileCartItemInfo}>
                      <p className={classes.mobileCartItemTitle}>
                        {item.title}
                      </p>
                      <p className={classes.mobileText}>Size {item.size}</p>
                      <p className={classes.mobileText}>Amount {item.amount}</p>
                      <p className={classes.mobileText}>
                        Price: {item.price * item.amount}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Checkout;
