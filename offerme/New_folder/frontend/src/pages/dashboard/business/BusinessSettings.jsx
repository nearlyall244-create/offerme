import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Store, Bell, CreditCard, Globe, Save, Clock } from 'lucide-react'
import ConfirmModal from '@/components/shared/ConfirmModal'
import styles from './BusinessSettings.module.css'

export default function BusinessSettings() {
  const { userProfile, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('business')
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [saving, setSaving] = useState(false)

  const [businessData, setBusinessData] = useState({
    businessName: userProfile?.owner_name || userProfile?.businessName || '',
    category: userProfile?.category || '',
    description: userProfile?.description || '',
    website: userProfile?.website || '',
  })

  const [notifications, setNotifications] = useState({
    newClaims: true,
    offerExpiry: true,
    weeklyReports: true,
    customerReviews: false,
  })

  const [operating, setOperating] = useState({
    autoApprove: false,
    holidayMode: false,
    timezone: 'UTC',
  })

  const tabs = [
    { id: 'business', label: 'Business Info', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'operations', label: 'Operations', icon: Clock },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ]

  const handleBusinessSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  const handleNotificationSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Business Settings</h1>
        <p className={styles.subtitle}>Manage your business preferences</p>
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
          {activeTab === 'business' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Business Information</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Business Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={businessData.businessName}
                  onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Business Category</label>
                <select
                  className={styles.select}
                  value={businessData.category}
                  onChange={(e) => setBusinessData({ ...businessData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Health & Beauty</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Business Description</label>
                <textarea
                  className={styles.textarea}
                  value={businessData.description}
                  onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                  rows={4}
                  placeholder="Describe your business..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Website URL</label>
                <input
                  type="url"
                  className={styles.input}
                  value={businessData.website}
                  onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleBusinessSave} disabled={saving}>
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
                    <span className={styles.toggleLabel}>New Claims</span>
                    <span className={styles.toggleDesc}>Get notified when customers claim your offers</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.newClaims}
                      onChange={(e) => setNotifications({ ...notifications, newClaims: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Offer Expiry Alerts</span>
                    <span className={styles.toggleDesc}>Remind when offers are about to expire</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.offerExpiry}
                      onChange={(e) => setNotifications({ ...notifications, offerExpiry: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Weekly Reports</span>
                    <span className={styles.toggleDesc}>Receive weekly performance summaries</span>
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

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Customer Reviews</span>
                    <span className={styles.toggleDesc}>Get notified about new reviews</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={notifications.customerReviews}
                      onChange={(e) => setNotifications({ ...notifications, customerReviews: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleNotificationSave} disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'operations' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Operational Settings</h2>
              
              <div className={styles.toggleGroup}>
                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Auto-Approve Claims</span>
                    <span className={styles.toggleDesc}>Automatically approve claims without manual review</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={operating.autoApprove}
                      onChange={(e) => setOperating({ ...operating, autoApprove: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleLabel}>Holiday Mode</span>
                    <span className={styles.toggleDesc}>Pause all active offers during holidays</span>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={operating.holidayMode}
                      onChange={(e) => setOperating({ ...operating, holidayMode: e.target.checked })}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Timezone</label>
                <select
                  className={styles.select}
                  value={operating.timezone}
                  onChange={(e) => setOperating({ ...operating, timezone: e.target.value })}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="CST">Central Time (CST)</option>
                  <option value="MST">Mountain Time (MST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                </select>
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={handleNotificationSave} disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Billing & Subscription</h2>
              
              <div className={styles.planCard}>
                <div className={styles.planHeader}>
                  <span className={styles.planName}>Free Plan</span>
                  <span className={styles.planPrice}>$0/month</span>
                </div>
                <ul className={styles.planFeatures}>
                  <li>Up to 5 active offers</li>
                  <li>Basic analytics</li>
                  <li>Email support</li>
                </ul>
                <button className={styles.upgradeBtn}>
                  <Globe size={16} />
                  Upgrade Plan
                </button>
              </div>

              <div className={styles.dangerZone}>
                <h3 className={styles.dangerTitle}>Account Actions</h3>
                <button className={styles.logoutBtn} onClick={() => setShowLogoutModal(true)}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
        danger
        success={loggingOut}
        successMessage="You have been logged out successfully."
        onConfirm={() => { setLoggingOut(true); setTimeout(() => { signOut(); window.location.href = '/auth/login' }, 2000) }}
        onCancel={() => { setShowLogoutModal(false); setLoggingOut(false) }}
      />
    </div>
  )
}