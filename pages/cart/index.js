import { useContext } from "react";
import Image from "next/image";

import { StateContext } from "../../context/stateContext";
import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/cart.module.css";

import Header from "../../components/layout/header";

const Cart = () => {
  const { clearCartHandler, cartItems, serverUrl } = useContext(StateContext);
  const isMobile = useIsMobile();

  return (
    <>
      <Header color="black" className={classes.header} />

      {!isMobile && (
        <div className={classes.contentContainer}>
          <div className={classes.cartContainer}>
            <p className={classes.heading}>Your Cart</p>
            <div className={classes.cartItemsContainer}>
              {cartItems.length > 0 &&
                cartItems.map((item) => (
                  <div className={classes.cartItemContainer}>
                    <Image
                      src={serverUrl + item.imageUrl}
                      layout="fixed"
                      width={150}
                      height={100}
                    />
                    <div className={classes.cartItemInfo}>
                      <p className={classes.cartItemTitle}>{item.title}</p>
                      <p className={classes.text}>Size {item.size}</p>
                      <p className={classes.text}>Amount {item.amount}</p>
                      <p className={classes.text}>
                        Price: {item.price * item.amount}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={classes.checkoutContainer}></div>
        </div>
      )}
      {isMobile && (
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
                      <p className={classes.mobileCartItemTitle}>{item.title}</p>
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
      )}
    </>
  );
};

export default Cart;
