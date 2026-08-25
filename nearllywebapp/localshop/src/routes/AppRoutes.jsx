import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import OTPVerification from "../pages/OTPVerification";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Shops from "../pages/Shops";
import ShopDetails from "../pages/ShopDetails";
import Categories from "../pages/Categories";
import CategoryShops from "../pages/CategoryShops";
import EventsPage from "../pages/EventsPage";
import EventCategoryPage from "../pages/EventCategoryPage";
import Nearby from "../pages/Nearby";
import Offers from "../pages/Offers";
import Profile from "../pages/Profile";
import SellBusiness from "../pages/SellBusiness";

import Location from "../pages/Location";
import Demo from "../components/ui/demo";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/hero-demo" element={<Demo />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shops/:id" element={<ShopDetails />} />
        <Route path="/location" element={<Location />} />
        <Route path="/location/:locationSlug" element={<Location />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/category/:categoryName" element={<EventCategoryPage />} />
        <Route path="/nearby" element={<Nearby />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/sell" element={<SellBusiness />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
