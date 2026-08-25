import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Store, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { loginUser } from "../api/auth";
import Button from "../components/common/Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginUser(email.trim(), password);

      // Navigate to OTP verification
      navigate("/verify-otp", {
        state: {
          email: result.email,
          purpose: "login",
          title: "Login verification",
          subtitle: "Enter the 6-digit code sent to your email to complete login",
          redirectPath,
        },
      });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Failed to log in.";
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
              <span className="text-2xl font-extrabold text-white tracking-tight">
                NEARLY<span className="text-emerald-400">ALL</span>
              </span>
            </Link>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Hyperlocal Discovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Welcome back to your local community.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with neighborhood merchants, tea stalls, medical stores, and tailors across Kattupakkam & Iyyappanthangal.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Save your favorite local shops & corner stands</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Access exclusive merchant offers & doorstep services</span>
              </div>
            </div>
          </div>

          <div className="pt-8 text-[11px] text-slate-500 relative z-10">
            © {new Date().getFullYear()} OfferMe. Everything Local. Everything Nearby.
          </div>
        </div>

        {/* Right Login Form Side */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900">Sign in to your account</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your credentials to open your personalized dashboard
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-semibold animate-in fade-in">
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

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-emerald-600 font-bold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2 shadow-lg shadow-emerald-600/20"
              disabled={isLoading}
              icon={ArrowRight}
            >
              {isLoading ? "Signing in..." : "Continue"}
            </Button>
          </form>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 text-[11px] text-emerald-900">
            <strong>Two-step verification:</strong> After entering your password, you'll receive a 6-digit OTP via email to complete login.
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-emerald-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
