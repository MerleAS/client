export const getTotalStock = (stock) => {
  return stock.reduce((cur, acc) => {
    acc += cur.in_stock;
  }, 0);
};
