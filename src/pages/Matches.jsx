import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { matchAPI } from '../services/api'

export default function Matches() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ jain_sect: '', min_age: '', max_age: '', city: '' })
  const [sentInterests, setSentInterests] = useState(new Set())

  useEffect(() => { fetchMatches() }, [])

  const fetchMatches = async (f = filters) => {
    setLoading(true)
    try {
      const params = Object.fromEntries(Object.entries(f).filter(([, v]) => v))
      const res = await matchAPI.browse(params)
      setProfiles(res.data)
    } catch {
      setProfiles([])
    } finally {
      setLoading(false)
    }
  }

  const sendInterest = async (profileId, name) => {
    try {
      await matchAPI.sendInterest(profileId)
      setSentInterests(s => new Set([...s, profileId]))
    } catch {}
  }

  const hf = (e) => setFilters(f => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <div style={s.page}>
      <div className="container">
        <h1 style={s.title}>Browse Matches</h1>
        <p style={s.sub}>Find your perfect Jain life partner</p>

        {/* Filters */}
        <div style={s.filters}>
          <select style={s.filter} name="jain_sect" value={filters.jain_sect} onChange={hf}>
            <option value="">All Sects</option>
            <option value="digambar">Digambar</option>
            <option value="shwetambar">Shwetambar</option>
            <option value="sthanakvasi">Sthanakvasi</option>
            <option value="terapanthi">Terapanthi</option>
          </select>
          <input style={s.filter} name="min_age" type="number" placeholder="Min Age" value={filters.min_age} onChange={hf} />
          <input style={s.filter} name="max_age" type="number" placeholder="Max Age" value={filters.max_age} onChange={hf} />
          <input style={s.filter} name="city" placeholder="City" value={filters.city} onChange={hf} />
          <button style={s.searchBtn} onClick={() => fetchMatches()}>Search</button>
          <button style={s.clearBtn} onClick={() => { setFilters({ jain_sect:'', min_age:'', max_age:'', city:'' }); fetchMatches({}) }}>Clear</button>
        </div>

        {loading ? (
          <div style={s.loading}>
            <div style={s.spinner} />
            <p>Finding matches...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div style={s.empty}>
            <div style={s.emptyIcon}>🔍</div>
            <h3>No profiles found</h3>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p style={s.count}>{profiles.length} profiles found</p>
            <div style={s.grid}>
              {profiles.map(p => (
                <div key={p.id} style={s.card}>
                  {/* Photo */}
                  <div style={s.photoWrap}>
                    {p.photo_url ? (
                      <img src={p.photo_url} alt={p.full_name} style={s.photo} />
                    ) : (
                      <div style={s.initials}>
                        {p.full_name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    {p.is_verified && <div style={s.verifiedBadge}>✓ Verified</div>}
                    {p.compatibility_score && (
                      <div style={s.scoreBadge}>{p.compatibility_score}% Match</div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={s.info}>
                    <h3 style={s.name}>{p.full_name}</h3>
                    <div style={s.details}>
                      {p.age && <span style={s.detail}>🎂 {p.age} yrs</span>}
                      <span style={s.detail}>📍 {p.city}</span>
                      <span style={s.detail}>🪷 {p.jain_sect}</span>
                      {p.occupation && <span style={s.detail}>💼 {p.occupation}</span>}
                    </div>
                    {p.compatibility_label && (
                      <div style={s.matchLabel}>{p.compatibility_label}</div>
                    )}
                    <div style={s.cardActions}>
                      <Link to={`/profile/${p.id}`} style={s.viewBtn}>View Profile</Link>
                      <button
                        style={{ ...s.interestBtn, ...(sentInterests.has(p.id) ? s.interestSent : {}) }}
                        onClick={() => sendInterest(p.id, p.full_name)}
                        disabled={sentInterests.has(p.id)}
                      >
                        {sentInterests.has(p.id) ? '✓ Interest Sent' : '💌 Send Interest'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const s = {
  page: { padding: '48px 20px', minHeight: '80vh' },
  title: { fontFamily: "'Playfair Display',serif", fontSize: 36, color: '#1A1A1A', marginBottom: 8 },
  sub: { color: '#888', fontSize: 16, marginBottom: 32 },
  filters: { display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32, background: '#fff', padding: 20, borderRadius: 14, border: '1px solid #E8DCC8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  filter: { padding: '10px 13px', border: '1.5px solid #E8DCC8', borderRadius: 8, fontSize: 14, background: '#FAFAFA', minWidth: 140 },
  searchBtn: { padding: '10px 24px', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14 },
  clearBtn: { padding: '10px 18px', background: '#F5EDD8', color: '#8B6914', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14 },
  loading: { textAlign: 'center', padding: 80, color: '#888' },
  spinner: { width: 48, height: 48, border: '4px solid #F0E8D0', borderTop: '4px solid #C9A84C', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' },
  empty: { textAlign: 'center', padding: 80, color: '#888' },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  count: { color: '#888', fontSize: 14, marginBottom: 20 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 },
  card: { background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #E8DCC8', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'transform .2s' },
  photoWrap: { position: 'relative', height: 220, background: 'linear-gradient(135deg,#F5EDD8,#E8DCC8)' },
  photo: { width: '100%', height: '100%', objectFit: 'cover' },
  initials: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 700, color: '#C9A84C', fontFamily: "'Playfair Display',serif" },
  verifiedBadge: { position: 'absolute', top: 10, left: 10, background: '#27AE60', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10 },
  scoreBadge: { position: 'absolute', top: 10, right: 10, background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 10 },
  info: { padding: '20px' },
  name: { fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#1A1A1A', marginBottom: 10 },
  details: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  detail: { fontSize: 13, color: '#666', background: '#F5EDD8', padding: '3px 10px', borderRadius: 12 },
  matchLabel: { fontSize: 12, color: '#8B6914', fontWeight: 700, marginBottom: 12, background: '#FDF8F0', padding: '4px 10px', borderRadius: 8, display: 'inline-block' },
  cardActions: { display: 'flex', gap: 8, marginTop: 12 },
  viewBtn: { flex: 1, padding: '9px', border: '1.5px solid #C9A84C', color: '#8B6914', borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: 'center' },
  interestBtn: { flex: 1, padding: '9px', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600 },
  interestSent: { background: '#27AE60' },
}
