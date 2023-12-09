"use client";

import Link from "next/link";

import { useStore } from "../../util/store";
import { getTotalAmount } from "../../util/getTotalAmount";

import Sidebar from "../UI/sidebar";
import ProductList from "../views/productList";
import Button from "../UI/button";
import CartIcon from "../../public/icons/SVG/cartIcon.svg";

const Cart = () => {
  const { cartItems, dispatch, cartActive } = useStore();

  const amountHandler = (item, type) => {
    if (type === "increment" && item.amount + 1 <= item.in_stock) {
      dispatch({
        type: "CHANGE_AMOUNT",
        product: item,
        operation: "increment",
      });
    } else if (type === "decrement" && item.amount - 1 > 0) {
      dispatch({
        type: "CHANGE_AMOUNT",
        product: item,
        operation: "decrement",
      });
    }
  };

  const headerContent = <p className="text-xl">Your Cart</p>;

  const bodyContent = (
    <div className="h-[65%] w-[90%] m-[5%] overflow-scroll">
      <ProductList
        products={cartItems}
        type={2}
        amountHandler={amountHandler}
        dispatch={dispatch}
      />
    </div>
  );

  const footerContent = (
    <div className="border-t border-gray-300 w-full h-[20%] flex flex-col items-center justify-center space-y-4 p-4">
      <div className="flex items-center justify-start w-full">
        <p>
          TOTAL: {cartItems.length > 0 && getTotalAmount(cartItems)}
          {cartItems.length === 0 && 0} Kr
        </p>
      </div>
      {cartItems.length > 0 && (
        <div className="w-full h-[80%] flex items-center justify-center">
          <Link
            
            href="/checkout"
            onClick={() => dispatch({ type: "TOGGLE_CART", bool: false })}
          >
            <Button>CHECKOUT</Button>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        className="flex items-center justify-center hover:scale-105 cursor-pointer"
        onClick={() => dispatch({ type: "TOGGLE_CART", bool: true })}
      >
        <CartIcon width="20" height="20" />
      </div>
      <Sidebar
        isActive={cartActive}
        setIsActive={(bool) => dispatch({ type: "TOGGLE_CART", bool: bool })}
        headerContent={headerContent}
        bodyContent={bodyContent}
        footerContent={footerContent}
        orientation="right"
      />
    </>
  );
};

export default Cart;
