import { Link } from 'react-router-dom'
import { CATEGORY_GROUPS, getCategoriesByGroup } from '@/data/categories'
import styles from './CategoriesFullPage.module.css'

export default function CategoriesFullPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          All <span className={styles.pageTitleAccent}>Categories</span>
        </h1>
        <p className={styles.pageSubtitle}>
          Browse all categories and find offers from local businesses near you
        </p>
      </div>

      {CATEGORY_GROUPS.map((group) => {
        const categories = getCategoriesByGroup(group.id)
        if (categories.length === 0) return null

        return (
          <section key={group.id} className={styles.groupSection}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>{group.icon}</span>
              <h2 className={styles.groupTitle}>{group.name}</h2>
              <span className={styles.groupCount}>({categories.length})</span>
            </div>

            <div className={styles.grid}>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={styles.card}
                >
                  <span className={styles.cardIcon}>{cat.icon}</span>
                  <div className={styles.cardContent}>
                    <p className={styles.cardName}>{cat.name}</p>
                    {cat.subcategories.length > 0 && (
                      <p className={styles.cardSub}>
                        {cat.subcategories.length} subcategorie{cat.subcategories.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
