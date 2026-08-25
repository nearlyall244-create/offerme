import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Check,
  Tag,
  Grid,
  Store,
  Compass,
  LogOut
} from "lucide-react";
import * as Icons from "lucide-react";
import popularLocations from "../../data/locations";
import { categoryColumns, categories } from "../../data/categories";
import offersData from "../../data/offers";
import { filterActiveOffers } from "../../utils/navigationUtils";

export const MobileNavigation = ({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
  isAuthenticated,
  user,
  onLogout
}) => {
  const [viewStack, setViewStack] = useState(["main"]); // 'main', 'location', 'categories', 'offers', 'category-detail'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const currentView = viewStack[viewStack.length - 1];

  const pushView = (view) => {
    setViewStack((prev) => [...prev, view]);
  };

  const popView = () => {
    setViewStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const activeOffers = filterActiveOffers(offersData, selectedLocation);

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-in fade-in duration-200">
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide Drawer Panel */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          {viewStack.length > 1 ? (
            <button
              onClick={popView}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 p-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Store className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-black text-lg tracking-tight text-slate-900">
                NEARLY<span className="text-emerald-700">ALL</span>
              </span>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body based on currentView */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 mega-menu-scrollbar">
          {/* MAIN VIEW */}
          {currentView === "main" && (
            <div className="space-y-1 py-2">
              <Link
                to="/"
                onClick={onClose}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>
              <button
                onClick={() => pushView("categories")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 text-left"
              >
                <span>Categories</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => pushView("offers")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 text-left"
              >
                <span>Offers</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <Link
                to="/about"
                onClick={onClose}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Contact
              </Link>
            </div>
          )}

          {/* LOCATION VIEW */}
          {currentView === "location" && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Your Area
              </h3>
              <div className="space-y-1.5">
                {popularLocations.map((loc) => {
                  const isSelected = selectedLocation === loc.name;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        onSelectLocation(loc.name);
                        popView();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors text-left ${
                        isSelected
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className={`w-4 h-4 ${isSelected ? "text-emerald-600" : "text-slate-400"}`} />
                        <span>{loc.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CATEGORIES VIEW */}
          {currentView === "categories" && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Browse Categories
              </h3>
              {categoryColumns.map((col) => (
                <div key={col.id} className="space-y-2">
                  <h4 className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">
                    {col.title}
                  </h4>
                  <div className="space-y-1 pl-1">
                    {col.categories.map((cat) => {
                      const IconComponent = Icons[cat.icon] || Icons.Store;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat);
                            pushView("category-detail");
                          }}
                          className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent className="w-4 h-4 text-slate-500" />
                            <span>{cat.name}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CATEGORY DETAIL VIEW */}
          {currentView === "category-detail" && selectedCategory && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-3">
                <h3 className="text-sm font-bold text-slate-900">{selectedCategory.name}</h3>
                <p className="text-xs text-slate-500">Subcategories & Specializations</p>
              </div>

              <div className="space-y-1">
                {selectedCategory.subcategories?.map((sub, sIdx) => (
                  <Link
                    key={sIdx}
                    to={`/shops?category=${encodeURIComponent(selectedCategory.name)}&subcategory=${encodeURIComponent(sub)}`}
                    onClick={onClose}
                    className="block p-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {sub}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={`/category/${encodeURIComponent(selectedCategory.slug || selectedCategory.name)}`}
                  onClick={onClose}
                  className="block text-center py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  View All {selectedCategory.name} Shops
                </Link>
              </div>
            </div>
          )}

          {/* OFFERS VIEW */}
          {currentView === "offers" && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Active Local Deals ({selectedLocation || "All"})
              </h3>
              <div className="space-y-2">
                {activeOffers.map((offer) => (
                  <Link
                    key={offer.id}
                    to="/offers"
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{offer.category}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        {offer.discount}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{offer.shopName}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">📍 {offer.location || offer.area}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions (Sign in / Get Started / Profile) */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/70">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                  alt={user?.name || "User"}
                  className="w-8 h-8 rounded-full bg-slate-100"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{user?.name || "User"}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.email || ""}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout?.();
                  onClose();
                  navigate("/login");
                }}
                className="w-full h-11 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/login"
                onClick={onClose}
                className="h-11 rounded-xl border border-slate-300 bg-white text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="h-11 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center shadow-xs"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
