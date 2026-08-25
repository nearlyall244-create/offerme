import styles from './FeaturedSection.module.css'

const FEATURED_OFFERS = [
  {
    id: 1,
    title: '20% Off Weekend Lunch',
    shop: 'Saravana Bhavan — T. Nagar',
    offer: 'Flat 20% off on all meals',
    badge: 'HOT',
    badgeType: 'hot',
  },
  {
    id: 2,
    title: 'Bridal Package Special',
    shop: 'Lakme Salon — T. Nagar',
    offer: 'Starting at ₹4,999',
    badge: 'TRENDING',
    badgeType: 'trending',
  },
  {
    id: 3,
    title: 'Free Screen Protector',
    shop: 'Quick Fix Mobiles — T. Nagar',
    offer: 'With any mobile repair',
    badge: 'NEW',
    badgeType: 'new',
  },
]

const badgeClass = {
  hot: styles.badgeHot,
  new: styles.badgeNew,
  trending: styles.badgeTrending,
}

export default function FeaturedSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Featured <span className={styles.headingAccent}>Offers</span>
      </h2>
      <p className={styles.subtitle}>
        Handpicked deals from businesses near you
      </p>

      <div className={styles.grid}>
        {FEATURED_OFFERS.map((item) => (
          <div key={item.id} className={styles.card}>
            <span className={`${styles.cardBadge} ${badgeClass[item.badgeType] || ''}`}>
              {item.badge}
            </span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardShop}>{item.shop}</p>
            <div className={styles.cardOffer}>
              <span className={styles.cardOfferIcon}>🏷️</span>
              {item.offer}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
