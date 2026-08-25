import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Offer, OfferStatus } from '../../types';
import { 
  ShieldCheck, 
  Store, 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Eye, 
  Heart, 
  Star, 
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Tag
} from 'lucide-react';
import './AdminDashboard.css';

export const AdminDashboard: React.FC = () => {
  const { 
    offers, 
    updateOfferStatus, 
    deleteOffer, 
    setSelectedOffer, 
    getCategoryStats, 
    getTopBusinessOwners,
    addToast 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'submissions' | 'visitor-analytics'>('submissions');
  const [rejectModalOffer, setRejectModalOffer] = useState<Offer | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Please ensure all storefront photos and coupon discount guidelines are met.');

  const categoryStats = getCategoryStats();
  const topOwners = getTopBusinessOwners();

  // Stats summary
  const totalOffers = offers.length;
  const pendingCount = offers.filter((o) => o.status === 'pending').length;
  const approvedCount = offers.filter((o) => o.status === 'approved').length;
  const totalVisitsCount = offers.reduce((acc, o) => acc + o.visits, 0);

  const handleApprove = (offer: Offer) => {
    updateOfferStatus(offer.id, 'approved');
    addToast({
      type: 'success',
      title: 'Listing Approved & Published!',
      message: `"${offer.title}" by ${offer.shopName} is now live in the ${offer.category} section.`
    });
  };

  const handleRejectConfirm = () => {
    if (!rejectModalOffer) return;
    updateOfferStatus(rejectModalOffer.id, 'rejected', rejectionReason);
    setRejectModalOffer(null);
  };

  return (
    <div className="admin-dash-wrapper" id="admin-dashboard-root">
      <div className="admin-dash-container">
        {/* Admin Header */}
        <div className="admin-header-card">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <ShieldCheck size={14} />
              <span>Platform Administration & Compliance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Admin Moderation & Visitor Intelligence
            </h1>
            <p className="text-sm text-indigo-200 mt-1 max-w-xl">
              Review merchant listings, authorize category placement, and inspect shopper visit trends across local business shops.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
            <div className="text-center px-3 border-r border-white/20">
              <div className="text-xl font-black">{pendingCount}</div>
              <div className="text-[11px] text-indigo-200 uppercase font-semibold">Pending Review</div>
            </div>
            <div className="text-center px-3 border-r border-white/20">
              <div className="text-xl font-black">{approvedCount}</div>
              <div className="text-[11px] text-indigo-200 uppercase font-semibold">Live Offers</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-black">{totalVisitsCount}</div>
              <div className="text-[11px] text-indigo-200 uppercase font-semibold">Total Visits</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="admin-nav-tabs">
          <button
            id="admin-tab-submissions"
            className={`admin-tab-btn ${activeAdminTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('submissions')}
          >
            <Store size={17} />
            <span>Business Owner Submissions ({offers.length})</span>
            {pendingCount > 0 && (
              <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            id="admin-tab-analytics"
            className={`admin-tab-btn ${activeAdminTab === 'visitor-analytics' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('visitor-analytics')}
          >
            <BarChart3 size={17} />
            <span>Users Review & Visitor Counts by Category</span>
          </button>
        </div>

        {/* TAB 1: BUSINESS OWNER SUBMISSIONS TABLE */}
        {activeAdminTab === 'submissions' && (
          <div className="admin-table-wrapper" id="admin-submissions-table">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Business Owner Details & Offer Submissions
                </h3>
                <p className="text-xs text-slate-500">
                  Columns: Username, User Email, Phone Number, Categories, Shop Name, Shop Address, Offers, Image Preview, and Moderation Actions.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-3">Image</th>
                    <th className="py-3.5 px-3">Username & Contact</th>
                    <th className="py-3.5 px-3">Shop Name & Address</th>
                    <th className="py-3.5 px-3">Category</th>
                    <th className="py-3.5 px-3">Offer Title & Discount</th>
                    <th className="py-3.5 px-3">Status</th>
                    <th className="py-3.5 px-3 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {offers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-slate-50 transition-colors">
                      {/* Image preview */}
                      <td className="py-3 px-3">
                        <img
                          src={offer.imageUrl}
                          alt={offer.title}
                          className="w-14 h-14 rounded-lg object-cover border border-slate-200 cursor-pointer"
                          onClick={() => setSelectedOffer(offer)}
                          referrerPolicy="no-referrer"
                        />
                      </td>

                      {/* Username, Email, Phone */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{offer.ownerName}</div>
                        <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                          <Mail size={11} className="text-blue-500" />
                          <span>{offer.ownerEmail || offer.email}</span>
                        </div>
                        <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone size={11} className="text-emerald-500" />
                          <span>{offer.ownerPhone || offer.phone}</span>
                        </div>
                      </td>

                      {/* Shop Name & Shop Address */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800 flex items-center gap-1">
                          <Store size={13} className="text-emerald-600" />
                          <span>{offer.shopName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 max-w-[200px] truncate">
                          <MapPin size={11} className="text-rose-500 flex-shrink-0" />
                          <span>{offer.shopAddress}</span>
                        </div>
                      </td>

                      {/* Categories */}
                      <td className="py-3 px-3">
                        <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[11px]">
                          {offer.category}
                        </span>
                      </td>

                      {/* Offer details & discount */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 max-w-xs line-clamp-1">{offer.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-extrabold text-rose-600">{offer.discountPercent}% OFF</span>
                          <span className="font-mono text-slate-500 font-bold bg-slate-100 px-1 rounded">{offer.couponCode}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className={`status-pill ${offer.status}`}>
                          {offer.status}
                        </span>
                      </td>

                      {/* Action buttons (Approve, Reject, Delete) */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {offer.status !== 'approved' && (
                            <button
                              id={`admin-approve-btn-${offer.id}`}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                              title="Approve and make live in categories"
                              onClick={() => handleApprove(offer)}
                            >
                              <CheckCircle size={13} />
                              <span>Approve</span>
                            </button>
                          )}

                          {offer.status !== 'rejected' && (
                            <button
                              id={`admin-reject-btn-${offer.id}`}
                              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                              title="Reject listing with reason"
                              onClick={() => setRejectModalOffer(offer)}
                            >
                              <XCircle size={13} />
                              <span>Reject</span>
                            </button>
                          )}

                          <button
                            id={`admin-delete-btn-${offer.id}`}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete"
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
          </div>
        )}

        {/* TAB 2: VISITOR & CATEGORY ANALYTICS */}
        {activeAdminTab === 'visitor-analytics' && (
          <div className="admin-analytics-grid" id="admin-analytics-tab">
            {/* Category breakdown */}
            <div className="analytics-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Category Visitor Counts Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">
                    Total customer visits and impressions by category
                  </p>
                </div>
                <TrendingUp size={20} className="text-indigo-600" />
              </div>

              <div className="flex flex-col gap-3">
                {categoryStats.map((cat) => {
                  const maxVisits = Math.max(...categoryStats.map((c) => c.visits), 1);
                  const percentWidth = Math.min(100, Math.max(10, (cat.visits / maxVisits) * 100));

                  return (
                    <div key={cat.category} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Tag size={13} className="text-rose-500" />
                          {cat.category}
                        </span>
                        <span className="text-emerald-700 font-extrabold">{cat.visits} visits</span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentWidth}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{cat.count} Active Shops</span>
                        <span>{cat.views} Total Views &bull; {cat.likes} Likes</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Business Owners Shops by Visitor Count */}
            <div className="analytics-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Top Business Owners’ Shops by Visitors
                  </h3>
                  <p className="text-xs text-slate-500">
                    Which merchant shops attract the highest in-store traffic
                  </p>
                </div>
                <Users size={20} className="text-emerald-600" />
              </div>

              <div className="flex flex-col gap-3">
                {topOwners.map((owner, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{owner.shopName}</div>
                        <div className="text-[11px] text-slate-500">{owner.ownerName} &bull; {owner.email}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-extrabold text-sm text-emerald-700">
                        {owner.visits} visits
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {owner.views} views &bull; {owner.likes} likes
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal */}
        {rejectModalOffer && (
          <div className="details-modal-overlay">
            <div className="auth-modal-card p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-600" />
                  <span>Reject Listing Submission</span>
                </h3>
                <button onClick={() => setRejectModalOffer(null)} className="text-slate-400 hover:text-slate-600">
                  <XCircle size={18} />
                </button>
              </div>

              <p className="text-xs text-slate-600 mb-3">
                Provide feedback to <strong>{rejectModalOffer.ownerName}</strong> explaining why &quot;{rejectModalOffer.title}&quot; cannot be approved:
              </p>

              <textarea
                className="w-full p-3 border border-slate-300 rounded-xl text-xs outline-none focus:border-indigo-500 mb-4"
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  onClick={() => setRejectModalOffer(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
                  onClick={handleRejectConfirm}
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
