import { useState, useEffect, useRef } from 'react'
import { profileAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef()

  useEffect(() => {
    profileAPI.getMe().then(r => {
      setProfile(r.data)
      setForm({ occupation: r.data.occupation||'', about_me: r.data.about_me||'', city: r.data.city||'', annual_income: r.data.annual_income||'' })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const res = await profileAPI.updateMe(form)
      setProfile(res.data)
      setEditing(false)
      setMsg('Profile updated!')
      setTimeout(() => setMsg(''), 3000)
    } catch { setMsg('Failed to save. Please try again.') }
    finally { setSaving(false) }
  }

  const uploadPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const res = await profileAPI.uploadPhoto(file)
      setProfile(p => ({ ...p, photo_url: res.data.photo_url }))
      setMsg('Photo updated!')
      setTimeout(() => setMsg(''), 3000)
    } catch { setMsg('Photo upload failed.') }
  }

  if (loading) return <div style={s.loading}>Loading your profile...</div>
  if (!profile) return (
    <div style={s.noProfile}>
      <div style={{ fontSize: 56 }}>🪷</div>
      <h2>No profile yet</h2>
      <p>Complete your registration to create your profile.</p>
      <a href="/register" style={s.btn}>Create Profile</a>
    </div>
  )

  const initials = profile.full_name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()

  return (
    <div style={s.page}>
      <div className="container">
        <div style={s.card}>
          {/* Photo section */}
          <div style={s.photoSection}>
            <div style={s.photoWrap}>
              {profile.photo_url
                ? <img src={profile.photo_url} alt="Profile" style={s.photo} />
                : <div style={s.initials}>{initials}</div>
              }
              <button style={s.photoBadge} onClick={() => fileRef.current.click()}>📷 Change</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={uploadPhoto} />
            </div>
            <div>
              <h1 style={s.name}>{profile.full_name}</h1>
              <div style={s.meta}>{profile.age} years · {profile.city}, {profile.state}</div>
              <div style={s.sect}>🪷 {profile.jain_sect}</div>
              {profile.is_verified && <div style={s.verifiedBadge}>✓ Verified Profile</div>}
              <div style={s.planBadge}>Plan: {profile.selected_plan?.toUpperCase()}</div>
            </div>
          </div>

          {msg && <div style={s.msg}>{msg}</div>}

          {/* Details */}
          <div style={s.section}>
            <div style={s.sectionHeader}>
              <h2 style={s.sectionTitle}>Profile Details</h2>
              {!editing
                ? <button style={s.editBtn} onClick={() => setEditing(true)}>Edit Profile</button>
                : <div style={{ display:'flex', gap:8 }}>
                    <button style={s.saveBtn} onClick={save} disabled={saving}>{saving?'Saving...':'Save'}</button>
                    <button style={s.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
                  </div>
              }
            </div>

            {editing ? (
              <div style={s.editForm}>
                {[['city','City','text'],['occupation','Occupation','text'],['annual_income','Annual Income','text']].map(([name,label,type]) => (
                  <div key={name} style={s.field}>
                    <label style={s.label}>{label}</label>
                    <input style={s.input} name={name} type={type} value={form[name]||''} onChange={e => setForm(f => ({...f,[e.target.name]:e.target.value}))} />
                  </div>
                ))}
                <div style={s.field}>
                  <label style={s.label}>About Me</label>
                  <textarea style={{...s.input, height:100}} name="about_me" value={form.about_me||''} onChange={e => setForm(f => ({...f,about_me:e.target.value}))} />
                </div>
              </div>
            ) : (
              <div style={s.detailsGrid}>
                {[['Gender', profile.gender],['Age', profile.age + ' years'],['City', profile.city],['State', profile.state],['Jain Sect', profile.jain_sect],['Marital Status', profile.marital_status?.replace('_',' ')],['Education', profile.education_level?.replace('_',' ')],['Occupation', profile.occupation],['Income', profile.annual_income]].filter(([,v])=>v).map(([k,v]) => (
                  <div key={k} style={s.detailItem}>
                    <div style={s.detailKey}>{k}</div>
                    <div style={s.detailVal}>{v}</div>
                  </div>
                ))}
              </div>
            )}

            {profile.about_me && !editing && (
              <div style={s.aboutBlock}>
                <div style={s.label}>About Me</div>
                <p style={s.aboutText}>{profile.about_me}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { padding: '48px 20px', minHeight: '80vh' },
  loading: { textAlign:'center', padding:80, color:'#888', fontSize:18 },
  noProfile: { textAlign:'center', padding:80, color:'#888' },
  card: { background:'#fff', borderRadius:20, padding:'40px', border:'1px solid #E8DCC8', boxShadow:'0 4px 24px rgba(0,0,0,0.07)' },
  photoSection: { display:'flex', alignItems:'flex-start', gap:32, marginBottom:40, flexWrap:'wrap' },
  photoWrap: { position:'relative', flexShrink:0 },
  photo: { width:140, height:140, borderRadius:'50%', objectFit:'cover', border:'4px solid #C9A84C' },
  initials: { width:140, height:140, borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#8B6914)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48, fontWeight:700, color:'#fff', fontFamily:"'Playfair Display',serif" },
  photoBadge: { position:'absolute', bottom:0, right:0, background:'#fff', border:'1px solid #E8DCC8', borderRadius:20, padding:'4px 10px', fontSize:12, fontWeight:600, cursor:'pointer' },
  name: { fontFamily:"'Playfair Display',serif", fontSize:28, color:'#1A1A1A', marginBottom:6 },
  meta: { fontSize:15, color:'#666', marginBottom:6 },
  sect: { fontSize:14, color:'#8B6914', fontWeight:600, marginBottom:8 },
  verifiedBadge: { display:'inline-block', background:'#F0FFF4', color:'#27AE60', border:'1px solid #A8E6BC', borderRadius:20, padding:'4px 12px', fontSize:12, fontWeight:700, marginRight:8, marginBottom:8 },
  planBadge: { display:'inline-block', background:'#FDF8F0', color:'#8B6914', border:'1px solid #E8DCC8', borderRadius:20, padding:'4px 12px', fontSize:12, fontWeight:700 },
  msg: { background:'#F0FFF4', color:'#27AE60', border:'1px solid #A8E6BC', borderRadius:8, padding:'10px 16px', marginBottom:20, fontSize:14 },
  section: {},
  sectionHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 },
  sectionTitle: { fontFamily:"'Playfair Display',serif", fontSize:24, color:'#1A1A1A' },
  editBtn: { padding:'8px 20px', border:'1.5px solid #C9A84C', color:'#8B6914', borderRadius:8, fontWeight:600, fontSize:14, background:'#fff' },
  saveBtn: { padding:'8px 20px', background:'linear-gradient(135deg,#C9A84C,#8B6914)', color:'#fff', border:'none', borderRadius:8, fontWeight:700, fontSize:14 },
  cancelBtn: { padding:'8px 16px', background:'#F5EDD8', color:'#8B6914', border:'none', borderRadius:8, fontWeight:600, fontSize:14 },
  detailsGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 },
  detailItem: { background:'#FAFAFA', borderRadius:10, padding:'14px 16px', border:'1px solid #F0E8D0' },
  detailKey: { fontSize:12, color:'#888', fontWeight:600, marginBottom:4, textTransform:'uppercase', letterSpacing:0.5 },
  detailVal: { fontSize:15, color:'#1A1A1A', fontWeight:600, textTransform:'capitalize' },
  editForm: { display:'flex', flexDirection:'column', gap:16 },
  field: { display:'flex', flexDirection:'column', gap:6 },
  label: { fontSize:13, fontWeight:600, color:'#4A4A4A' },
  input: { padding:'11px 13px', border:'1.5px solid #E8DCC8', borderRadius:8, fontSize:15, background:'#FAFAFA' },
  aboutBlock: { marginTop:24, padding:'20px', background:'#FDF8F0', borderRadius:12, border:'1px solid #E8DCC8' },
  aboutText: { fontSize:15, color:'#555', lineHeight:1.7, marginTop:8 },
  btn: { display:'inline-block', marginTop:20, padding:'12px 28px', background:'linear-gradient(135deg,#C9A84C,#8B6914)', color:'#fff', borderRadius:10, fontWeight:700 },
}
