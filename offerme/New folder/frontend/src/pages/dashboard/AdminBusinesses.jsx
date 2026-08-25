import { useState } from 'react'
import styles from './AdminBusinesses.module.css'

const sampleBusinesses = [
  { id: 1, username: 'John Smith', email: 'john@techhub.com', phone: '+1 555-0101', category: 'Electronics', shopName: 'TechHub Store', shopAddress: '123 Tech Ave', offers: '20% Off', status: 'approved' },
  { id: 2, username: 'Jane Doe', email: 'jane@beanbrew.com', phone: '+1 555-0102', category: 'Food & Dining', shopName: 'Bean & Brew', shopAddress: '456 Coffee St', offers: 'BOGO Coffee', status: 'pending' },
  { id: 3, username: 'Mike Brown', email: 'mike@fitzone.com', phone: '+1 555-0103', category: 'Health & Fitness', shopName: 'FitZone Gym', shopAddress: '789 Gym Rd', offers: '50% Membership', status: 'rejected' },
]

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState(sampleBusinesses)

  const handleAction = (id, newStatus) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Business Management</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Shop Name</th>
              <th>Address</th>
              <th>Offers</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => (
              <tr key={b.id}>
                <td>{b.username}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.category}</td>
                <td>{b.shopName}</td>
                <td>{b.shopAddress}</td>
                <td>{b.offers}</td>
                <td>
                  <span className={`${styles.status} ${styles[b.status]}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    {b.status !== 'approved' && (
                      <button
                        onClick={() => handleAction(b.id, 'approved')}
                        className={styles.approveBtn}
                      >
                        Approve
                      </button>
                    )}
                    {b.status !== 'rejected' && (
                      <button
                        onClick={() => handleAction(b.id, 'rejected')}
                        className={styles.rejectBtn}
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
