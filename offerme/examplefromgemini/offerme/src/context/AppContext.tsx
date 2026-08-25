import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { User, Offer, Category, UserRole, OfferStatus, Comment, ToastMessage, LocationCoords } from '../types';
import { INITIAL_USERS, INITIAL_OFFERS, INITIAL_CATEGORIES } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  offers: Offer[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  userCoords: LocationCoords | null;
  requestUserLocation: () => Promise<void>;
  
  // Navigation & Modals
  currentView: string;
  setCurrentView: (view: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  isSellBusinessModalOpen: boolean;
  setIsSellBusinessModalOpen: (open: boolean) => void;
  selectedOffer: Offer | null;
  setSelectedOffer: (offer: Offer | null) => void;
  
  // Auth operations
  login: (email: string, pass: string) => { success: boolean; message: string };
  registerUser: (userData: Omit<User, 'id' | 'createdAt' | 'savedOfferIds' | 'isEmailVerified' | 'isPhoneVerified'>) => { success: boolean; message: string; tempUser?: User };
  verifyOtp: (emailOtp: string, phoneOtp: string) => { success: boolean; message: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  quickLoginAs: (role: UserRole) => void;
  
  // Offer operations
  createOffer: (offerData: Omit<Offer, 'id' | 'createdAt' | 'views' | 'visits' | 'likes' | 'likedBy' | 'comments' | 'rating' | 'totalReviews' | 'status'>) => { success: boolean; message: string };
  updateOfferStatus: (offerId: string, status: OfferStatus, reason?: string) => void;
  deleteOffer: (offerId: string) => void;
  toggleLikeOffer: (offerId: string) => void;
  toggleSaveOffer: (offerId: string) => void;
  addComment: (offerId: string, text: string, rating: number) => void;
  recordVisit: (offerId: string) => void;
  recordView: (offerId: string) => void;
  
  // UI helpers
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Analytics getters
  getCategoryStats: () => { category: string; visits: number; views: number; likes: number; count: number }[];
  getTopBusinessOwners: () => { ownerName: string; shopName: string; email: string; visits: number; views: number; likes: number; count: number }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'offerme_users_v2',
  OFFERS: 'offerme_offers_v2',
  CURRENT_USER: 'offerme_current_user_v2',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or mock data
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USERS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_OFFERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USERS[3]; // Default logged in as Sophia Chen (Shopper) or null
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [userCoords, setUserCoords] = useState<LocationCoords | null>({ lat: 37.7749, lng: -122.4194, city: 'San Francisco' });

  // Navigation & Modals
  const [currentView, setCurrentView] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [isSellBusinessModalOpen, setIsSellBusinessModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Pending registration for OTP verification
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const requestUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            city: 'Your Detected Location'
          });
          setSelectedLocation('Current Location');
          addToast({
            type: 'success',
            title: 'GPS Location Detected',
            message: `Accurately centered deals near lat ${pos.coords.latitude.toFixed(3)}, lng ${pos.coords.longitude.toFixed(3)}`
          });
        },
        () => {
          // Fallback location SF
          setUserCoords({ lat: 37.7749, lng: -122.4194, city: 'San Francisco, CA' });
          setSelectedLocation('San Francisco, CA');
          addToast({
            type: 'info',
            title: 'Default SF Location Set',
            message: 'Showing offers around San Francisco, CA'
          });
        }
      );
    }
  };

  const login = (email: string, _pass: string) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      setIsAuthModalOpen(false);
      addToast({
        type: 'success',
        title: `Welcome back, ${existing.username}!`,
        message: `Signed in as ${existing.role === 'business_owner' ? 'Business Owner' : existing.role === 'admin' ? 'Administrator' : 'Shopper'}`
      });
      return { success: true, message: 'Logged in successfully' };
    }
    // Auto-create shopper user if not found for seamless testing
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: email.split('@')[0],
      email,
      phone: '+1 (555) 000-1122',
      location: 'San Francisco, CA',
      role: 'user',
      isEmailVerified: true,
      isPhoneVerified: true,
      savedOfferIds: [],
      createdAt: new Date().toISOString()
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    addToast({
      type: 'success',
      title: 'Welcome to OfferMe!',
      message: `Account created for ${email}`
    });
    return { success: true, message: 'Account created and logged in' };
  };

  const registerUser = (userData: Omit<User, 'id' | 'createdAt' | 'savedOfferIds' | 'isEmailVerified' | 'isPhoneVerified'>) => {
    const existing = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'Email address already registered' };
    }
    const temp: User = {
      ...userData,
      id: `user-${Date.now()}`,
      savedOfferIds: [],
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: new Date().toISOString()
    };
    setPendingUser(temp);
    return { success: true, message: 'OTP Sent to your email & phone', tempUser: temp };
  };

  const verifyOtp = (emailOtp: string, phoneOtp: string) => {
    if (!pendingUser) {
      return { success: false, message: 'No pending registration' };
    }
    // Accept valid 4 or 6 digit codes (or default demo 123456 / 888888)
    if (emailOtp.trim().length >= 4 && phoneOtp.trim().length >= 4) {
      const verifiedUser: User = {
        ...pendingUser,
        isEmailVerified: true,
        isPhoneVerified: true
      };
      setUsers((prev) => [...prev, verifiedUser]);
      setCurrentUser(verifiedUser);
      setPendingUser(null);
      setIsAuthModalOpen(false);
      addToast({
        type: 'success',
        title: 'Verification Complete!',
        message: `Welcome ${verifiedUser.username}. Your email and phone are verified.`
      });
      return { success: true, message: 'Successfully verified' };
    }
    return { success: false, message: 'Please enter valid OTP codes (4-6 digits)' };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out.'
    });
  };

  const switchRole = (newRole: UserRole) => {
    if (!currentUser) {
      quickLoginAs(newRole);
      return;
    }
    const updated = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    addToast({
      type: 'success',
      title: `Role Switched to ${newRole === 'business_owner' ? 'Business Owner' : newRole === 'admin' ? 'Platform Admin' : 'Shopper'}`,
      message: `Active privileges updated.`
    });
  };

  const quickLoginAs = (role: UserRole) => {
    const match = users.find((u) => u.role === role) || INITIAL_USERS.find((u) => u.role === role);
    if (match) {
      setCurrentUser(match);
      addToast({
        type: 'success',
        title: `Switched to Demo ${role === 'business_owner' ? 'Merchant' : role === 'admin' ? 'Admin' : 'Shopper'}`,
        message: `Logged in as ${match.username} (${match.email})`
      });
      if (role === 'business_owner') setCurrentView('owner-dashboard');
      else if (role === 'admin') setCurrentView('admin-dashboard');
      else setCurrentView('home');
    }
  };

  const createOffer = (offerData: Omit<Offer, 'id' | 'createdAt' | 'views' | 'visits' | 'likes' | 'likedBy' | 'comments' | 'rating' | 'totalReviews' | 'status'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: `offer-${Date.now()}`,
      views: 1,
      visits: 0,
      likes: 0,
      likedBy: [],
      comments: [],
      rating: 5.0,
      totalReviews: 0,
      status: 'pending', // Submits to pending status for Admin moderation
      createdAt: new Date().toISOString()
    };
    setOffers((prev) => [newOffer, ...prev]);
    addToast({
      type: 'success',
      title: 'Listing Submitted!',
      message: `"${newOffer.title}" submitted and is pending admin approval.`
    });
    return { success: true, message: 'Offer submitted for review' };
  };

  const updateOfferStatus = (offerId: string, status: OfferStatus, reason?: string) => {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          return {
            ...o,
            status,
            rejectionReason: status === 'rejected' ? (reason || 'Listing does not comply with guidelines') : undefined
          };
        }
        return o;
      })
    );
    addToast({
      type: status === 'approved' ? 'success' : status === 'rejected' ? 'warning' : 'info',
      title: `Offer ${status.toUpperCase()}`,
      message: `Status updated successfully.`
    });
  };

  const deleteOffer = (offerId: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== offerId));
    addToast({
      type: 'info',
      title: 'Offer Removed',
      message: 'The offer has been deleted.'
    });
  };

  const toggleLikeOffer = (offerId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      setAuthModalMode('login');
      addToast({
        type: 'info',
        title: 'Sign In Required',
        message: 'Please sign in to save and like offers.'
      });
      return;
    }
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          const isLiked = o.likedBy.includes(currentUser.id);
          const newLikedBy = isLiked
            ? o.likedBy.filter((id) => id !== currentUser.id)
            : [...o.likedBy, currentUser.id];
          return {
            ...o,
            likes: newLikedBy.length,
            likedBy: newLikedBy
          };
        }
        return o;
      })
    );
  };

  const toggleSaveOffer = (offerId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      setAuthModalMode('login');
      return;
    }
    const isSaved = currentUser.savedOfferIds?.includes(offerId);
    const newSaved = isSaved
      ? currentUser.savedOfferIds.filter((id) => id !== offerId)
      : [...(currentUser.savedOfferIds || []), offerId];
    
    const updatedUser = { ...currentUser, savedOfferIds: newSaved };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    
    addToast({
      type: 'success',
      title: isSaved ? 'Removed from Wishlist' : 'Saved to Wishlist!',
      message: isSaved ? 'Offer removed from your favorites.' : 'You can view this offer anytime in your profile favorites.'
    });
  };

  const addComment = (offerId: string, text: string, rating: number) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      setAuthModalMode('login');
      return;
    }
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.username,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      text,
      rating,
      createdAt: new Date().toISOString()
    };

    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          const updatedComments = [newComment, ...o.comments];
          const totalRating = updatedComments.reduce((acc, c) => acc + c.rating, 0);
          const newAvgRating = parseFloat((totalRating / updatedComments.length).toFixed(1));
          return {
            ...o,
            comments: updatedComments,
            rating: newAvgRating,
            totalReviews: updatedComments.length
          };
        }
        return o;
      })
    );

    // Update selectedOffer if currently open
    if (selectedOffer && selectedOffer.id === offerId) {
      setSelectedOffer((prev) => {
        if (!prev) return null;
        const updatedComments = [newComment, ...prev.comments];
        const totalRating = updatedComments.reduce((acc, c) => acc + c.rating, 0);
        return {
          ...prev,
          comments: updatedComments,
          rating: parseFloat((totalRating / updatedComments.length).toFixed(1)),
          totalReviews: updatedComments.length
        };
      });
    }

    addToast({
      type: 'success',
      title: 'Review Submitted',
      message: 'Thank you for rating and reviewing this business!'
    });
  };

  const recordVisit = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          return { ...o, visits: o.visits + 1 };
        }
        return o;
      })
    );
  };

  const recordView = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          return { ...o, views: o.views + 1 };
        }
        return o;
      })
    );
  };

  // Analytics aggregations
  const getCategoryStats = () => {
    const map: { [cat: string]: { visits: number; views: number; likes: number; count: number } } = {};
    categories.forEach((cat) => {
      map[cat.name] = { visits: 0, views: 0, likes: 0, count: 0 };
    });
    offers.forEach((o) => {
      if (!map[o.category]) {
        map[o.category] = { visits: 0, views: 0, likes: 0, count: 0 };
      }
      map[o.category].visits += o.visits;
      map[o.category].views += o.views;
      map[o.category].likes += o.likes;
      map[o.category].count += 1;
    });

    return Object.entries(map).map(([category, stats]) => ({
      category,
      ...stats
    })).sort((a, b) => b.visits - a.visits);
  };

  const getTopBusinessOwners = () => {
    const ownerMap: { [ownerEmail: string]: { ownerName: string; shopName: string; email: string; visits: number; views: number; likes: number; count: number } } = {};
    offers.forEach((o) => {
      const key = o.ownerEmail || o.shopName;
      if (!ownerMap[key]) {
        ownerMap[key] = {
          ownerName: o.ownerName,
          shopName: o.shopName,
          email: o.ownerEmail,
          visits: 0,
          views: 0,
          likes: 0,
          count: 0
        };
      }
      ownerMap[key].visits += o.visits;
      ownerMap[key].views += o.views;
      ownerMap[key].likes += o.likes;
      ownerMap[key].count += 1;
    });

    return Object.values(ownerMap).sort((a, b) => b.visits - a.visits);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        offers,
        categories,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedLocation,
        setSelectedLocation,
        userCoords,
        requestUserLocation,
        currentView,
        setCurrentView,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isSellBusinessModalOpen,
        setIsSellBusinessModalOpen,
        selectedOffer,
        setSelectedOffer,
        login,
        registerUser,
        verifyOtp,
        logout,
        switchRole,
        quickLoginAs,
        createOffer,
        updateOfferStatus,
        deleteOffer,
        toggleLikeOffer,
        toggleSaveOffer,
        addComment,
        recordVisit,
        recordView,
        toasts,
        addToast,
        removeToast,
        getCategoryStats,
        getTopBusinessOwners
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
