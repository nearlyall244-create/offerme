import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, MapPin, Mail, Phone, Heart, Send, Check } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast({
        type: 'warning',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.'
      });
      return;
    }
    setSubscribed(true);
    addToast({
      type: 'success',
      title: 'Subscribed to Flash Deals!',
      message: `We'll deliver top local discounts straight to ${newsletterEmail}`
    });
    setNewsletterEmail('');
  };

  return (
    <footer className="footer-wrapper" id="main-footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand story */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/20">
                O!
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                offerme
              </span>
            </div>
            <p className="footer-desc">
              Your premier hyper-local deals and business directory platform inspired by Skanvi. Discover unbeatable discounts, support local shop owners, and grow your foot traffic.
            </p>
            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-orange-500" />
                <span>San Francisco, CA & Global Hubs</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick navigation */}
          <div>
            <h4 className="footer-heading">Explore OfferMe</h4>
            <ul className="footer-links-list">
              <li>
                <button className="footer-link-item" onClick={() => setCurrentView('home')}>
                  Home Marketplace
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => setCurrentView('offers')}>
                  Hot Flash Offers
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => setCurrentView('categories')}>
                  All Categories
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => setCurrentView('map-view')}>
                  Interactive Live Map
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => setCurrentView('about')}>
                  About Platform
                </button>
              </li>
              <li>
                <button className="footer-link-item" onClick={() => setCurrentView('contact')}>
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="footer-heading">Top Categories</h4>
            <ul className="footer-links-list">
              {['Food & Dining', 'Spa & Salon', 'Electronics & Tech', 'Health & Fitness', 'Fashion & Apparel'].map((cat) => (
                <li key={cat}>
                  <button
                    className="footer-link-item"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentView('offers');
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="footer-heading">Stay in the Loop</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get notified immediately whenever local merchants in your neighborhood publish exclusive 50%+ OFF vouchers.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                id="newsletter-email-input"
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button id="newsletter-submit-btn" type="submit" className="newsletter-btn flex items-center gap-1">
                {subscribed ? <Check size={16} /> : <Send size={15} />}
                <span>{subscribed ? 'Subscribed' : 'Join'}</span>
              </button>
            </form>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Phone size={13} className="text-rose-500" /> +1 (800) OFFER-ME
              </span>
              <span className="flex items-center gap-1">
                <Mail size={13} className="text-rose-500" /> support@offerme.com
              </span>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-slate-300">offerme</strong> Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Built with precision for local businesses & shoppers</span>
            <Heart size={14} className="text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
