import { Link } from 'react-router-dom'
import { getPopularCategories } from '@/data/categories'
import styles from './CategoriesSection.module.css'

const popularCategories = getPopularCategories()

export default function CategoriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>
          Explore <span className={styles.headingAccent}>Categories</span>
        </h2>
        <Link to="/categories" className={styles.viewAllLink}>
          View All Categories
          <span className={styles.viewAllArrow}>→</span>
        </Link>
      </div>

      <div className={styles.grid}>
        {popularCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className={styles.card}
          >
            <span className={styles.cardIcon}>{cat.icon}</span>
            <p className={styles.cardName}>{cat.name}</p>
            <p className={styles.cardDesc}>{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
