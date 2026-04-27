import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.brand}>
          <div style={s.logo}>🪷 <span style={s.logoText}>MaitriVivaah</span></div>
          <p style={s.tagline}>Connecting Jain hearts with tradition and trust.</p>
        </div>
        <div style={s.col}>
          <div style={s.colTitle}>Quick Links</div>
          <Link to="/" style={s.link}>Home</Link>
          <Link to="/matches" style={s.link}>Browse Matches</Link>
          <Link to="/plans" style={s.link}>Our Plans</Link>
          <Link to="/about" style={s.link}>About Us</Link>
        </div>
        <div style={s.col}>
          <div style={s.colTitle}>Account</div>
          <Link to="/login" style={s.link}>Login</Link>
          <Link to="/register" style={s.link}>Register Free</Link>
          <Link to="/profile" style={s.link}>My Profile</Link>
        </div>
        <div style={s.col}>
          <div style={s.colTitle}>Legal</div>
          <Link to="/terms" style={s.link}>Terms of Service</Link>
          <Link to="/privacy" style={s.link}>Privacy Policy</Link>
        </div>
      </div>
      <div style={s.bottom}>
        © {new Date().getFullYear()} MaitriVivaah. All rights reserved. Made with 🪷 for the Jain community.
      </div>
    </footer>
  )
}

const s = {
  footer: { background: '#1A0A00', color: '#F5EDD8', marginTop: 80, padding: '60px 20px 0' },
  inner: { maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 40 },
  brand: { display: 'flex', flexDirection: 'column', gap: 12 },
  logo: { fontSize: 22, display: 'flex', alignItems: 'center', gap: 8 },
  logoText: { fontFamily: "'Playfair Display',serif", fontWeight: 700, color: '#C9A84C' },
  tagline: { fontSize: 14, color: '#C8B89A', lineHeight: 1.6, maxWidth: 220 },
  col: { display: 'flex', flexDirection: 'column', gap: 10 },
  colTitle: { fontWeight: 700, color: '#C9A84C', fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  link: { fontSize: 14, color: '#C8B89A', transition: 'color .2s' },
  bottom: { borderTop: '1px solid #3A2010', textAlign: 'center', padding: '20px 0', fontSize: 13, color: '#8A7060' },
}
