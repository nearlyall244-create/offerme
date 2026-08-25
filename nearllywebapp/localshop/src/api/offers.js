import offers from "../data/offers";

export const fetchOffers = async (filters = {}) => {
  let result = [...offers];
  if (filters.area) result = result.filter((o) => o.area === filters.area);
  return result;
};
