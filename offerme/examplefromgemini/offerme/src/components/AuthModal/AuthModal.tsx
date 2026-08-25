import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  X, 
  User, 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  AlertCircle,
  KeyRound,
  Tag
} from 'lucide-react';
import './AuthModal.css';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    registerUser, 
    verifyOtp,
    quickLoginAs,
    addToast
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocation, setRegLocation] = useState('San Francisco, CA');
  const [regRole, setRegRole] = useState<UserRole>('user');
  const [regPassword, setRegPassword] = useState('');

  // Verification step state
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [emailOtp, setEmailOtp] = useState('123456');
  const [phoneOtp, setPhoneOtp] = useState('888888');
  const [timerSeconds, setTimerSeconds] = useState(119);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'reset'>('request');
  const [newPassword, setNewPassword] = useState('');

  // Timer countdown for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpStep && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpStep, timerSeconds]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      addToast({ type: 'warning', title: 'Email required', message: 'Please enter your email.' });
      return;
    }
    login(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername || !regEmail || !regPhone) {
      addToast({ type: 'warning', title: 'Missing fields', message: 'Please fill in username, email, and phone number.' });
      return;
    }

    const res = registerUser({
      username: regUsername,
      email: regEmail,
      phone: regPhone,
      location: regLocation,
      role: regRole,
      bio: regRole === 'business_owner' ? 'Verified local merchant offering deals.' : 'Active local shopper.',
      shopName: regRole === 'business_owner' ? `${regUsername}'s Store` : undefined,
      shopAddress: regRole === 'business_owner' ? regLocation : undefined
    });

    if (res.success) {
      setIsOtpStep(true);
      setTimerSeconds(119);
      addToast({
        type: 'info',
        title: 'Verification Codes Dispatched',
        message: 'Enter Email OTP (123456) and Phone OTP (888888) to activate your account.'
      });
    } else {
      addToast({ type: 'error', title: 'Registration Failed', message: res.message });
    }
  };

  const handleOtpVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = verifyOtp(emailOtp, phoneOtp);
    if (res.success) {
      setIsOtpStep(false);
    } else {
      addToast({ type: 'error', title: 'Invalid OTP', message: res.message });
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      addToast({ type: 'warning', title: 'Email required', message: 'Please enter your registered email address.' });
      return;
    }
    if (forgotStep === 'request') {
      setForgotStep('reset');
      addToast({
        type: 'success',
        title: 'Recovery Code Sent',
        message: `A password reset code was sent to ${forgotEmail}. Enter your new password.`
      });
    } else {
      addToast({
        type: 'success',
        title: 'Password Updated',
        message: 'Your password has been successfully reset! You can now login.'
      });
      setAuthModalMode('login');
      setForgotStep('request');
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
              <Tag size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {authModalMode === 'login' ? 'Sign In to OfferMe' : authModalMode === 'register' ? 'Create an Account' : 'Password Recovery'}
              </h2>
              <p className="text-xs text-slate-500">
                {authModalMode === 'login' ? 'Access your deals, wishlist, and merchant portal' : 'Join thousands of shoppers and local merchants'}
              </p>
            </div>
          </div>
          <button
            id="auth-modal-close-btn"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            onClick={() => setIsAuthModalOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth Mode Tabs (if not in forgot mode) */}
        {authModalMode !== 'forgot' && !isOtpStep && (
          <div className="auth-tabs-row">
            <button
              id="auth-tab-login"
              className={`auth-tab-btn ${authModalMode === 'login' ? 'active' : ''}`}
              onClick={() => setAuthModalMode('login')}
            >
              Sign In
            </button>
            <button
              id="auth-tab-register"
              className={`auth-tab-btn ${authModalMode === 'register' ? 'active' : ''}`}
              onClick={() => setAuthModalMode('register')}
            >
              Register
            </button>
          </div>
        )}

        <div className="auth-modal-body">
          {/* 1. LOGIN FORM */}
          {authModalMode === 'login' && !isOtpStep && (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <input
                    id="login-email-input"
                    type="email"
                    className="form-input pl-9"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <div className="form-group">
                <div className="flex items-center justify-between mb-1">
                  <label className="form-label mb-0">Password</label>
                  <button
                    type="button"
                    className="text-xs text-rose-600 hover:underline font-medium"
                    onClick={() => setAuthModalMode('forgot')}
                  >
                    Forgot Password / Email?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password-input"
                    type="password"
                    className="form-input pl-9"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <button id="login-submit-btn" type="submit" className="auth-submit-btn mt-4">
                <span>Sign In</span>
                <ArrowRight size={16} />
              </button>

              {/* Quick Demo Test Buttons */}
              <div className="quick-demo-accounts">
                <p className="text-[11px] font-bold uppercase text-slate-400 mb-2 tracking-wider">
                  ⚡ Quick Demo 1-Click Login
                </p>
                <button
                  type="button"
                  className="quick-demo-btn"
                  onClick={() => quickLoginAs('business_owner')}
                >
                  <span className="flex items-center gap-2">
                    <Store size={15} className="text-emerald-600" />
                    <strong>Marco Rossi</strong> (Business Owner - Trattoria)
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">Owner</span>
                </button>
                <button
                  type="button"
                  className="quick-demo-btn"
                  onClick={() => quickLoginAs('admin')}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={15} className="text-purple-600" />
                    <strong>Admin Portal</strong> (Platform Administrator)
                  </span>
                  <span className="text-[11px] text-purple-700 font-semibold bg-purple-100 px-2 py-0.5 rounded">Admin</span>
                </button>
                <button
                  type="button"
                  className="quick-demo-btn"
                  onClick={() => quickLoginAs('user')}
                >
                  <span className="flex items-center gap-2">
                    <User size={15} className="text-blue-600" />
                    <strong>Sophia Chen</strong> (Shopper / Customer)
                  </span>
                  <span className="text-[11px] text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded">Shopper</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTER FORM - STEP 1 */}
          {authModalMode === 'register' && !isOtpStep && (
            <form onSubmit={handleRegisterSubmit}>
              {/* Role selection card */}
              <div className="mb-3">
                <label className="form-label">Select Account Type</label>
                <div className="role-selector-grid">
                  <div
                    id="role-select-user"
                    className={`role-card-option ${regRole === 'user' ? 'selected' : ''}`}
                    onClick={() => setRegRole('user')}
                  >
                    <User size={22} className={regRole === 'user' ? 'text-rose-600' : 'text-slate-400'} />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Shopper / User</div>
                      <div className="text-[10px] text-slate-500">Discover & save offers</div>
                    </div>
                  </div>
                  <div
                    id="role-select-business"
                    className={`role-card-option ${regRole === 'business_owner' ? 'selected' : ''}`}
                    onClick={() => setRegRole('business_owner')}
                  >
                    <Store size={22} className={regRole === 'business_owner' ? 'text-emerald-600' : 'text-slate-400'} />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Business Owner</div>
                      <div className="text-[10px] text-slate-500">List shop & post deals</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="form-group">
                <label className="form-label">Full Name / Username</label>
                <div className="relative">
                  <input
                    id="reg-username-input"
                    type="text"
                    className="form-input pl-9"
                    placeholder="e.g. Alex Morgan"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                  />
                  <User size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address (Requires OTP verification)</label>
                <div className="relative">
                  <input
                    id="reg-email-input"
                    type="email"
                    className="form-input pl-9"
                    placeholder="alex@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label className="form-label">Phone Number (Requires SMS OTP)</label>
                <div className="relative">
                  <input
                    id="reg-phone-input"
                    type="tel"
                    className="form-input pl-9"
                    placeholder="+1 (555) 234-5678"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                  <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label">Location / City</label>
                <div className="relative">
                  <input
                    id="reg-location-input"
                    type="text"
                    className="form-input pl-9"
                    placeholder="San Francisco, CA"
                    value={regLocation}
                    onChange={(e) => setRegLocation(e.target.value)}
                  />
                  <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label">Create Password</label>
                <div className="relative">
                  <input
                    id="reg-password-input"
                    type="password"
                    className="form-input pl-9"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              <button id="reg-submit-btn" type="submit" className="auth-submit-btn mt-3">
                <span>Continue to OTP Verification</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* 3. STEP 2: DUAL OTP VERIFICATION (EMAIL + PHONE) */}
          {isOtpStep && (
            <form onSubmit={handleOtpVerifySubmit}>
              <div className="bg-rose-50 border border-rose-200 rounded-12 p-3.5 rounded-xl mb-4 text-xs text-rose-900 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-rose-700">
                  <ShieldCheck size={16} />
                  <span>Dual OTP Security Check</span>
                </div>
                We sent verification codes to <strong>{regEmail}</strong> and <strong>{regPhone}</strong>. (Demo codes auto-filled: Email <code>123456</code>, SMS <code>888888</code>)
              </div>

              {/* Email OTP Input */}
              <div className="form-group">
                <label className="form-label flex items-center justify-between">
                  <span>Email Verification Code (OTP)</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Demo: 123456</span>
                </label>
                <input
                  id="email-otp-input"
                  type="text"
                  maxLength={6}
                  className="form-input text-center text-lg tracking-widest font-mono font-bold"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  required
                />
              </div>

              {/* Phone OTP Input */}
              <div className="form-group">
                <label className="form-label flex items-center justify-between">
                  <span>Phone SMS Verification Code (OTP)</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Demo: 888888</span>
                </label>
                <input
                  id="phone-otp-input"
                  type="text"
                  maxLength={6}
                  className="form-input text-center text-lg tracking-widest font-mono font-bold"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 my-3">
                <span>Resend OTP in: <strong className="text-slate-800">{Math.floor(timerSeconds / 60)}:{('0' + (timerSeconds % 60)).slice(-2)}</strong></span>
                <button
                  type="button"
                  className="text-rose-600 hover:underline font-semibold"
                  onClick={() => {
                    setTimerSeconds(119);
                    addToast({ type: 'info', title: 'New OTP Sent', message: 'Codes re-dispatched to email and SMS.' });
                  }}
                >
                  Resend Codes
                </button>
              </div>

              <button id="otp-verify-submit-btn" type="submit" className="auth-submit-btn">
                <CheckCircle2 size={16} />
                <span>Verify & Complete Registration</span>
              </button>

              <button
                type="button"
                className="w-full text-center text-xs text-slate-500 hover:text-slate-700 mt-3 py-1"
                onClick={() => setIsOtpStep(false)}
              >
                &larr; Back to edit details
              </button>
            </form>
          )}

          {/* 4. FORGOT PASSWORD / EMAIL RECOVERY */}
          {authModalMode === 'forgot' && (
            <form onSubmit={handleForgotSubmit}>
              <div className="form-group">
                <label className="form-label">Enter Registered Email</label>
                <div className="relative">
                  <input
                    id="forgot-email-input"
                    type="email"
                    className="form-input pl-9"
                    placeholder="yourname@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                </div>
              </div>

              {forgotStep === 'reset' && (
                <div className="form-group mt-3">
                  <label className="form-label">Set New Password</label>
                  <div className="relative">
                    <input
                      id="forgot-new-password-input"
                      type="password"
                      className="form-input pl-9"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <KeyRound size={16} className="absolute left-3 top-3 text-slate-400" />
                  </div>
                </div>
              )}

              <button id="forgot-submit-btn" type="submit" className="auth-submit-btn mt-4">
                <span>{forgotStep === 'request' ? 'Send Recovery Code' : 'Save New Password & Sign In'}</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="w-full text-center text-xs text-slate-500 hover:text-slate-700 mt-3 py-1"
                onClick={() => {
                  setAuthModalMode('login');
                  setForgotStep('request');
                }}
              >
                &larr; Return to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
