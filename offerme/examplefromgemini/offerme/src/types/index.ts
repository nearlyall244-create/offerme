export type UserRole = 'user' | 'business_owner' | 'admin';

export type OfferStatus = 'pending' | 'approved' | 'rejected';

export interface LocationCoords {
  lat: number;
  lng: number;
  city?: string;
  address?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole?: UserRole;
  text: string;
  rating: number;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  shopName: string;
  shopAddress: string;
  coordinates: LocationCoords;
  phone: string;
  email: string;
  discountPercent: number;
  originalPrice?: number;
  offerPrice?: number;
  couponCode: string;
  expiryDate: string;
  imageUrl: string;
  additionalImages?: string[];
  terms?: string;
  status: OfferStatus;
  rejectionReason?: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  views: number;
  visits: number;
  likes: number;
  likedBy: string[]; // user IDs
  comments: Comment[];
  rating: number;
  totalReviews: number;
  createdAt: string;
  featured?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  shopName?: string;
  shopAddress?: string;
  shopCategory?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  savedOfferIds: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  color: string;
  count: number;
  image: string;
  description: string;
}

export interface VisitorStat {
  id: string;
  offerId: string;
  shopName: string;
  category: string;
  date: string;
  visitorCount: number;
  views: number;
  likes: number;
  location: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
