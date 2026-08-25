import React from "react";
import { Link } from "react-router-dom";
import { Store, MapPin, Phone, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4 font-body">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-display text-2xl font-extrabold text-white tracking-tight">
                OFFER<span className="text-emerald-400">ME</span>
              </span>
            </Link>
            <p className="font-display text-sm font-semibold text-emerald-400 tracking-wide uppercase">
              "Everything Local. Everything Nearby."
            </p>
            <p className="font-body text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier hyperlocal shop discovery platform specifically designed for residents and business owners of **Kattupakkam** and **Iyyappanthangal**, Chennai. Giving every local business—from tea corners to supermarkets—a prominent digital presence.
            </p>

            <div className="font-body flex items-center gap-2 pt-2 text-xs text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Exclusively serving Kattupakkam (600056) & Iyyappanthangal (600056)</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="font-body space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home Discovery
                </Link>
              </li>
              <li>
                <Link to="/shops" className="hover:text-emerald-400 transition-colors">
                  Browse All Shops
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-emerald-400 transition-colors">
                  Shop Categories
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-emerald-400 transition-colors font-semibold text-emerald-400">
                  🎉 Events & Celebrations
                </Link>
              </li>
              <li>
                <Link to="/nearby" className="hover:text-emerald-400 transition-colors">
                  Nearby Finder
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-emerald-400 transition-colors">
                  Local Discount Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Popular Categories
            </h4>
            <ul className="font-body space-y-2.5 text-xs">
              <li>
                <Link to="/category/Grocery%20Stores" className="hover:text-emerald-400 transition-colors">
                  Grocery & Mini Markets
                </Link>
              </li>
              <li>
                <Link to="/category/Tea%20Shops" className="hover:text-emerald-400 transition-colors">
                  Tea & Refreshment Corners
                </Link>
              </li>
              <li>
                <Link to="/category/Mobile%20Repair" className="hover:text-emerald-400 transition-colors">
                  Mobile Repair & Spares
                </Link>
              </li>
              <li>
                <Link to="/category/Tailoring" className="hover:text-emerald-400 transition-colors">
                  Tailoring & Aari Work
                </Link>
              </li>
              <li>
                <Link to="/category/Local%20Street%20Shops" className="hover:text-emerald-400 transition-colors">
                  Mini & Street Shops
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Support & Info
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Why OfferMe?
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition-colors">
                  Merchant Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-emerald-400 transition-colors">
                  Register Your Shop
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} OfferMe. Hyperlocal Discovery Platform.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Kattupakkam & Iyyappanthangal residents.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
