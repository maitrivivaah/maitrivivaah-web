import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authAPI.login(form)
      login(res.data)
      navigate(res.data.has_profile ? '/matches' : '/register/profile')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.top}>
          <div style={s.logo}>🪷</div>
          <h1 style={s.title}>Welcome Back</h1>
          <p style={s.sub}>Login to your MaitriVivaah account</p>
        </div>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={submit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input style={s.input} type="email" name="email" value={form.email}
              onChange={handle} placeholder="you@example.com" required />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" name="password" value={form.password}
              onChange={handle} placeholder="Enter your password" required />
          </div>
          <div style={s.forgotRow}>
            <Link to="/forgot-password" style={s.forgot}>Forgot Password?</Link>
          </div>
          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={s.divider}><span>or</span></div>

        <button style={s.googleBtn} onClick={() => authAPI.googleLogin()}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={20} alt="Google" />
          Continue with Google
        </button>

        <p style={s.bottom}>
          Don't have an account? <Link to="/register" style={s.link}>Register Free</Link>
        </p>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#FDF8F0,#F5EDD8)', padding: 20 },
  card: { background: '#fff', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 440, boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #E8DCC8' },
  top: { textAlign: 'center', marginBottom: 32 },
  logo: { fontSize: 48, marginBottom: 12 },
  title: { fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#1A1A1A', marginBottom: 8 },
  sub: { color: '#888', fontSize: 15 },
  error: { background: '#FFF5F5', border: '1px solid #FFC0C0', color: '#C0392B', borderRadius: 8, padding: '12px 16px', fontSize: 14, marginBottom: 20 },
  form: { display: 'flex', flexDirection: 'column', gap: 20 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#4A4A4A' },
  input: { padding: '12px 14px', border: '1.5px solid #E8DCC8', borderRadius: 8, fontSize: 15, outline: 'none', transition: 'border .2s' },
  forgotRow: { display: 'flex', justifyContent: 'flex-end', marginTop: -12 },
  forgot: { fontSize: 13, color: '#C9A84C', fontWeight: 500 },
  btn: { padding: '14px', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, marginTop: 4 },
  divider: { textAlign: 'center', color: '#CCC', fontSize: 13, margin: '24px 0', position: 'relative', borderTop: '1px solid #E8DCC8', paddingTop: 0 },
  googleBtn: { width: '100%', padding: '12px', border: '1.5px solid #E8DCC8', borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 15, fontWeight: 500, color: '#333', cursor: 'pointer', marginTop: -12 },
  bottom: { textAlign: 'center', marginTop: 24, fontSize: 14, color: '#666' },
  link: { color: '#8B6914', fontWeight: 700 },
}
