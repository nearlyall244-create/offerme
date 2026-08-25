import { Outlet } from 'react-router-dom'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export default function AdminDashboardLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DashboardNavbar role="admin" />
      <div style={{ display: 'flex', flex: 1 }}>
        <DashboardSidebar role="admin" />
        <main style={{ flex: 1, padding: '1.5rem', background: 'var(--color-surface-alt)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
