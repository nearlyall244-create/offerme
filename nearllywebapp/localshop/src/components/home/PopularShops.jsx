import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import ShopCard from "../shop/ShopCard";
import { shops } from "../../data/shops";

export const PopularShops = () => {
  const topRatedShops = [...shops]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 4);

  return (
    <section className="py-14 bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Community Favorites
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Highest Rated Local Stores
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Top customer rated shops and service hubs in Kattupakkam and Iyyappanthangal
            </p>
          </div>

          <Link
            to="/shops?sortBy=rating"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>Explore All Top Rated</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedShops.map(shop => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularShops;
