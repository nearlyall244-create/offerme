import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ShopGrid from "../components/shop/ShopGrid";
import { shops } from "../data/shops";
import { ArrowLeft, Tag, Layers } from "lucide-react";

export const CategoryShops = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName || "");

  const categoryShopsList = useMemo(() => {
    return shops.filter(
      s => s.category.toLowerCase() === decodedCategory.toLowerCase()
    );
  }, [decodedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>

        {/* Header Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200/60 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Category View</span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            {decodedCategory} Shops in Kattupakkam & Iyyappanthangal
          </h1>

          <p className="text-xs sm:text-sm text-slate-600">
            Found <strong className="text-emerald-700 font-bold">{categoryShopsList.length}</strong> local businesses listed under this category.
          </p>
        </div>

        {/* Shop Grid */}
        <ShopGrid shops={categoryShopsList} />

      </div>
    </div>
  );
};

export default CategoryShops;
