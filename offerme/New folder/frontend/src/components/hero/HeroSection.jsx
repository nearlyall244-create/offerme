import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.badge}>DISCOVER LOCAL DEALS</span>
          <h1 className={styles.title}>
            Find the Best<br />
            <span className={styles.highlight}>Offers Near You</span>
          </h1>
          <p className={styles.subtitle}>
            Explore local businesses, discover exclusive offers, and support your community.
            Your next great deal is just around the corner.
          </p>
          <div className={styles.actions}>
            <Link to="/auth/signup" className={styles.ctaPrimary}>
              Get Started
            </Link>
            <Link to="/categories" className={styles.ctaSecondary}>
              Browse Categories
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>Businesses</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>10k+</span>
              <span className={styles.statLabel}>Happy Users</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>2k+</span>
              <span className={styles.statLabel}>Active Offers</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >

        </motion.div>
      </div>
    </section>
  )
}
