"use client";

import { create } from "zustand";

const cartReducer = (state, action) => {
  let index = 0;
  if (action.product) {
    index = state.cartItems.findIndex(
      (prod) =>
        prod._id === action.product._id && prod.size === action.product.size
    );
  }

  switch (action.type) {
    case "ADD":
      const productExist = state.cartItems.find(
        (prod) =>
          prod._id === action.product._id && prod.size === action.product.size
      );

      if (productExist) {
        if (
          state.cartItems[index].amount + action.product.amount <=
          action.product.in_stock
        ) {
          state.cartItems[index].amount += action.product.amount;
        }
      } else {
        state.cartItems = [...state.cartItems, action.product];
      }
      return {
        cartItems: state.cartItems,
        cartActive: true,
        error: state.error,
      };
    case "CHANGE_AMOUNT":
      if (action.operation === "increment") {
        state.cartItems[index].amount += 1;
      } else if (action.operation === "decrement") {
        if (state.cartItems[index].amount > 1) {
          state.cartItems[index].amount -= 1;
        } else {
          delete state.cartItems[index];
        }
      }

      return {
        cartItems: state.cartItems,
        cartActive: state.cartActive,
        error: state.error,
      };
    case "REMOVE":
      const newCartItems = [];
      state.cartItems.forEach((prod) => {
        if (prod.size !== action.product.size) {
          newCartItems.push(prod);
        } else if (prod._id !== action.product._id) {
          newCartItems.push(prod);
        }
      });
      return {
        cartItems: newCartItems,
        cartActive: state.cartActive,
        error: state.error,
      };
    case "TOGGLE_CART":
      return {
        cartActive: action.bool,
        cartItems: state.cartItems,
        error: state.error,
      };
    case "SET_ERROR":
      return {
        cartActive: state.cartActive,
        cartItems: state.cartItems,
        error: { error: action.value, message: action.message },
      };
  }
};

export const useStore = create((set) => ({
  cartItems: [],
  cartActive: false,
  error: { error: false, message: "" },
  dispatch: (action) => set((state) => cartReducer(state, action)),
}));
