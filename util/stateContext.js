import { createContext, useState, useEffect } from "react";

export const StateContext = createContext({
  addToCartHandler: () => {},
  removeFromCartHandler: () => {},
  clearCartHandler: () => {},
  setCartIsActive: () => {},
  setSearchIsActive: () => {},
  changeAmountHandler: () => {},
  getTotalAmount: () => {},
  setRouteStack: () => {},
  routeStackHandler: () => {},
  setErrorObject: () => {},
});

const StateContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartIsActive, setCartIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [routeStack, setRouteStack] = useState([{ label: "Home", path: "/" }]);
  const [errorObject, setErrorObject] = useState({error: false, message: ""})

  const addToCartHandler = (product) => {
    const productExist = cartItems.find(
      (prod) => prod._id === product._id && prod.size === product.size
    );
    const index = cartItems.findIndex(
      (prod) => prod._id === product._id && prod.size === product.size
    );
    if (productExist) {
      setCartItems((prev) => {
        if (prev[index].amount + product.amount <= product.in_stock) {
          prev[index].amount += product.amount;
        }
        localStorage.setItem('cartItems', JSON.stringify([...prev]))
        return [...prev];
      }
      );
    } else {
      setCartItems((prev) => [...prev, product]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, product])) 
    }
  };

  const removeFromCartHandler = (product) => {
    const newCartItems = [];
    cartItems.forEach((prod) => {
      if (prod.size !== product.size) {
        newCartItems.push(prod);
      } else if (prod._id !== product._id) {
        newCartItems.push(prod);
      }
    });
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems))
  };

  const clearCartHandler = () => {};

  const changeAmountHandler = (product, type) => {
    const index = cartItems.findIndex(
      (prod) => prod._id === product._id && prod.size === product.size
    );
    if (type === "increment") {
      setCartItems((prev) => {
        prev[index].amount += 1;
        return [...prev];
      });
    } else if (type === "decrement") {
      if (cartItems[index].amount > 1) {
        setCartItems((prev) => {
          prev[index].amount -= 1;
          return [...prev];
        });
      } else {
        setCartItems((prev) => {
          delete prev[index];
          return [...prev];
        });
      }
    }
  };

  const getTotalAmount = () => {
    const totalAmount = cartItems.reduce((acc, cur) => {
      acc += cur.amount * cur.price;
      return acc;
    }, 0);
    return totalAmount;
  };




  
  const routeStackHandler = (routeObject, index) => {
    if (index) {
      setRouteStack(prev => [...prev.slice(0, index + 1)])
    } else {
      const routeExists = routeStack.find(
        (route) => route.path === routeObject.path
      );
      if (!routeExists) {
        setRouteStack((prev) => [...prev, routeObject]);
      } else if (routeObject.path === "/") {
        setRouteStack([routeObject]);
      }
    }
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems')
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems))
    }
  },[])

  return (
    <StateContext.Provider
      value={{
        cartItems,
        cartIsActive,
        searchIsActive,
        routeStack,
        errorObject,
        setRouteStack,
        routeStackHandler,
        addToCartHandler,
        removeFromCartHandler,
        getTotalAmount,
        clearCartHandler,
        changeAmountHandler,
        setCartIsActive,
        setSearchIsActive,
        setErrorObject,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
