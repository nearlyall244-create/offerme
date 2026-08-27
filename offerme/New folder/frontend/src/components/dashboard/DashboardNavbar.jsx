import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import logo from '@/assets/logo/logo.png'
import styles from './DashboardNavbar.module.css'

export default function DashboardNavbar() {
  const { userProfile } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="OfferMe" className={styles.logoImg} />
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
