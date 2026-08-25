import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./EventCategoryCard.css";

export const EventCategoryCard = ({ category }) => {
  const IconComponent = category.icon;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group event-category-card flex flex-col justify-between p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      aria-label={`Explore ${category.name}`}
    >
      <div>
        {/* Top Header Row with Icon & Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="event-category-card__icon-wrapper w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center border border-emerald-100/80 shadow-xs transition-colors duration-300">
            {IconComponent ? <IconComponent className="w-6 h-6" /> : null}
          </div>

          {category.badge && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200/60 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-colors">
              {category.badge}
            </span>
          )}
        </div>

        {/* Category Info */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {category.name}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>

      {/* Footer Explore Link */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
          Explore
        </span>
        <div className="event-category-card__arrow text-emerald-600 group-hover:text-emerald-700">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default EventCategoryCard;
