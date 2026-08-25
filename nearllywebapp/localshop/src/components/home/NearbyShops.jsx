import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import ShopCard from "../shop/ShopCard";
import { shops } from "../../data/shops";
import { useAuth } from "../../hooks/useAuth";

export const NearbyShops = () => {
  const { location } = useAuth();
  
  // Filter by user's active location (Kattupakkam / Iyyappanthangal) and sort by nearest distance
  const filteredShops = shops
    .filter(s => s.area.toLowerCase() === location.toLowerCase())
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);

  return (
    <section className="py-14 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              Proximity Search
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Shops Nearby in <span className="text-emerald-600">{location}</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Discover verified local shops within walking distance of your neighborhood
            </p>
          </div>

          <Link
            to={`/nearby?area=${location}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>See All Nearby Shops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredShops.map(shop => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NearbyShops;
