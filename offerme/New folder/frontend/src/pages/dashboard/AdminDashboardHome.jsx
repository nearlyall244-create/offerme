import styles from './AdminDashboardHome.module.css'

export default function AdminDashboardHome() {
  const stats = [
    { label: 'Total Businesses', value: '156', icon: '🏪' },
    { label: 'Total Users', value: '2,340', icon: '👥' },
    { label: 'Pending Reviews', value: '23', icon: '⏳' },
    { label: 'Active Offers', value: '489', icon: '📋' },
  ]

  const recentActivity = [
    { action: 'New business registered', name: 'TechHub Store', time: '2 min ago', type: 'business' },
    { action: 'Offer approved', name: '20% Off Electronics', time: '15 min ago', type: 'approved' },
    { action: 'New review posted', name: 'Bean & Brew', time: '1 hr ago', type: 'review' },
    { action: 'Offer pending review', name: 'Summer Sale', time: '2 hr ago', type: 'pending' },
  ]

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Admin Overview</h1>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Recent Activity</h2>
      <div className={styles.activityList}>
        {recentActivity.map((item, i) => (
          <div key={i} className={styles.activityItem}>
            <span className={`${styles.activityDot} ${styles[item.type]}`} />
            <div className={styles.activityInfo}>
              <span className={styles.activityAction}>{item.action}</span>
              <span className={styles.activityName}>{item.name}</span>
            </div>
            <span className={styles.activityTime}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
