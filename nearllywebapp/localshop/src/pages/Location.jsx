import React from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Store, ArrowRight, Compass, Sparkles } from "lucide-react";
import popularLocations from "../data/locations";
import { shops as shopsData } from "../data/shops";

export const Location = () => {
  const { locationSlug } = useParams();

  const selectedLocObj =
    popularLocations.find((loc) => loc.slug === locationSlug || loc.name.toLowerCase() === locationSlug?.toLowerCase()) ||
    popularLocations[0];

  const locationShops = shopsData ? shopsData.filter(
    (shop) =>
      shop.area?.toLowerCase() === selectedLocObj.name.toLowerCase() ||
      shop.address?.toLowerCase().includes(selectedLocObj.name.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Location Hero Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-display inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>Hyperlocal Hub</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Shops in {selectedLocObj.name}
            </h1>
            <p className="font-body text-sm text-slate-500 max-w-2xl mt-2 leading-relaxed">
              {selectedLocObj.description}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display text-2xl font-extrabold text-slate-900">{selectedLocObj.shopCount}+</span>
              <span className="font-body text-xs text-slate-500 block font-medium">Verified Merchants</span>
            </div>
          </div>
        </div>

        {/* Location Switcher Chips */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            Switch Location:
          </span>
          {popularLocations.map((loc) => {
            const isActive = loc.name === selectedLocObj.name;
            return (
              <Link
                key={loc.id}
                to={`/location/${loc.slug}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {loc.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Popular Categories in this location */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          Popular in {selectedLocObj.name}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {selectedLocObj.popularCategories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/shops?location=${encodeURIComponent(selectedLocObj.name)}&category=${encodeURIComponent(cat)}`}
              className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all group flex items-center justify-between"
            >
              <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                {cat}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Location;
