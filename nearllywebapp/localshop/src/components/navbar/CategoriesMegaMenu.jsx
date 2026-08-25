import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, ArrowRight, Sparkles, Layers } from "lucide-react";
import { categoryColumns } from "../../data/categories";
import MegaMenuColumn from "./MegaMenuColumn";

export const CategoriesMegaMenu = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState(categoryColumns[0].categories[0]);

  return (
    <div className="w-[930px] max-w-[calc(100vw-48px)] bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 p-5 mega-menu-enter">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-xs font-black uppercase tracking-wider text-slate-900">
              Categories Directory
            </h3>
            <p className="font-body text-[11px] text-slate-500 font-medium">
              Explore 27 local shop categories & subcategories
            </p>
          </div>
        </div>

        {activeCategory && (
          <div className="font-body flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/70">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>
              Active: <strong className="font-display text-slate-900 font-bold">{activeCategory.name}</strong> ({activeCategory.subcategories?.length || 0} items)
            </span>
          </div>
        )}
      </div>

      {/* 4 Multi-Column Grid with Division Lines */}
      <div className="grid grid-cols-4 gap-6 divide-x divide-slate-100 mega-menu-scrollbar max-h-[480px] overflow-y-auto pr-1">
        {categoryColumns.map((col) => (
          <MegaMenuColumn
            key={col.id}
            column={col}
            activeCategory={activeCategory}
            onHoverCategory={setActiveCategory}
            onClickCategory={setActiveCategory}
            onClose={onClose}
          />
        ))}
      </div>

      {/* Footer Banner */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70 -mx-6 -mb-6 p-4 rounded-b-2xl">
        <div className="font-body flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Grid className="w-4 h-4 text-emerald-600" />
          <span>Need help finding a specific service or shop in Kattupakkam / Iyyappanthangal?</span>
        </div>
        <Link
          to="/categories"
          onClick={onClose}
          className="font-display inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60"
        >
          View all categories
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CategoriesMegaMenu;
