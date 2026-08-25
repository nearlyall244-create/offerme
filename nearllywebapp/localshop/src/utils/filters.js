// Helper utilities for filtering and searching shop data

export const filterShops = (shops, {
  searchQuery = "",
  location = "All",
  category = "All",
  maxDistance = 5,
  minRating = 0,
  openNow = false,
  miniShopsOnly = false,
  verifiedOnly = false,
  sortBy = "nearest"
}) => {
  return shops.filter(shop => {
    // 1. Search Query filter (matches shop name, category, area, products, services)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const matchName = shop.name.toLowerCase().includes(q);
      const matchCat = shop.category.toLowerCase().includes(q);
      const matchArea = shop.area.toLowerCase().includes(q);
      const matchDesc = shop.description.toLowerCase().includes(q);
      const matchProd = shop.products && shop.products.some(p => p.toLowerCase().includes(q));
      const matchServ = shop.services && shop.services.some(s => s.toLowerCase().includes(q));

      if (!matchName && !matchCat && !matchArea && !matchDesc && !matchProd && !matchServ) {
        return false;
      }
    }

    // 2. Location Area Filter
    if (location !== "All" && shop.area.toLowerCase() !== location.toLowerCase()) {
      return false;
    }

    // 3. Category Filter
    if (category !== "All" && shop.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 4. Distance Filter
    if (shop.distance > maxDistance) {
      return false;
    }

    // 5. Rating Filter
    if (shop.rating < minRating) {
      return false;
    }

    // 6. Open Now Filter
    if (openNow && !shop.isOpen) {
      return false;
    }

    // 7. Mini Shops Filter
    if (miniShopsOnly && !shop.isMiniShop) {
      return false;
    }

    // 8. Verified Shops Filter
    if (verifiedOnly && !shop.isVerified) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "nearest") {
      return a.distance - b.distance;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "popular") {
      return b.reviewCount - a.reviewCount;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
};
