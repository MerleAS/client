import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { StateContext } from "../../context/stateContext";

import Sidebar from "../UI/sidebar";
import ProductList from "../views/productList";

const Cart = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {
    cartIsActive,
    setCartIsActive,
    cartItems,
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
    router.push("/checkout?cartItems");
  };

  useEffect(() => {
    setButtonDisabled(cartItems.length === 0);
  }, [cartItems]);

  const headerContent = <p className="text-xl">Your Cart</p>;

  
  const bodyContent = (
    <div className="h-[65%] w-[90%] m-[5%] overflow-scroll">
      <ProductList
        products={cartItems}
        type={2}
        amountHandler={amountHandler}
        removeFromCartHandler={removeFromCartHandler}
      />
    </div>
  );

  const footerContent = (
    <div className="border-t border-gray-300 w-full h-[20%] flex flex-col items-center justify-center space-y-4 p-4">
      <div className="flex items-center justify-start w-full">
        <p>
          TOTAL: {cartItems.length > 0 && getTotalAmount()}
          {cartItems.length === 0 && 0} Kr
        </p>
      </div>
      <div className="w-full h-[80%] flex items-center justify-center">
        <button
          className="bg-black text-white text-md font-light w-[60%] h-[80%] md:h-[60%] lg:h-1/2 rounded-sm"
          onClick={() => routeHandler()}
          disabled={buttonDisabled}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );

  return (
    <Sidebar
      isActive={cartIsActive}
      setIsActive={setCartIsActive}
      headerContent={headerContent}
      bodyContent={bodyContent}
      footerContent={footerContent}
      orientation="right"
    />
  );
};

export default Cart;
