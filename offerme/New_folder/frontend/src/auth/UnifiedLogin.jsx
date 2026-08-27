import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import styles from './Auth.module.css'

export default function UnifiedLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const firebaseUser = await signIn(email, password)
      const { firestoreService } = await import('@/services/firestoreService')
      const profile = await firestoreService.getDocument(
        firestoreService.COLLECTIONS.USERS,
        firebaseUser.uid
      )
      const routeMap = {
        user: '/dashboard',
        business: '/business/dashboard',
        admin: '/admin/dashboard',
      }
      navigate(routeMap[profile?.role] || '/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your OfferMe account</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="you@example.com"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Your password"
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account? <Link to="/auth/signup">Sign up</Link></p>
          <p>Admin? <Link to="/auth/admin/login">Admin login</Link></p>
        </div>
      </div>
    </div>
  )
}
