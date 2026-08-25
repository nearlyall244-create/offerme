import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Offer, OfferStatus } from '../../types';
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  PlusCircle, 
  Eye, 
  Users, 
  Heart, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  ExternalLink, 
  Star,
  Tag,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import './OwnerDashboard.css';

export const OwnerDashboard: React.FC = () => {
  const { 
    currentUser, 
    offers, 
    setIsSellBusinessModalOpen, 
    setSelectedOffer, 
    deleteOffer, 
    addToast 
  } = useApp();

  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentUser?.bio || 'Verified merchant providing quality local goods and services.');

  if (!currentUser) {
    return null;
  }

  // Filter offers belonging to current owner or match owner email
  const myOffers = offers.filter(
    (o) => o.ownerId === currentUser.id || o.ownerEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  // Compute metrics
  const totalViews = myOffers.reduce((acc, o) => acc + o.views, 0);
  const totalVisits = myOffers.reduce((acc, o) => acc + o.visits, 0);
  const totalLikes = myOffers.reduce((acc, o) => acc + o.likes, 0);
  const totalComments = myOffers.reduce((acc, o) => acc + (o.comments?.length || 0), 0);

  const filteredOffers = myOffers.filter((o) => {
    if (selectedStatusTab === 'all') return true;
    return o.status === selectedStatusTab;
  });

  const pendingCount = myOffers.filter((o) => o.status === 'pending').length;
  const approvedCount = myOffers.filter((o) => o.status === 'approved').length;
  const rejectedCount = myOffers.filter((o) => o.status === 'rejected').length;

  return (
    <div className="owner-dash-wrapper" id="owner-dashboard-view">
      <div className="owner-dash-container">
        {/* Profile & Business Banner */}
        <div className="owner-profile-banner">
          <div className="flex items-start gap-4">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="owner-avatar-lg"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="owner-avatar-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">
                  {currentUser.username}
                </h1>
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Store size={12} />
                  <span>Business Owner</span>
                </span>
              </div>
              <p className="text-xs font-semibold text-orange-600 mt-0.5">
                {currentUser.shopName || `${currentUser.username}'s Storefront`} &bull; {currentUser.shopCategory || 'Local Retail & Services'}
              </p>

              {/* Bio & Description */}
              {isEditingBio ? (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-orange-500 w-full max-w-md"
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                  />
                  <button
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold"
                    onClick={() => {
                      setIsEditingBio(false);
                      addToast({ type: 'success', title: 'Bio Updated', message: 'Your merchant profile bio has been updated.' });
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-600 mt-1 max-w-xl cursor-pointer hover:text-slate-900" onClick={() => setIsEditingBio(true)}>
                  {bioText} <span className="text-[10px] text-orange-600 underline font-semibold">(Edit bio)</span>
                </p>
              )}

              {/* Contact meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-orange-500" />
                  {currentUser.shopAddress || currentUser.location || 'San Francisco, CA'}
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={13} className="text-indigo-500" />
                  {currentUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={13} className="text-teal-600" />
                  {currentUser.phone}
                </span>
              </div>
            </div>
          </div>

          <button
            id="owner-dash-post-offer-btn"
            className="px-5 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-center"
            onClick={() => setIsSellBusinessModalOpen(true)}
          >
            <PlusCircle size={17} />
            <span>Post New Deal / Offer</span>
          </button>
        </div>

        {/* Analytics Highlights (Visits, Views, Likes, Comments) */}
        <div className="owner-stats-grid">
          <div className="owner-stat-card">
            <div className="owner-stat-icon bg-emerald-50 text-emerald-600">
              <Users size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{totalVisits}</div>
              <div className="text-xs font-semibold text-slate-500">Customer Visits & Redemptions</div>
            </div>
          </div>

          <div className="owner-stat-card">
            <div className="owner-stat-icon bg-blue-50 text-blue-600">
              <Eye size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{totalViews}</div>
              <div className="text-xs font-semibold text-slate-500">Total Card Views</div>
            </div>
          </div>

          <div className="owner-stat-card">
            <div className="owner-stat-icon bg-rose-50 text-rose-600">
              <Heart size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{totalLikes}</div>
              <div className="text-xs font-semibold text-slate-500">Shopper Likes & Saves</div>
            </div>
          </div>

          <div className="owner-stat-card">
            <div className="owner-stat-icon bg-purple-50 text-purple-600">
              <MessageSquare size={22} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{totalComments}</div>
              <div className="text-xs font-semibold text-slate-500">Reviews & Comments</div>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs (All, Approved, Pending, Rejected) */}
        <div className="owner-tabs-nav">
          <button
            id="owner-tab-all"
            className={`owner-tab-btn ${selectedStatusTab === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStatusTab('all')}
          >
            <span>All Listings ({myOffers.length})</span>
          </button>
          <button
            id="owner-tab-approved"
            className={`owner-tab-btn ${selectedStatusTab === 'approved' ? 'active' : ''}`}
            onClick={() => setSelectedStatusTab('approved')}
          >
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Approved & Live ({approvedCount})</span>
          </button>
          <button
            id="owner-tab-pending"
            className={`owner-tab-btn ${selectedStatusTab === 'pending' ? 'active' : ''}`}
            onClick={() => setSelectedStatusTab('pending')}
          >
            <Clock size={16} className="text-amber-500" />
            <span>Pending Review ({pendingCount})</span>
          </button>
          <button
            id="owner-tab-rejected"
            className={`owner-tab-btn ${selectedStatusTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setSelectedStatusTab('rejected')}
          >
            <AlertCircle size={16} className="text-rose-500" />
            <span>Needs Changes / Rejected ({rejectedCount})</span>
          </button>
        </div>

        {/* Offers Table / Cards List */}
        <div className="owner-offers-table-card">
          {filteredOffers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Deal / Shop</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Discount & Code</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Visits</th>
                    <th className="py-3.5 px-4">Views</th>
                    <th className="py-3.5 px-4">Likes</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Deal & Image */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={offer.imageUrl}
                            alt={offer.title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 max-w-xs">
                            <div className="font-bold text-slate-900 line-clamp-1">{offer.title}</div>
                            <div className="text-[11px] text-slate-500 truncate">{offer.shopName} &bull; {offer.shopAddress}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 font-medium text-slate-600">
                        {offer.category}
                      </td>

                      {/* Discount & Code */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-rose-600">{offer.discountPercent}% OFF</span>
                        <div className="font-mono text-[11px] text-slate-500 font-semibold">{offer.couponCode}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`status-pill ${offer.status}`}>
                          {offer.status}
                        </span>
                        {offer.status === 'rejected' && offer.rejectionReason && (
                          <div className="text-[10px] text-rose-700 mt-1 max-w-[180px]">
                            {offer.rejectionReason}
                          </div>
                        )}
                      </td>

                      {/* Visits */}
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {offer.visits}
                      </td>

                      {/* Views */}
                      <td className="py-3 px-4 text-slate-600">
                        {offer.views}
                      </td>

                      {/* Likes */}
                      <td className="py-3 px-4 text-slate-600">
                        {offer.likes}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            id={`owner-preview-btn-${offer.id}`}
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                            title="Preview Deal Card"
                            onClick={() => setSelectedOffer(offer)}
                          >
                            <ExternalLink size={15} />
                          </button>
                          <button
                            id={`owner-delete-btn-${offer.id}`}
                            className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
                            title="Delete Offer"
                            onClick={() => deleteOffer(offer.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <Store size={36} className="text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800 mb-1">No listings found in this tab</h3>
              <p className="text-xs text-slate-500 mb-4">
                Publish a new shop deal with coupon codes and Google Map location to start attracting local visitors.
              </p>
              <button
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                onClick={() => setIsSellBusinessModalOpen(true)}
              >
                <PlusCircle size={14} />
                <span>Post Your First Deal</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
