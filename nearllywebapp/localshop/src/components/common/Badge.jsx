import React from "react";

export const Badge = ({ children, variant = "emerald", className = "", icon: Icon }) => {
  const variants = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    blue: "bg-blue-50 text-blue-700 border-blue-200/80",
    amber: "bg-amber-50 text-amber-800 border-amber-200/80",
    purple: "bg-purple-50 text-purple-700 border-purple-200/80",
    rose: "bg-rose-50 text-rose-700 border-rose-200/80",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    gold: "bg-amber-100 text-amber-900 border-amber-300 font-semibold"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${variants[variant] || variants.emerald} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
};

export default Badge;
