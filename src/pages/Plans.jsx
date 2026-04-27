import { useEffect, useState } from 'react'
import { planAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Plans() {
  const { user } = useAuth()
  const [plans, setPlans] = useState({})
  const [myPlan, setMyPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    planAPI.getAll().then(r => setPlans(r.data)).catch(() => {})
    if (user) planAPI.getMine().then(r => setMyPlan(r.data)).catch(() => {})
    setLoading(false)
  }, [user])

  const planOrder = ['free', 'silver', 'gold', 'platinum']
  const planColors = { free: '#888', silver: '#8A8A8A', gold: '#C9A84C', platinum: '#8B1A1A' }

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Choose Your Plan</h1>
        <p style={s.heroSub}>Upgrade to find your perfect Jain life partner faster</p>
        {myPlan && <div style={s.currentPlan}>Your current plan: <strong>{myPlan.current_plan?.toUpperCase()}</strong></div>}
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={s.grid}>
          {planOrder.map(planId => {
            const p = plans[planId]
            if (!p) return null
            const isActive = myPlan?.current_plan === planId
            const isGold = planId === 'gold'
            return (
              <div key={planId} style={{ ...s.card, ...(isGold ? s.cardFeatured : {}), ...(isActive ? s.cardActive : {}) }}>
                {isGold && <div style={s.badge}>Most Popular</div>}
                {isActive && <div style={{ ...s.badge, background: '#27AE60' }}>Your Plan</div>}
                <div style={{ ...s.planIcon, color: planColors[planId] }}>
                  {planId === 'free' ? '🌱' : planId === 'silver' ? '🥈' : planId === 'gold' ? '🥇' : '💎'}
                </div>
                <h2 style={s.planName}>{p.name}</h2>
                <div style={s.price}>₹{p.price_inr.toLocaleString()}</div>
                <div style={s.duration}>{p.duration_days} days</div>
                <div style={s.features}>
                  {[
                    [`📷 Up to ${p.max_photos} photos`, true],
                    ['👁️ View contact details', p.can_view_contact],
                    ['💌 Send interest', p.can_send_interest],
                    ['⭐ Featured listing', p.featured_listing],
                    ['🎯 AI match score', p.ai_match_score],
                    ['💬 Priority support', p.priority_support],
                  ].map(([feat, enabled], i) => (
                    <div key={i} style={{ ...s.feat, opacity: enabled ? 1 : 0.4 }}>
                      <span style={s.featCheck}>{enabled ? '✓' : '✗'}</span> {feat}
                    </div>
                  ))}
                </div>
                {!isActive && planId !== 'free' && (
                  <a
                    href={`https://wa.me/${(import.meta.env.VITE_ADMIN_WHATSAPP||'919999999999').replace(/\D/g,'')}?text=I want to upgrade to ${p.name} plan on MaitriVivaah`}
                    target="_blank" rel="noreferrer"
                    style={{ ...s.upgradeBtn, background: isGold ? 'linear-gradient(135deg,#C9A84C,#8B6914)' : '#1A1A1A' }}
                  >
                    Upgrade via WhatsApp
                  </a>
                )}
                {isActive && <div style={s.activeLabel}>✓ Active</div>}
                {planId === 'free' && !user && (
                  <a href="/register" style={{ ...s.upgradeBtn, background: '#4A4A4A' }}>Get Started Free</a>
                )}
              </div>
            )
          })}
        </div>
        <p style={s.note}>💬 To upgrade, click the button or WhatsApp us. We'll activate your plan within a few hours.</p>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh' },
  hero: { background: 'linear-gradient(135deg,#2D0A0A,#5C2A0A)', padding: '80px 20px', textAlign: 'center' },
  heroTitle: { fontFamily: "'Playfair Display',serif", fontSize: 44, color: '#fff', marginBottom: 16 },
  heroSub: { fontSize: 18, color: 'rgba(255,255,255,0.8)' },
  currentPlan: { marginTop: 20, display: 'inline-block', background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.5)', color: '#F0D080', padding: '8px 20px', borderRadius: 20, fontSize: 14 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 40 },
  card: { background: '#fff', borderRadius: 20, padding: '32px 24px', border: '2px solid #E8DCC8', position: 'relative', textAlign: 'center' },
  cardFeatured: { border: '2px solid #C9A84C', boxShadow: '0 8px 40px rgba(201,168,76,0.2)', transform: 'scale(1.03)' },
  cardActive: { border: '2px solid #27AE60' },
  badge: { position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#C9A84C', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 16px', borderRadius: 12, whiteSpace: 'nowrap' },
  planIcon: { fontSize: 40, marginBottom: 12 },
  planName: { fontFamily: "'Playfair Display',serif", fontSize: 26, color: '#1A1A1A', marginBottom: 8 },
  price: { fontSize: 36, fontWeight: 700, color: '#8B6914', marginBottom: 4 },
  duration: { fontSize: 13, color: '#888', marginBottom: 24 },
  features: { textAlign: 'left', marginBottom: 28 },
  feat: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#4A4A4A', padding: '5px 0', borderBottom: '1px solid #F5EDD8' },
  featCheck: { fontWeight: 700, fontSize: 14, width: 16 },
  upgradeBtn: { display: 'block', width: '100%', padding: '12px', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 14, textAlign: 'center' },
  activeLabel: { padding: '12px', background: '#F0FFF4', color: '#27AE60', borderRadius: 10, fontWeight: 700, fontSize: 14 },
  note: { textAlign: 'center', fontSize: 14, color: '#888', background: '#FDF8F0', padding: '16px', borderRadius: 10, border: '1px solid #E8DCC8' },
}
