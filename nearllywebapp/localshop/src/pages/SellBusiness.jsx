import React, { useState } from "react";
import BusinessForm from "../components/seller/BusinessForm";
import BusinessListings from "../components/seller/BusinessListings";
import { ShieldCheck, Zap, Sparkles, Users, Award } from "lucide-react";

export const SellBusiness = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleListingSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => {
      const el = document.getElementById("submitted-listings-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>OLX-Style Local Business Marketplace</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Grow Your Business. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                List & Get Discovered Nearby.
              </span>
            </h1>
            <p className="font-body text-base text-slate-300 max-w-2xl leading-relaxed">
              Connect directly with customers across <strong className="text-emerald-400 font-semibold">Kattupakkam</strong> and <strong className="text-emerald-400 font-semibold">Iyyappanthangal</strong>. Post your shop, service center, or specialty offers for free!
            </p>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display text-xs font-bold text-white">100% Free Listing</h5>
                <p className="font-body text-[11px] text-slate-400">Zero commission or hidden fees</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display text-xs font-bold text-white">Instant Visibility</h5>
                <p className="font-body text-[11px] text-slate-400">Appears immediately in categories</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-display text-xs font-bold text-white">Hyperlocal Reach</h5>
                <p className="font-body text-[11px] text-slate-400">Targeted Kattupakkam customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + Instructions/Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <BusinessForm onListingSuccess={handleListingSuccess} />
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Guidelines Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-sm font-body">
              <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-base">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Tips for a Great Business Listing</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span><strong>Clear Shop Name & Contact:</strong> Ensure phone number is accurate for direct customer calls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span><strong>Accurate Category:</strong> Choose the exact category (e.g. Cake Shops, Fitness, Restaurant) so nearby residents find you easily.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <span><strong>Special Offers:</strong> Highlight discounts like "20% OFF Birthday Cakes" to attract immediate walk-in buyers.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Submitted Business Listings Grid */}
        <div id="submitted-listings-section" className="pt-6">
          <BusinessListings key={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default SellBusiness;
