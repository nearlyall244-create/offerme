import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, CheckCircle2, Heart, ExternalLink, Phone, Navigation } from "lucide-react";
import MiniShopBadge from "./MiniShopBadge";
import { getFavoritesFromStorage, saveFavoritesToStorage, formatDistance } from "../../utils/helpers";

export const ShopCard = ({ shop }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavoritesFromStorage();
    setIsFavorite(favorites.includes(shop.id));
  }, [shop.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentFavs = getFavoritesFromStorage();
    let updatedFavs;
    if (currentFavs.includes(shop.id)) {
      updatedFavs = currentFavs.filter(id => id !== shop.id);
      setIsFavorite(false);
    } else {
      updatedFavs = [...currentFavs, shop.id];
      setIsFavorite(true);
    }
    saveFavoritesToStorage(updatedFavs);
  };

  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.area + " Chennai")}`;
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
      {/* Image Banner Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {shop.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
            {shop.isMiniShop && <MiniShopBadge />}
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={toggleFavorite}
            aria-label="Add to favorites"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
              isFavorite
                ? "bg-rose-500 text-white shadow-md scale-110"
                : "bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{shop.area}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                shop.isOpen
                  ? "bg-emerald-500/90 text-white"
                  : "bg-rose-500/90 text-white"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? "bg-white animate-pulse" : "bg-white"}`} />
              {shop.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              {shop.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-amber-900">{shop.rating}</span>
              <span className="text-[11px] text-slate-500">({shop.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {shop.name}
          </h3>

          <p className="font-body text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {shop.description}
          </p>

          {/* Highlights / Offers if any */}
          {shop.offers && (
            <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 flex items-center gap-2">
              <span className="font-display text-xs font-semibold text-amber-800 line-clamp-1">
                🏷️ {shop.offers}
              </span>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="font-body text-xs font-medium text-slate-500">
            {formatDistance(shop.distance)}
          </span>

          <div className="flex items-center gap-2">
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200"
              title="Get Directions on Maps"
            >
              <Navigation className="w-4 h-4" />
            </a>

            <Link
              to={`/shops/${shop.id}`}
              className="font-display inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <span>View Shop</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
