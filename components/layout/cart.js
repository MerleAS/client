import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import classes from "../../styles/components/layout/cart.module.css";
import useIsMobile from "../util/useIsMobile";
import { StateContext } from "../../context/stateContext";

import IncrementInput from "../UI/incrementInput";

const Cart = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
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

  const cartCloseHandler = () => {
    setIsClosing(true);
    const time = isMobile ? 300 : 600
    setTimeout(() => {
      setIsClosing(false);
      setCartIsActive(false);
    }, time);
  };

  const containerStyles = isClosing ? classes.containerOut : classes.containerIn;
  const backdropStyles = isClosing ? classes.backdropOut : classes.backdropIn;
  const mobileContainerStyles = isClosing ? classes.mobileContainerDown : classes.mobileContainerUp;

  
  useEffect(() => {
    setButtonDisabled(cartItems.length === 0)
  },[cartItems])

  return (
    <>
      {cartIsActive && (
        <>
          {!isMobile && (
            <>
              <div
                className={`${classes.backdrop} ${backdropStyles}`}
                onClick={() => setCartIsActive(false)}
              ></div>
              <div className={`${classes.container} ${containerStyles}`}>
                <div className={classes.line}>
                  <div className={classes.crossContainer}></div>
                  <p className={classes.heading}>Your Cart</p>
                  <div
                    className={classes.crossContainer}
                    onClick={cartCloseHandler}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.2071 2.20702C13.5976 1.81649 13.5976 1.18333 13.2071 0.792802C12.8166 0.402277 12.1834 0.402277 11.7929 0.792802L6.99995 5.58574L2.20711 0.792895C1.81658 0.40237 1.18342 0.40237 0.792893 0.792895C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L5.58574 6.99996L0.792893 11.7928C0.402368 12.1833 0.40237 12.8165 0.792893 13.207C1.18342 13.5975 1.81658 13.5975 2.20711 13.207L6.99995 8.41417L11.7929 13.2071C12.1834 13.5976 12.8166 13.5976 13.2071 13.2071C13.5976 12.8166 13.5976 12.1834 13.2071 11.7929L8.41417 6.99995L13.2071 2.20702Z"
                        fill="#000"
                      />
                    </svg>
                  </div>
                </div>
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
                            setCount={(value, type) =>
                              amountHandler(item, type)
                            }
                          />
                        </div>
                        <div className={classes.cartItemInfo2}>
                          <div className={classes.priceContainer}>
                            <p className={classes.text}>
                              {item.price * item.amount} kr
                            </p>
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
                <div className={classes.footer}>
                  <div className={classes.totalContainer}>
                    <p>
                      TOTAL: {cartItems.length > 0 && getTotalAmount()}
                      {cartItems.length === 0 && 0} Kr
                    </p>
                  </div>
                  <div className={classes.buttonContainer}>
                    <button className={classes.button} onClick={routeHandler} disabled={buttonDisabled}>
                      CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {isMobile && (
            <div className={`${classes.mobileContainer} ${mobileContainerStyles}`}>
              <div className={classes.mobileHeadingContainer}>
                <div className={classes.mobileCrossContainer}></div>
                <p className={classes.mobileHeading}>Your Cart</p>
                <div
                  className={classes.mobileCrossContainer}
                  onClick={cartCloseHandler}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2071 2.20702C13.5976 1.81649 13.5976 1.18333 13.2071 0.792802C12.8166 0.402277 12.1834 0.402277 11.7929 0.792802L6.99995 5.58574L2.20711 0.792895C1.81658 0.40237 1.18342 0.40237 0.792893 0.792895C0.402369 1.18342 0.402369 1.81658 0.792893 2.20711L5.58574 6.99996L0.792893 11.7928C0.402368 12.1833 0.40237 12.8165 0.792893 13.207C1.18342 13.5975 1.81658 13.5975 2.20711 13.207L6.99995 8.41417L11.7929 13.2071C12.1834 13.5976 12.8166 13.5976 13.2071 13.2071C13.5976 12.8166 13.5976 12.1834 13.2071 11.7929L8.41417 6.99995L13.2071 2.20702Z"
                      fill="#000"
                    />
                  </svg>
                </div>
              </div>
              <div className={classes.mobileCartItemsContainer}>
                {cartItems.length > 0 &&
                  cartItems.map((item, index) => (
                    <div
                      className={classes.mobileCartItemContainer}
                      key={index}
                    >
                      <div className={classes.mobileImageContainer}>
                        <Image
                          src={serverUrl + item.imageUrls[0]}
                          layout="responsive"
                          width={1000}
                          height={1500}
                        />
                      </div>
                      <div className={classes.cartItemInfo}>
                        <p className={classes.cartItemTitle}>{item.title}</p>
                        <p className={classes.text}>Size {item.size}</p>
                        <IncrementInput
                          count={item.amount}
                          setCount={(value, type) => amountHandler(item, type)}
                        />
                      </div>
                      <div className={classes.cartItemInfo2}>
                        <div className={classes.priceContainer}>
                          <p className={classes.text}>
                            {item.price * item.amount} kr
                          </p>
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
              <div className={classes.footer}>
                <div className={classes.totalContainer}>
                  <p className={classes.total}>
                    TOTAL: {cartItems.length > 0 && getTotalAmount()}
                    {cartItems.length === 0 && 0} Kr
                  </p>
                </div>
                <button className={classes.mobileButton} onClick={routeHandler} disabled={buttonDisabled}>
                  CHECKOUT
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
