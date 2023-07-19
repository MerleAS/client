import Image from "next/image";
import { useContext } from "react";

import { StateContext } from "../../context/stateContext";

import IncrementInput from "../UI/incrementInput";

import classes from "../../styles/components/views/productList.module.css";

const ProductList = ({
  products,
  type,
  amountHandler,
  removeFromCartHandler,
}) => {
  const { serverUrl } = useContext(StateContext);

  return (
    <>
      {products.length > 0 &&
        products.map((prod, index) => {
          return (
            <div className={classes.cartItemContainer} key={index}>
              <div className={classes.imageContainer}>
                <Image
                  src={serverUrl + '/' + prod.imageUrls[0]}
                  loader={() => serverUrl + '/' + prod.imageUrls[0]}
                  layout="responsive"
                  width={1000}
                  height={1500}
                  alt=""
                />
              </div>

              <div className={classes.cartItemInfo}>
                <p className={classes.textBold}>{prod.title}</p>
                <p className={classes.textGrey}>{prod.size}</p>
                {type === 1 && (
                  <p className={classes.text}>{prod.amount} item</p>
                )}
                {type === 2 && (
                  <IncrementInput
                    count={prod.amount}
                    setCount={(value, operation) =>
                      amountHandler(prod, operation)
                    }
                  />
                )}
              </div>
              <div className={classes.cartItemInfo2}>
                <div className={classes.priceContainer}>
                  {type === 2 && (
                    <p className={classes.text}>
                      {prod.price * prod.amount} kr
                    </p>
                  )}
                </div>
                <div className={classes.removeItemContainer}>
                  {type === 1 && (
                    <p className={classes.text}>{prod.price} kr</p>
                  )}
                  {type === 2 && (
                    <p
                      className={classes.removeItem}
                      onClick={() => removeFromCartHandler(prod)}
                    >
                      Remove
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductList;
