import { shops as mockShops } from "../data/shops";

const STORAGE_KEY = "nearlyall_user_shops";

export const getUserListings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to parse user listings from localStorage:", err);
    return [];
  }
};

export const saveUserListing = (listingData) => {
  try {
    const existing = getUserListings();
    const newListing = {
      id: `user_shop_${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      distance: 0.2,
      isOpen: true,
      isVerified: true,
      isUserSubmitted: true,
      createdAt: new Date().toISOString(),
      ...listingData
    };
    const updated = [newListing, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newListing;
  } catch (err) {
    console.error("Failed to save user listing:", err);
    throw err;
  }
};

export const getAllMergedShops = () => {
  const userShops = getUserListings();
  return [...userShops, ...mockShops];
};
