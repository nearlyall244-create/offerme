import React from "react";
import { Link } from "react-router-dom";
import { Store } from "lucide-react";

export const NavbarLogo = ({ scrolled = false, onClick }) => {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1"
      aria-label="OFFERME Home"
    >
      <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 shadow-xs">
        <Store className="w-5 h-5 text-emerald-400" />
      </div>
      <span
        className={`font-display font-extrabold tracking-tight text-xl transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-slate-900"
          }`}
      >
        NEARLY<span className="text-emerald-700">ALL</span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
