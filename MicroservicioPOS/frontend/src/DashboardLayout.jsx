import React, { useState } from 'react'
import './Dashboard.css'

const navItems = [
  { id: 'overview', label: 'Resumen', icon: IconOverview },
  { id: 'companies', label: 'Empresas', icon: IconBuilding },
  { id: 'deals', label: 'Negocios', icon: IconDeal, children: ['Pipeline', 'Ganados', 'Perdidos'] },
  { id: 'contacts', label: 'Clientes', icon: IconUser, active: true },
  { id: 'reports', label: 'Reportes', icon: IconChart },
  { id: 'calendar', label: 'Calendario', icon: IconCalendar },
  { id: 'documents', label: 'Documentos', icon: IconDoc },
]

function IconOverview() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
function IconBuilding() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /><path d="M9 9h.01" /><path d="M15 9h.01" />
    </svg>
  )
}
function IconDeal() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function DashboardLayout({ children }) {
  const [dealsOpen, setDealsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon"><LogoIcon /></span>
          <span className="sidebar-brand-name">CRM</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                type="button"
                className={`sidebar-nav-item ${item.active ? 'sidebar-nav-item--active' : ''}`}
                onClick={() => item.children && setDealsOpen((o) => !o)}
              >
                <span className="sidebar-nav-icon">{item.icon ? <item.icon /> : null}</span>
                <span className="sidebar-nav-label">{item.label}</span>
                {item.badge != null && (
                  <span className="sidebar-nav-badge">{item.badge}</span>
                )}
                {item.children && (
                  <span className={`sidebar-nav-chevron ${dealsOpen ? 'sidebar-nav-chevron--open' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                )}
              </button>
              {item.children && dealsOpen && (
                <div className="sidebar-nav-sub">
                  {item.children.map((sub) => (
                    <button type="button" key={sub} className="sidebar-nav-sub-item">{sub}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-search">
            <svg className="header-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Buscar…" className="header-search-input" />
          </div>
          <div className="header-user-wrap">
            <button
              type="button"
              className="header-user"
              onClick={() => setUserMenuOpen((o) => !o)}
              aria-expanded={userMenuOpen}
            >
              <span className="header-user-avatar">U</span>
              <span className="header-user-info">
                <span className="header-user-name">Usuario</span>
                <span className="header-user-role">Administrador</span>
              </span>
              <svg className="header-user-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {userMenuOpen && (
              <>
                <div className="header-user-backdrop" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
                <div className="header-user-dropdown">
                  <button type="button">Perfil</button>
                  <button type="button">Configuración</button>
                  <button type="button">Cerrar sesión</button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  )
}
