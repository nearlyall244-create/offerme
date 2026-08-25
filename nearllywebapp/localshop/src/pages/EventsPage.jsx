import React from "react";
import EventCategories from "../components/events/EventCategories";
import { Sparkles, Calendar, MapPin, ShieldCheck, Star } from "lucide-react";
import "./EventsPage.css";

export const EventsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="events-page__hero py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Local Event Hub</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Events & Celebrations Directory
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Discover verified local hall venues, wedding caterers, DJs, photographers, decorators, sound rentals, and event support staff across your neighborhood.
              </p>
            </div>

            {/* Quick Feature Stats */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="events-page__stat-card p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xl font-extrabold text-slate-900">13</span>
                </div>
                <span className="text-xs font-medium text-slate-500">Service Categories</span>
              </div>

              <div className="events-page__stat-card p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xl font-extrabold text-slate-900">100%</span>
                </div>
                <span className="text-xs font-medium text-slate-500">Verified Vendors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 13 Category Cards Grid Component */}
      <EventCategories />

      {/* Local Planning Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Planning A Marriage or Party?
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Connect Directly with Local Merchants
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No middleman commission fees. Find exact addresses, phone numbers, and services offered by local vendors in Kattupakkam, Iyyappanthangal, Porur, and all Chennai regions.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Direct Phone Calls
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-400" /> Real Local Addresses
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
