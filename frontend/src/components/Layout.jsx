import { useState, useEffect } from 'react'
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Layout() {
  const { user, logout, isAdmin } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on route change (mobile nav tap)
  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  // Close sidebar on ESC
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setSidebarOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!user) return <Navigate to="/login" replace />

  const navLink = (to, icon, label, end = false) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
    >
      <span className="nav-link-icon">{icon}</span>
      <span className="nav-link-text">{label}</span>
    </NavLink>
  )

  return (
    <div className="app">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="nav-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`nav-sidebar ${sidebarOpen ? 'nav-sidebar-open' : ''}`}>
        <div className="nav-brand">
          <span className="nav-brand-icon">📊</span>
          <span className="nav-brand-text">NHCI Sales</span>
          {/* Close button (mobile) */}
          <button className="nav-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <nav className="nav-links">
          {navLink('/', '📈', 'Dashboard', true)}
          {navLink('/entry', '➕', 'Sales Entry')}
          {navLink('/history', '📋', 'History')}
          {isAdmin && (
            <>
              <div className="nav-section">Admin</div>
              {navLink('/products', '📦', 'Products')}
              {navLink('/users', '👥', 'Users')}
            </>
          )}
        </nav>

        <div className="nav-footer">
          <div className="nav-user">
            <div className="nav-user-avatar">{user.name[0].toUpperCase()}</div>
            <div className="nav-user-info">
              <div className="nav-user-name">{user.name}</div>
              <div className="nav-user-role">{user.role}</div>
            </div>
          </div>
          <button className="btn-logout" onClick={logout}>Sign out</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Mobile top bar */}
        <header className="mobile-topbar">

          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
          <span className="mobile-topbar-title">NHCI Sales</span>
          <div className="nav-user-avatar mobile-avatar">{user.name[0].toUpperCase()}</div>
        </header>

        <Outlet />

        <footer className="app-footer">
          <span>© {new Date().getFullYear()} NHCI Sales Tracker</span>
          <span className="app-footer-divider">·</span>
          <span>Developed by <strong>Jhan Rey Bravo</strong></span>
          <span className="app-footer-divider">·</span>
          <span className="app-footer-version">v1.0.0</span>
        </footer>
      </main>
    </div>
  )
}
