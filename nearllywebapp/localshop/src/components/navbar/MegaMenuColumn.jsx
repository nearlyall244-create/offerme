import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ChevronRight } from "lucide-react";

export const MegaMenuColumn = ({
  column,
  activeCategory,
  onHoverCategory,
  onClickCategory,
  onClose
}) => {
  // Theme color maps for category headings & subcategory styles
  const colorThemes = {
    purple: {
      title: "text-purple-600 border-purple-500",
      catHeading: "text-purple-700 group-hover/cat:text-purple-800",
      activeCat: "bg-purple-50 text-purple-800 border-purple-200/80 shadow-2xs",
      iconBg: "bg-purple-100/70 text-purple-700",
      activeIconBg: "bg-purple-600 text-white",
      subBorder: "border-purple-400",
      subHoverText: "hover:text-purple-700 hover:font-bold",
      accentBar: "bg-purple-500"
    },
    amber: {
      title: "text-amber-600 border-amber-500",
      catHeading: "text-amber-700 group-hover/cat:text-amber-800",
      activeCat: "bg-amber-50 text-amber-800 border-amber-200/80 shadow-2xs",
      iconBg: "bg-amber-100/70 text-amber-700",
      activeIconBg: "bg-amber-600 text-white",
      subBorder: "border-amber-400",
      subHoverText: "hover:text-amber-700 hover:font-bold",
      accentBar: "bg-amber-500"
    },
    blue: {
      title: "text-blue-600 border-blue-500",
      catHeading: "text-blue-700 group-hover/cat:text-blue-800",
      activeCat: "bg-blue-50 text-blue-800 border-blue-200/80 shadow-2xs",
      iconBg: "bg-blue-100/70 text-blue-700",
      activeIconBg: "bg-blue-600 text-white",
      subBorder: "border-blue-400",
      subHoverText: "hover:text-blue-700 hover:font-bold",
      accentBar: "bg-blue-500"
    },
    emerald: {
      title: "text-emerald-600 border-emerald-500",
      catHeading: "text-emerald-700 group-hover/cat:text-emerald-800",
      activeCat: "bg-emerald-50 text-emerald-800 border-emerald-200/80 shadow-2xs",
      iconBg: "bg-emerald-100/70 text-emerald-700",
      activeIconBg: "bg-emerald-600 text-white",
      subBorder: "border-emerald-400",
      subHoverText: "hover:text-emerald-700 hover:font-bold",
      accentBar: "bg-emerald-500"
    },
    rose: {
      title: "text-rose-600 border-rose-500",
      catHeading: "text-rose-700 group-hover/cat:text-rose-800",
      activeCat: "bg-rose-50 text-rose-800 border-rose-200/80 shadow-2xs",
      iconBg: "bg-rose-100/70 text-rose-700",
      activeIconBg: "bg-rose-600 text-white",
      subBorder: "border-rose-400",
      subHoverText: "hover:text-rose-700 hover:font-bold",
      accentBar: "bg-rose-500"
    }
  };

  const theme = colorThemes[column.color] || colorThemes.emerald;

  return (
    <div className="w-full min-w-0 flex-1 flex flex-col space-y-3 pl-3 first:pl-0">
      {/* Column Title with Colored Top Border Accent */}
      <div className={`pt-2 border-t-2 ${theme.title} flex items-center justify-between pb-2 mb-1`}>
        <h4 className="font-display text-xs font-black uppercase tracking-wider">
          {column.title}
        </h4>
        <span className="font-display text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
          {column.categories.length}
        </span>
      </div>

      {/* Categories & Subcategories List */}
      <div className="space-y-4">
        {column.categories.map((category) => {
          const IconComponent = Icons[category.icon] || Icons.Store;
          const isActive = activeCategory?.id === category.id;

          return (
            <div key={category.id} className="space-y-1.5 group/item">
              {/* Category Heading Link */}
              <Link
                to={`/category/${encodeURIComponent(category.slug || category.name)}`}
                onMouseEnter={() => onHoverCategory(category)}
                onClick={() => {
                  onClickCategory?.(category);
                  onClose?.();
                }}
                className={`font-display w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 group/cat border ${
                  isActive
                    ? theme.activeCat
                    : "border-transparent text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all group-hover/cat:scale-105 ${
                      isActive ? theme.activeIconBg : theme.iconBg
                    }`}
                  >
                    <IconComponent className="w-3 h-3" />
                  </div>
                  <span className={`truncate ${isActive ? "" : theme.catHeading}`}>
                    {category.name}
                  </span>
                </div>
                {category.subcategories && category.subcategories.length > 0 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive
                        ? "translate-x-0.5 text-current opacity-100"
                        : "text-slate-400 opacity-60 group-hover/cat:opacity-100 group-hover/cat:translate-x-0.5"
                    }`}
                  />
                )}
              </Link>

              {/* Subcategories Vertical List (Myntra-style) */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div
                  className={`ml-3.5 pl-3 border-l-2 space-y-1 py-1 transition-all duration-200 ${
                    isActive ? `${theme.subBorder} opacity-100` : "border-slate-200/60 opacity-80"
                  }`}
                >
                  {category.subcategories.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={`/shops?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(sub)}`}
                      onClick={onClose}
                      className={`font-body block text-[11px] text-slate-600 font-medium py-0.5 transition-all duration-150 transform hover:translate-x-1 ${theme.subHoverText}`}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MegaMenuColumn;
