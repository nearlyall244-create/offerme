import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  CheckCircle2,
  Heart,
  Navigation,
  Share2,
  ArrowLeft,
  ShoppingBag,
  Wrench,
  Tag,
  MessageSquare,
  ShieldCheck,
  Building,
  Store
} from "lucide-react";
import { getAllMergedShops } from "../utils/sellerStorage";
import MiniShopBadge from "../components/shop/MiniShopBadge";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import { getFavoritesFromStorage, saveFavoritesToStorage, formatDistance, addRecentlyViewedToStorage } from "../utils/helpers";

export const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const allShops = getAllMergedShops();
    const found = allShops.find(s => s.id === id);
    if (found) {
      setShop(found);
      addRecentlyViewedToStorage(found.id);
      const favs = getFavoritesFromStorage();
      setIsFavorite(favs.includes(found.id));
    }
  }, [id]);

  if (!shop) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <EmptyState
          title="Shop Not Found"
          message="The requested local shop does not exist or may have been removed."
          onReset={() => navigate("/shops")}
          resetText="Back to Shop Directory"
        />
      </div>
    );
  }

  const toggleFavorite = () => {
    const favs = getFavoritesFromStorage();
    let updated;
    if (favs.includes(shop.id)) {
      updated = favs.filter(item => item !== shop.id);
      setIsFavorite(false);
    } else {
      updated = [...favs, shop.id];
      setIsFavorite(true);
    }
    saveFavoritesToStorage(updated);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.area + " Chennai")}`;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          to="/shops"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Local Shops</span>
        </Link>

        {/* Top Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="relative h-64 sm:h-80 w-full bg-slate-900">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {shop.isVerified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Local Business
                  </span>
                )}
                {shop.isMiniShop && <MiniShopBadge />}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white transition-colors cursor-pointer"
                  title="Share Shop Profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFavorite}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isFavorite
                      ? "bg-rose-500 text-white shadow-md"
                      : "bg-white/80 text-slate-800 hover:bg-white hover:text-rose-500"
                  }`}
                  title="Save to favorites"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Bottom Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="uppercase tracking-wider">{shop.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {shop.area}, Chennai
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold">{shop.name}</h1>
            </div>
          </div>

          {/* Quick Header Info Strip */}
          <div className="p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/80">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-amber-900">{shop.rating}</span>
                <span className="text-slate-500">({shop.reviewCount} customer reviews)</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    shop.isOpen ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {shop.isOpen ? "🟢 Open Now" : "🔴 Closed"}
                </span>
              </div>

              <div className="text-slate-500 font-medium">
                📍 Distance: <strong className="text-slate-800">{formatDistance(shop.distance)}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${shop.phone}`}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Shop</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {copiedLink && (
          <div className="p-3 bg-emerald-500 text-white text-xs font-bold text-center rounded-xl animate-in fade-in">
            Link copied to clipboard! Share with friends in {shop.area}.
          </div>
        )}

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              {[
                { id: "about", label: "About Shop" },
                { id: "products", label: "Products & Services" },
                { id: "reviews", label: "Customer Reviews" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: ABOUT */}
            {activeTab === "about" && (
              <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">About {shop.name}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{shop.description}</p>
                </div>

                {shop.offers && (
                  <div className="p-4 bg-amber-500/10 border border-amber-300 rounded-xl space-y-1">
                    <span className="text-xs font-extrabold text-amber-900 uppercase">🏷️ Active Shop Offer</span>
                    <p className="text-sm font-semibold text-slate-900">{shop.offers}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500">Opening Hours</p>
                    <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      {shop.openingHours}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500">Phone Number</p>
                    <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      {shop.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRODUCTS & SERVICES */}
            {activeTab === "products" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                {shop.products && shop.products.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <ShoppingBag className="w-4 h-4 text-emerald-600" />
                      Featured Products
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {shop.products.map(item => (
                        <span key={item} className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {shop.services && shop.services.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-emerald-600" />
                      Services Provided
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {shop.services.map(srv => (
                        <span key={srv} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200/80">
                          ✓ {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: REVIEWS */}
            {activeTab === "reviews" && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">Local Resident Reviews</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Bharani (Kattupakkam Resident)</span>
                      <span className="text-amber-500 font-bold">⭐⭐⭐⭐⭐ 5.0</span>
                    </div>
                    <p className="text-xs text-slate-600">"Extremely prompt service and reasonable local prices. Highly recommend!"</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Kavitha (Iyyappanthangal Resident)</span>
                      <span className="text-amber-500 font-bold">⭐⭐⭐⭐⭐ 4.8</span>
                    </div>
                    <p className="text-xs text-slate-600">"Very polite staff and genuine items. Always my go-to shop nearby."</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Location & Address Box */}
          <div className="space-y-6">
            
            {/* Address & Directions Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Shop Location
              </h3>

              <div className="space-y-2 text-xs text-slate-700">
                <p className="font-medium leading-relaxed">{shop.address}</p>
                <p className="text-slate-500">Area: <strong className="text-slate-900">{shop.area}, Chennai</strong></p>
              </div>

              {/* Map Placeholder Card */}
              <div className="relative h-40 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/10 pointer-events-none" />
                <MapPin className="w-8 h-8 text-emerald-600 mb-1 animate-bounce" />
                <p className="text-xs font-bold text-slate-900">{shop.name}</p>
                <p className="text-[11px] text-slate-500">{shop.area}, Chennai</p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-3 py-1 bg-emerald-600 text-white text-[11px] font-bold rounded-lg shadow-xs hover:bg-emerald-700"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Merchant Guarantee Badge */}
            <div className="p-5 bg-emerald-950 text-white rounded-2xl border border-emerald-800 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">OfferMe Verified</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                This shop's location and phone number are verified for Kattupakkam & Iyyappanthangal residents.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ShopDetails;
