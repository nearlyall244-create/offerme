import { Outlet } from 'react-router-dom'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

export default function UserDashboardLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DashboardNavbar role="user" />
      <div style={{ display: 'flex', flex: 1 }}>
        <DashboardSidebar role="user" />
        <main style={{ flex: 1, padding: '1.5rem', background: 'var(--color-surface-alt)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
