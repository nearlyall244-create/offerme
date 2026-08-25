import React from "react";

export const Dropdown = ({ isOpen, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full left-0 mt-3 z-50 bg-white rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${className}`}
      role="menu"
    >
      {children}
    </div>
  );
};

export default Dropdown;
