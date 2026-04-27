import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Register from './pages/Register'
import Matches from './pages/Matches'
import ProfileView from './pages/ProfileView'
import Plans from './pages/Plans'
import About from './pages/About'
import Admin from './pages/Admin'
import AuthCallback from './pages/AuthCallback'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', fontSize:'40px' }}>🪷</div>
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/signup"        element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/about"         element={<About />} />
        <Route path="/plans"         element={<Plans />} />
        <Route path="/register"      element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/matches"       element={<ProtectedRoute><Matches /></ProtectedRoute>} />
        <Route path="/profile/:id"   element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        <Route path="/admin"         element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
