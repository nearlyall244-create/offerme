import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tag, Sparkles, Copy, Check, Store } from "lucide-react";
import { localOffers } from "../data/offers";

export const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-8 sm:p-12 rounded-3xl text-slate-950 shadow-lg space-y-4">
          <div className="font-display inline-flex items-center gap-1.5 px-3 py-1 bg-slate-950 text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Hyperlocal Savings</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Local Offers & Merchant Deals
          </h1>

          <p className="font-body text-sm sm:text-base font-medium max-w-2xl text-slate-900 leading-relaxed">
            Exclusive discounts, combo offers, and seasonal deals provided by neighborhood shops in Kattupakkam & Iyyappanthangal.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localOffers.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display px-3 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl">
                    {offer.discount}
                  </span>
                  <span className="font-body text-xs font-semibold text-slate-500">{offer.area}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900">{offer.title}</h3>

                <div className="font-display flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <Store className="w-4 h-4" />
                  <span>{offer.shopName}</span>
                </div>

                <p className="font-body text-xs text-slate-600 leading-relaxed">{offer.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                    title="Copy Coupon Code"
                  >
                    {copiedCode === offer.code ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <Link
                  to={`/shops/${offer.shopId}`}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  View Shop →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Offers;
