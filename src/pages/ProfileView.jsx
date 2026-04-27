import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { profileAPI, matchAPI } from '../services/api'

export default function ProfileView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    profileAPI.getById(id)
      .then(r => setProfile(r.data))
      .catch(() => navigate('/matches'))
      .finally(() => setLoading(false))
  }, [id])

  const sendInterest = async () => {
    try {
      await matchAPI.sendInterest(id)
      setSent(true)
    } catch { setError('Could not send interest. Please try again.') }
  }

  if (loading) return <div style={S.loading}>🪷 Loading profile…</div>
  if (!profile) return null

  const fields = [
    ['Age', profile.age ? `${profile.age} years` : '—'],
    ['City', profile.city],
    ['State', profile.state],
    ['Jain Sect', profile.jain_sect?.replace('_', ' ')],
    ['Education', profile.education_level?.replace('_', ' ')],
    ['Occupation', profile.occupation || '—'],
    ['Annual Income', profile.annual_income || '—'],
    ['Marital Status', profile.marital_status?.replace('_', ' ')],
  ]

  return (
    <div style={S.page}>
      <div style={S.card}>

        {/* Header */}
        <div style={S.header}>
          <div style={S.photoWrap}>
            {profile.photo_url
              ? <img src={profile.photo_url} alt={profile.full_name} style={S.photo} />
              : <div style={S.photoPlaceholder}>{profile.full_name?.[0]}</div>
            }
          </div>
          <div style={S.headerInfo}>
            <div style={S.nameRow}>
              <h1 style={S.name}>{profile.full_name}</h1>
              {profile.is_verified && <span style={S.badge}>✓ Verified</span>}
            </div>
            <p style={S.subInfo}>{profile.occupation || 'Professional'} · {profile.city}, {profile.state}</p>
            {profile.compatibility_label && (
              <div style={S.match}>{profile.compatibility_label} · {profile.compatibility_score}%</div>
            )}
          </div>
        </div>

        {/* Details */}
        <div style={S.grid}>
          {fields.map(([label, val]) => (
            <div key={label} style={S.cell}>
              <div style={S.cellLabel}>{label}</div>
              <div style={S.cellVal}>{val || '—'}</div>
            </div>
          ))}
        </div>

        {/* About */}
        {profile.about_me && (
          <div style={S.section}>
            <h3 style={S.sectionTitle}>About</h3>
            <p style={S.aboutText}>{profile.about_me}</p>
          </div>
        )}

        {/* Actions */}
        {error && <div style={S.error}>{error}</div>}
        <div style={S.actions}>
          <button onClick={() => navigate(-1)} style={S.backBtn}>← Back</button>
          {sent
            ? <div style={S.sentMsg}>💌 Interest Sent!</div>
            : <button onClick={sendInterest} style={S.interestBtn}>💌 Send Interest</button>
          }
        </div>
      </div>
    </div>
  )
}

const S = {
  page: { minHeight: '100vh', background: '#FDF8F0', padding: '40px 20px' },
  loading: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#8B6914' },
  card: { maxWidth: 720, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' },
  header: { background: 'linear-gradient(135deg, #FDF3DC, #F5EDD8)', padding: '32px 32px 28px', display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' },
  photoWrap: { flexShrink: 0 },
  photo: { width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '3px solid #C9A84C' },
  photoPlaceholder: { width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, border: '3px solid #C9A84C' },
  headerInfo: { flex: 1 },
  nameRow: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  name: { fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#1A1A1A' },
  badge: { background: '#E8F5E9', color: '#2E7D32', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 },
  subInfo: { color: '#666', fontSize: 15, marginTop: 6 },
  match: { marginTop: 10, display: 'inline-block', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 20 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 1, background: '#F0E8D8', margin: '1px 0' },
  cell: { background: '#fff', padding: '16px 20px' },
  cellLabel: { fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 },
  cellVal: { fontSize: 15, color: '#1A1A1A', fontWeight: 500, textTransform: 'capitalize' },
  section: { padding: '24px 28px' },
  sectionTitle: { fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#8B6914', marginBottom: 10 },
  aboutText: { color: '#4A4A4A', lineHeight: 1.7, fontSize: 15 },
  error: { margin: '0 28px', background: '#FFF0F0', border: '1px solid #FFCCCC', color: '#CC0000', borderRadius: 8, padding: '10px 14px', fontSize: 14 },
  actions: { padding: '20px 28px 28px', display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { padding: '10px 20px', borderRadius: 8, border: '1.5px solid #E8DCC8', background: '#fff', color: '#666', fontSize: 14, fontWeight: 500 },
  interestBtn: { padding: '11px 28px', borderRadius: 10, background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none' },
  sentMsg: { color: '#8B6914', fontWeight: 600, fontSize: 16 },
}
