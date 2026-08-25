import React from "react";
import { Link } from "react-router-dom";
import { Store, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";
import Card from "../common/Card";
import { shops } from "../../data/shops";

export const MiniShops = () => {
  // Map mini shop images to 3D carousel card format
  const miniShopCards = shops.filter(s => s.isMiniShop).slice(0, 10).map((shop, idx) => ({
    index: idx,
    colorCard: idx % 3 === 0 ? "245, 158, 11" : idx % 3 === 1 ? "16, 185, 129" : "56, 189, 248",
    image: shop.image,
    title: shop.name,
  }));

  return (
    <section className="py-16 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y border-amber-200/50">
      {/* Background Icon Watermark */}
      <div className="absolute right-4 top-4 text-amber-500/10 pointer-events-none">
        <Store className="w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with 3D Card Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="font-display inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hyperlocal Highlight</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Small Shops. <span className="text-amber-600">Big Value.</span>
            </h2>

            <p className="font-body text-base text-slate-700 mt-3 leading-relaxed">
              From your neighborhood tea shop to the small mobile repair stand around the corner — discover every local business in one place. We empower micro-merchants, street stalls, and home caterers in Kattupakkam and Iyyappanthangal.
            </p>
          </div>

          <div className="lg:col-span-5 hidden sm:block">
            <Card cardList={miniShopCards} quantity={10} />
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-10 pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-xs p-5 rounded-2xl border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-900 rounded-xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-900">Are you a small business owner in Kattupakkam or Iyyappanthangal?</h4>
              <p className="font-body text-xs text-slate-600">Get listed on OFFERme for free and let customers nearby discover you instantly!</p>
            </div>
          </div>

          <Link
            to="/shops?miniShopsOnly=true"
            className="font-display inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-md transition-colors shrink-0"
          >
            <span>click me to see shops</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MiniShops;
