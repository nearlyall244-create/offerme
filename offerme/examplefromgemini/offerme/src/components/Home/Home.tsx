import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from '../HeroSection/HeroSection';
import { OfferCard } from '../OfferCard/OfferCard';
import { GoogleMapViewer } from '../GoogleMapViewer/GoogleMapViewer';
import { 
  Utensils, 
  ShoppingBag, 
  Sparkles, 
  Smartphone, 
  Dumbbell, 
  Apple, 
  Home as HomeIcon, 
  Car, 
  ArrowRight, 
  Tag, 
  Navigation, 
  Store, 
  CheckCircle, 
  TrendingUp, 
  Percent,
  Search,
  Compass,
  PlusCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import './Home.css';

const ICON_MAP: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  Utensils,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Dumbbell,
  Apple,
  Home: HomeIcon,
  Car
};

export const Home: React.FC = () => {
  const { 
    categories, 
    offers, 
    setSelectedCategory, 
    setCurrentView, 
    setIsSellBusinessModalOpen, 
    currentUser, 
    setIsAuthModalOpen, 
    setAuthModalMode 
  } = useApp();

  const [activeOfferTab, setActiveOfferTab] = useState<'trending' | 'highest' | 'recent'>('trending');

  // Approved offers for public home view
  const approvedOffers = offers.filter((o) => o.status === 'approved');

  // Filter based on active tab
  const displayedOffers = [...approvedOffers].sort((a, b) => {
    if (activeOfferTab === 'trending') return b.views + b.visits * 2 - (a.views + a.visits * 2);
    if (activeOfferTab === 'highest') return b.discountPercent - a.discountPercent;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 8); // Top 8 deals for home grid

  const handleSellClick = () => {
    if (!currentUser) {
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
    } else {
      setIsSellBusinessModalOpen(true);
    }
  };

  return (
    <div className="home-container" id="home-view-root">
      {/* 1. Skanvi Hero Section */}
      <HeroSection />

      {/* 2. Top Categories Grid */}
      <section className="home-section" id="home-categories-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Explore deals and verified merchants across all popular local industries
            </p>
          </div>
          <button
            id="home-view-all-cats-btn"
            className="section-action-btn"
            onClick={() => setCurrentView('categories')}
          >
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Tag;
            return (
              <div
                key={cat.id}
                id={`cat-card-${cat.slug}`}
                className="category-card-mini"
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setCurrentView('offers');
                }}
              >
                <div
                  className="category-icon-box"
                  style={{
                    backgroundColor: `${cat.color}15`,
                    color: cat.color
                  }}
                >
                  <IconComponent size={22} />
                </div>
                <div>
                  <div className="category-name-text">{cat.name}</div>
                  <div className="category-count-text">{cat.count}+ Deals</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured & Middle Section Sample Cards (4-8 grid) */}
      <section className="home-section bg-slate-50 border-y border-slate-100" id="home-featured-offers-section">
        <div className="section-header-row">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <TrendingUp size={15} />
              <span>Hot Neighborhood Deals</span>
            </div>
            <h2 className="section-title">Trending Offers Near You</h2>
            <p className="section-subtitle">
              Top-rated vouchers and flash sales currently active at local businesses
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              id="tab-trending-deals"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeOfferTab === 'trending' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveOfferTab('trending')}
            >
              Most Popular
            </button>
            <button
              id="tab-highest-discount"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeOfferTab === 'highest' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveOfferTab('highest')}
            >
              50%+ OFF
            </button>
            <button
              id="tab-recent-deals"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeOfferTab === 'recent' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveOfferTab('recent')}
            >
              Newly Listed
            </button>
          </div>
        </div>

        {/* Offer Cards Grid */}
        <div className="offers-grid-container" id="home-sample-cards-grid">
          {displayedOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            id="home-view-all-offers-btn"
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 shadow-sm inline-flex items-center gap-2 transition-all hover:shadow"
            onClick={() => setCurrentView('offers')}
          >
            <span>Explore All {offers.length} Local Offers</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 4. Live Google Maps Discovery Banner */}
      <section className="home-section" id="home-map-preview-section">
        <div className="map-banner-card">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Compass size={14} />
              <span>Google Maps Integration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Explore Shops on an Interactive Live Map
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Pinpoint neighborhood stores, check walking distance, and tap on custom pins to discover instant coupon vouchers near your live location.
            </p>
            <button
              id="home-open-map-view-btn"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2"
              onClick={() => setCurrentView('map-view')}
            >
              <Navigation size={16} />
              <span>Open Fullscreen Map View</span>
            </button>
          </div>

          <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
            <GoogleMapViewer compact offers={approvedOffers.slice(0, 4)} />
          </div>
        </div>
      </section>

      {/* 5. How It Works (Shoppers & Merchants) */}
      <section className="home-section bg-white" id="home-how-it-works-section">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
            <Award size={15} />
            <span>Simple & Rewarding</span>
          </div>
          <h2 className="section-title">How OfferMe Works</h2>
          <p className="section-subtitle">
            Connecting eager bargain seekers with passionate local shopkeepers in 3 simple steps
          </p>
        </div>

        <div className="how-it-works-grid">
          <div className="step-card">
            <div className="step-number-badge">1</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Search & Filter Nearby
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use GPS auto-detect or keyword search to uncover verified discounts in dining, wellness, fashion, and tech.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number-badge">2</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Claim Free Voucher Code
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Copy the exclusive promo code or save it to your profile favorites. No upfront booking fees or subscriptions.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number-badge">3</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Visit & Redeem In-Store
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Present the coupon code at the counter, enjoy your discount, and leave a review to support the shop!
            </p>
          </div>
        </div>
      </section>

      {/* 6. Sell Your Business CTA Card */}
      <section className="home-section pt-0 pb-16" id="home-merchant-cta-section">
        <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Store size={14} />
              <span>For Store Owners & Service Providers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Grow Your Foot Traffic With OfferMe
            </h2>
            <p className="text-sm text-rose-100 leading-relaxed">
              Publish customized offers, set up your shop on Google Maps, track visitor impressions, and reach thousands of neighborhood customers in minutes.
            </p>
          </div>
          <button
            id="home-cta-sell-business-btn"
            className="px-6 py-3.5 bg-white hover:bg-slate-100 text-rose-700 font-extrabold text-sm rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
            onClick={handleSellClick}
          >
            <PlusCircle size={18} />
            <span>List Your Shop Offer</span>
          </button>
        </div>
      </section>
    </div>
  );
};
