import { useContext, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { StateContext } from "../../context/stateContext";
import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/checkout.module.css";

import Header from "../../components/layout/header";
import Modal from "../../components/UI/modal";

const Checkout = () => {
  const { getTotalAmount, cartItems, serverUrl } = useContext(StateContext);
  const isMobile = useIsMobile();
  const [step, setStep] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const stepHandler = (type) => {
    if (type === "decrement") {
      setStep(false);
    } else if (type === "increment") {
      if (
        email.includes('@') &&
        firstName !== "" &&
        lastName !== "" &&
        address !== "" &&
        postalCode &&
        city !== "" &&
        country !== "" &&
        phone
      ) {
        setStep(true);
      } else {
        setError(true);
      }
    }
  };

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

  console.log(error);

  return (
    <>
      <Header color="black" className={classes.header} />

      {!isMobile && (
        <div className={classes.contentContainer}>
          {!step && (
            <div className={classes.infoContainer}>
              <p className={classes.heading}>Shipping information</p>
              <div className={classes.inputContainer}>
                <div className={classes.emailContainer}>
                  <input
                    placeholder="Email"
                    className={classes.input}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
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
                    type="number"
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

                <div className={classes.inputCluster2}>
                  <div className={classes.input}>
                    <p className={classes.phoneCode}>+47</p>
                  </div>
                  <input
                    placeholder="Phone Number"
                    className={classes.input}
                    style={{ width: "auto" }}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="number"
                  ></input>
                </div>
              </div>
              <div className={classes.deliveryButtonContainer}>
                <button
                  className={classes.deliveryButton}
                  onClick={() => stepHandler("increment")}
                >
                  CONTINUE TO DELIVERY
                </button>
              </div>
            </div>
          )}

          {step && (
            <>
              <div className={classes.shippingContainer}>
                <h3>Shipping information</h3>
                <div
                  className={classes.shippingInfoContainer}
                  onClick={() => stepHandler("decrement")}
                >
                  <p className={classes.text2}>
                    {firstName} {lastName}
                  </p>
                  <p className={classes.text2}>{address}</p>
                  <p className={classes.text2}>
                    {postalCode} {city}
                  </p>
                  <p className={classes.text2}>{country}</p>

                  <p className={classes.text2}>+47 {phone}</p>
                  <p className={classes.text2}>{email}</p>
                </div>
                <h3>Delivery information</h3>
                <div className={classes.shippingInfoContainer}>test</div>
                <h3>Payment method</h3>
                <div className={classes.shippingInfoContainer}>test</div>
                <button onClick={orderHandler}>ORDER</button>
              </div>
            </>
          )}

          <div className={classes.checkoutContainer}>
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
                        width={785}
                        height={1490}
                      />
                    </div>
                    <div className={classes.cartItemInfoContainer}>
                      <div className={classes.cartItemInfo}>
                        <p className={classes.text}>{item.title}</p>
                        <p className={classes.text}>{item.size}</p>
                      </div>
                      <div className={classes.cartItemInfo}>
                        <p className={classes.text}>{item.price}</p>
                        <p className={classes.text}>{item.amount} item</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={classes.checkoutInfoContainer}>
              <div className={classes.line}></div>
              <div className={classes.buttonContainer}>
                <button className={classes.button}>DISCOUNT CODE</button>
                <button className={classes.button}>APPLY</button>
              </div>
              <div className={classes.line}></div>
              <div className={classes.checkoutInfoRow}>
                <p className={classes.checkoutText}>Subtotal</p>
                <p className={classes.checkoutText}>{getTotalAmount()}</p>
              </div>
              <div className={classes.checkoutInfoRow}>
                <p className={classes.checkoutText}>Shipping</p>
                <p className={classes.checkoutText}>?</p>
              </div>
              <div className={classes.line}></div>
              <div className={classes.checkoutInfoRow}>
                <p className={classes.checkoutText}>Total</p>
                <p className={classes.checkoutText}>?</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <>
          <div className={classes.mobileContentContainer}>
            {!step && (
              <>
                <div className={classes.mobileInfoContainer}>
                  <p className={classes.heading}>Shipping information</p>
                  <div className={classes.mobileInputContainer}>
                    <input
                      placeholder="Email"
                      className={classes.mobileInput}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                    ></input>
                    <input
                      placeholder="First Name"
                      className={classes.mobileInput}
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    ></input>
                    <input
                      placeholder="Last Name"
                      className={classes.mobileInput}
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    ></input>
                    <input
                      placeholder="Address"
                      className={classes.mobileInput}
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    ></input>
                    <input
                      placeholder="Postal Code"
                      className={classes.mobileInput}
                      onChange={(e) => setPostalCode(e.target.value)}
                      value={postalCode}
                      type="number"
                    ></input>
                    <input
                      placeholder="City"
                      className={classes.mobileInput}
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    ></input>
                    <input
                      placeholder="Country"
                      className={classes.mobileInput}
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                    ></input>
                  </div>
                  <div className={classes.mobileInputCluster}>
                    <div className={classes.mobileInput}>
                      <p className={classes.phoneCode}>+47</p>
                    </div>
                    <input
                      placeholder="Phone Number"
                      className={classes.mobileInput}
                      style={{ width: "auto" }}
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="number"
                    ></input>
                  </div>
                  <div className={classes.deliveryButtonContainer}>
                    <button
                      className={classes.deliveryButton}
                      onClick={() => stepHandler("increment")}
                    >
                      CONTINUE TO DELIVERY
                    </button>
                  </div>
                </div>
              </>
            )}

            {step && <></>}

            <div className={classes.mobileCheckoutContainer}>
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
                          width={785}
                          height={1490}
                        />
                      </div>
                      <div className={classes.cartItemInfoContainer}>
                        <div className={classes.cartItemInfo}>
                          <p className={classes.text}>{item.title}</p>
                          <p className={classes.text}>{item.size}</p>
                        </div>
                        <div className={classes.cartItemInfo}>
                          <p className={classes.text}>{item.price}</p>
                          <p className={classes.text}>{item.amount} item</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className={classes.checkoutInfoContainer}>
                <div className={classes.line}></div>
                <div className={classes.buttonContainer}>
                  <button className={classes.button}>DISCOUNT CODE</button>
                  <button className={classes.button}>APPLY</button>
                </div>
                <div className={classes.line}></div>
                <div className={classes.checkoutInfoRow}>
                  <p className={classes.checkoutText}>Subtotal</p>
                  <p className={classes.checkoutText}>{getTotalAmount()}</p>
                </div>
                <div className={classes.checkoutInfoRow}>
                  <p className={classes.checkoutText}>Shipping</p>
                  <p className={classes.checkoutText}>?</p>
                </div>
                <div className={classes.line}></div>
                <div className={classes.checkoutInfoRow}>
                  <p className={classes.checkoutText}>Total</p>
                  <p className={classes.checkoutText}>?</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {error && (
        <Modal>
          <p>Please fill in all the shipping information</p>
          <button className={classes.deliveryButton} onClick={() => setError(false)}>
            Ok
          </button>
        </Modal>
      )}
    </>
  );
};

export default Checkout;
