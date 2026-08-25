import React, { useState } from "react";
import { categoryGroups } from "../data/categories";
import CategoryCard from "../components/category/CategoryCard";
import SearchBar from "../components/search/SearchBar";
import { Grid, Layers } from "lucide-react";

export const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4">
          <div className="font-display inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Category Taxonomy</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Browse All 60+ Local Categories
          </h1>

          <p className="font-body text-sm text-slate-600 max-w-2xl">
            Explore every type of local shop and service in Kattupakkam & Iyyappanthangal organized by category.
          </p>

          <div className="max-w-xl pt-2">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              placeholder="Search category name (e.g., 'Bakery', 'Tailor', 'Tea')..."
            />
          </div>
        </div>

        {/* Category Groups List */}
        <div className="space-y-12">
          {categoryGroups.map((group) => {
            const filteredGroupCategories = group.categories.filter(c =>
              c.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );

            if (filteredGroupCategories.length === 0) return null;

            return (
              <div key={group.name} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-600" />
                  <h2 className="font-display text-xl font-bold text-slate-900">{group.name}</h2>
                  <span className="text-xs font-bold text-slate-400 bg-slate-200/80 px-2 py-0.5 rounded-full">
                    {filteredGroupCategories.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredGroupCategories.map((cat) => (
                    <CategoryCard key={cat.name} category={cat} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Categories;
