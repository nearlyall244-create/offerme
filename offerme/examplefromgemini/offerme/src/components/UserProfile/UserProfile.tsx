import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfferCard } from '../OfferCard/OfferCard';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Heart, 
  Store, 
  ArrowRight, 
  Edit3, 
  Check, 
  PlusCircle,
  Tag
} from 'lucide-react';
import './UserProfile.css';

export const UserProfile: React.FC = () => {
  const { 
    currentUser, 
    offers, 
    switchRole, 
    setCurrentView, 
    setIsSellBusinessModalOpen, 
    addToast 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.username || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || 'San Francisco, CA');
  const [bio, setBio] = useState(currentUser?.bio || '');

  if (!currentUser) {
    return (
      <div className="profile-view-wrapper">
        <div className="profile-view-container text-center py-20 bg-white rounded-2xl border border-slate-200">
          <User size={48} className="text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800 mb-1">Please Sign In</h2>
          <p className="text-xs text-slate-500 mb-4">You need to be logged in to view your profile and saved vouchers.</p>
        </div>
      </div>
    );
  }

  // Saved offers
  const savedOffers = offers.filter((o) => currentUser.savedOfferIds?.includes(o.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    currentUser.username = name;
    currentUser.phone = phone;
    currentUser.location = location;
    currentUser.bio = bio;
    setIsEditing(false);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your personal account details have been saved.'
    });
  };

  return (
    <div className="profile-view-wrapper" id="profile-view-root">
      <div className="profile-view-container">
        {/* Profile Card */}
        <div className="profile-header-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="profile-avatar-box">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="profile-avatar-img"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-2xl">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-slate-900">{currentUser.username}</h1>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    currentUser.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : currentUser.role === 'business_owner'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {currentUser.role === 'admin' ? 'Administrator' : currentUser.role === 'business_owner' ? 'Business Owner' : 'Shopper'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 max-w-lg">
                  {currentUser.bio || 'Active local member exploring neighborhood shops and coupons.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-blue-500" />
                    {currentUser.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={13} className="text-emerald-500" />
                    {currentUser.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-rose-500" />
                    {currentUser.location || 'San Francisco, CA'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 self-stretch md:self-auto">
              <button
                id="edit-profile-btn"
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 size={14} />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              {currentUser.role === 'user' && (
                <button
                  id="upgrade-merchant-btn"
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  onClick={() => switchRole('business_owner')}
                >
                  <Store size={14} />
                  <span>Switch to Merchant Mode</span>
                </button>
              )}

              {currentUser.role === 'business_owner' && (
                <button
                  id="goto-merchant-dash-btn"
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  onClick={() => setCurrentView('owner-dashboard')}
                >
                  <Store size={14} />
                  <span>Merchant Portal</span>
                </button>
              )}
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Full Name</label>
                <input
                  type="text"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">City / Location</label>
                <input
                  type="text"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1 block">Bio / Notes</label>
                <input
                  type="text"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Check size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Saved Offers & Favorites Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Star size={18} className="text-amber-500 fill-amber-400" />
                <span>My Saved Wishlist & Vouchers ({savedOffers.length})</span>
              </h2>
              <p className="text-xs text-slate-500">Deals you bookmarked to redeem during your next shopping trip</p>
            </div>
            {savedOffers.length > 0 && (
              <button
                className="text-xs text-rose-600 hover:underline font-bold"
                onClick={() => setCurrentView('offers')}
              >
                Browse More Deals &rarr;
              </button>
            )}
          </div>

          {savedOffers.length > 0 ? (
            <div className="saved-offers-grid">
              {savedOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <Heart size={36} className="text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800 mb-1">No saved offers yet</h3>
              <p className="text-xs text-slate-500 mb-4">
                Click the star icon on any deal card to save it to your wishlist for instant redemption.
              </p>
              <button
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg shadow-sm"
                onClick={() => setCurrentView('offers')}
              >
                Explore Neighborhood Offers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
