import React, { useState } from "react";
import { Filter, RotateCcw, MapPin, Star, Clock, CheckCircle2, Store, SlidersHorizontal } from "lucide-react";
import { allCategories } from "../../data/categories";
import Button from "../common/Button";

export const ShopFilters = ({ filters, setFilters, totalResults, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationChange = (loc) => {
    setFilters(prev => ({ ...prev, location: loc }));
  };

  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs mb-8 transition-all">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Explore & Filter Shops</h3>
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-emerald-700">{totalResults}</span> verified local businesses
            </p>
          </div>
        </div>

        {/* Quick Location Pills & Mobile Toggle */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            {["All", "Kattupakkam", "Iyyappanthangal"].map(loc => (
              <button
                key={loc}
                onClick={() => handleLocationChange(loc)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filters.location.toLowerCase() === loc.toLowerCase()
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {loc === "All" ? "📍 All Areas" : loc}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{isOpen ? "Hide Filters" : "More Filters"}</span>
          </button>
        </div>
      </div>

      {/* Filter Options Controls */}
      <div className={`mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${isOpen ? "block" : "hidden md:grid"}`}>
        {/* Category Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
          >
            <option value="All">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Range */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-700">Max Distance</label>
            <span className="text-xs font-bold text-emerald-600">{filters.maxDistance} km</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="5.0"
            step="0.2"
            value={filters.maxDistance}
            onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseFloat(e.target.value) }))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Minimum Rating</label>
          <select
            value={filters.minRating}
            onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
          >
            <option value="0">All Ratings</option>
            <option value="4.0">⭐ 4.0 & above</option>
            <option value="4.5">⭐ 4.5 & above</option>
            <option value="4.8">⭐ 4.8 & above</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
          >
            <option value="nearest">Distance: Nearest First</option>
            <option value="rating">Rating: Highest First</option>
            <option value="popular">Popularity: Most Reviews</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Toggle Chips */}
      <div className={`mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 ${isOpen ? "flex" : "hidden md:flex"}`}>
        <div className="flex flex-wrap items-center gap-2">
          {/* Open Now Toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, openNow: !prev.openNow }))}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              filters.openNow
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Open Now</span>
          </button>

          {/* Mini Shops Only Toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, miniShopsOnly: !prev.miniShopsOnly }))}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              filters.miniShopsOnly
                ? "bg-amber-500 text-slate-950 border-amber-500 shadow-xs font-bold"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Mini Shops Only</span>
          </button>

          {/* Verified Shops Only Toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              filters.verifiedOnly
                ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Only</span>
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
};

export default ShopFilters;
