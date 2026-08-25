import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  Layers, 
  LocateFixed, 
  Sparkles, 
  ArrowRight,
  Utensils,
  ShoppingBag,
  Sparkles as SpaIcon,
  Smartphone,
  Dumbbell
} from 'lucide-react';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedLocation, 
    setSelectedLocation,
    categories,
    requestUserLocation,
    currentView,
    setCurrentView
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('offers');
  };

  const popularTags = [
    { name: 'All', icon: null },
    { name: 'Food & Dining', icon: Utensils },
    { name: 'Spa & Salon', icon: SpaIcon },
    { name: 'Electronics & Tech', icon: Smartphone },
    { name: 'Health & Fitness', icon: Dumbbell },
    { name: 'Fashion & Apparel', icon: ShoppingBag }
  ];

  return (
    <section className="hero-wrapper" id="home-hero-section">
      <div className="hero-container">
        {/* Main Vibrant Hero Banner Card */}
        <div className="hero-banner-card">
          {/* Ambient Glow Orbs from Vibrant Palette design */}
          <div className="hero-glow-orb-1"></div>
          <div className="hero-glow-orb-2"></div>

          <div className="relative z-10 w-full">
            {/* Top announcement tag */}
            <div className="hero-tag-badge">
              <Sparkles size={14} />
              <span>Skanvi-Inspired Local Deals & Business Discovery</span>
            </div>

            {/* Hero Title */}
            <h1 className="hero-title">
              Discover Exclusive <span className="highlight">Local Offers</span> & Support Neighborhood Shops
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Explore up to 60% OFF food, salons, gyms, tech, and retail in your city. Claim verified coupon vouchers or list your shop today.
            </p>

            {/* Multi-Filter Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hero-search-box" id="hero-search-form">
              {/* Keyword Search */}
              <div className="search-field">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  id="hero-keyword-input"
                  type="text"
                  className="search-input"
                  placeholder="Search shops, food, salon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Location Filter */}
              <div className="search-field">
                <MapPin size={18} className="text-orange-500 flex-shrink-0" />
                <input
                  id="hero-location-input"
                  type="text"
                  className="search-input"
                  placeholder="City or Neighborhood..."
                  value={selectedLocation === 'All Locations' ? '' : selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value || 'All Locations')}
                />
                <button
                  id="hero-auto-locate-btn"
                  type="button"
                  className="location-auto-btn"
                  onClick={requestUserLocation}
                  title="Detect my GPS location"
                >
                  <LocateFixed size={18} />
                </button>
              </div>

              {/* Category Dropdown */}
              <div className="search-field">
                <Layers size={18} className="text-slate-400 flex-shrink-0" />
                <select
                  id="hero-category-select"
                  className="search-input bg-transparent cursor-pointer font-medium"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search CTA */}
              <button id="hero-search-button" type="submit" className="hero-search-submit">
                <span>Find Deals</span>
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Quick Category Filter Pills */}
            <div className="hero-quick-categories">
              {popularTags.map((tag) => {
                const Icon = tag.icon;
                const isActive = selectedCategory === tag.name;
                return (
                  <button
                    key={tag.name}
                    id={`hero-pill-${tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    className={`category-pill-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(tag.name);
                      if (currentView !== 'offers' && currentView !== 'home') {
                        setCurrentView('offers');
                      }
                    }}
                  >
                    {Icon && <Icon size={14} className={isActive ? 'text-white' : 'text-orange-500'} />}
                    <span>{tag.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
