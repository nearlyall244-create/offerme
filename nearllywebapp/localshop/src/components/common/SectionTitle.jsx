import React from "react";

export const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </h3>
      {subtitle && (
        <p className="font-body text-xs text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
