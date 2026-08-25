// Helper functions for formatting and local storage management

export const formatDistance = (distanceInKm) => {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m away`;
  }
  return `${distanceInKm} km away`;
};

export const getFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem("localshop_favorites");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem("localshop_favorites", JSON.stringify(favorites));
  } catch (e) {
    console.error("Error saving favorites to localStorage", e);
  }
};

export const getRecentlyViewedFromStorage = () => {
  try {
    const saved = localStorage.getItem("localshop_recently_viewed");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const addRecentlyViewedToStorage = (shopId) => {
  try {
    const current = getRecentlyViewedFromStorage();
    const filtered = current.filter(id => id !== shopId);
    filtered.unshift(shopId);
    // Keep max 10 recent
    localStorage.setItem("localshop_recently_viewed", JSON.stringify(filtered.slice(0, 10)));
  } catch (e) {
    console.error("Error saving recently viewed", e);
  }
};
