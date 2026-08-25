import React from "react";
import Hero from "../components/home/Hero";
import PopularCategories from "../components/home/PopularCategories";
import MiniShops from "../components/home/MiniShops";
import { Store, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export const Home = () => {
  return (
    <div>
      <Hero />
      <PopularCategories />
      <MiniShops />

      {/* Hyperlocal Mission Banner Section */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="font-display text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Why OfferMe?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Bringing Every Local Merchant in Kattupakkam & Iyyappanthangal Online.
            </h2>
            <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
              Finding the right corner tea stall, electrician, small tailor, or medical store shouldn't require asking ten neighbors. OfferMe creates a unified, modern directory for the entire Kattupakkam and Iyyappanthangal community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Verified Local Merchants</h4>
                  <p className="font-body text-xs text-slate-400">Authentic shops with real addresses & contact details.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-white">Hyperlocal Focus</h4>
                  <p className="font-body text-xs text-slate-400">100% focused on Kattupakkam & Iyyappanthangal only.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/about">
                <Button variant="primary" size="lg" icon={Store}>
                  Read Our Local Story
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 group">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                alt="Local Tamil Nadu Street Shop discovery"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700">
                <p className="font-display text-xs font-bold text-emerald-400">📍 Local Discovery Promise</p>
                <p className="font-body text-sm font-semibold text-white mt-1">
                  "No small business is too small to be discovered on OfferMe."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
