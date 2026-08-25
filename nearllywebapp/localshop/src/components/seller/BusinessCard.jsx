import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Tag, Star, ArrowRight } from "lucide-react";
import Badge from "../common/Badge";

export const BusinessCard = ({ business }) => {
  const {
    id,
    name,
    category,
    area,
    address,
    phone,
    rating = 5.0,
    reviewCount = 1,
    image,
    description,
    offers,
    isUserSubmitted
  } = business;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full relative">
      {/* Top Image Box */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Category & Badge Chips */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <Badge variant="emerald" className="bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
            {category}
          </Badge>
          {isUserSubmitted && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-display text-[10px] font-extrabold uppercase tracking-wide shadow-md">
              New Listing
            </span>
          )}
        </div>

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-amber-400 flex items-center gap-1 text-xs font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{typeof rating === "number" ? rating.toFixed(1) : "5.0"}</span>
        </div>

        {/* Location Footer Bar over Image */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between text-xs font-medium">
          <span className="flex items-center gap-1 bg-slate-900/70 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{area || "Kattupakkam"}</span>
          </span>
          <span className="text-emerald-400 font-bold bg-slate-900/70 backdrop-blur-xs px-2 py-1 rounded-lg">
            Verified
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 font-body">
        <div className="space-y-2">
          <h4 className="font-display text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
            {name}
          </h4>

          {offers && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="line-clamp-1">{offers}</span>
            </div>
          )}

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {description || "Local verified business providing quality services and products in your neighborhood."}
          </p>

          <div className="pt-1 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>{phone || "+91 98401 23456"}</span>
          </div>
        </div>

        {/* Card Action Link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">
            {address ? (address.length > 28 ? address.slice(0, 28) + "..." : address) : "Kattupakkam, Chennai"}
          </span>
          <Link
            to={`/shops/${id}`}
            className="font-display inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
