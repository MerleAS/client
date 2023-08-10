import Image from "next/image";

import IncrementInput from "../UI/incrementInput";

import classes from "../../styles/components/views/productList.module.css";

const ProductList = ({
  products,
  type,
  amountHandler,
  removeFromCartHandler,
}) => {

  return (
    <>
      {products.length > 0 &&
        products.map((prod, index) => {
          return (
            <div className={classes.cartItemContainer} key={index}>
              <div className={classes.imageContainer}>
                <Image
                  src={process.env.NEXT_PUBLIC_SERVER_URL + "/" + prod.imageUrls[0]}
                  loader={() => process.env.NEXT_PUBLIC_SERVER_URL + "/" + prod.imageUrls[0]}
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
