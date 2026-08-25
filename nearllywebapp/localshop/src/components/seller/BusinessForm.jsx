import React, { useState } from "react";
import { Store, Phone, Mail, MapPin, Tag, FileText, Upload, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import Button from "../common/Button";
import { saveUserListing } from "../../utils/sellerStorage";
import { categories } from "../../data/categories";
import { popularLocations } from "../../data/locations";

export const BusinessForm = ({ onListingSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "",
    email: "",
    area: popularLocations[0]?.name || "Kattupakkam",
    address: "",
    image: "",
    description: "",
    offers: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category list ensuring all required categories exist
  const categoryOptions = Array.from(
    new Set([
      "Event Bookings",
      "Restaurant",
      "Cake Shops",
      "Textiles",
      "Jewellery",
      "Ice Cream Shops",
      "Gift Shops",
      "Fitness",
      ...categories.map((c) => c.name)
    ])
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image size must be under 5MB" }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Shop/Business name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+ -]{10,14}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Shop address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const fallbackImg =
        imagePreview ||
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800";

      const newListing = saveUserListing({
        ...formData,
        image: fallbackImg,
        isMiniShop: false
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        category: "",
        email: "",
        area: popularLocations[0]?.name || "Kattupakkam",
        address: "",
        image: "",
        description: "",
        offers: ""
      });
      setImagePreview(null);

      if (onListingSuccess) {
        onListingSuccess(newListing);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ form: "Failed to save listing. Please try again." });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 relative">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
          <Store className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900">List Your Business</h3>
          <p className="font-body text-xs text-slate-500">Reach customers across Kattupakkam & Iyyappanthangal</p>
        </div>
      </div>

      {submittedSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-display text-sm font-bold">Business Submitted Successfully!</h5>
            <p className="font-body text-xs text-emerald-700 mt-0.5">
              Your business listing is now live under your selected category and saved in your local session.
            </p>
          </div>
        </div>
      )}

      {errors.form && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <p className="font-body text-xs font-medium">{errors.form}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 font-body">
        {/* Shop Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Shop Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. ABC Cake Shop"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.name ? "border-rose-400 focus:ring-rose-400" : "border-slate-300"
                }`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.category ? "border-rose-400 focus:ring-rose-400" : "border-slate-300"
              }`}
            >
              <option value="">-- Select Category --</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.category}</p>}
          </div>
        </div>

        {/* Phone & Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. 98401 23456"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.phone ? "border-rose-400 focus:ring-rose-400" : "border-slate-300"
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Location / Area <span className="text-rose-500">*</span>
            </label>
            <select
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            >
              {popularLocations.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Email & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. owner@business.com"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.email ? "border-rose-400 focus:ring-rose-400" : "border-slate-300"
              }`}
            />
            {errors.email && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Door No, Street Name, Kattupakkam..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                errors.address ? "border-rose-400 focus:ring-rose-400" : "border-slate-300"
              }`}
            />
            {errors.address && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.address}</p>}
          </div>
        </div>

        {/* Image Upload & Preview */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Business Photo / Logo
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-xs">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Choose Image File</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {imagePreview && (
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-300 shadow-inner">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          {errors.image && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.image}</p>}
        </div>

        {/* Offers */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Special Offer / Discount (Optional)
          </label>
          <input
            type="text"
            name="offers"
            value={formData.offers}
            onChange={handleInputChange}
            placeholder="e.g. 20% OFF Birthday Cakes or Free Home Delivery"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Business Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your products, specialty, and services..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full justify-center shadow-lg shadow-emerald-500/20"
            icon={Sparkles}
          >
            {isSubmitting ? "Submitting Listing..." : "Submit Business Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
