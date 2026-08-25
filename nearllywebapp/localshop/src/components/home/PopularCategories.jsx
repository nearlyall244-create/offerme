import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CategoryCard from "../category/CategoryCard";
import { categories } from "../../data/categories";
import "./PopularCategories.css";

export const PopularCategories = () => {
  const findCat = (name) => {
    return categories.find((c) => c.name.toLowerCase() === name.toLowerCase()) || categories[0];
  };

  // Row 1 Categories
  const rowOneSingle = [
    findCat("Daily Essentials & Groceries"),
    findCat("Cake Shops"),
    findCat("Tea Shops"),
    findCat("Medical Shops"),
    findCat("Mobile"),
    findCat("Snacks / Chat Items"),
  ];

  // Row 2 Categories
  const rowTwoSingle = [
    findCat("Tailor Shops"),
    findCat("Restaurant"),
    findCat("Salons"),
    findCat("Xerox / Printing"),
    findCat("Textiles"),
    findCat("Home Services"),
  ];

  // Quadruple items to ensure flawless 50% infinite translation loop on all screen sizes
  const rowOneItems = [...rowOneSingle, ...rowOneSingle, ...rowOneSingle, ...rowOneSingle];
  const rowTwoItems = [...rowTwoSingle, ...rowTwoSingle, ...rowTwoSingle, ...rowTwoSingle];

  return (
    <section className="py-14 bg-slate-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="font-display text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Quick Discovery
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Popular Categories
            </h2>
            <p className="font-body text-sm text-slate-600 mt-1">
              Find essential daily services and shops around Kattupakkam & Iyyappanthangal
            </p>
          </div>

          <Link
            to="/categories"
            className="font-display inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>View All 60+ Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2-Row Smooth Marquee Showcase Container */}
      <div className="categories-marquee-container max-w-7xl mx-auto">
        {/* ROW 1: Moves LEFT */}
        <div className="categories-track-row categories-track-left">
          {rowOneItems.map((cat, idx) => (
            <div key={`row1-${cat.name}-${idx}`} className="category-marquee-item">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>

        {/* ROW 2: Moves RIGHT */}
        <div className="categories-track-row categories-track-right">
          {rowTwoItems.map((cat, idx) => (
            <div key={`row2-${cat.name}-${idx}`} className="category-marquee-item">
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
