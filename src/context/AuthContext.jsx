import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token    = localStorage.getItem('mv_token')
    const userData = localStorage.getItem('mv_user')
    if (token && userData) {
      try { setUser(JSON.parse(userData)) } catch { localStorage.clear() }
    }
    setLoading(false)
  }, [])

  const login = (tokenData) => {
    localStorage.setItem('mv_token', tokenData.access_token)
    localStorage.setItem('mv_refresh', tokenData.refresh_token)
    const userData = {
      id:          tokenData.user_id,
      email:       tokenData.email,
      full_name:   tokenData.full_name,
      has_profile: tokenData.has_profile,
    }
    localStorage.setItem('mv_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    localStorage.setItem('mv_user', JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
