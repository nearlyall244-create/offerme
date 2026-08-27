import styles from './UserSettings.module.css'

export default function UserSettings() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.section}>
        <h2>Notifications</h2>
        <label className={styles.toggle}>
          <input type="checkbox" defaultChecked />
          <span>Email notifications</span>
        </label>
        <label className={styles.toggle}>
          <input type="checkbox" defaultChecked />
          <span>Push notifications</span>
        </label>
      </div>
      <div className={styles.section}>
        <h2>Privacy</h2>
        <label className={styles.toggle}>
          <input type="checkbox" />
          <span>Hide profile from public</span>
        </label>
      </div>
    </div>
  )
}
