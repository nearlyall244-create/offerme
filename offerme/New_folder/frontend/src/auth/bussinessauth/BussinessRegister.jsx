import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Auth.module.css'

const CATEGORIES = [
  'Grocery',
  'Clothing',
  'Electronics',
  'Restaurant',
  'Cafe',
  'Bakery',
  'Salon',
  'Beauty',
  'Pharmacy',
  'Furniture',
  'Jewellery',
  'Mobile & Accessories',
  'Home & Kitchen',
  'Sports',
  'Fitness',
  'Education',
  'Automotive',
  'Travel',
  'Services',
  'Other',
]

export default function BusinessRegister() {
  const [form, setForm] = useState({
    // Section 1: Owner Details
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',

    // Section 2: Business Details
    businessName: '',
    businessCategory: '',
    businessDescription: '',
    businessPhoneNumber: '',
    businessEmail: '',

    // Section 3: Business Location
    businessAddress: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    latitude: null,
    longitude: null,

    // Section 4: Business Information
    openingTime: '',
    closingTime: '',
    businessLogo: null,
    businessImage: null,
  })

  const [logoPreview, setLogoPreview] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  const [locationStatus, setLocationStatus] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0]
    if (!file) return

    setForm((prev) => ({ ...prev, [field]: file }))

    const previewUrl = URL.createObjectURL(file)
    if (field === 'businessLogo') {
      setLogoPreview(previewUrl)
    } else if (field === 'businessImage') {
      setImagePreview(previewUrl)
    }
  }

  const handleRemoveFile = (field) => {
    setForm((prev) => ({ ...prev, [field]: null }))
    if (field === 'businessLogo') {
      setLogoPreview('')
    } else if (field === 'businessImage') {
      setImagePreview('')
    }
  }

  const handleCurrentLocation = () => {
    setLocationError('')
    setLocationStatus('')

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.')
      return
    }

    setLocationLoading(true)
    setLocationStatus('Getting your current location...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setForm((prev) => ({
          ...prev,
          latitude: latitude,
          longitude: longitude,
        }))
        setLocationLoading(false)
        setLocationStatus('Current location detected successfully.')
        setError('')
      },
      (geoError) => {
        setLocationLoading(false)
        setLocationStatus('')

        if (geoError.code === geoError.PERMISSION_DENIED) {
          setLocationError('Location permission was denied. Please enter the business location manually.')
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE || geoError.code === geoError.TIMEOUT) {
          setLocationError('Unable to detect your current location. Please enter the location manually.')
        } else {
          setLocationError('Unable to get your current location. Please enter the location manually.')
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length === 10
  }

  const validatePincode = (pin) => {
    const cleaned = pin.replace(/\D/g, '')
    return cleaned.length === 6
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // 1. Owner Details Validation
    if (!form.firstName.trim()) {
      setError('Please enter owner first name.')
      return
    }
    if (!form.email.trim() || !validateEmail(form.email)) {
      setError('Please enter a valid owner email address.')
      return
    }
    if (!form.phoneNumber.trim() || !validatePhone(form.phoneNumber)) {
      setError('Please enter a valid 10-digit owner phone number.')
      return
    }
    if (!form.password) {
      setError('Please enter a password.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // 2. Business Details Validation
    if (!form.businessName.trim()) {
      setError('Please enter your business name.')
      return
    }
    if (!form.businessCategory) {
      setError('Please select a business category.')
      return
    }
    if (!form.businessDescription.trim()) {
      setError('Please enter a business description.')
      return
    }
    if (!form.businessPhoneNumber.trim() || !validatePhone(form.businessPhoneNumber)) {
      setError('Please enter a valid 10-digit business phone number.')
      return
    }
    if (form.businessEmail.trim() && !validateEmail(form.businessEmail)) {
      setError('Please enter a valid business email address or leave it blank.')
      return
    }

    // 3. Location Validation
    if (!form.businessAddress.trim()) {
      setError('Please enter the business address.')
      return
    }
    if (!form.area.trim()) {
      setError('Please enter area or locality.')
      return
    }
    if (!form.city.trim()) {
      setError('Please enter city.')
      return
    }
    if (!form.state.trim()) {
      setError('Please enter state.')
      return
    }
    if (!form.pincode.trim() || !validatePincode(form.pincode)) {
      setError('Please enter a valid 6-digit pincode.')
      return
    }

    // 4. Business Information (Hours) Validation
    if (!form.openingTime) {
      setError('Please select business opening time.')
      return
    }
    if (!form.closingTime) {
      setError('Please select business closing time.')
      return
    }
    if (form.closingTime <= form.openingTime) {
      setError('Closing time must be later than opening time.')
      return
    }

    // Frontend validation successful - No backend connected yet
    setSuccess('Business registration form completed successfully. Backend integration will be added later.')
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles.wideCard}`}>
        <div className={styles.headerArea}>
          <h1 className={styles.title}>Create Business Account</h1>
          <p className={styles.subtitle}>List your business and reach more local customers on OfferMe</p>
        </div>

        {error && (
          <div className={styles.error} role="alert">
            <span className={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className={styles.success} role="status">
            <span className={styles.successIcon}>✓</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* SECTION 1 — OWNER DETAILS */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Owner Details</h2>

            {/* First Name & Last Name */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="firstName">
                  Full Name <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">
                  Last Name <span className={styles.optionalTag}>[optional]</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="email">
                  Email <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phoneNumber">
                  Phone Number <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  maxLength={10}
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="password">
                  Password <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="new-password"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword">
                  Confirm Password <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 — BUSINESS DETAILS */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Business Details</h2>

            {/* Business Name & Category */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="businessName">
                  Business Name <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="Enter business name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="businessCategory">
                  Business Category <span className={styles.requiredStar}>*</span>
                </label>
                <select
                  id="businessCategory"
                  name="businessCategory"
                  className={styles.select}
                  required
                  value={form.businessCategory}
                  onChange={handleChange}
                >
                  <option value="">Select business category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Business Description */}
            <div className={styles.field}>
              <label htmlFor="businessDescription">
                Business Description <span className={styles.requiredStar}>*</span>
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                className={styles.textarea}
                required
                rows={3}
                value={form.businessDescription}
                onChange={handleChange}
                placeholder="Tell customers about your business"
              />
            </div>

            {/* Business Phone & Business Email */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="businessPhoneNumber">
                  Business Phone Number <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="businessPhoneNumber"
                  name="businessPhoneNumber"
                  type="tel"
                  required
                  value={form.businessPhoneNumber}
                  onChange={handleChange}
                  placeholder="Enter business phone number"
                  maxLength={10}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="businessEmail">
                  Business Email <span className={styles.optionalTag}>[optional]</span>
                </label>
                <input
                  id="businessEmail"
                  name="businessEmail"
                  type="email"
                  value={form.businessEmail}
                  onChange={handleChange}
                  placeholder="Enter business email"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3 — BUSINESS LOCATION */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Business Location</h2>

            {/* Business Address */}
            <div className={styles.field}>
              <label htmlFor="businessAddress">
                Business Address <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="businessAddress"
                name="businessAddress"
                type="text"
                required
                value={form.businessAddress}
                onChange={handleChange}
                placeholder="Enter business address (e.g. 12, North Usman Road)"
              />
            </div>

            {/* Area & City */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="area">
                  Area / Locality <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="area"
                  name="area"
                  type="text"
                  required
                  value={form.area}
                  onChange={handleChange}
                  placeholder="Enter area or locality"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="city">
                  City <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>
            </div>

            {/* State & Pincode */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="state">
                  State <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="pincode">
                  Pincode <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                />
              </div>
            </div>

            {/* Use Current Location Button */}
            <div className={styles.locationControl}>
              <button
                type="button"
                className={styles.locationBtn}
                onClick={handleCurrentLocation}
                disabled={locationLoading}
              >
                📍 {locationLoading ? 'Detecting Location...' : 'Use Current Location'}
              </button>

              {locationStatus && (
                <div className={styles.locationStatusBox}>
                  <div className={styles.locationStatusMsg}>
                    <span>{locationLoading ? '⏳' : '✅'}</span>
                    <span>{locationStatus}</span>
                  </div>
                  {form.latitude !== null && form.longitude !== null && (
                    <div className={styles.locationCoordsBadge}>
                      <span>Latitude: {form.latitude.toFixed(5)}</span>
                      <span>Longitude: {form.longitude.toFixed(5)}</span>
                    </div>
                  )}
                </div>
              )}

              {locationError && (
                <div className={styles.locationErrorBox}>
                  ⚠️ {locationError}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4 — BUSINESS INFORMATION */}
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Business Information</h2>

            {/* Opening Time & Closing Time */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="openingTime">
                  Opening Time <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="openingTime"
                  name="openingTime"
                  type="time"
                  required
                  value={form.openingTime}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="closingTime">
                  Closing Time <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="closingTime"
                  name="closingTime"
                  type="time"
                  required
                  value={form.closingTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Business Logo Upload */}
            <div className={styles.field}>
              <label htmlFor="businessLogo">
                Business Logo <span className={styles.optionalTag}>[optional]</span>
              </label>
              <div className={styles.fileUploadBox}>
                <input
                  id="businessLogo"
                  name="businessLogo"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={(e) => handleFileChange(e, 'businessLogo')}
                />
                {logoPreview && (
                  <div className={styles.imagePreview}>
                    <img src={logoPreview} alt="Logo preview" className={styles.previewThumb} />
                    <div className={styles.previewInfo}>
                      <span className={styles.previewName}>{form.businessLogo?.name || 'Selected Logo'}</span>
                    </div>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemoveFile('businessLogo')}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Business Image Upload */}
            <div className={styles.field}>
              <label htmlFor="businessImage">
                Business Image <span className={styles.optionalTag}>[optional]</span>
              </label>
              <div className={styles.fileUploadBox}>
                <input
                  id="businessImage"
                  name="businessImage"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={(e) => handleFileChange(e, 'businessImage')}
                />
                {imagePreview && (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Business preview" className={styles.previewThumb} />
                    <div className={styles.previewInfo}>
                      <span className={styles.previewName}>{form.businessImage?.name || 'Selected Image'}</span>
                    </div>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemoveFile('businessImage')}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn}>
            Create Business Account
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have a business account?{' '}
            <Link to="/auth/business/login" className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
