import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Store, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import SearchBar from "../search/SearchBar";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { location, updateLocation } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shops?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/shops");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-10 right-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Main Two-Column SaaS Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Hero Content & Search */}
          <div className="lg:col-span-7 space-y-6 text-left">


            {/* Main Heading & Subtitle */}
            <div className="space-y-4">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Everything You Need. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  Right Around the Corner.
                </span>
              </h1>

              <p className="font-body text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                Discover local shops, services and small businesses across <strong className="text-emerald-400 font-semibold">Kattupakkam</strong> and <strong className="text-emerald-400 font-semibold">Iyyappanthangal</strong>. From neighborhood mini tea stalls to major stores.
              </p>
            </div>

            {/* Search Bar Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-3 max-w-xl">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={() => setSearchTerm("")}
                placeholder="Try searching 'tea', 'mobile repair', 'grocery', 'tailor'..."
                size="lg"
                showLocationBadge={true}
                selectedLocation={location}
              />

              {/* Location Badges Switcher */}
              <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                <span className="text-slate-400 font-medium">Hyperlocal Area:</span>
                <button
                  type="button"
                  onClick={() => updateLocation("Kattupakkam")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer ${location === "Kattupakkam"
                    ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Kattupakkam
                </button>
                <button
                  type="button"
                  onClick={() => updateLocation("Iyyappanthangal")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer ${location === "Iyyappanthangal"
                    ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-md"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Iyyappanthangal
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/shops")}
                icon={Store}
              >
                Explore Local Shops
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/categories")}
                className="border-slate-700 text-slate-200 bg-slate-800/60 hover:bg-slate-800 hover:text-white transition-all duration-300"
                icon={ArrowRight}
              >
                Categories
              </Button>
            </div>

            {/* Feature Bullets */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Merchants</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Contact Info</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Hyperlocal</span>
              </div>
            </div>

          </div>

          {/* Right Column: SaaS Visual / Illustration Area */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-slate-700/40 to-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden group">

              {/* Background Glow inside Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/60 via-transparent to-amber-950/40 pointer-events-none z-10" />

              <div className="relative rounded-[calc(1.5rem-4px)] overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                  alt="Hyperlocal Community Merchant Storefront"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-emerald-400 shadow-md">
                    <MapPin className="w-3.5 h-3.5" /> Kattupakkam & Iyyappanthangal
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold backdrop-blur-md">
                    ⭐ 4.9 Rating
                  </span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Hyperlocal Discovery Promise
                    </p>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Live Directory
                    </span>
                  </div>
                  <p className="font-body text-sm font-semibold text-white">
                    "Connecting local neighbors directly to verified Tamil Nadu street shops & local services."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Hero Stats Strip */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-center bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl shadow-inner">
          <div>
            <p className="font-display text-2xl lg:text-3xl font-extrabold text-white">40+</p>
            <p className="font-body text-xs text-slate-400 font-medium">Local Businesses</p>
          </div>
          <div>
            <p className="font-display text-2xl lg:text-3xl font-extrabold text-emerald-400">60+</p>
            <p className="font-body text-xs text-slate-400 font-medium">Shop Categories</p>
          </div>
          <div>
            <p className="font-display text-2xl lg:text-3xl font-extrabold text-amber-400">2</p>
            <p className="font-body text-xs text-slate-400 font-medium">Target Neighborhoods</p>
          </div>
          <div>
            <p className="font-display text-2xl lg:text-3xl font-extrabold text-white">100%</p>
            <p className="font-body text-xs text-slate-400 font-medium">Hyperlocal Coverage</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
