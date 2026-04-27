import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

// Auto-attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('mv_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-logout on 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login:  (data) => API.post('/auth/login', data),
  googleLogin: () => { window.location.href = `${API.defaults.baseURL}/auth/google` },
  setPassword: (password) => API.post('/auth/set-password', { password }),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
}

export const profileAPI = {
  create:      (data) => API.post('/profiles/', data),
  getMe:       () => API.get('/profiles/me'),
  updateMe:    (data) => API.patch('/profiles/me', data),
  uploadPhoto: (file) => {
    const form = new FormData()
    form.append('file', file)
    return API.post('/profiles/me/photo', form, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  getById: (id) => API.get(`/profiles/${id}`),
}

export const matchAPI = {
  browse: (params) => API.get('/matches/', { params }),
  sendInterest: (profileId) => API.post(`/matches/${profileId}/interest`),
  getReceived: () => API.get('/matches/interests/received'),
  getSent:     () => API.get('/matches/interests/sent'),
}

export const planAPI = {
  getAll:   () => API.get('/plans/'),
  getMine:  () => API.get('/plans/me'),
  upgrade:  (plan, ref) => API.post('/plans/upgrade', { plan, payment_reference: ref }),
}

export const adminAPI = {
  getDashboard: () => API.get('/admin/dashboard'),
  getUsers:     (page) => API.get('/admin/users', { params: { page } }),
  userAction:   (id, action, reason) => API.patch(`/admin/users/${id}`, { action, reason }),
  getTeam:      () => API.get('/admin/team'),
  createMember: (data) => API.post('/admin/team', data),
  updateMember: (id, data) => API.patch(`/admin/team/${id}`, data),
  deleteMember: (id) => API.delete(`/admin/team/${id}`),
  resetPassword:(id) => API.post(`/admin/team/${id}/reset-password`),
}

export default API
