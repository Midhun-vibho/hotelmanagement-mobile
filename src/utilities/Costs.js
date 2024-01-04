export const getSavedPricePercentage = (price, originalPrice) => {
  return 100 - Math.ceil((price * 100) / originalPrice);
};
