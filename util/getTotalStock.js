export const getTotalStock = (stock) => {
  const totalStock = stock.reduce((acc, cur) => {
    return acc += cur.in_stock;
  }, 0);

  return totalStock
};
