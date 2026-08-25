import React, { createContext, useContext, useState } from "react";
import shops from "../data/shops";
import { categoryColumns, categories, allCategories } from "../data/categories";
import { popularLocations } from "../data/locations";
import eventCategories from "../data/eventCategories";
import eventShops from "../data/eventShops";
import offers from "../data/offers";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data] = useState({
    shops,
    categories,
    categoryColumns,
    categoryGroups: categoryColumns,
    allCategories,
    locations: popularLocations,
    defaultLocation: popularLocations[0] || null,
    allLocationNames: ["All Locations", ...popularLocations.map((l) => l.name)],
    eventCategories,
    eventShops,
    offers,
    localOffers: offers,
  });

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
