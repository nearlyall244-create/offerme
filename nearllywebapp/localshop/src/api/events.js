import eventCategories from "../data/eventCategories";
import eventShops from "../data/eventShops";

export const fetchEventCategories = async () => {
  return eventCategories;
};

export const fetchEventShops = async (filters = {}) => {
  let result = [...eventShops];
  if (filters.area) result = result.filter((s) => s.area === filters.area);
  if (filters.category_slug) result = result.filter((s) => s.category.toLowerCase().replace(/\s+/g, "-") === filters.category_slug);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((s) => s.name.toLowerCase().includes(q) || s.event.toLowerCase().includes(q));
  }
  return result;
};
