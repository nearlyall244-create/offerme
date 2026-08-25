import React from "react";
import { Store } from "lucide-react";

export const MiniShopBadge = ({ className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs tracking-wide uppercase ${className}`}
      title="Hyperlocal Mini Shop / Small Corner Business"
    >
      <Store className="w-3.5 h-3.5" />
      <span>MINI SHOP</span>
    </span>
  );
};

export default MiniShopBadge;
