import { popularLocations } from "../data/locations";

export const fetchLocations = async () => {
  return popularLocations;
};

export const fetchLocationBySlug = async (slug) => {
  const loc = popularLocations.find((l) => l.slug === slug);
  if (!loc) throw new Error("Location not found");
  return loc;
};
