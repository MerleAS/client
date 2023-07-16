import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";

import classes from "../../styles/components/views/checkoutForm.module.css";

const CheckoutForm = ({
  pm,
  setAddress,
  setCity,
  setCountry,
  setPostalCode,
  setName,
  setPhone,
  handleSubmit,
  setEmail,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={classes.container}>
      <form
        id="payment-form"
        onSubmit={(e) => handleSubmit(e, stripe, elements, setIsLoading)}
      >
        <div className={classes.emailContainer}>
          <label className={classes.emailLabel}>Email</label>
          <div className={classes.inputContainer}>
            <input
              className={classes.emailInput}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
        <AddressElement
          options={{
            style: { base: { fontSize: "16px", height: "20px" } },
            mode: "shipping",
            allowedCountries: ["NO"],
            fields: {
              phone: "always",
              email: "always",
            },
            validation: {
              phone: {
                required: "always",
              },
            },
          }}
          onChange={(e) => {
            if (e.complete) {
              console.log("addressEvent", e);
              const a = e.value.address;
              setAddress(a.line1);
              setCountry(a.country);
              setCity(a.city);
              setPostalCode(a.postal_code);
              setName(e.value.name);
              setPhone(e.value.phone);
            }
          }}
        />
        {pm === "card" && (
          <>
            <PaymentElement />
            <div className={classes.buttonContainer}>
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={classes.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
