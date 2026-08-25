// Navigation utilities for OfferMe

export const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export const filterActiveOffers = (offers = [], location = "") => {
  const activeOffers = offers.filter((offer) => offer.active !== false);
  if (!location || location === "All Locations") {
    return activeOffers;
  }
  
  // Prioritize selected location
  const locationOffers = activeOffers.filter(
    (offer) => offer.location?.toLowerCase() === location.toLowerCase() || offer.area?.toLowerCase() === location.toLowerCase()
  );
  
  const otherOffers = activeOffers.filter(
    (offer) => offer.location?.toLowerCase() !== location.toLowerCase() && offer.area?.toLowerCase() !== location.toLowerCase()
  );

  return [...locationOffers, ...otherOffers];
};

export const getCategoryBySlug = (categories = [], slug = "") => {
  return categories.find(
    (cat) => cat.slug === slug || slugify(cat.name) === slug
  );
};
