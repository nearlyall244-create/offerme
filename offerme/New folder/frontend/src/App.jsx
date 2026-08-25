import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute, GuestRoute } from '@/components/ProtectedRoute'

import LandingPage from '@/pages/LandingPage'
import CategoriesPage from '@/pages/CategoriesPage'
import CategoryDetailPage from '@/pages/categories/CategoryDetailPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import NotFound from '@/pages/NotFound'
import Unauthorized from '@/pages/Unauthorized'

import RoleSelector from '@/auth/RoleSelector'
import UnifiedLogin from '@/auth/UnifiedLogin'
import UserRegister from '@/auth/userauth/UserRegister'
import UserLogin from '@/auth/userauth/UserLogin'
import BusinessRegister from '@/auth/bussinessauth/BussinessRegister'
import BusinessLogin from '@/auth/bussinessauth/BussinessLogin'
import AdminLogin from '@/auth/adminauth/AdminLogin'

import UserDashboardLayout from '@/pages/dashboard/UserDashboardLayout'
import UserDashboardHome from '@/pages/dashboard/UserDashboardHome'
import UserProfile from '@/pages/dashboard/UserProfile'
import UserFavorites from '@/pages/dashboard/UserFavorites'
import UserSettings from '@/pages/dashboard/UserSettings'

import BusinessDashboardLayout from '@/pages/dashboard/BusinessDashboardLayout'
import BusinessDashboardHome from '@/pages/dashboard/BusinessDashboardHome'
import BusinessProfile from '@/pages/dashboard/BusinessProfile'
import BusinessPosts from '@/pages/dashboard/BusinessPosts'
import BusinessAnalytics from '@/pages/dashboard/BusinessAnalytics'

import AdminDashboardLayout from '@/pages/dashboard/AdminDashboardLayout'
import AdminDashboardHome from '@/pages/dashboard/AdminDashboardHome'
import AdminBusinesses from '@/pages/dashboard/AdminBusinesses'
import AdminReviews from '@/pages/dashboard/AdminReviews'
import AdminUsers from '@/pages/dashboard/AdminUsers'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/category/:slug" element={<CategoryDetailPage />} />
          <Route path="/category/:slug/:subSlug" element={<CategoryDetailPage />} />

          {/* Auth Routes */}
          <Route path="/auth/signup" element={<GuestRoute><RoleSelector /></GuestRoute>} />
          <Route path="/auth/login" element={<GuestRoute><UnifiedLogin /></GuestRoute>} />
          <Route path="/auth/user/register" element={<GuestRoute><UserRegister /></GuestRoute>} />
          <Route path="/auth/user/login" element={<GuestRoute><UserLogin /></GuestRoute>} />
          <Route path="/auth/business/register" element={<GuestRoute><BusinessRegister /></GuestRoute>} />
          <Route path="/auth/business/login" element={<GuestRoute><BusinessLogin /></GuestRoute>} />
          <Route path="/auth/admin/login" element={<GuestRoute><AdminLogin /></GuestRoute>} />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={['user']}><UserDashboardLayout /></ProtectedRoute>}
          >
            <Route index element={<UserDashboardHome />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="favorites" element={<UserFavorites />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* Business Dashboard */}
          <Route
            path="/business/dashboard"
            element={<ProtectedRoute allowedRoles={['business']}><BusinessDashboardLayout /></ProtectedRoute>}
          >
            <Route index element={<BusinessDashboardHome />} />
            <Route path="profile" element={<BusinessProfile />} />
            <Route path="posts" element={<BusinessPosts />} />
            <Route path="analytics" element={<BusinessAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardLayout /></ProtectedRoute>}
          >
            <Route index element={<AdminDashboardHome />} />
            <Route path="businesses" element={<AdminBusinesses />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
