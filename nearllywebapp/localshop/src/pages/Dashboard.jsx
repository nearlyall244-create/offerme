import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Star,
  Store,
  Heart,
  Tag,
  Wrench,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Compass,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Phone,
  Navigation
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "../components/search/SearchBar";
import ShopCard from "../components/shop/ShopCard";
import CategoryCard from "../components/category/CategoryCard";
import { shops } from "../data/shops";
import { localOffers } from "../data/offers";
import { categoryGroups } from "../data/categories";
import { getFavoritesFromStorage, getRecentlyViewedFromStorage } from "../utils/helpers";
import Button from "../components/common/Button";

export const Dashboard = () => {
  const { user, location, updateLocation } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteShopIds, setFavoriteShopIds] = useState([]);
  const [recentShopIds, setRecentShopIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavoriteShopIds(getFavoritesFromStorage());
    setRecentShopIds(getRecentlyViewedFromStorage());
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const activeAreaShops = shops.filter(s => s.area.toLowerCase() === location.toLowerCase());
  const favoriteShops = shops.filter(s => favoriteShopIds.includes(s.id));
  const recentShops = shops.filter(s => recentShopIds.includes(s.id)).slice(0, 4);
  const miniShopsInArea = activeAreaShops.filter(s => s.isMiniShop).slice(0, 4);
  const popularShopsInArea = [...activeAreaShops].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const areaOffers = localOffers.filter(o => o.area.toLowerCase() === location.toLowerCase());

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shops?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const quickCategoryButtons = [
    { label: "Grocery", name: "Grocery Stores", icon: "🛒" },
    { label: "Medical", name: "Medical Shops", icon: "💊" },
    { label: "Bakery", name: "Bakeries", icon: "🥐" },
    { label: "Mobile", name: "Mobile Repair", icon: "📱" },
    { label: "Salon", name: "Salons", icon: "✂️" },
    { label: "Hardware", name: "Hardware Shops", icon: "🔧" },
    { label: "Restaurant", name: "Restaurants", icon: "🍛" },
    { label: "Tea Shop", name: "Tea Shops", icon: "☕" }
  ];

  const quickServicesList = [
    { title: "Doorstep Plumbing", cat: "Plumbing Shops", icon: "🚰", desc: "Pipe leaks & motor repair" },
    { title: "Electrician On-Call", cat: "Electrical Shops", icon: "⚡", desc: "Wiring & switch repair" },
    { title: "Mobile Screen Fix", cat: "Mobile Repair", icon: "📱", desc: "30-min display change" },
    { title: "Xerox & Print", cat: "Xerox / Printing", icon: "🖨️", desc: "Color prints & lamination" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* SECTION 1: Welcome Header & Location Selector Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hyperlocal Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {getTimeGreeting()}, <span className="text-emerald-400">{user?.name || "Neighbor"}</span> 👋
              </h1>
              <p className="text-sm text-slate-300">
                Find what you need nearby in <strong className="text-white font-semibold">{location}</strong>. Everything local is right here.
              </p>
            </div>

            {/* Location Selector Component */}
            <div className="bg-slate-800/90 border border-slate-700/80 p-3 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 pl-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Active Location:</span>
              </div>
              <div className="inline-flex bg-slate-900 p-1 rounded-xl w-full sm:w-auto">
                <button
                  onClick={() => updateLocation("Kattupakkam")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    location === "Kattupakkam"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  📍 Kattupakkam
                </button>
                <button
                  onClick={() => updateLocation("Iyyappanthangal")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    location === "Iyyappanthangal"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  📍 Iyyappanthangal
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats bar */}
          <div className="mt-8 pt-6 border-t border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <p className="text-2xl font-extrabold text-emerald-400">{activeAreaShops.length}</p>
              <p className="text-xs text-slate-300">Shops in {location}</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <p className="text-2xl font-extrabold text-amber-400">{miniShopsInArea.length}</p>
              <p className="text-xs text-slate-300">Mini Shops Discovered</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <p className="text-2xl font-extrabold text-rose-400">{favoriteShops.length}</p>
              <p className="text-xs text-slate-300">Saved Favorites</p>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <p className="text-2xl font-extrabold text-sky-400">{areaOffers.length}</p>
              <p className="text-xs text-slate-300">Active Deals Near You</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Interactive Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <form onSubmit={handleSearchSubmit}>
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
              placeholder={`Search local shops, products or services in ${location}...`}
              size="lg"
            />
          </form>

          {/* SECTION 3: Popular Categories Pills */}
          <div className="pt-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Popular Quick Categories
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {quickCategoryButtons.map((c) => (
                <button
                  key={c.name}
                  onClick={() => navigate(`/category/${encodeURIComponent(c.name)}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 transition-all cursor-pointer hover:border-emerald-300 hover:scale-105"
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: Offers Near You */}
        {areaOffers.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500 text-slate-950 rounded-xl">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Active Offers in {location}</h2>
                  <p className="text-xs text-slate-500">Exclusive merchant discounts & deals</p>
                </div>
              </div>
              <Link to="/offers" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                View All Offers →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {areaOffers.map(offer => (
                <div key={offer.id} className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white p-5 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500 text-slate-950">
                        {offer.discount}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">{offer.badge}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{offer.title}</h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">🏪 {offer.shopName}</p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{offer.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] bg-slate-900 text-amber-300 px-2 py-0.5 rounded font-bold">
                      {offer.code}
                    </span>
                    <Link to={`/shops/${offer.shopId}`} className="text-emerald-700 font-bold hover:underline">
                      Claim at Shop →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: Nearby Shops Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Nearby Shops in {location}</h2>
              <p className="text-xs text-slate-500">Closest verified businesses sorted by proximity</p>
            </div>
            <Link to={`/shops?location=${location}`} className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              View All {activeAreaShops.length} Shops →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeAreaShops.slice(0, 4).map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>

        {/* SECTION 7: Popular Local Shops */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Highest Rated Today</h2>
              <p className="text-xs text-slate-500">Most recommended businesses in your locality</p>
            </div>
            <Link to="/shops?sortBy=rating" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
              Explore Rated Stores →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularShopsInArea.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>

        {/* SECTION 8: Quick Local Services Grid */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Quick Doorstep Services</h2>
              <p className="text-xs text-slate-500">Emergency repairs and local service technicians</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickServicesList.map(srv => (
              <Link
                key={srv.title}
                to={`/category/${encodeURIComponent(srv.cat)}`}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 transition-all group flex items-start gap-3"
              >
                <span className="text-2xl">{srv.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{srv.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SECTION 9: Saved Favorites & Recently Viewed */}
        {favoriteShops.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-xl font-bold text-slate-900">Your Saved Favorites ({favoriteShops.length})</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteShops.slice(0, 4).map(shop => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
