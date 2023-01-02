import { createContext, useState } from "react";

export const StateContext = createContext({
  addToCartHandler: () => {},
  removeFromCartHandler: () => {},
  clearCartHandler: () => {},
  setCartIsActive: () => {}
});

const StateContextProvider = (props) => {
  const [serverUrl] = useState("http://localhost:8080/");
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartIsActive, setCartIsActive] = useState(false);

  const addToCartHandler = (product) => {
    const productExist = cartItems.find(
      (prod) => prod._id === product._id && prod.size === product.size
    );
    const index = cartItems.findIndex(
      (prod) => prod._id === product._id && prod.size === product.size
    );
    if (productExist) {
      setCartItems(prev => {
        prev[index].amount += product.amount
        return [...prev]
      })
    } else {
      setCartItems((prev) => [...prev, product]);
    }
    setTotalAmount((prev) => prev + product.amount * product.price);
  };

  const removeFromCartHandler = (product) => {

  };

  const clearCartHandler = () => {};

  return (
    <StateContext.Provider
      value={{
        serverUrl,
        cartItems,
        totalAmount,
        cartIsActive,
        addToCartHandler,
        removeFromCartHandler,
        clearCartHandler,
        setCartIsActive
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
