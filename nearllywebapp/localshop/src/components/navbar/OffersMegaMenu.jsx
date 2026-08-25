import React from "react";
import { Link } from "react-router-dom";
import { Tag, ArrowRight, MapPin, Sparkles, Flame } from "lucide-react";
import * as Icons from "lucide-react";
import offersData from "../../data/offers";
import { filterActiveOffers } from "../../utils/navigationUtils";

export const OffersMegaMenu = ({ selectedLocation, onClose }) => {
  const activeOffers = filterActiveOffers(offersData, selectedLocation);

  return (
    <div className="w-[680px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 p-6 mega-menu-enter">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">
            Special Local Offers
          </span>
        </div>
        <div className="font-body flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Location: <strong className="font-display text-slate-900 font-semibold">{selectedLocation || "All Areas"}</strong></span>
        </div>
      </div>

      {/* Offer Cards Grid */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {activeOffers.slice(0, 6).map((offer) => {
          const IconComponent = Icons[offer.icon] || Icons.Tag;
          const isExactLocation =
            selectedLocation &&
            (offer.location?.toLowerCase() === selectedLocation.toLowerCase() ||
              offer.area?.toLowerCase() === selectedLocation.toLowerCase());

          return (
            <Link
              key={offer.id}
              to={`/offers`}
              onClick={onClose}
              className={`group flex flex-col justify-between p-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative overflow-hidden ${
                isExactLocation
                  ? "bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-400"
                  : "bg-slate-50/70 border-slate-200/70 hover:bg-white hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-2xs border border-slate-100 flex items-center justify-center text-slate-800 group-hover:text-emerald-700 transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="font-display text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    {offer.badge || "Deal"}
                  </span>
                </div>
                <h5 className="font-display text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {offer.category}
                </h5>
                <p className="font-display text-sm font-black text-rose-600 my-1 tracking-tight">
                  {offer.discount}
                </p>
                <p className="font-body text-[11px] text-slate-500 line-clamp-1 font-medium">
                  {offer.shopName}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px]">
                <span className="font-body text-slate-400 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {offer.location || offer.area}
                </span>
                <span className="font-display text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Slack-style Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="font-body text-xs text-slate-400">
          Showing {Math.min(6, activeOffers.length)} of {activeOffers.length} active coupons in {selectedLocation || "your region"}
        </span>
        <Link
          to="/offers"
          onClick={onClose}
          className="font-display inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
        >
          View all offers
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default OffersMegaMenu;
