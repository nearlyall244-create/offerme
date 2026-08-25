import React from "react";

export const IconButton = ({ children, onClick, className = "", ariaLabel = "Button" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
