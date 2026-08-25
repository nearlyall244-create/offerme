import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";
import { forgotPassword } from "../api/auth";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email.trim().toLowerCase());

      navigate("/verify-otp", {
        state: {
          email: email.trim().toLowerCase(),
          purpose: "forgot_password",
          title: "Reset your password",
          subtitle: "Enter the 6-digit code sent to reset your password",
        },
      });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Failed to send OTP";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

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
                Forgot your password?
              </h2>
              <p className="text-sm text-slate-300">
                No worries. Enter your email and we'll send you a verification code to reset your password.
              </p>
            </div>
          </div>

          <div className="font-body pt-8 text-[11px] text-slate-500 relative z-10">
            © {new Date().getFullYear()} OfferMe. Everything Local. Everything Nearby.
          </div>
        </div>

        {/* Right Form Side */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-600 mb-3 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Login
            </Link>
            <h3 className="font-display text-2xl font-extrabold text-slate-900">Reset password</h3>
            <p className="font-body text-xs text-slate-500 mt-1">
              Enter your registered email address
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full shadow-lg shadow-emerald-600/20"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send Verification Code"}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Remember your password?{" "}
            <Link to="/login" className="font-bold text-emerald-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
