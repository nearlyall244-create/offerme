import React, { useState } from "react";
import { Sparkles, Search, PartyPopper } from "lucide-react";
import eventCategories from "../../data/eventCategories";
import EventCategoryCard from "./EventCategoryCard";
import "./EventCategories.css";

export const EventCategories = ({ title = "EVENTS & CELEBRATIONS", subtitle = "Plan your perfect event with trusted local businesses." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = eventCategories.filter((cat) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      cat.name.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term)
    );
  });

  return (
    <section className="event-categories py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100/80 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider event-categories__badge-glow">
            <PartyPopper className="w-4 h-4 text-emerald-600" />
            <span>Special Occasions & Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl">
            {subtitle}
          </p>

          {/* Search Input */}
          <div className="w-full max-w-lg pt-3">
            <div className="event-categories__search-wrapper relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search event services..."
                className="event-categories__search-input w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 13 Category Cards Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <EventCategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching categories found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for "venues", "caterers", "decor", or "photographers".
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default EventCategories;
