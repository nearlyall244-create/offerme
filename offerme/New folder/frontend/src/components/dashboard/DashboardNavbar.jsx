import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import styles from './DashboardNavbar.module.css'

export default function DashboardNavbar({ role = 'user' }) {
  const { userProfile } = useAuth()

  const title = role === 'admin' ? 'Admin Dashboard' : role === 'business' ? 'Business Dashboard' : 'OfferMe'

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>O</span>
          <span className={styles.logoText}>{title}</span>
        </Link>
      </div>
      <div className={styles.right}>
        <span className={styles.name}>{userProfile?.displayName || 'User'}</span>
        <div className={styles.avatar}>
          {(userProfile?.displayName || 'U')[0].toUpperCase()}
        </div>
      </div>
    </header>
  )
}
