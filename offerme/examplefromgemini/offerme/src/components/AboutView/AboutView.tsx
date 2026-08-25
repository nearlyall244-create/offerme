import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Tag, 
  Store, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Award,
  ArrowRight
} from 'lucide-react';
import './AboutView.css';

export const AboutView: React.FC = () => {
  const { setCurrentView, setIsSellBusinessModalOpen, currentUser } = useApp();

  return (
    <div className="about-wrapper" id="about-view-root">
      <div className="about-container">
        <div className="about-hero">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Tag size={14} />
            <span>About OfferMe</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Empowering Local Neighborhood Commerce
          </h1>
          <p className="text-base text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            OfferMe bridges the gap between passionate local shopkeepers and discerning neighborhood shoppers by offering transparent, verified discounts, interactive Google Map discovery, and effortless coupon redemptions.
          </p>
        </div>

        {/* Story Section */}
        <div className="about-card mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Small and medium-sized businesses form the heartbeat of every vibrant neighborhood. However, competing against global retail conglomerates is challenging. OfferMe provides independent merchants with modern digital storefronts, Google Maps geolocation, and verified voucher systems to attract loyal walk-in customers.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            For consumers, we eliminate the clutter of fake online deals and expiring group coupons. Every single offer on OfferMe is direct from the verified merchant, easily redeemable at the counter, and mapped right around your corner.
          </p>
        </div>

        {/* Core Values */}
        <div className="about-values-grid">
          <div className="about-card">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">100% Verified Deals</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every promotion is reviewed and authorized by our team to guarantee authentic discounts and working coupon codes.
            </p>
          </div>

          <div className="about-card">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <MapPin size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Hyperlocal Discovery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find deals within walking distance with integrated Google Maps positioning and real-time navigation.
            </p>
          </div>

          <div className="about-card">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Store size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Merchant Success</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Business owners get transparent foot traffic analytics, customer review management, and full control over discounts.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            onClick={() => setCurrentView('offers')}
          >
            <span>Start Exploring Offers</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
