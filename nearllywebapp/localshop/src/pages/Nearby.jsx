import React, { useState, useMemo } from "react";
import { MapPin, Navigation, Sliders } from "lucide-react";
import ShopGrid from "../components/shop/ShopGrid";
import { shops } from "../data/shops";
import { useAuth } from "../hooks/useAuth";

export const Nearby = () => {
  const { location, updateLocation } = useAuth();
  const [maxRadius, setMaxRadius] = useState(2.0);

  const nearbyShopsList = useMemo(() => {
    return shops
      .filter(s => s.area.toLowerCase() === location.toLowerCase() && s.distance <= maxRadius)
      .sort((a, b) => a.distance - b.distance);
  }, [location, maxRadius]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-lg space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5" />
              <span>Hyperlocal Distance Radar</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Shops Closest to You
            </h1>
            <p className="text-sm text-slate-300">
              Sorted by exact distance within <strong className="text-emerald-400 font-bold">{location}</strong>.
            </p>
          </div>

          {/* Area & Distance Selector Controls */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Area Pills */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-400">Area:</span>
              <div className="inline-flex bg-slate-900 p-1 rounded-xl">
                <button
                  onClick={() => updateLocation("Kattupakkam")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    location === "Kattupakkam" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  📍 Kattupakkam
                </button>
                <button
                  onClick={() => updateLocation("Iyyappanthangal")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    location === "Iyyappanthangal" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  📍 Iyyappanthangal
                </button>
              </div>
            </div>

            {/* Radius Slider */}
            <div className="w-full md:w-72 space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-300 font-semibold">
                <span>Distance Radius</span>
                <span className="text-emerald-400 font-bold">{maxRadius} km</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.2"
                value={maxRadius}
                onChange={(e) => setMaxRadius(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-slate-800">
            Showing <span className="text-emerald-700 font-extrabold">{nearbyShopsList.length}</span> shops within {maxRadius} km in {location}
          </p>
        </div>

        {/* Grid */}
        <ShopGrid shops={nearbyShopsList} />

      </div>
    </div>
  );
};

export default Nearby;
