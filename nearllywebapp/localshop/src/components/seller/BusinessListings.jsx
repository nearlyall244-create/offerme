import React, { useState, useEffect } from "react";
import { getUserListings } from "../../utils/sellerStorage";
import BusinessCard from "./BusinessCard";
import EmptyState from "../common/EmptyState";
import { Store, Filter } from "lucide-react";

export const BusinessListings = ({ filterCategory = null }) => {
  const [userListings, setUserListings] = useState([]);
  const [selectedCat, setSelectedCat] = useState(filterCategory || "All");

  const refreshListings = () => {
    const listings = getUserListings();
    setUserListings(listings);
  };

  useEffect(() => {
    refreshListings();

    // Listen for custom storage events if updated in same session
    const handleStorageChange = () => {
      refreshListings();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const categoriesFilterList = ["All", ...Array.from(new Set(userListings.map((b) => b.category)))];

  const filteredListings = userListings.filter((b) => {
    if (selectedCat === "All") return true;
    return b.category === selectedCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <span>Recently Submitted Businesses</span>
          </h3>
          <p className="font-body text-xs text-slate-500 mt-0.5">
            Listings saved in your local session across Kattupakkam & Iyyappanthangal
          </p>
        </div>

        {categoriesFilterList.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {categoriesFilterList.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedCat === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No User Listings Found"
          description="Be the first to list your local shop or service on OfferMe! Fill out the form above to get discovered."
          actionText="List Your Business Above"
          onAction={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}
    </div>
  );
};

export default BusinessListings;
