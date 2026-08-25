import styles from './AdminReviews.module.css'

const sampleReviews = [
  { id: 1, user: 'Alice', business: 'TechHub Store', category: 'Electronics', rating: 4, text: 'Great store, fast delivery!', visits: 12 },
  { id: 2, user: 'Bob', business: 'Bean & Brew', category: 'Food & Dining', rating: 5, text: 'Best coffee in town!', visits: 8 },
  { id: 3, user: 'Carol', business: 'FitZone Gym', category: 'Health & Fitness', rating: 3, text: 'Decent equipment, crowded.', visits: 15 },
]

const categoryStats = [
  { category: 'Electronics', businessCount: 45, totalVisits: 3200 },
  { category: 'Food & Dining', businessCount: 62, totalVisits: 5800 },
  { category: 'Health & Fitness', businessCount: 28, totalVisits: 1900 },
  { category: 'Beauty & Spa', businessCount: 21, totalVisits: 1200 },
]

export default function AdminReviews() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Reviews & Analytics</h1>

      <h2 className={styles.sectionTitle}>User Reviews</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Business</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Visits</th>
            </tr>
          </thead>
          <tbody>
            {sampleReviews.map((r) => (
              <tr key={r.id}>
                <td>{r.user}</td>
                <td>{r.business}</td>
                <td>{r.category}</td>
                <td>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</td>
                <td>{r.text}</td>
                <td>{r.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={styles.sectionTitle}>Category Activity</h2>
      <div className={styles.statsGrid}>
        {categoryStats.map((cs) => (
          <div key={cs.category} className={styles.statCard}>
            <h3>{cs.category}</h3>
            <p>{cs.businessCount} businesses</p>
            <p>{cs.totalVisits.toLocaleString()} visits</p>
          </div>
        ))}
      </div>
    </div>
  )
}
