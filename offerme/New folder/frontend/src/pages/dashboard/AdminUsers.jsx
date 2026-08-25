import styles from './AdminUsers.module.css'

const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', joined: '2025-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@techhub.com', role: 'business', joined: '2025-02-20' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user', joined: '2025-03-10' },
  { id: 4, name: 'David Lee', email: 'david@fitzone.com', role: 'business', joined: '2025-04-05' },
]

export default function AdminUsers() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>User Management</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {sampleUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`${styles.role} ${styles[u.role]}`}>{u.role}</span>
                </td>
                <td>{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
