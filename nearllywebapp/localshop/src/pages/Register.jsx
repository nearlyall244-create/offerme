import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, User, Mail, Lock, MapPin, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { registerUser } from "../api/auth";
import Button from "../components/common/Button";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    location: "Kattupakkam",
    agreedTerms: false,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your full name";
    if (formData.name.trim().length < 2) return "Name must be at least 2 characters";

    if (!formData.email.trim()) return "Please enter your email address";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) return "Please enter a valid email address";

    if (!formData.phone_number.trim()) return "Please enter your phone number";
    const phoneCleaned = formData.phone_number.replace(/[\s\-]/g, "");
    if (!/^[6-9]\d{9}$/.test(phoneCleaned)) return "Please enter a valid 10-digit Indian phone number";

    if (!formData.password) return "Please enter a password";
    if (formData.password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(formData.password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(formData.password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(formData.password)) return "Password must contain at least one number";

    if (formData.password !== formData.confirmPassword) return "Passwords do not match";

    if (!formData.agreedTerms) return "You must agree to the Terms and Conditions";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.trim(),
        password: formData.password,
        location: formData.location,
      });

      navigate("/verify-otp", {
        state: {
          email: result.email,
          purpose: "registration",
          title: "Verify your email",
          subtitle: "Enter the 6-digit code sent to complete your registration",
        },
      });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Failed to create account.";
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
                Create your resident account today.
              </h2>
            </div>

            <div className="font-body space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% free account for local residents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant access to hyperlocal deals & services</span>
              </div>
            </div>
          </div>

          <div className="font-body pt-8 text-[11px] text-slate-500 relative z-10">
            © {new Date().getFullYear()} OfferMe. Everything Local. Everything Nearby.
          </div>
        </div>

        {/* Right Form Side */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-5 font-body">
          <div>
            <h3 className="font-display text-2xl font-extrabold text-slate-900">Create your account</h3>
            <p className="font-body text-xs text-slate-500 mt-1">
              Fill in your details to get started
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="enter your name"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="enter your email"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="enter your phone number"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Kattupakkam">Kattupakkam</option>
                  <option value="Iyyappanthangal">Iyyappanthangal</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="agreedTerms"
                name="agreedTerms"
                checked={formData.agreedTerms}
                onChange={handleChange}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
              <label htmlFor="agreedTerms" className="text-xs text-slate-600 cursor-pointer">
                I agree to the <span className="font-bold text-slate-800">Terms and Conditions</span>.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2 shadow-lg shadow-emerald-600/20"
              disabled={isLoading}
              icon={Sparkles}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-emerald-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
