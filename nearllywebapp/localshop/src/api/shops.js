import shops from "../data/shops";

let cachedShops = shops;

export const fetchShops = async (filters = {}) => {
  let result = [...shops];
  if (filters.area) result = result.filter((s) => s.area === filters.area);
  if (filters.category) result = result.filter((s) => s.category === filters.category);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.products && s.products.some((p) => p.toLowerCase().includes(q)))
    );
  }
  if (filters.is_mini_shop !== undefined) result = result.filter((s) => s.is_mini_shop === filters.is_mini_shop);
  cachedShops = result;
  return result;
};

export const fetchShopById = async (id) => {
  const shop = shops.find((s) => s.id === Number(id));
  if (!shop) throw new Error("Shop not found");
  return shop;
};

export const createShop = async (shopData) => {
  const newShop = { id: shops.length + 1, ...shopData };
  shops.push(newShop);
  return newShop;
};

export const updateShop = async (id, shopData) => {
  const idx = shops.findIndex((s) => s.id === Number(id));
  if (idx === -1) throw new Error("Shop not found");
  shops[idx] = { ...shops[idx], ...shopData };
  return shops[idx];
};

export const deleteShop = async (id) => {
  const idx = shops.findIndex((s) => s.id === Number(id));
  if (idx === -1) throw new Error("Shop not found");
  const deleted = shops.splice(idx, 1);
  return deleted[0];
};
