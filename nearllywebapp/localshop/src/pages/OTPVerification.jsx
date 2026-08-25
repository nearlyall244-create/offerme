import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Store, Mail, AlertCircle, CheckCircle2, ArrowLeft, RefreshCw } from "lucide-react";
import OTPInput from "../components/common/OTPInput";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import {
  verifyRegistrationOtp,
  verifyLoginOtp,
  verifyForgotPasswordOtp,
  resendOtp,
} from "../api/auth";

export const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { completeLogin } = useAuth();

  const { email, purpose, title, subtitle, redirectPath } = location.state || {};

  // Redirect if no email/purpose
  useEffect(() => {
    if (!email || !purpose) {
      navigate("/login", { replace: true });
    }
  }, [email, purpose, navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = useCallback(async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      let data;

      switch (purpose) {
        case "registration":
          data = await verifyRegistrationOtp(email, otp);
          setSuccess(data.message || "Email verified successfully!");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
          break;

        case "login":
          data = await verifyLoginOtp(email, otp);
          // Store JWT + user via AuthContext
          completeLogin(data.user, data.token);
          navigate(redirectPath || "/dashboard", { replace: true });
          break;

        case "forgot_password":
          data = await verifyForgotPasswordOtp(email, otp);
          navigate("/reset-password", {
            state: { email, resetToken: data.resetToken },
            replace: true,
          });
          break;

        default:
          throw new Error("Invalid purpose");
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Verification failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [otp, email, purpose, navigate, completeLogin, redirectPath]);

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setCanResend(false);
    setCountdown(60);

    try {
      await resendOtp(email, purpose);
      setSuccess("New OTP sent to your email");
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Failed to resend OTP";
      if (err.response?.status === 429) {
        setCountdown(err.response.data.waitSeconds || 60);
        setCanResend(false);
      }
      setError(msg);
    }
  };

  if (!email || !purpose) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">

        {/* Left Branding Side */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/30">
                <Store className="w-6 h-6" />
              </div>
              <span className="font-display text-2xl font-extrabold text-white tracking-tight">
                NEARLY<span className="text-emerald-400">ALL</span>
              </span>
            </Link>

            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">
                {title || "Verify your email"}
              </h2>
              <p className="text-sm text-slate-300">
                {subtitle || "Enter the 6-digit code sent to your email address"}
              </p>
            </div>

            <div className="font-body space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Check your inbox (and spam folder)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Code expires in 5 minutes</span>
              </div>
            </div>
          </div>

          <div className="font-body pt-8 text-[11px] text-slate-500 relative z-10">
            © {new Date().getFullYear()} OfferMe. Everything Local. Everything Nearby.
          </div>
        </div>

        {/* Right OTP Form Side */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <Link
              to={purpose === "registration" ? "/register" : "/login"}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-600 mb-3 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <h3 className="font-display text-2xl font-extrabold text-slate-900">
              {purpose === "registration"
                ? "Verify your email"
                : purpose === "login"
                ? "Login verification"
                : "Reset password verification"}
            </h3>
            <p className="font-body text-xs text-slate-500 mt-1">
              Enter the 6-digit code sent to
            </p>
            <p className="font-body text-xs font-bold text-slate-700 mt-0.5 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {email}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <div className="space-y-5">
            <OTPInput length={6} value={otp} onChange={setOtp} disabled={isLoading} />

            <Button
              onClick={handleVerify}
              variant="primary"
              size="md"
              className="w-full shadow-lg shadow-emerald-600/20"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Resend OTP
              </button>
            ) : (
              <p className="text-xs text-slate-500">
                Resend OTP in <span className="font-bold text-slate-700">{countdown}s</span>
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            {purpose === "registration" ? (
              <>Already verified? <Link to="/login" className="font-bold text-emerald-600 hover:underline">Sign in</Link></>
            ) : (
              <>Don't have an account? <Link to="/register" className="font-bold text-emerald-600 hover:underline">Create one</Link></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
