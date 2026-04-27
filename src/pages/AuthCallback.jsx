import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthCallback() {
  const { login } = useAuth()
  const navigate  = useNavigate()

  useEffect(() => {
    const params        = new URLSearchParams(window.location.search)
    const access_token  = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const has_profile   = params.get('has_profile') === 'true'
    const needs_password = params.get('needs_password') === 'true'

    if (access_token) {
      login({ access_token, refresh_token, user_id: '', email: '', has_profile })
      if (needs_password) navigate('/set-password')
      else if (!has_profile) navigate('/register')
      else navigate('/matches')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: 48 }}>🪷</div>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#8B6914' }}>Signing you in…</p>
    </div>
  )
}
