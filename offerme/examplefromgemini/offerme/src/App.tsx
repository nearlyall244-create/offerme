import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ToastContainer } from './components/Toast/ToastContainer';
import { AuthModal } from './components/AuthModal/AuthModal';
import { SellBusinessModal } from './components/SellBusinessModal/SellBusinessModal';
import { OfferDetailsModal } from './components/OfferDetailsModal/OfferDetailsModal';

// Views
import { Home } from './components/Home/Home';
import { CategoriesView } from './components/CategoriesView/CategoriesView';
import { OffersView } from './components/OffersView/OffersView';
import { OwnerDashboard } from './components/OwnerDashboard/OwnerDashboard';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { UserProfile } from './components/UserProfile/UserProfile';
import { AboutView } from './components/AboutView/AboutView';
import { ContactView } from './components/ContactView/ContactView';

import './App.css';

const MainAppContent: React.FC = () => {
  const { currentView } = useApp();

  // Scroll to top on view transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="app-root" id="offerme-app-root">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Modals */}
      <AuthModal />
      <SellBusinessModal />
      <OfferDetailsModal />

      {/* Slideout Mobile / User Sidebar */}
      <Sidebar />

      {/* Top Navigation */}
      <Navbar />

      {/* Active View Container */}
      <main className="app-main-content">
        {currentView === 'home' && <Home />}
        {currentView === 'categories' && <CategoriesView />}
        {currentView === 'offers' && <OffersView />}
        {currentView === 'map-view' && <OffersView initialMapMode={true} />}
        {currentView === 'owner-dashboard' && <OwnerDashboard />}
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        {currentView === 'user-profile' && <UserProfile />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
