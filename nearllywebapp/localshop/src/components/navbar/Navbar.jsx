import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, PlusCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import useScroll from "../../hooks/useScroll";
import NavbarLogo from "./NavbarLogo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { popularLocations } from "../../data/locations";
import "./navbar.css";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { scrolled } = useScroll(20);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return localStorage.getItem("nearlyall_location") || popularLocations[0].name;
  });

  const navigate = useNavigate();

  const handleSelectLocation = (locationName) => {
    setSelectedLocation(locationName);
    localStorage.setItem("nearlyall_location", locationName);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="fixed z-50 top-0 left-0 right-0 transition-all duration-500">
      <nav
        className={`mx-auto transition-all duration-500 max-w-7xl px-4 sm:px-6 lg:px-8 ${scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/50"
          }`}
      >
        <div className="flex items-center justify-between h-19">
          {/* Logo */}
          <NavbarLogo scrolled={scrolled} onClick={() => setActiveMenu(null)} />

          {/* Desktop Navigation with Mega Menus */}
          <DesktopNavigation
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            selectedLocation={selectedLocation}
            setSelectedLocation={handleSelectLocation}
            scrolled={scrolled}
          />

          {/* Right Auth Buttons & Sell CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/sell"
              className="font-display inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-500 px-3.5 py-2 rounded-full transition-all shadow-xs hover:shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Sell Your Business</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="font-display flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors p-1"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                    alt={user?.name || "User"}
                    className="w-7 h-7 rounded-full bg-slate-100 object-cover border border-slate-200"
                  />
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-display text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-display text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="font-display text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full transition-all shadow-xs hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
