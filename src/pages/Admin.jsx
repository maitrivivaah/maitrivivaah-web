import { useState, useEffect } from 'react'
import { adminAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const TABS = ['Dashboard', 'Users', 'Team']

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab]         = useState('Dashboard')
  const [stats, setStats]     = useState(null)
  const [users, setUsers]     = useState([])
  const [team, setTeam]       = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg]         = useState('')
  const [newMember, setNewMember] = useState({ full_name: '', email: '', role: 'moderator', phone: '' })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [tab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (tab === 'Dashboard') { const r = await adminAPI.getDashboard(); setStats(r.data) }
      if (tab === 'Users') { const r = await adminAPI.getUsers(1); setUsers(r.data) }
      if (tab === 'Team') { const r = await adminAPI.getTeam(); setTeam(r.data) }
    } catch { setMsg('Failed to load data') }
    setLoading(false)
  }

  const doAction = async (userId, action) => {
    if (action === 'delete' && !window.confirm('Delete this user permanently?')) return
    try {
      await adminAPI.userAction(userId, action)
      setMsg(`User ${action}d successfully`)
      loadData()
    } catch { setMsg('Action failed') }
  }

  const addMember = async (e) => {
    e.preventDefault()
    try {
      await adminAPI.createMember(newMember)
      setMsg('Team member created! Temporary password sent.')
      setShowForm(false)
      setNewMember({ full_name: '', email: '', role: 'moderator', phone: '' })
      loadData()
    } catch (err) { setMsg(err.response?.data?.detail || 'Failed to create member') }
  }

  const removeMember = async (id) => {
    if (!window.confirm('Remove this team member?')) return
    try { await adminAPI.deleteMember(id); setMsg('Removed'); loadData() }
    catch { setMsg('Failed') }
  }

  return (
    <div style={S.page}>
      <div style={S.sidebar}>
        <div style={S.brand}>🪷 Admin Panel</div>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ ...S.tabBtn, ...(tab === t ? S.tabActive : {}) }}>{t}</button>
        ))}
        <button onClick={() => navigate('/')} style={S.backBtn}>← Back to site</button>
      </div>

      <div style={S.main}>
        {msg && <div style={S.msg}>{msg} <button onClick={() => setMsg('')} style={S.close}>✕</button></div>}

        {/* DASHBOARD */}
        {tab === 'Dashboard' && (
          <div>
            <h2 style={S.heading}>Dashboard</h2>
            {loading ? <div style={S.spin}>Loading…</div> : stats && (
              <>
                <div style={S.statsGrid}>
                  {[
                    ['Total Users', stats.total_users, '👥'],
                    ['Active Users', stats.active_users, '✅'],
                    ['Male Profiles', stats.male_profiles, '👨'],
                    ['Female Profiles', stats.female_profiles, '👩'],
                    ['Paid Members', stats.paid_users, '💎'],
                    ['Today\'s Signups', stats.new_registrations_today, '🆕'],
                    ['This Week', stats.new_registrations_this_week, '📅'],
                  ].map(([label, val, icon]) => (
                    <div key={label} style={S.statCard}>
                      <div style={S.statIcon}>{icon}</div>
                      <div style={S.statNum}>{val}</div>
                      <div style={S.statLabel}>{label}</div>
                    </div>
                  ))}
                </div>
                <h3 style={S.subHead}>Plan Breakdown</h3>
                <div style={S.statsGrid}>
                  {Object.entries(stats.plan_breakdown || {}).map(([plan, count]) => (
                    <div key={plan} style={S.statCard}>
                      <div style={S.statNum}>{count}</div>
                      <div style={S.statLabel}>{plan.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* USERS */}
        {tab === 'Users' && (
          <div>
            <h2 style={S.heading}>All Users</h2>
            {loading ? <div style={S.spin}>Loading…</div> : (
              <div style={S.tableWrap}>
                <table style={S.table}>
                  <thead>
                    <tr>{['Name', 'Email', 'Phone', 'Status', 'Joined', 'Actions'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={S.tr}>
                        <td style={S.td}>{u.full_name || '—'}</td>
                        <td style={S.td}>{u.email}</td>
                        <td style={S.td}>{u.phone || '—'}</td>
                        <td style={S.td}>
                          <span style={{ ...S.pill, background: u.is_active ? '#E8F5E9' : '#FFEBEE', color: u.is_active ? '#2E7D32' : '#C62828' }}>
                            {u.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={S.td}>{u.created_at?.slice(0, 10)}</td>
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={() => doAction(u.id, u.is_active ? 'deactivate' : 'activate')} style={S.actionBtn}>
                              {u.is_active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button onClick={() => doAction(u.id, 'verify')} style={S.actionBtn}>Verify</button>
                            <button onClick={() => doAction(u.id, 'delete')} style={{ ...S.actionBtn, color: '#c62828', borderColor: '#FFCCCC' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TEAM */}
        {tab === 'Team' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={S.heading}>Team Management</h2>
              <button onClick={() => setShowForm(!showForm)} style={S.addBtn}>+ Add Member</button>
            </div>

            {showForm && (
              <form onSubmit={addMember} style={S.form}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: 16, color: '#8B6914' }}>New Team Member</h3>
                <div style={S.formGrid}>
                  {[['Full Name', 'full_name', 'text'], ['Email', 'email', 'email'], ['Phone', 'phone', 'tel']].map(([label, name, type]) => (
                    <div key={name}>
                      <label style={S.label}>{label}</label>
                      <input type={type} value={newMember[name]} onChange={e => setNewMember({ ...newMember, [name]: e.target.value })}
                        required={name !== 'phone'} style={S.input} />
                    </div>
                  ))}
                  <div>
                    <label style={S.label}>Role</label>
                    <select value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} style={S.input}>
                      <option value="moderator">Moderator</option>
                      <option value="support">Support</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <button type="submit" style={S.addBtn}>Create Member</button>
                  <button type="button" onClick={() => setShowForm(false)} style={S.cancelBtn}>Cancel</button>
                </div>
              </form>
            )}

            {loading ? <div style={S.spin}>Loading…</div> : (
              <div style={S.tableWrap}>
                <table style={S.table}>
                  <thead>
                    <tr>{['Name', 'Email', 'Role', 'Status', 'Actions'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {team.map(m => (
                      <tr key={m.id} style={S.tr}>
                        <td style={S.td}>{m.full_name}</td>
                        <td style={S.td}>{m.email}</td>
                        <td style={S.td}><span style={{ ...S.pill, background: '#FFF8E1', color: '#8B6914' }}>{m.role}</span></td>
                        <td style={S.td}><span style={{ ...S.pill, background: m.is_active ? '#E8F5E9' : '#FFEBEE', color: m.is_active ? '#2E7D32' : '#C62828' }}>{m.is_active ? 'Active' : 'Inactive'}</span></td>
                        <td style={S.td}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={() => adminAPI.resetPassword(m.id).then(() => setMsg('Password reset!'))} style={S.actionBtn}>Reset Pwd</button>
                            <button onClick={() => removeMember(m.id)} style={{ ...S.actionBtn, color: '#c62828', borderColor: '#FFCCCC' }}>Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const S = {
  page: { display: 'flex', minHeight: '100vh', background: '#F8F4EE' },
  sidebar: { width: 220, background: '#1A1A1A', display: 'flex', flexDirection: 'column', padding: '24px 0', gap: 4, flexShrink: 0 },
  brand: { color: '#C9A84C', fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, padding: '0 20px 20px' },
  tabBtn: { padding: '12px 20px', background: 'none', border: 'none', color: '#aaa', fontSize: 15, textAlign: 'left', cursor: 'pointer', borderRadius: 0 },
  tabActive: { background: '#2D2D2D', color: '#C9A84C', borderLeft: '3px solid #C9A84C' },
  backBtn: { marginTop: 'auto', padding: '12px 20px', background: 'none', border: 'none', color: '#666', fontSize: 14, textAlign: 'left', cursor: 'pointer' },
  main: { flex: 1, padding: '32px', overflowX: 'auto' },
  heading: { fontFamily: "'Playfair Display',serif", fontSize: 26, color: '#1A1A1A', marginBottom: 24 },
  subHead: { fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#8B6914', margin: '28px 0 16px' },
  msg: { background: '#E8F5E9', border: '1px solid #A5D6A7', color: '#2E7D32', borderRadius: 8, padding: '10px 14px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 },
  close: { background: 'none', border: 'none', cursor: 'pointer', color: '#666' },
  spin: { color: '#8B6914', fontSize: 16, padding: '20px 0' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 16, marginBottom: 8 },
  statCard: { background: '#fff', borderRadius: 12, padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  statIcon: { fontSize: 28, marginBottom: 8 },
  statNum: { fontSize: 30, fontWeight: 700, color: '#8B6914', fontFamily: "'Playfair Display',serif" },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  tableWrap: { overflowX: 'auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', background: '#F8F4EE', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#666', textTransform: 'uppercase', borderBottom: '1px solid #E8DCC8' },
  tr: { borderBottom: '1px solid #F0E8D8' },
  td: { padding: '12px 16px', fontSize: 14, color: '#333', verticalAlign: 'middle' },
  pill: { padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'inline-block' },
  actionBtn: { padding: '5px 12px', borderRadius: 6, border: '1px solid #E8DCC8', background: '#fff', color: '#555', fontSize: 12, cursor: 'pointer' },
  form: { background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6 },
  input: { width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #E8DCC8', fontSize: 14 },
  addBtn: { padding: '10px 22px', borderRadius: 8, background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 14 },
  cancelBtn: { padding: '10px 18px', borderRadius: 8, border: '1.5px solid #E8DCC8', background: '#fff', color: '#666', cursor: 'pointer', fontSize: 14 },
}
