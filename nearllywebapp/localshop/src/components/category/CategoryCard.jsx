import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";

export const CategoryCard = ({ category }) => {
  if (!category) return null;
  const IconComponent = Icons[category.icon] || Icons.Store;

  const colorVariants = {
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white border-emerald-100",
    teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white border-teal-100",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white border-amber-100",
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white border-blue-100",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white border-purple-100",
    pink: "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white border-pink-100",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white border-rose-100",
    orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white border-orange-100",
    cyan: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white border-cyan-100",
    slate: "bg-slate-100 text-slate-700 group-hover:bg-slate-800 group-hover:text-white border-slate-200"
  };

  const styleClass = colorVariants[category.color] || colorVariants.emerald;

  return (
    <Link
      to={`/category/${encodeURIComponent(category.slug || category.name)}`}
      className="group relative flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
    >
      <div className={`p-3.5 rounded-2xl border transition-colors duration-300 mb-3 ${styleClass}`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <h4 className="font-display text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
        {category.name}
      </h4>
      <span className="font-body text-[11px] text-slate-500 font-medium mt-0.5">
        {category.count} shops near you
      </span>
    </Link>
  );
};

export default CategoryCard;
