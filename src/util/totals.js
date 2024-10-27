export const calculateTotals = function (products) {
  return products.reduce(
    (totalPrice, pli) => totalPrice + pli.qt * pli.price,
    0
  );
};
