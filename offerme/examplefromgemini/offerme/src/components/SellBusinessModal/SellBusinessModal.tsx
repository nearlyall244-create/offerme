import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LocationCoords } from '../../types';
import { GoogleMapViewer } from '../GoogleMapViewer/GoogleMapViewer';
import { 
  X, 
  Store, 
  Upload, 
  MapPin, 
  Tag, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  LocateFixed,
  Layers,
  Phone,
  Mail,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './SellBusinessModal.css';

const PRESET_SHOP_IMAGES = [
  { label: 'Restaurant & Dining', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80' },
  { label: 'Salon & Spa', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80' },
  { label: 'Electronics & Audio', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
  { label: 'Fitness & Gym', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80' },
  { label: 'Fashion Boutique', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80' },
  { label: 'Coffee & Cafe', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80' }
];

export const SellBusinessModal: React.FC = () => {
  const { 
    currentUser, 
    isSellBusinessModalOpen, 
    setIsSellBusinessModalOpen, 
    categories, 
    createOffer, 
    switchRole, 
    setCurrentView,
    addToast 
  } = useApp();

  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('Food & Dining');
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(30);
  const [originalPrice, setOriginalPrice] = useState<string>('50');
  const [offerPrice, setOfferPrice] = useState<string>('35');
  const [couponCode, setCouponCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [imageUrl, setImageUrl] = useState(PRESET_SHOP_IMAGES[0].url);
  const [terms, setTerms] = useState('Valid for all customers during regular operating hours.');
  const [coords, setCoords] = useState<LocationCoords>({
    lat: 37.7749,
    lng: -122.4194,
    city: 'San Francisco, CA'
  });
  const [showMapPicker, setShowMapPicker] = useState(false);

  // Sync with current user profile
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || '');
      setUserEmail(currentUser.email || '');
      setPhoneNumber(currentUser.phone || '');
      if (currentUser.shopName) setShopName(currentUser.shopName);
      if (currentUser.shopAddress) setShopAddress(currentUser.shopAddress);
      if (currentUser.shopCategory) setCategory(currentUser.shopCategory);
    }
  }, [currentUser]);

  if (!isSellBusinessModalOpen) return null;

  const isBusinessOwner = currentUser?.role === 'business_owner' || currentUser?.role === 'admin';

  const handleAutoGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            city: 'Detected GPS Location'
          });
          if (!shopAddress) {
            setShopAddress(`Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}, San Francisco`);
          }
          addToast({
            type: 'success',
            title: 'GPS Coordinates Captured',
            message: 'Your shop pin is positioned accurately on the map.'
          });
        },
        () => {
          addToast({ type: 'info', title: 'Location set', message: 'Defaulted to San Francisco center' });
        }
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isBusinessOwner) {
      addToast({
        type: 'warning',
        title: 'Business Owner Role Required',
        message: 'Please upgrade your account to Business Owner to publish deals.'
      });
      return;
    }

    if (!shopName || !offerTitle || !userEmail || !phoneNumber) {
      addToast({
        type: 'warning',
        title: 'Missing Required Fields',
        message: 'Please fill in shop name, offer title, contact email, and phone number.'
      });
      return;
    }

    const generatedCode = couponCode.trim() || `${shopName.slice(0, 4).toUpperCase()}${discountPercent}`;

    createOffer({
      title: offerTitle,
      description: offerDescription || `${discountPercent}% discount at ${shopName}`,
      category,
      shopName,
      shopAddress: shopAddress || 'San Francisco, CA',
      coordinates: coords,
      phone: phoneNumber,
      email: userEmail,
      discountPercent: Number(discountPercent),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      offerPrice: offerPrice ? Number(offerPrice) : undefined,
      couponCode: generatedCode,
      expiryDate,
      imageUrl,
      terms,
      ownerId: currentUser?.id || `user-owner-${Date.now()}`,
      ownerName: username || currentUser?.username || 'Merchant',
      ownerEmail: userEmail,
      ownerPhone: phoneNumber
    });

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }

    setIsSellBusinessModalOpen(false);
    setCurrentView('owner-dashboard');
  };

  return (
    <div className="sell-modal-overlay" onClick={() => setIsSellBusinessModalOpen(false)}>
      <div className="sell-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sell-modal-header">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Store size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Sell Your Business & Post Shop Offer
              </h2>
              <p className="text-xs text-slate-500">
                Reach thousands of local customers looking for deals in your category
              </p>
            </div>
          </div>
          <button
            id="sell-modal-close-btn"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            onClick={() => setIsSellBusinessModalOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="sell-modal-body">
          {/* If normal shopper, show upgrade banner */}
          {!isBusinessOwner && (
            <div className="upgrade-banner">
              <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-amber-900">Shopper Account Detected</h4>
                <p className="text-xs text-amber-800 mt-0.5 mb-2 leading-relaxed">
                  You are currently logged in as a standard shopper. To list your business and publish verified offers, you need a Business Owner account.
                </p>
                <button
                  type="button"
                  id="upgrade-to-owner-btn"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                  onClick={() => switchRole('business_owner')}
                >
                  <Sparkles size={13} />
                  <span>1-Click Switch to Business Owner Mode</span>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="sell-form-grid">
            {/* 1. Username */}
            <div className="form-group">
              <label className="form-label">Contact / Owner Name *</label>
              <div className="relative">
                <input
                  id="sell-username-input"
                  type="text"
                  className="form-input pl-9"
                  placeholder="Your Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <User size={16} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* 2. User Email */}
            <div className="form-group">
              <label className="form-label">Business / User Email *</label>
              <div className="relative">
                <input
                  id="sell-email-input"
                  type="email"
                  className="form-input pl-9"
                  placeholder="merchant@yourshop.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* 3. Phone Number */}
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <div className="relative">
                <input
                  id="sell-phone-input"
                  type="tel"
                  className="form-input pl-9"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* 4. Category */}
            <div className="form-group">
              <label className="form-label">Business Category *</label>
              <div className="relative">
                <select
                  id="sell-category-select"
                  className="form-input pl-9 bg-white cursor-pointer font-medium"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <Layers size={16} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* 5. Shop Name */}
            <div className="form-group col-span-full">
              <label className="form-label">Shop / Business Name *</label>
              <div className="relative">
                <input
                  id="sell-shopname-input"
                  type="text"
                  className="form-input pl-9 font-semibold text-slate-900"
                  placeholder="e.g. Trattoria Rossi & Gourmet Bakery"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  required
                />
                <Store size={16} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* 6. Shop Address & Google Map Current Location Picker */}
            <div className="form-group col-span-full">
              <div className="flex items-center justify-between mb-1">
                <label className="form-label mb-0">Shop Address / Location *</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="text-xs text-rose-600 hover:underline font-semibold flex items-center gap-1"
                    onClick={handleAutoGPS}
                  >
                    <LocateFixed size={13} />
                    <span>Detect GPS</span>
                  </button>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
                    onClick={() => setShowMapPicker(!showMapPicker)}
                  >
                    <MapPin size={13} />
                    <span>{showMapPicker ? 'Hide Map Pin' : 'Pin on Map'}</span>
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  id="sell-address-input"
                  type="text"
                  className="form-input pl-9"
                  placeholder="Type full physical street address (e.g. 428 Columbus Ave, San Francisco, CA)"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  required
                />
                <MapPin size={16} className="absolute left-3 top-3 text-rose-500" />
              </div>

              {/* Interactive Map Pin Drop */}
              {showMapPicker && (
                <div className="mt-2">
                  <GoogleMapViewer
                    compact
                    pickerMode
                    selectedCoords={coords}
                    onSelectCoords={(c) => {
                      setCoords(c);
                      setShopAddress(`Lat ${c.lat}, Lng ${c.lng}, San Francisco, CA`);
                    }}
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pinned Coordinates: Lat {coords.lat}, Lng {coords.lng}
                  </p>
                </div>
              )}
            </div>

            {/* 7. Offer Title */}
            <div className="form-group col-span-full">
              <label className="form-label">Deal / Offer Headline *</label>
              <div className="relative">
                <input
                  id="sell-offer-title-input"
                  type="text"
                  className="form-input pl-9"
                  placeholder="e.g. 50% OFF All Artisanal Pizzas & Fresh Pasta"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  required
                />
                <Tag size={16} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* 8. Discount & Pricing */}
            <div className="form-group">
              <label className="form-label">Discount Percentage (%) *</label>
              <input
                id="sell-discount-input"
                type="number"
                min={5}
                max={95}
                className="form-input font-bold text-rose-600"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Custom Coupon Code (Optional)</label>
              <input
                id="sell-coupon-input"
                type="text"
                className="form-input font-mono uppercase"
                placeholder="e.g. ROSSI50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Original Price ($)</label>
              <input
                id="sell-orig-price-input"
                type="number"
                className="form-input"
                placeholder="40"
                value={originalPrice}
                onChange={(e) => {
                  setOriginalPrice(e.target.value);
                  if (e.target.value && discountPercent) {
                    const discounted = Number(e.target.value) * (1 - discountPercent / 100);
                    setOfferPrice(discounted.toFixed(2));
                  }
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Offer / Deal Price ($)</label>
              <input
                id="sell-offer-price-input"
                type="number"
                className="form-input font-bold text-slate-900"
                placeholder="20"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </div>

            {/* Expiry Date */}
            <div className="form-group col-span-full">
              <label className="form-label">Deal Expiry Date</label>
              <div className="relative">
                <input
                  id="sell-expiry-input"
                  type="date"
                  className="form-input pl-9"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
                <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
              </div>
            </div>

            {/* Image Upload & Presets */}
            <div className="form-group col-span-full">
              <label className="form-label">Shop & Offer Image Upload *</label>
              
              <div className="image-preview-box">
                {imageUrl ? (
                  <img src={imageUrl} alt="Offer Preview" className="image-preview-img" referrerPolicy="no-referrer" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <Upload size={24} className="mb-1 text-slate-400" />
                    <span className="text-xs font-semibold">Click or drag photo here</span>
                  </div>
                )}
                <input
                  id="sell-image-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Quick Preset Images */}
              <div className="mt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Or pick a stock theme image:
                </span>
                <div className="preset-images-row">
                  {PRESET_SHOP_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`preset-thumb-btn ${imageUrl === preset.url ? 'selected' : ''}`}
                      onClick={() => setImageUrl(preset.url)}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="preset-thumb-img" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="form-group col-span-full">
              <label className="form-label">Redemption Terms & Conditions</label>
              <textarea
                id="sell-terms-input"
                rows={2}
                className="form-input text-xs"
                placeholder="e.g. Valid for dine-in only. Cannot be combined with other offers."
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
            </div>

            {/* Submit Action */}
            <div className="col-span-full mt-2">
              <button
                id="sell-form-submit-btn"
                type="submit"
                className="sell-submit-btn"
                disabled={!isBusinessOwner}
              >
                <CheckCircle size={18} />
                <span>Submit Business & Offer for Approval</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Upon submission, your listing will be routed to the Admin moderation queue and status set to <strong>Pending</strong>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
