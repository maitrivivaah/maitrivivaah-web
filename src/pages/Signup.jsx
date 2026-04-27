import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]     = useState({ full_name: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const res = await authAPI.signup(form)
      login(res.data)
      navigate('/register')
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.top}>
          <div style={S.lotus}>🪷</div>
          <h1 style={S.title}>Create Your Account</h1>
          <p style={S.sub}>Begin your journey to find your life partner</p>
        </div>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={submit}>
          {[
            { label: 'Full Name', name: 'full_name', type: 'text', placeholder: 'Your full name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
            { label: 'WhatsApp Number', name: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Min 6 characters' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} style={S.field}>
              <label style={S.label}>{label}</label>
              <input name={name} type={type} placeholder={placeholder}
                value={form[name]} onChange={handle} required style={S.input} />
            </div>
          ))}

          <button type="submit" disabled={loading} style={S.btn}>
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <div style={S.divider}><span>or</span></div>

        <button onClick={authAPI.googleLogin} style={S.googleBtn}>
          <img src="https://www.google.com/favicon.ico" width={18} height={18} alt="G" />
          Continue with Google
        </button>

        <p style={S.footer}>
          Already have an account? <Link to="/login" style={S.link}>Login here</Link>
        </p>
      </div>
    </div>
  )
}

const S = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #FDF8F0 0%, #F5EDD8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' },
  card: { background: '#fff', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 440, boxShadow: '0 8px 40px rgba(0,0,0,0.10)' },
  top: { textAlign: 'center', marginBottom: 28 },
  lotus: { fontSize: 40, marginBottom: 8 },
  title: { fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#1A1A1A', marginBottom: 6 },
  sub: { color: '#888', fontSize: 14 },
  error: { background: '#FFF0F0', border: '1px solid #FFCCCC', color: '#CC0000', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14 },
  field: { marginBottom: 16 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#4A4A4A', marginBottom: 6 },
  input: { width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid #E8DCC8', outline: 'none', fontSize: 15, background: '#FAFAF8' },
  btn: { width: '100%', padding: '13px', borderRadius: 10, background: 'linear-gradient(135deg, #C9A84C, #8B6914)', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', marginTop: 6, marginBottom: 16 },
  divider: { textAlign: 'center', color: '#bbb', fontSize: 13, margin: '4px 0 12px', position: 'relative' },
  googleBtn: { width: '100%', padding: '11px', borderRadius: 10, border: '1.5px solid #E8DCC8', background: '#fff', fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 },
  footer: { textAlign: 'center', fontSize: 14, color: '#888' },
  link: { color: '#8B6914', fontWeight: 600 },
}
