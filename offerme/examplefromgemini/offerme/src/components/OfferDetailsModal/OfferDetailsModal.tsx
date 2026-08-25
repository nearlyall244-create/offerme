import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GoogleMapViewer } from '../GoogleMapViewer/GoogleMapViewer';
import { 
  X, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Star, 
  Heart, 
  Users, 
  Eye, 
  Share2, 
  Copy, 
  Check, 
  Send, 
  Navigation, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './OfferDetailsModal.css';

export const OfferDetailsModal: React.FC = () => {
  const { 
    selectedOffer, 
    setSelectedOffer, 
    currentUser, 
    toggleLikeOffer, 
    toggleSaveOffer, 
    addComment, 
    recordVisit,
    addToast 
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [copied, setCopied] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [showDirectionsMap, setShowDirectionsMap] = useState(false);

  if (!selectedOffer) return null;

  const isLiked = currentUser ? selectedOffer.likedBy.includes(currentUser.id) : false;
  const isSaved = currentUser?.savedOfferIds?.includes(selectedOffer.id);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedOffer.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    addToast({
      type: 'success',
      title: 'Coupon Code Copied!',
      message: `Code ${selectedOffer.couponCode} copied to clipboard.`
    });
  };

  const handleClaimOffer = () => {
    setClaimed(true);
    recordVisit(selectedOffer.id);
    
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }

    addToast({
      type: 'success',
      title: 'Offer Voucher Claimed!',
      message: `Visit recorded for ${selectedOffer.shopName}. Present code ${selectedOffer.couponCode} at store counter!`
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(selectedOffer.id, commentText, rating);
    setCommentText('');
  };

  return (
    <div className="details-modal-overlay" onClick={() => setSelectedOffer(null)}>
      <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="details-modal-header">
          <div className="flex items-center gap-2">
            <span className="bg-rose-100 text-rose-700 font-extrabold text-xs px-2.5 py-1 rounded-lg">
              {selectedOffer.discountPercent}% DISCOUNT
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {selectedOffer.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Like button */}
            <button
              className={`p-2 rounded-full border transition-colors ${
                isLiked ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-200 text-slate-500 hover:text-rose-600'
              }`}
              onClick={() => toggleLikeOffer(selectedOffer.id)}
              title="Like deal"
            >
              <Heart size={18} className={isLiked ? 'fill-rose-600' : ''} />
            </button>

            {/* Save to wishlist button */}
            <button
              className={`p-2 rounded-full border transition-colors ${
                isSaved ? 'bg-amber-50 border-amber-200 text-amber-600 font-bold' : 'border-slate-200 text-slate-500 hover:text-amber-600'
              }`}
              onClick={() => toggleSaveOffer(selectedOffer.id)}
              title="Save to favorites"
            >
              <Star size={18} className={isSaved ? 'fill-amber-500 text-amber-500' : ''} />
            </button>

            {/* Close button */}
            <button
              id="details-modal-close-btn"
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              onClick={() => setSelectedOffer(null)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="details-modal-body">
          {/* Main Photo Banner */}
          <div className="details-hero-img-box">
            <img
              src={selectedOffer.imageUrl}
              alt={selectedOffer.title}
              className="details-hero-img"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Shop information & Title */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Store size={16} className="text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                {selectedOffer.shopName}
              </h3>
              <CheckCircle size={14} className="text-emerald-500 fill-emerald-100" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-2">
              {selectedOffer.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              {selectedOffer.description}
            </p>

            {/* Address & Contact Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-rose-500 flex-shrink-0" />
                <span className="truncate">{selectedOffer.shopAddress}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-blue-500 flex-shrink-0" />
                <span>{selectedOffer.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-purple-500 flex-shrink-0" />
                <span className="truncate">{selectedOffer.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-500 flex-shrink-0" />
                <span>Expires: {selectedOffer.expiryDate}</span>
              </div>
            </div>
          </div>

          {/* Claim Coupon Box */}
          <div className="coupon-claim-banner">
            <div>
              <div className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
                Official Voucher Code
              </div>
              <div className="coupon-code-pill">
                <span>{selectedOffer.couponCode}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>
              {selectedOffer.offerPrice && (
                <div className="text-xs text-rose-900 mt-1 font-semibold">
                  Pay ${selectedOffer.offerPrice} <span className="line-through text-rose-400">${selectedOffer.originalPrice}</span> ({selectedOffer.discountPercent}% SAVINGS)
                </div>
              )}
            </div>

            <button
              id="details-claim-voucher-btn"
              type="button"
              className="claim-action-btn"
              onClick={handleClaimOffer}
            >
              <Sparkles size={18} />
              <span>{claimed ? 'Voucher Claimed!' : 'Claim & Visit Store'}</span>
            </button>
          </div>

          {/* Interactive Google Map Route Section */}
          <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Navigation size={14} className="text-rose-500" />
                <span>Google Map Location & Route</span>
              </h4>
              <button
                type="button"
                className="text-xs font-bold text-rose-600 hover:underline"
                onClick={() => setShowDirectionsMap(!showDirectionsMap)}
              >
                {showDirectionsMap ? 'Collapse Map' : 'View On Google Map'}
              </button>
            </div>

            {showDirectionsMap && (
              <div className="mt-2 rounded-xl overflow-hidden">
                <GoogleMapViewer
                  compact
                  offers={[selectedOffer]}
                />
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          {selectedOffer.terms && (
            <div className="mt-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
              <strong className="text-slate-700">Terms & Conditions:</strong> {selectedOffer.terms}
            </div>
          )}

          {/* Reviews & Community Comments Section */}
          <div className="comments-section">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Customer Reviews ({selectedOffer.comments?.length || 0})
              </h3>
              <div className="flex items-center gap-1 text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                <Star size={15} className="fill-amber-500 text-amber-500" />
                <span>{selectedOffer.rating} / 5.0</span>
              </div>
            </div>

            {/* Write a review form */}
            <form onSubmit={handleAddComment} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-700">Your Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-slate-300 hover:text-amber-400 p-0.5"
                    >
                      <Star
                        size={18}
                        className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  id="offer-comment-input"
                  type="text"
                  className="flex-1 text-xs sm:text-sm px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                  placeholder={currentUser ? "Share your experience at this shop..." : "Sign in to leave a review..."}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={!currentUser}
                />
                <button
                  id="offer-comment-submit-btn"
                  type="submit"
                  disabled={!currentUser || !commentText.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-rose-600 disabled:bg-slate-300 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Send size={13} />
                  <span>Post</span>
                </button>
              </div>
            </form>

            {/* Reviews List */}
            {selectedOffer.comments?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {selectedOffer.comments.map((comm) => (
                  <div key={comm.id} className="comment-card">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-[10px]">
                          {comm.userName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold text-slate-800">{comm.userName}</span>
                        {comm.userRole === 'business_owner' && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded">Merchant</span>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: comm.rating }).map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 pl-8">{comm.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-slate-400">
                No reviews yet. Be the first to try this offer and share your review!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
