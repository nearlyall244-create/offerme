import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import styles from '../Auth.module.css'

export default function UserRegister() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    userlocation: '',
    latitude: null,
    longitude: null,
  })

  const [locationStatus, setLocationStatus] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const handleCurrentLocation = () => {
    setLocationError('')
    setLocationStatus('')

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser. Please enter your location manually.')
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
          // Pre-fill or supplement location if empty
          userlocation: prev.userlocation.trim() ? prev.userlocation : `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`,
        }))
        setLocationLoading(false)
        setLocationStatus('Location detected successfully.')
        setError('')
      },
      (geoError) => {
        setLocationLoading(false)
        setLocationStatus('')

        if (geoError.code === geoError.PERMISSION_DENIED) {
          setLocationError('Location permission was denied. Please allow location access or enter your location manually.')
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE || geoError.code === geoError.TIMEOUT) {
          setLocationError('Unable to detect your location. Please enter your location manually.')
        } else {
          setLocationError('Unable to get your current location. Please enter your location manually.')
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
    // 10-digit Indian phone validation (starts with 6-9 or 10 digits)
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length === 10
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.firstName.trim()) {
      setError('Please enter your first name.')
      return
    }

    if (!form.email.trim() || !validateEmail(form.email)) {
      setError('Please enter a valid email address.')
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

    if (!form.phoneNumber.trim() || !validatePhone(form.phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    if (!form.userlocation.trim() && form.latitude === null) {
      setError('Please enter your location or click "Use Current Location".')
      return
    }

    // All validation passed — register the user
    setIsSubmitting(true)

    try {
      const displayName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim()
      await signUp(form.email.trim(), form.password, displayName, 'user')
      // signUp succeeds → auth state updates → GuestRoute redirects to /dashboard
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.headerArea}>
          <h1 className={styles.title}>Create User Account</h1>
          <p className={styles.subtitle}>Join OfferMe to discover local deals</p>
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
          {/* First Name & Last Name (Optional) */}
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="firstName">
                First Name <span className={styles.requiredStar}>*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
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
                placeholder="Enter last name"
                autoComplete="family-name"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Phone Number */}
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

          {/* User Location */}
          <div className={styles.field}>
            <label htmlFor="userlocation">
              User Location <span className={styles.requiredStar}>*</span>
            </label>
            <input
              id="userlocation"
              name="userlocation"
              type="text"
              required
              value={form.userlocation}
              onChange={handleChange}
              placeholder="Enter your location"
            />

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

          {/* Create Account Button */}
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account? <Link to="/auth/user/login" className={styles.link}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
