import { useState } from "react";
import { useRouter } from "next/router";

import useIsMobile from "../../components/util/useIsMobile";
import classes from "../../styles/pages/order-complete.module.css";

import ArrowUp from "../../public/icons/SVG/arrowUp.svg";
import ArrowDown from "../../public/icons/SVG/arrowDown.svg";
import Merle from "../../public/icons/SVG/merle.svg";

import ProductList from "../../components/views/productList";

const OrderComplete = () => {
  const router = useRouter();
  let order = undefined;
  if (router.query.order) {
    order = JSON.parse(router.query.order);
    console.log(order);
  }
  const isMobile = useIsMobile();

  const [dropdownActive, setDropdownActive] = useState(true);

  const headerClass = isMobile ? classes.mobileHeader : classes.header;
  const containerClass = isMobile ? classes.mobileContainer : classes.container;
  const contentContainerClass = isMobile
    ? classes.mobileContentContainer
    : classes.contentContainer;
  const orderSummaryContainerClass = isMobile
    ? classes.mobileOrderSummaryContainer
    : classes.orderSummaryContainer;

  return (
    <>
      <div className={containerClass}>
        <div className={contentContainerClass}>
          <div className={headerClass} onClick={() => router.push("/")}>
            <Merle height="80" width="200" />
          </div>
          <div className={orderSummaryContainerClass}>
            <div
              className={classes.dropdownButtonContainer}
              onClick={() => setDropdownActive((prev) => !prev)}
            >
              <p className={classes.dropdownHeader}>Order Summary</p>
              <div className={classes.arrowIconContainer}>
                {dropdownActive && <ArrowUp height="20" width="20" />}
                {!dropdownActive && <ArrowDown height="20" width="20" />}
              </div>
            </div>

            {dropdownActive && order && (
              <div className={classes.productsContainer}>
                <ProductList products={order.cartItems} type={1} />
              </div>
            )}
          </div>
        </div>

        <div className={classes.contentContainer2}>
          <div className={classes.customerInformationContainer}>
            <div className={classes.customerInformationHeader}>
              <p className={classes.heading}>Customer information</p>
            </div>
            <div className={classes.infoContainer}>
            <p className={classes.textBold}>Contact information</p>
              <p className={classes.text}>{order.name}</p>
              <p className={classes.text}>{order.email}</p>
              <p className={classes.text}>{order.phone}</p>
            </div>
            <div className={classes.infoContainer}>
              <p className={classes.textBold}>Shipping address</p>
              <p className={classes.text}>{order.country}</p>
              <p className={classes.text}>{order.city}</p>
              <p className={classes.text}>{order.address}</p>
              <p className={classes.text}>{order.postalCode}</p>
            </div>
            <div>
              <p className={classes.textBold}>Shipping method</p>
              <p className={classes.text}>{order.shipping.label} - {order.shipping.price} kr</p>
            </div>
            <div>
              <p className={classes.textBold}>Payment method</p>
              <p className={classes.text}>{order.paymentMethod.label}</p>
            </div>
            
          </div>
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={() => router.push("/products?site=second-hand")}>Continue Shopping</button>
            <p className={classes.textGrey}>Need help? Contact us</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderComplete;
