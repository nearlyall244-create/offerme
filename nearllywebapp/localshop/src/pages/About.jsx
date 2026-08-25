import React from "react";
import { Store, MapPin, ShieldCheck, Heart, Users, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            <span>Hyperlocal Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            "Everything Local. Everything Nearby."
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            OfferMe was built specifically to bridge the gap between residents and local businesses across <strong className="text-emerald-700">Kattupakkam</strong> and <strong className="text-emerald-700">Iyyappanthangal</strong>, Chennai.
          </p>
        </div>

        {/* Core Value Proposition Section */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-md space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-extrabold text-slate-900">Why OfferMe?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In fast-growing suburban hubs like Kattupakkam and Iyyappanthangal, thousands of micro-merchants—tea stalls, mobile repair counters, small bakeries, tailors, and home caterers—play a vital role in our daily lives. Yet, finding them online used to be difficult.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                📍
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Hyperlocal Focus</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exclusively cataloging Kattupakkam & Iyyappanthangal shops. No distracting noise from distant areas.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                🏪
              </div>
              <h3 className="text-base font-bold text-slate-900">Mini Shops Priority</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Giving small corner stands, street stalls, and home caterers equal visibility alongside supermarkets.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                ⚡
              </div>
              <h3 className="text-base font-bold text-slate-900">Instant Contact & Directions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct phone numbers, opening status, exact address, and Google Maps directions at a single tap.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Discover nearby shops within walking distance",
            "Support micro-merchants and local family businesses",
            "Find specialized doorstep service technicians",
            "Explore exclusive local merchant offers and discounts",
            "Save time asking neighbors for shop recommendations",
            "Help small home businesses get discovered online"
          ].map(benefit => (
            <div key={benefit} className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center gap-3 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Footer Call to Action */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-extrabold">Ready to explore your neighborhood?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Join hundreds of residents discovering Kattupakkam and Iyyappanthangal's best local stores.
          </p>
          <div className="pt-2">
            <Link to="/shops">
              <Button variant="primary" size="lg" icon={Store}>
                Explore All Local Shops
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
