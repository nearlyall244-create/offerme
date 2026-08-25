import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Tag, 
  Store, 
  Heart, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  X, 
  PlusCircle, 
  LogIn, 
  UserPlus, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentView, 
    setCurrentView, 
    setIsAuthModalOpen, 
    setAuthModalMode, 
    setIsSellBusinessModalOpen, 
    logout, 
    switchRole,
    addToast
  } = useApp();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const savedCount = currentUser?.savedOfferIds?.length || 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSellBusinessClick = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      setAuthModalMode('login');
      addToast({
        type: 'info',
        title: 'Sign In to Post',
        message: 'Please sign in or register to list your business and offers.'
      });
      return;
    }
    setIsSellBusinessModalOpen(true);
  };

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'categories', label: 'Categories' },
    { key: 'offers', label: 'Offers' },
    { key: 'map-view', label: 'Map Explorer' },
    { key: 'contact', label: 'Contact' }
  ];

  return (
    <header className="navbar-wrapper" id="main-navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <button 
          id="nav-logo-btn" 
          className="brand-logo" 
          onClick={() => setCurrentView('home')}
        >
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-200">
            O!
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-rose-500 bg-clip-text text-transparent">
            offerme
          </span>
          <span className="logo-badge">Deals & Places</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="nav-links" id="desktop-nav-menu" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              id={`nav-link-${item.key}`}
              className={`nav-link-item ${currentView === item.key ? 'active' : ''}`}
              onClick={() => setCurrentView(item.key)}
            >
              {item.key === 'map-view' && <Compass size={15} />}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions (Sell your business, Wishlist, User/Auth) */}
        <div className="nav-actions">
          {/* Sell Your Business Button */}
          <button
            id="nav-sell-business-btn"
            className="sell-business-btn"
            onClick={handleSellBusinessClick}
            title={currentUser?.role === 'user' ? 'Upgrade or Post your shop offer' : 'Post your shop offer'}
          >
            <PlusCircle size={16} />
            <span>Sell Your Business</span>
          </button>

          {/* Favorites / Wishlist */}
          <button
            id="nav-wishlist-btn"
            className="wishlist-btn"
            onClick={() => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
                setAuthModalMode('login');
              } else {
                setCurrentView('profile');
              }
            }}
            title="Saved Offers"
          >
            <Heart size={18} />
            {savedCount > 0 && <span className="wishlist-badge">{savedCount}</span>}
          </button>

          {/* User Profile / Auth */}
          {currentUser ? (
            <div className="user-profile-menu" ref={dropdownRef}>
              <button
                id="nav-user-dropdown-btn"
                className="user-avatar-btn"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="user-avatar-img"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="user-avatar-img flex items-center justify-center bg-slate-200 text-slate-700 font-bold text-xs">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-800 hidden sm:inline max-w-[100px] truncate">
                  {currentUser.username}
                </span>
                <span className={`user-role-badge ${currentUser.role}`}>
                  {currentUser.role === 'business_owner' ? 'Merchant' : currentUser.role === 'admin' ? 'Admin' : 'Shopper'}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dropdown-menu" id="nav-user-dropdown-menu">
                  <div className="dropdown-header">
                    <p className="text-sm font-semibold text-slate-800 truncate">{currentUser.username}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`user-role-badge ${currentUser.role}`}>
                        {currentUser.role === 'business_owner' ? 'Business Owner' : currentUser.role === 'admin' ? 'Platform Admin' : 'Shopper'}
                      </span>
                    </div>
                  </div>

                  <button
                    id="dropdown-profile-btn"
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentView('profile');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <UserIcon size={16} />
                    <span>My Profile & Saved Offers</span>
                  </button>

                  {currentUser.role === 'business_owner' && (
                    <button
                      id="dropdown-merchant-dash-btn"
                      className="dropdown-item"
                      onClick={() => {
                        setCurrentView('owner-dashboard');
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Store size={16} className="text-emerald-600" />
                      <span className="font-medium text-emerald-700">Merchant Dashboard</span>
                    </button>
                  )}

                  {currentUser.role === 'admin' && (
                    <button
                      id="dropdown-admin-dash-btn"
                      className="dropdown-item"
                      onClick={() => {
                        setCurrentView('admin-dashboard');
                        setIsDropdownOpen(false);
                      }}
                    >
                      <ShieldCheck size={16} className="text-purple-600" />
                      <span className="font-medium text-purple-700">Admin Moderation & Stats</span>
                    </button>
                  )}

                  {/* Quick Role Switcher for Test Experience */}
                  <div className="quick-demo-switcher">
                    <div className="quick-demo-title flex items-center gap-1">
                      <SlidersHorizontal size={11} />
                      <span>Role Switcher (Demo)</span>
                    </div>
                    <button
                      className={`dropdown-item text-xs py-1.5 ${currentUser.role === 'user' ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
                      onClick={() => {
                        switchRole('user');
                        setIsDropdownOpen(false);
                      }}
                    >
                      <UserIcon size={14} />
                      <span>Shopper Mode</span>
                    </button>
                    <button
                      className={`dropdown-item text-xs py-1.5 ${currentUser.role === 'business_owner' ? 'bg-emerald-50 text-emerald-700 font-semibold' : ''}`}
                      onClick={() => {
                        switchRole('business_owner');
                        setCurrentView('owner-dashboard');
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Store size={14} />
                      <span>Business Owner Mode</span>
                    </button>
                    <button
                      className={`dropdown-item text-xs py-1.5 ${currentUser.role === 'admin' ? 'bg-purple-50 text-purple-700 font-semibold' : ''}`}
                      onClick={() => {
                        switchRole('admin');
                        setCurrentView('admin-dashboard');
                        setIsDropdownOpen(false);
                      }}
                    >
                      <ShieldCheck size={14} />
                      <span>Admin Mode</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      id="dropdown-logout-btn"
                      className="dropdown-item danger"
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-login-btn"
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-orange-500 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-orange-200 hover:bg-orange-50/50 transition-colors flex items-center gap-1.5"
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
              >
                <LogIn size={15} />
                <span>Login</span>
              </button>
              <button
                id="nav-register-btn"
                className="text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-orange-200 flex items-center gap-1.5"
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
              >
                <UserPlus size={15} />
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle-btn"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="brand-logo text-lg">
                <Tag size={18} className="text-rose-600" />
                <span>offer<span className="text-rose-600">me</span></span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.key ? 'bg-rose-50 text-rose-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    setCurrentView(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
              <button
                className="w-full py-2.5 px-4 bg-slate-900 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSellBusinessClick();
                }}
              >
                <PlusCircle size={16} />
                <span>Sell Your Business</span>
              </button>

              {currentUser && currentUser.role === 'business_owner' && (
                <button
                  className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border border-emerald-200"
                  onClick={() => {
                    setCurrentView('owner-dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Store size={16} />
                  <span>Merchant Dashboard</span>
                </button>
              )}

              {currentUser && currentUser.role === 'admin' && (
                <button
                  className="w-full py-2.5 px-4 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border border-purple-200"
                  onClick={() => {
                    setCurrentView('admin-dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Admin Dashboard</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
