import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Star,
  Phone,
  Sparkles,
  ChevronRight,
  Store
} from "lucide-react";
import eventCategories from "../data/eventCategories";
import eventShops from "../data/eventShops";
import allLocations from "../data/locations";
import { shops as defaultShops } from "../data/shops";
import ShopGrid from "../components/shop/ShopGrid";
import "./EventCategoryPage.css";

export const EventCategoryPage = () => {
  const { categoryName } = useParams();
  const rawParam = decodeURIComponent(categoryName || "");

  // Match event category by slug or name
  const currentCategory = useMemo(() => {
    return eventCategories.find(
      (cat) =>
        cat.slug.toLowerCase() === rawParam.toLowerCase() ||
        cat.name.toLowerCase() === rawParam.toLowerCase()
    );
  }, [rawParam]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Filter listings
  const filteredVendors = useMemo(() => {
    if (!currentCategory) return [];

    let list = eventShops.filter(
      (s) =>
        s.categorySlug === currentCategory.slug ||
        s.category.toLowerCase() === currentCategory.name.toLowerCase()
    );

    // Filter by location
    if (selectedLocation !== "All Locations") {
      list = list.filter((s) => s.area.toLowerCase() === selectedLocation.toLowerCase());
    }

    // Filter by search query
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term) ||
          (s.tags && s.tags.some((t) => t.toLowerCase().includes(term))) ||
          (s.services && s.services.some((sv) => sv.toLowerCase().includes(term)))
      );
    }

    // Filter by rating
    if (minRating > 0) {
      list = list.filter((s) => s.rating >= minRating);
    }

    // Sort
    if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "distance") {
      list.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "reviews") {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [currentCategory, selectedLocation, searchTerm, minRating, sortBy]);

  // Fallback for non-event legacy categories
  const legacyShopsList = useMemo(() => {
    if (currentCategory) return [];
    return defaultShops.filter(
      (s) => s.category.toLowerCase() === rawParam.toLowerCase()
    );
  }, [currentCategory, rawParam]);

  // If this is a legacy non-events category, render clean legacy view
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </Link>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900">{rawParam} Shops</h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Found <strong className="text-emerald-700 font-bold">{legacyShopsList.length}</strong> local businesses listed under this category.
            </p>
          </div>

          <ShopGrid shops={legacyShopsList} />
        </div>
      </div>
    );
  }

  const IconComponent = currentCategory.icon;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Header & Breadcrumb */}
      <div className="event-category-page__header py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/events" className="hover:text-emerald-600 transition-colors">
              Events & Celebrations
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{currentCategory.name}</span>
          </nav>

          {/* Category Header Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                {IconComponent ? <IconComponent className="w-7 h-7" /> : <Store className="w-7 h-7" />}
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100/80 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Events Category</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {currentCategory.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  {currentCategory.description}
                </p>
              </div>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All 13 Categories</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search, Filter & Location Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${currentCategory.name.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Location Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              showFilterPanel
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="reviews">Sort: Most Reviews</option>
              <option value="distance">Sort: Nearest First</option>
            </select>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {showFilterPanel && (
          <div className="bg-white mt-3 p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-4 animate-in fade-in duration-200">
            <span className="text-xs font-bold text-slate-700">Minimum Rating:</span>
            {[0, 4.0, 4.5, 4.8].map((stars) => (
              <button
                key={stars}
                onClick={() => setMinRating(stars)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  minRating === stars
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {stars === 0 ? "All Ratings" : `${stars}+ Stars`}
              </button>
            ))}

            {(minRating > 0 || selectedLocation !== "All Locations" || searchTerm) && (
              <button
                onClick={() => {
                  setMinRating(0);
                  setSelectedLocation("All Locations");
                  setSearchTerm("");
                }}
                className="text-xs text-rose-600 hover:underline font-bold ml-auto"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Vendor Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing <span className="text-emerald-700 font-extrabold">{filteredVendors.length}</span> Businesses
          </p>
          <span className="text-[11px] text-slate-400">Direct Local Contact</span>
        </div>

        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="event-category-page__vendor-card bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                <div>
                  {/* Vendor Image Header */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 border border-slate-200">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{vendor.rating}</span>
                      <span className="text-slate-400 text-[10px]">({vendor.reviewCount})</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                      {vendor.area}
                    </div>
                  </div>

                  {/* Vendor Details Content */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {vendor.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {vendor.address}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {vendor.description}
                    </p>

                    {/* Pricing / Capacity Info */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      {vendor.capacity && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
                          <span className="block text-[10px] text-slate-400 uppercase font-bold">Capacity</span>
                          <span className="text-xs font-extrabold text-slate-800">{vendor.capacity}</span>
                        </div>
                      )}
                      {vendor.pricing && (
                        <div className="bg-emerald-50/60 p-2 rounded-xl border border-emerald-100 text-center">
                          <span className="block text-[10px] text-emerald-700 uppercase font-bold">Pricing</span>
                          <span className="text-xs font-extrabold text-emerald-800">{vendor.pricing}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {vendor.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {vendor.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vendor Card Action Footer */}
                <div className="p-5 pt-0 border-t border-slate-100/60 flex items-center justify-between gap-3 mt-4">
                  <a
                    href={`tel:${vendor.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Vendor</span>
                  </a>

                  <button
                    onClick={() => alert(`Inquiry sent to ${vendor.name}. Vendor phone: ${vendor.phone}`)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto space-y-3">
            <Store className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Vendors Found</h3>
            <p className="text-xs text-slate-500">
              No service providers found matching the selected area or filter criteria. Try clearing your filters or selecting "All Locations".
            </p>
            <button
              onClick={() => {
                setSelectedLocation("All Locations");
                setSearchTerm("");
                setMinRating(0);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCategoryPage;
