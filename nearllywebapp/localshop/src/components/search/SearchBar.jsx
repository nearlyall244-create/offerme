import React from "react";
import { Search, X, MapPin } from "lucide-react";

export const SearchBar = ({
  value = "",
  onChange,
  onClear,
  placeholder = "Search shops, products or services...",
  className = "",
  size = "md",
  showLocationBadge = false,
  selectedLocation = "Kattupakkam"
}) => {
  const sizes = {
    sm: "py-2 px-3 text-xs",
    md: "py-3 px-4 text-sm",
    lg: "py-4 px-5 text-base"
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-200/90 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-200">
        <div className="pl-4 text-slate-400">
          <Search className={size === "lg" ? "w-6 h-6 text-emerald-600" : "w-5 h-5"} />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 placeholder-slate-400 font-medium ${sizes[size]}`}
        />

        {showLocationBadge && (
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl mr-2 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{selectedLocation}</span>
          </div>
        )}

        {value && (
          <button
            onClick={onClear}
            className="p-2 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
