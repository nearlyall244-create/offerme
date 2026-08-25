import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Settings, 
  Heart, 
  Store, 
  ShieldCheck, 
  MessageSquare, 
  LogOut, 
  MapPin,
  Sparkles
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab = 'profile', onSelectTab }) => {
  const { 
    currentUser, 
    setCurrentView, 
    setIsAuthModalOpen, 
    setAuthModalMode, 
    logout 
  } = useApp();

  if (!currentUser) {
    return (
      <aside className="sidebar-nav-container" id="guest-sidebar">
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <User size={24} />
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">Welcome to OfferMe</h3>
          <p className="text-xs text-slate-500 mb-4 px-2">
            Sign in to unlock your favorites, track redeemed offers, and list your business.
          </p>
          <button
            id="sidebar-signin-btn"
            className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            onClick={() => {
              setAuthModalMode('login');
              setIsAuthModalOpen(true);
            }}
          >
            Sign In / Register
          </button>
        </div>
      </aside>
    );
  }

  const savedOffersCount = currentUser.savedOfferIds?.length || 0;

  const handleTabClick = (tabKey: string) => {
    if (onSelectTab) {
      onSelectTab(tabKey);
    }
  };

  return (
    <aside className="sidebar-nav-container" id="user-sidebar-navigation">
      {/* Profile summary header */}
      <div className="sidebar-profile-card">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="sidebar-user-avatar"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="sidebar-user-avatar flex items-center justify-center bg-rose-100 text-rose-700 font-bold text-base">
            {currentUser.username.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="sidebar-user-info">
          <div className="sidebar-username">{currentUser.username}</div>
          <div className="sidebar-useremail">{currentUser.email}</div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
            <MapPin size={11} className="text-rose-500" />
            <span className="truncate">{currentUser.location || 'San Francisco'}</span>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="sidebar-menu-list">
        <button
          id="sidebar-tab-profile"
          className={`sidebar-menu-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabClick('profile')}
        >
          <span className="sidebar-btn-content">
            <User size={17} />
            <span>My Profile</span>
          </span>
        </button>

        <button
          id="sidebar-tab-favorites"
          className={`sidebar-menu-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => handleTabClick('favorites')}
        >
          <span className="sidebar-btn-content">
            <Heart size={17} />
            <span>Saved Offers</span>
          </span>
          {savedOffersCount > 0 && (
            <span className="sidebar-count-badge">{savedOffersCount}</span>
          )}
        </button>

        <button
          id="sidebar-tab-reviews"
          className={`sidebar-menu-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => handleTabClick('reviews')}
        >
          <span className="sidebar-btn-content">
            <MessageSquare size={17} />
            <span>My Reviews</span>
          </span>
        </button>

        {currentUser.role === 'business_owner' && (
          <button
            id="sidebar-tab-owner"
            className={`sidebar-menu-btn text-emerald-700 hover:bg-emerald-50 ${activeTab === 'owner' ? 'bg-emerald-100 font-semibold' : ''}`}
            onClick={() => setCurrentView('owner-dashboard')}
          >
            <span className="sidebar-btn-content">
              <Store size={17} className="text-emerald-600" />
              <span>Merchant Dashboard</span>
            </span>
            <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-bold">PRO</span>
          </button>
        )}

        {currentUser.role === 'admin' && (
          <button
            id="sidebar-tab-admin"
            className={`sidebar-menu-btn text-purple-700 hover:bg-purple-50 ${activeTab === 'admin' ? 'bg-purple-100 font-semibold' : ''}`}
            onClick={() => setCurrentView('admin-dashboard')}
          >
            <span className="sidebar-btn-content">
              <ShieldCheck size={17} className="text-purple-600" />
              <span>Admin Portal</span>
            </span>
            <span className="text-[10px] bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
          </button>
        )}

        <button
          id="sidebar-tab-settings"
          className={`sidebar-menu-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          <span className="sidebar-btn-content">
            <Settings size={17} />
            <span>Account Settings</span>
          </span>
        </button>

        <div className="border-t border-slate-100 my-1 pt-1">
          <button
            id="sidebar-logout-btn"
            className="sidebar-menu-btn text-rose-600 hover:bg-rose-50"
            onClick={logout}
          >
            <span className="sidebar-btn-content">
              <LogOut size={17} />
              <span>Logout</span>
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
