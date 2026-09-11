import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ConfirmModal from '@/components/shared/ConfirmModal'
import styles from './UserSettings.module.css'

const SETTINGS_KEY = 'offerme_user_settings'

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
      emailNotifications: true,
      pushNotifications: true,
    }
  } catch {
    return { emailNotifications: true, pushNotifications: true }
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export default function UserSettings() {
  const [settings, setSettings] = useState(getSettings)
  const [saved, setSaved] = useState(false)
  const { signOut } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    setSaved(false)
  }, [settings])

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Notifications</h2>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) => handleChange('emailNotifications', e.target.checked)}
          />
          <span>Email notifications</span>
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) => handleChange('pushNotifications', e.target.checked)}
          />
          <span>Push notifications</span>
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.saveBtn} onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Account</h2>
        <button className={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>
          Logout
        </button>
      </div>

      <ConfirmModal
        open={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        danger
        success={loggingOut}
        successMessage="You have been logged out successfully."
        onConfirm={() => { setLoggingOut(true); setTimeout(() => { signOut(); window.location.href = '/' }, 2000) }}
        onCancel={() => { setShowLogoutModal(false); setLoggingOut(false) }}
      />
    </div>
  )
}
