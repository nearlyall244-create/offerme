import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Store, Lock, AlertCircle, CheckCircle2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Button from "../components/common/Button";
import { resetPassword } from "../api/auth";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetToken } = location.state || {};

  useEffect(() => {
    if (!email || !resetToken) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, resetToken, navigate]);

  const validatePassword = (pw) => {
    if (pw.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pw)) return "Must contain at least one uppercase letter";
    if (!/[a-z]/.test(pw)) return "Must contain at least one lowercase letter";
    if (!/[0-9]/.test(pw)) return "Must contain at least one number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const pwError = validatePassword(newPassword);
    if (pwError) {
      setError(pwError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(resetToken, newPassword);
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Password reset failed";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !resetToken) return null;

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
                Create a new password
              </h2>
              <p className="text-sm text-slate-300">
                Your new password must be at least 8 characters with uppercase, lowercase, and a number.
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
            <h3 className="font-display text-2xl font-extrabold text-slate-900">Set new password</h3>
            <p className="font-body text-xs text-slate-500 mt-1">
              for <span className="font-bold text-slate-700">{email}</span>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password strength indicators */}
            {newPassword && (
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-500">Password must contain:</p>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { label: "8+ characters", met: newPassword.length >= 8 },
                    { label: "Uppercase letter", met: /[A-Z]/.test(newPassword) },
                    { label: "Lowercase letter", met: /[a-z]/.test(newPassword) },
                    { label: "A number", met: /[0-9]/.test(newPassword) },
                  ].map((rule) => (
                    <div key={rule.label} className={`flex items-center gap-1 text-[11px] ${rule.met ? "text-emerald-600" : "text-slate-400"}`}>
                      <CheckCircle2 className={`w-3 h-3 ${rule.met ? "text-emerald-500" : "text-slate-300"}`} />
                      {rule.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full shadow-lg shadow-emerald-600/20"
              disabled={isLoading || !newPassword || !confirmPassword}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
