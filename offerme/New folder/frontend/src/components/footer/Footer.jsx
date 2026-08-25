import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}>O</span>
              <span className={styles.logoText}>OfferMe</span>
            </Link>
            <p className={styles.desc}>
              Discover the best offers, deals, and businesses near you. Connect with local shops and save more.
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.links}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>For Business</h4>
            <ul className={styles.links}>
              <li><Link to="/auth/signup">List Your Business</Link></li>
              <li><Link to="/categories">Browse Categories</Link></li>
              <li><Link to="/about">How It Works</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>Contact</h4>
            <ul className={styles.links}>
              <li>support@offermee.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Main Street, City</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} OfferMe. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
