import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import ShopFilters from "../components/shop/ShopFilters";
import ShopGrid from "../components/shop/ShopGrid";
import { getAllMergedShops } from "../utils/sellerStorage";
import { filterShops } from "../utils/filters";
import { Store, MapPin } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Shops = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { location: globalLocation } = useAuth();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialArea = searchParams.get("location") || "All";
  const initialMiniShops = searchParams.get("miniShopsOnly") === "true";
  const initialSort = searchParams.get("sortBy") || "nearest";

  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [filters, setFilters] = useState({
    location: initialArea,
    category: initialCategory,
    maxDistance: 5.0,
    minRating: 0,
    openNow: false,
    miniShopsOnly: initialMiniShops,
    verifiedOnly: false,
    sortBy: initialSort
  });

  // Update query state if search param changes externally
  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get("category");
    if (cat !== null) setFilters(prev => ({ ...prev, category: cat }));
    const loc = searchParams.get("location");
    if (loc !== null) setFilters(prev => ({ ...prev, location: loc }));
    const mini = searchParams.get("miniShopsOnly");
    if (mini !== null) setFilters(prev => ({ ...prev, miniShopsOnly: mini === "true" }));
    const sort = searchParams.get("sortBy");
    if (sort !== null) setFilters(prev => ({ ...prev, sortBy: sort }));
  }, [searchParams]);

  const allShopsCombined = useMemo(() => {
    return getAllMergedShops();
  }, []);

  const filteredShopsList = useMemo(() => {
    return filterShops(allShopsCombined, {
      searchQuery,
      location: filters.location,
      category: filters.category,
      maxDistance: filters.maxDistance,
      minRating: filters.minRating,
      openNow: filters.openNow,
      miniShopsOnly: filters.miniShopsOnly,
      verifiedOnly: filters.verifiedOnly,
      sortBy: filters.sortBy
    });
  }, [searchQuery, filters, allShopsCombined]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      location: "All",
      category: "All",
      maxDistance: 5.0,
      minRating: 0,
      openNow: false,
      miniShopsOnly: false,
      verifiedOnly: false,
      sortBy: "nearest"
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Hyperlocal Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Discover Local Shops & Services
          </h1>

          <p className="text-sm text-slate-600 max-w-2xl">
            Browse all verified local stores, corner mini shops, medical chemists, and repair stands across <strong className="text-slate-900">Kattupakkam</strong> and <strong className="text-slate-900">Iyyappanthangal</strong>.
          </p>

          {/* Large Search Bar */}
          <div className="max-w-3xl pt-2">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              placeholder="Search by shop name, category, products, or service..."
              size="lg"
            />
          </div>
        </div>

        {/* Filter Controls Component */}
        <ShopFilters
          filters={filters}
          setFilters={setFilters}
          totalResults={filteredShopsList.length}
          onReset={handleResetFilters}
        />

        {/* Shops Grid */}
        <ShopGrid
          shops={filteredShopsList}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
};

export default Shops;
