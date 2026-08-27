import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Auth.module.css'

export default function BusinessLogin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setSuccess('')
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!form.password) {
      setError('Please enter your password.')
      return
    }

    // Frontend validation successful - No backend connected yet
    setSuccess('Login form validated successfully. Backend authentication will be added later.')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.headerArea}>
          <h1 className={styles.title}>Business Owner Login</h1>
          <p className={styles.subtitle}>Manage your business and offers with OfferMe</p>
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
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {/* Login Button */}
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don't have a business account?{' '}
            <Link to="/auth/business/register" className={styles.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
