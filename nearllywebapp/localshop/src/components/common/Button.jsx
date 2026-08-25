import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  icon: Icon
}) => {
  const baseStyles = "font-display inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 focus:ring-emerald-500",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20 focus:ring-slate-700",
    outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 focus:ring-emerald-500",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-500",
    accent: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-md shadow-amber-500/20 focus:ring-amber-400"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />}
      {children}
    </button>
  );
};

export default Button;
