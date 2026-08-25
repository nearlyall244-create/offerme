import React from 'react';
import { Offer } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Eye, 
  Users, 
  MessageSquare, 
  Star, 
  MapPin, 
  Tag, 
  Ticket, 
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import './OfferCard.css';

interface OfferCardProps {
  offer: Offer;
  onOpenDetails?: (offer: Offer) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onOpenDetails }) => {
  const { currentUser, toggleLikeOffer, setSelectedOffer, recordView } = useApp();

  const isLiked = currentUser ? offer.likedBy.includes(currentUser.id) : false;

  const handleCardClick = () => {
    recordView(offer.id);
    if (onOpenDetails) {
      onOpenDetails(offer);
    } else {
      setSelectedOffer(offer);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeOffer(offer.id);
  };

  // Determine vibrant tag color based on category
  const getCategoryThemeClass = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'food & dining':
      case 'coffee':
        return 'text-orange-600 bg-white/95';
      case 'health & fitness':
      case 'fitness':
        return 'text-teal-600 bg-white/95';
      case 'fashion & apparel':
      case 'retail':
        return 'text-indigo-600 bg-white/95';
      case 'spa & salon':
        return 'text-rose-600 bg-white/95';
      case 'electronics & tech':
        return 'text-blue-600 bg-white/95';
      default:
        return 'text-orange-600 bg-white/95';
    }
  };

  return (
    <div
      id={`offer-card-${offer.id}`}
      className="offer-card group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {/* Thumbnail Banner */}
      <div className="card-image-wrapper">
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className="card-image group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Category Pill - Top Left */}
        <div className={`card-category-tag ${getCategoryThemeClass(offer.category)}`}>
          {offer.category}
        </div>

        {/* Discount Badge - Top Right */}
        <div className="card-discount-badge">
          {offer.discountPercent}% OFF
        </div>

        {/* Like Button */}
        <button
          id={`offer-like-btn-${offer.id}`}
          className={`card-like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike offer' : 'Like offer'}
          title={isLiked ? 'Unlike' : 'Like offer'}
        >
          <Heart size={15} className={isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'} />
        </button>
      </div>

      {/* Card Body */}
      <div className="card-content">
        {/* Merchant Name & Star Rating */}
        <div className="card-shop-header">
          <div className="card-shop-name">
            <span className="truncate">{offer.shopName}</span>
            <CheckCircle size={13} className="text-teal-500 fill-teal-100 flex-shrink-0" />
          </div>
          <div className="card-rating-pill">
            <Star size={11} className="fill-amber-500 text-amber-500" />
            <span>{offer.rating}</span>
          </div>
        </div>

        {/* Deal Title */}
        <h3 className="card-title" title={offer.title}>
          {offer.title}
        </h3>

        {/* Location address */}
        <div className="card-address">
          <MapPin size={12} className="text-orange-500 flex-shrink-0" />
          <span className="truncate">{offer.shopAddress}</span>
        </div>

        {/* Pricing / Voucher Code */}
        <div className="card-pricing-row">
          {offer.offerPrice !== undefined ? (
            <>
              <span className="card-offer-price">${offer.offerPrice}</span>
              {offer.originalPrice && (
                <span className="card-original-price">${offer.originalPrice}</span>
              )}
            </>
          ) : (
            <div className="card-coupon-badge">
              <Ticket size={12} className="text-orange-600" />
              <span>{offer.couponCode}</span>
            </div>
          )}
        </div>

        {/* Footer Metrics Row: Views, Visits, Likes, Comments & Action */}
        <div className="card-metrics-row">
          <div className="card-metrics-group">
            {/* Likes count with heart */}
            <div className="metric-item text-rose-500 font-semibold" title={`${offer.likes} likes`}>
              <Heart size={13} className="fill-rose-500 text-rose-500" />
              <span>{offer.likes}</span>
            </div>

            {/* Comments count */}
            <div className="metric-item text-slate-400" title={`${offer.comments?.length || 0} reviews`}>
              <MessageSquare size={13} />
              <span>{offer.comments?.length || 0}</span>
            </div>

            {/* Visits / Redemptions count */}
            <div className="metric-item text-teal-600 font-medium" title={`${offer.visits} customer visits`}>
              <Users size={12} className="text-teal-500" />
              <span>{offer.visits} visits</span>
            </div>
          </div>

          {/* Action button */}
          <button
            id={`offer-view-deal-btn-${offer.id}`}
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <span>View</span>
            <ExternalLink size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
