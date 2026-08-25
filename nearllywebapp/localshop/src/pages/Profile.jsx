import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { User, MapPin, Phone, Mail, Heart, Shield, LogOut, Check } from "lucide-react";
import ShopGrid from "../components/shop/ShopGrid";
import { shops } from "../data/shops";
import { getFavoritesFromStorage } from "../utils/helpers";
import Button from "../components/common/Button";

export const Profile = () => {
  const { user, location, updateLocation, logout } = useAuth();
  const [favoriteShopsList, setFavoriteShopsList] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [profileData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+91 98401 23456",
    area: user?.area || location
  });

  useEffect(() => {
    const favIds = getFavoritesFromStorage();
    const favs = shops.filter(s => favIds.includes(s.id));
    setFavoriteShopsList(favs);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateLocation(profileData.area);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Profile Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`}
              alt={user?.name}
              className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 shadow-md"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60 mb-1">
                <Shield className="w-3 h-3 text-emerald-600" />
                Verified Resident
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">{user?.name}</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Resident of {location}, Chennai
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={logout} icon={LogOut}>
            Logout Account
          </Button>
        </div>

        {/* Profile Settings & Saved Favorites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Edit Form (1 col) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              Account Settings
            </h3>

            {savedSuccess && (
              <div className="p-3 bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>Profile preferences updated!</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Primary Area</label>
                <select
                  value={profileData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                >
                  <option value="Kattupakkam">Kattupakkam</option>
                  <option value="Iyyappanthangal">Iyyappanthangal</option>
                </select>
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full">
                Save Preferences
              </Button>
            </form>
          </div>

          {/* Saved Favorites (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-xl font-bold text-slate-900">
                Your Saved Favorite Shops ({favoriteShopsList.length})
              </h2>
            </div>

            <ShopGrid shops={favoriteShopsList} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
