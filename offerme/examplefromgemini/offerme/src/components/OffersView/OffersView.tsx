import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfferCard } from '../OfferCard/OfferCard';
import { GoogleMapViewer } from '../GoogleMapViewer/GoogleMapViewer';
import { 
  Search, 
  MapPin, 
  Layers, 
  LayoutGrid, 
  Compass, 
  SlidersHorizontal, 
  Tag, 
  Percent, 
  Star,
  Store
} from 'lucide-react';
import './OffersView.css';

interface OffersViewProps {
  initialMapMode?: boolean;
}

export const OffersView: React.FC<OffersViewProps> = ({ initialMapMode = false }) => {
  const { 
    offers, 
    categories, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    requestUserLocation
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'map'>(initialMapMode ? 'map' : 'grid');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'discount' | 'rating' | 'newest'>('popular');

  // Filter approved offers
  const approvedOffers = offers.filter((o) => o.status === 'approved');

  const filteredOffers = approvedOffers.filter((o) => {
    // Keyword match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = o.title.toLowerCase().includes(q);
      const matchShop = o.shopName.toLowerCase().includes(q);
      const matchDesc = o.description.toLowerCase().includes(q);
      const matchCategory = o.category.toLowerCase().includes(q);
      if (!matchTitle && !matchShop && !matchDesc && !matchCategory) return false;
    }

    // Category match
    if (selectedCategory !== 'All' && o.category !== selectedCategory) {
      return false;
    }

    // Location match
    if (selectedLocation !== 'All Locations' && selectedLocation !== 'Current Location' && selectedLocation.trim()) {
      const locQ = selectedLocation.toLowerCase();
      if (!o.shopAddress.toLowerCase().includes(locQ)) return false;
    }

    // Discount threshold
    if (o.discountPercent < minDiscount) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.visits * 2 + b.views - (a.visits * 2 + a.views);
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    if (sortBy === 'rating') return b.rating - a.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="offers-view-wrapper" id="offers-view-root">
      <div className="offers-view-container">
        {/* Page title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {selectedCategory === 'All' ? 'All Local Offers & Deals' : `${selectedCategory} Deals`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Found {filteredOffers.length} verified discount vouchers in your area
            </p>
          </div>

          {/* Toggle Grid vs Map */}
          <div className="view-toggle-group">
            <button
              id="view-toggle-grid"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={15} />
              <span>Grid View</span>
            </button>
            <button
              id="view-toggle-map"
              className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <Compass size={15} />
              <span>Live Map View</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="offers-filter-bar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                placeholder="Search shop or deal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>

            {/* Category select */}
            <div className="relative">
              <select
                className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500 cursor-pointer font-medium"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Layers size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>

            {/* Discount filter */}
            <div className="relative">
              <select
                className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500 cursor-pointer font-medium"
                value={minDiscount}
                onChange={(e) => setMinDiscount(Number(e.target.value))}
              >
                <option value={0}>Any Discount %</option>
                <option value={20}>20%+ Discount</option>
                <option value={30}>30%+ Discount</option>
                <option value={50}>50%+ Flash Deals</option>
              </select>
              <Percent size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>

            {/* Sort by */}
            <div className="relative">
              <select
                className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500 cursor-pointer font-medium"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="discount">Sort: Highest Discount</option>
                <option value="rating">Sort: Top Customer Rating</option>
                <option value="newest">Sort: Newly Listed</option>
              </select>
              <SlidersHorizontal size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* View Mode: Map or Grid */}
        {viewMode === 'map' ? (
          <div className="mb-8">
            <GoogleMapViewer offers={filteredOffers} />
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-800 mb-3">
                Matching Deals on Map ({filteredOffers.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {filteredOffers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Store size={44} className="text-slate-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No offers found</h3>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  Try adjusting your search keywords, clearing category filters, or reducing minimum discount percentage.
                </p>
                <button
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setMinDiscount(0);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
