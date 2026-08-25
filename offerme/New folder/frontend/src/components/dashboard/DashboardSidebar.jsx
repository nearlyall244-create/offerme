import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { getPendingCount } from '@/data/mockSubmissions'
import styles from './DashboardSidebar.module.css'

const userLinks = [
  { to: '/dashboard', label: 'Home', icon: '🏠' },
  { to: '/dashboard/profile', label: 'Profile', icon: '👤' },
  { to: '/dashboard/favorites', label: 'Favorites', icon: '❤️' },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

const businessLinks = [
  { to: '/business/dashboard', label: 'Home', icon: '🏠' },
  { to: '/business/dashboard/profile', label: 'Profile', icon: '👤' },
  { to: '/business/dashboard/posts', label: 'My Posts', icon: '📋' },
  { to: '/business/dashboard/analytics', label: 'Analytics', icon: '📊' },
  { to: '/business/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

const adminLinks = [
  { to: '/admin/dashboard', label: 'Overview', icon: '📊' },
  { to: '/admin/dashboard/owners', label: 'Business Owners', icon: '👤' },
  { to: '/admin/dashboard/submissions', label: 'Submissions', icon: '📋', showBadge: true },
]

export default function DashboardSidebar({ role = 'user' }) {
  const location = useLocation()
  const { signOut } = useAuth()
  const pendingCount = role === 'admin' ? getPendingCount() : 0

  const links = role === 'admin' ? adminLinks : role === 'business' ? businessLinks : userLinks

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${styles.link} ${location.pathname === link.to ? styles.active : ''}`}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.label}</span>
                {link.showBadge && pendingCount > 0 && (
                  <span className={styles.badge}>{pendingCount}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={signOut} className={styles.logout}>
        <span className={styles.icon}>🚪</span>
        <span className={styles.label}>Logout</span>
      </button>
    </aside>
  )
}
