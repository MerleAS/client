export const getTotalAmount = (cartItems) => {
  const totalAmount = cartItems.reduce((acc, cur) => {
    acc += cur.amount * cur.price;
    return acc;
  }, 0);
  return totalAmount;
};
