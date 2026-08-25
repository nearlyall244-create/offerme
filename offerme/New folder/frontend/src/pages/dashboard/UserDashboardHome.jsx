import { useState } from 'react'
import styles from './DashboardHome.module.css'

export default function UserDashboardHome() {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const sampleCards = [
    { id: 1, title: '20% Off Electronics', shop: 'TechHub', category: 'Electronics', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=200&fit=crop', discount: '20% OFF' },
    { id: 2, title: 'Free Coffee', shop: 'Bean & Brew', category: 'Food & Dining', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop', discount: 'FREE' },
    { id: 3, title: '50% Gym Membership', shop: 'FitZone', category: 'Health & Fitness', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop', discount: '50% OFF' },
    { id: 4, title: 'Buy 1 Get 1 Spa', shop: 'Zen Spa', category: 'Beauty & Spa', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=200&fit=crop', discount: 'BOGO' },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search offers, shops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={styles.filter}>
          <option value="">All Locations</option>
          <option value="nearby">Nearby</option>
          <option value="city">In City</option>
        </select>
      </div>

      <h2 className={styles.sectionTitle}>Categories</h2>
      <div className={styles.categories}>
        {['Food & Dining', 'Shopping', 'Health & Fitness', 'Electronics', 'Beauty & Spa'].map((cat) => (
          <button key={cat} className={styles.catBtn}>{cat}</button>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Featured Offers</h2>
      <div className={styles.grid}>
        {sampleCards.map((card) => (
          <div key={card.id} className={styles.card}>
            <img src={card.image} alt={card.title} className={styles.cardImage} />
            <span className={styles.badge}>{card.discount}</span>
            <div className={styles.cardBody}>
              <h3>{card.title}</h3>
              <p>{card.shop}</p>
              <span className={styles.cardCategory}>{card.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
