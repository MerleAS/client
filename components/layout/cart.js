import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import classes from "../../styles/components/layout/cart.module.css";
import useIsMobile from "../util/useIsMobile";
import { StateContext } from "../../context/stateContext";

import IncrementInput from "../UI/incrementInput";
import SideModal from "../UI/sideModal";

const Cart = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    cartIsActive,
    setCartIsActive,
    cartItems,
    serverUrl,
    getTotalAmount,
    changeAmountHandler,
    removeFromCartHandler,
  } = useContext(StateContext);

  const amountHandler = (item, type) => {
    if (type === "increment" && item.amount + 1 <= item.in_stock) {
      changeAmountHandler(item, type);
    } else if (type === "decrement" && item.amount - 1 > 0) {
      changeAmountHandler(item, type);
    }
  };

  const routeHandler = () => {
    setCartIsActive(false);
    router.push("/checkout");
  };

  useEffect(() => {
    setButtonDisabled(cartItems.length === 0);
  }, [cartItems]);

  const headerContent = <p className={classes.heading}>Your Cart</p>;

  const bodyContent = (
    <div className={classes.cartItemsContainer}>
      {cartItems.length > 0 &&
        cartItems.map((item, index) => (
          <div className={classes.cartItemContainer} key={index}>
            <div className={classes.imageContainer}>
              <Image
                src={serverUrl + item.imageUrls[0]}
                layout="responsive"
                width={1000}
                height={1500}
              />
            </div>

            <div className={classes.cartItemInfo}>
              <p className={classes.cartItemTitle}>{item.title}</p>
              <p className={classes.text}>{item.size}</p>
              <IncrementInput
                count={item.amount}
                setCount={(value, type) => amountHandler(item, type)}
              />
            </div>
            <div className={classes.cartItemInfo2}>
              <div className={classes.priceContainer}>
                <p className={classes.text}>{item.price * item.amount} kr</p>
              </div>
              <div className={classes.removeItemContainer}>
                <p
                  className={classes.removeItem}
                  onClick={() => removeFromCartHandler(item)}
                >
                  Remove
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  const footerContent = (
    <div className={classes.footer}>
      <div className={classes.totalContainer}>
        <p>
          TOTAL: {cartItems.length > 0 && getTotalAmount()}
          {cartItems.length === 0 && 0} Kr
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <button
          className={classes.button}
          onClick={routeHandler}
          disabled={buttonDisabled}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );

  return (
    <SideModal
      isActive={cartIsActive}
      setIsActive={setCartIsActive}
      headerContent={headerContent}
      bodyContent={bodyContent}
      footerContent={footerContent}
    />
  );
};

export default Cart;
