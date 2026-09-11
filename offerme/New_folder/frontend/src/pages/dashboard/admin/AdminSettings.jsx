import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Settings, Users, Shield, Bell, Save, LogOut } from 'lucide-react'
import ConfirmModal from '@/components/shared/ConfirmModal'
import styles from './AdminSettings.module.css'

export default function AdminSettings() {
  const { userProfile, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('general')
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [saving, setSaving] = useState(false)

  const [general, setGeneral] = useState({
    siteName: 'OfferMe',
    maintenanceMode: false,
    registrationEnabled: true,
  })

  const [notifications, setNotifications] = useState({
    newBusinessAlerts: true,
    submissionAlerts: true,
    systemAlerts: true,
    weeklyReports: true,
  })

  const [security, setSecurity] = useState({
    requireEmailVerification: true,
    sessionTimeout: '60',
    ipWhitelist: '',
  })

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Settings</h1>
        <p className={styles.subtitle}>Manage platform settings and configurations</p>
      </div>

      <div className={styles.container}>
        <nav className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          {activeTab === 'general' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>General Settings</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Site Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={general.siteName}
                  onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                />
              </div>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Maintenance Mode</span>
                    <span className={styles.toggleDesc}>Temporarily disable public access to the site</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={general.maintenanceMode}
                      onChange={(e) => setGeneral({ ...general, maintenanceMode: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Allow New Registrations</span>
                    <span className={styles.toggleDesc}>Enable or disable new user registrations</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={general.registrationEnabled}
                      onChange={(e) => setGeneral({ ...general, registrationEnabled: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>User Management</h2>
              
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>1,234</span>
                  <span className={styles.statLabel}>Total Users</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>89</span>
                  <span className={styles.statLabel}>Business Owners</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statValue}>12</span>
                  <span className={styles.statLabel}>Pending Approvals</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Security Settings</h2>
              
              <div className={styles.toggleGroup}>
                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Require Email Verification</span>
                    <span className={styles.toggleDesc}>Users must verify email before accessing dashboard</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={security.requireEmailVerification}
                      onChange={(e) => setSecurity({ ...security, requireEmailVerification: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Admin Session Timeout</label>
                <select
                  className={styles.select}
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="480">8 hours</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>IP Whitelist (comma separated)</label>
                <input
                  type="text"
                  className={styles.input}
                  value={security.ipWhitelist}
                  onChange={(e) => setSecurity({ ...security, ipWhitelist: e.target.value })}
                  placeholder="192.168.1.1, 10.0.0.1"
                />
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Notification Preferences</h2>
              
              <div className={styles.toggleGroup}>
                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>New Business Alerts</span>
                    <span className={styles.toggleDesc}>Get notified when new businesses register</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.newBusinessAlerts}
                      onChange={(e) => setNotifications({ ...notifications, newBusinessAlerts: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Submission Alerts</span>
                    <span className={styles.toggleDesc}>Get notified about new submissions</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.submissionAlerts}
                      onChange={(e) => setNotifications({ ...notifications, submissionAlerts: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>System Alerts</span>
                    <span className={styles.toggleDesc}>Critical system notifications</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.systemAlerts}
                      onChange={(e) => setNotifications({ ...notifications, systemAlerts: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Weekly Reports</span>
                    <span className={styles.toggleDesc}>Receive weekly platform analytics</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReports}
                      onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.dangerZone}>
        <h3 className={styles.dangerTitle}>Account</h3>
        <button className={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>
          <LogOut size={16} />
          Sign Out
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