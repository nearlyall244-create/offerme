import React from "react";
import { MapPin, Check, Compass } from "lucide-react";
import popularLocations from "../../data/locations";

export const LocationMegaMenu = ({ selectedLocation, onSelectLocation, onClose }) => {
  return (
    <div className="w-72 bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 p-4 mega-menu-enter">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Location
          </span>
        </div>
      </div>

      {/* Location Names List Only */}
      <div className="space-y-1">
        {popularLocations.map((loc) => {
          const isSelected = selectedLocation === loc.name;
          return (
            <button
              key={loc.id}
              onClick={() => {
                onSelectLocation(loc.name);
                onClose?.();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 text-left group ${
                isSelected
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin
                  className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isSelected ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span className="truncate">{loc.name}</span>
              </div>
              {isSelected && (
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LocationMegaMenu;
