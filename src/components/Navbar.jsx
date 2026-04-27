import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }

  const initials = user?.full_name
    ? user.full_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const isActive = (path) => location.pathname === path

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          🪷 <span style={styles.logoText}>MaitriVivaah</span>
        </Link>

        {/* Desktop links */}
        <div style={styles.links}>
          <Link to="/" style={{...styles.link, ...(isActive('/') ? styles.linkActive : {})}}>Home</Link>
          <Link to="/matches" style={{...styles.link, ...(isActive('/matches') ? styles.linkActive : {})}}>Matches</Link>
          <Link to="/plans" style={{...styles.link, ...(isActive('/plans') ? styles.linkActive : {})}}>Plans</Link>
          <Link to="/about" style={{...styles.link, ...(isActive('/about') ? styles.linkActive : {})}}>About</Link>
        </div>

        {/* Auth area */}
        <div style={styles.authArea}>
          {user ? (
            <div style={styles.userMenu}>
              <div style={styles.avatar} onClick={() => setMenuOpen(!menuOpen)}>{initials}</div>
              {menuOpen && (
                <div style={styles.dropdown}>
                  <div style={styles.dropName}>{user.full_name}</div>
                  <div style={styles.dropEmail}>{user.email}</div>
                  <hr style={styles.dropDivider}/>
                  <Link to="/profile" style={styles.dropItem} onClick={() => setMenuOpen(false)}>My Profile</Link>
                  <Link to="/interests" style={styles.dropItem} onClick={() => setMenuOpen(false)}>Interests</Link>
                  <hr style={styles.dropDivider}/>
                  <button style={styles.dropLogout} onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div style={styles.authBtns}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register Free</Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/matches" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Matches</Link>
          <Link to="/plans" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Plans</Link>
          <Link to="/about" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
          {user ? (
            <>
              <Link to="/profile" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>My Profile</Link>
              <button style={styles.mobileLogout} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Register Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: { background: '#fff', borderBottom: '1px solid #E8DCC8', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  inner: { maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 22 },
  logoText: { fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#8B6914' },
  links: { display: 'flex', gap: 32, '@media(max-width:768px)': { display: 'none' } },
  link: { fontWeight: 500, color: '#4A4A4A', fontSize: 15, transition: 'color .2s' },
  linkActive: { color: '#8B6914', borderBottom: '2px solid #C9A84C', paddingBottom: 2 },
  authArea: { display: 'flex', alignItems: 'center', gap: 12 },
  authBtns: { display: 'flex', gap: 12 },
  loginBtn: { padding: '8px 20px', border: '1.5px solid #C9A84C', borderRadius: 8, color: '#8B6914', fontWeight: 600, fontSize: 14 },
  registerBtn: { padding: '8px 20px', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: 14 },
  userMenu: { position: 'relative' },
  avatar: { width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, cursor: 'pointer' },
  dropdown: { position: 'absolute', right: 0, top: 48, background: '#fff', border: '1px solid #E8DCC8', borderRadius: 12, padding: 12, minWidth: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200 },
  dropName: { fontWeight: 700, fontSize: 15, color: '#1A1A1A', padding: '4px 8px' },
  dropEmail: { fontSize: 13, color: '#888', padding: '2px 8px 8px' },
  dropDivider: { border: 'none', borderTop: '1px solid #E8DCC8', margin: '8px 0' },
  dropItem: { display: 'block', padding: '8px 8px', fontSize: 14, color: '#4A4A4A', borderRadius: 6, fontWeight: 500 },
  dropLogout: { display: 'block', width: '100%', padding: '8px 8px', fontSize: 14, color: '#c0392b', background: 'none', border: 'none', textAlign: 'left', borderRadius: 6, fontWeight: 600 },
  hamburger: { display: 'none', background: 'none', border: 'none', fontSize: 24, color: '#8B6914' },
  mobileMenu: { background: '#fff', padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid #E8DCC8' },
  mobileLink: { padding: '10px 0', fontSize: 15, fontWeight: 500, color: '#4A4A4A', borderBottom: '1px solid #F5EDD8' },
  mobileLogout: { padding: '10px 0', fontSize: 15, fontWeight: 600, color: '#c0392b', background: 'none', border: 'none', textAlign: 'left' },
}
