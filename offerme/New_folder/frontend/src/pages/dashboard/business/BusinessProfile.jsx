import { useAuth } from '@/contexts/AuthContext'
import styles from '@/pages/dashboard/Profile.module.css'

export default function BusinessProfile() {
  const { userProfile, updateProfile } = useAuth()

  const handleSave = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    updateProfile({
      displayName: formData.get('name'),
      phone: formData.get('phone'),
      shopName: formData.get('shopName'),
      bio: formData.get('bio'),
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Business Profile</h1>
      <form onSubmit={handleSave} className={styles.form}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {(userProfile?.displayName || 'B')[0].toUpperCase()}
          </div>
          <div>
            <h2 className={styles.name}>{userProfile?.shopName || userProfile?.displayName}</h2>
            <p className={styles.email}>{userProfile?.email}</p>
            <span className={styles.role}>{userProfile?.role}</span>
          </div>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="name">Owner Name</label>
            <input id="name" name="name" defaultValue={userProfile?.displayName || ''} />
          </div>
          <div className={styles.field}>
            <label htmlFor="shopName">Shop Name</label>
            <input id="shopName" name="shopName" defaultValue={userProfile?.shopName || ''} />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" defaultValue={userProfile?.phone || ''} />
          </div>
          <div className={styles.field}>
            <label htmlFor="bio">Business Description</label>
            <textarea id="bio" name="bio" rows={3} defaultValue={userProfile?.bio || ''} />
          </div>
        </div>

        <button type="submit" className={styles.saveBtn}>Save Changes</button>
      </form>
    </div>
  )
}
