import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const stats = [
  { number: '10,000+', label: 'Registered Profiles' },
  { number: '2,500+', label: 'Successful Matches' },
  { number: '500+', label: 'Happy Couples' },
  { number: '100%', label: 'Jain Community' },
]

const steps = [
  { icon: '📋', title: 'Register Free', desc: 'Create your profile in minutes with all your details and preferences.' },
  { icon: '💑', title: 'Browse Matches', desc: 'Explore verified Jain profiles filtered by sect, location, education and more.' },
  { icon: '💌', title: 'Express Interest', desc: 'Send interest to profiles you like. Get notified when they respond.' },
  { icon: '🪷', title: 'Begin Your Journey', desc: 'Connect, talk, and start your beautiful life together.' },
]

const testimonials = [
  { names: 'Priya & Rahul', sect: 'Shwetambar', city: 'Mumbai', text: 'MaitriVivaah helped us find each other. The profile matching was spot on. We got married within 6 months!', year: '2023' },
  { names: 'Sneha & Nikhil', sect: 'Digambar', city: 'Pune', text: 'We had tried other apps but MaitriVivaah felt different — it truly understands the Jain way of life.', year: '2024' },
  { names: 'Komal & Arjun', sect: 'Sthanakvasi', city: 'Surat', text: 'Our families both loved how the platform worked. Simple, respectful and community-focused.', year: '2024' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroOverlay} />
        <div style={s.heroContent}>
          <p style={s.heroTag}>🪷 Trusted Jain Matrimony</p>
          <h1 style={s.heroTitle}>Find Your<br /><span style={s.heroGold}>Jain Life Partner</span></h1>
          <p style={s.heroSub}>Connecting Jain hearts across India with trust, tradition, and modern convenience.</p>
          <div style={s.heroBtns}>
            {user ? (
              <Link to="/matches" style={s.btnPrimary}>Browse Matches →</Link>
            ) : (
              <>
                <Link to="/register" style={s.btnPrimary}>Register Free</Link>
                <Link to="/login" style={s.btnSecondary}>Login</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={s.statsBar}>
        {stats.map((st, i) => (
          <div key={i} style={s.stat}>
            <div style={s.statNum}>{st.number}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section style={s.section}>
        <div className="container">
          <h2 style={s.sectionTitle}>How MaitriVivaah Works</h2>
          <p style={s.sectionSub}>Finding your life partner in 4 simple steps</p>
          <div style={s.stepsGrid}>
            {steps.map((step, i) => (
              <div key={i} style={s.stepCard}>
                <div style={s.stepIcon}>{step.icon}</div>
                <div style={s.stepNum}>Step {i + 1}</div>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MaitriVivaah */}
      <section style={s.whySection}>
        <div className="container">
          <h2 style={{...s.sectionTitle, color: '#fff'}}>Why Choose MaitriVivaah?</h2>
          <div style={s.whyGrid}>
            {[
              { icon: '✅', title: 'Verified Profiles', desc: 'Every profile is manually reviewed by our team before going live.' },
              { icon: '🔒', title: 'Privacy Protected', desc: 'Your contact details are hidden until you choose to share them.' },
              { icon: '🪷', title: 'Jain-Specific', desc: 'Filters for Jain sect, gotra, kul, natak — features no other platform offers.' },
              { icon: '💬', title: 'WhatsApp Support', desc: 'Our team is available on WhatsApp to help you at every step.' },
              { icon: '📱', title: 'Works on All Devices', desc: 'Use MaitriVivaah on your phone, tablet or computer seamlessly.' },
              { icon: '💰', title: 'Affordable Plans', desc: 'Starting from free. Upgrade only when you are ready.' },
            ].map((w, i) => (
              <div key={i} style={s.whyCard}>
                <div style={s.whyIcon}>{w.icon}</div>
                <h3 style={s.whyTitle}>{w.title}</h3>
                <p style={s.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={s.section}>
        <div className="container">
          <h2 style={s.sectionTitle}>Success Stories</h2>
          <p style={s.sectionSub}>Real couples who found love on MaitriVivaah</p>
          <div style={s.testiGrid}>
            {testimonials.map((t, i) => (
              <div key={i} style={s.testiCard}>
                <div style={s.testiQuote}>"</div>
                <p style={s.testiText}>{t.text}</p>
                <div style={s.testiNames}>{t.names}</div>
                <div style={s.testiMeta}>{t.sect} · {t.city} · Married {t.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <h2 style={s.ctaTitle}>Your Life Partner is Waiting 🪷</h2>
        <p style={s.ctaSub}>Join thousands of Jain families who trust MaitriVivaah</p>
        <Link to="/register" style={s.ctaBtn}>Create Your Free Profile</Link>
      </section>
    </div>
  )
}

const s = {
  hero: { position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2D0A0A 0%, #5C2A0A 40%, #8B6914 100%)', overflow: 'hidden' },
  heroOverlay: { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(139,26,26,0.2) 0%, transparent 50%)' },
  heroContent: { position: 'relative', textAlign: 'center', padding: '0 20px', maxWidth: 700 },
  heroTag: { display: 'inline-block', background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 20, padding: '6px 18px', color: '#F0D080', fontSize: 14, marginBottom: 24, letterSpacing: 0.5 },
  heroTitle: { fontSize: 'clamp(40px, 7vw, 72px)', fontFamily: "'Playfair Display',serif", fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 20 },
  heroGold: { color: '#F0D080' },
  heroSub: { fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' },
  heroBtns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: { padding: '14px 36px', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 16, boxShadow: '0 4px 20px rgba(201,168,76,0.4)' },
  btnSecondary: { padding: '14px 36px', border: '2px solid rgba(201,168,76,0.6)', color: '#F0D080', borderRadius: 10, fontWeight: 600, fontSize: 16 },
  statsBar: { background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
  stat: { padding: '28px 20px', textAlign: 'center', borderRight: '1px solid #E8DCC8' },
  statNum: { fontSize: 32, fontWeight: 700, color: '#8B6914', fontFamily: "'Playfair Display',serif" },
  statLabel: { fontSize: 14, color: '#888', marginTop: 4 },
  section: { padding: '80px 20px' },
  sectionTitle: { textAlign: 'center', fontSize: 36, fontFamily: "'Playfair Display',serif", color: '#1A1A1A', marginBottom: 12 },
  sectionSub: { textAlign: 'center', color: '#888', marginBottom: 48, fontSize: 16 },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 },
  stepCard: { background: '#fff', borderRadius: 16, padding: '32px 24px', textAlign: 'center', border: '1px solid #E8DCC8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  stepIcon: { fontSize: 40, marginBottom: 12 },
  stepNum: { fontSize: 12, color: '#C9A84C', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  stepTitle: { fontFamily: "'Playfair Display',serif", fontSize: 20, marginBottom: 10, color: '#1A1A1A' },
  stepDesc: { fontSize: 14, color: '#666', lineHeight: 1.6 },
  whySection: { background: 'linear-gradient(135deg,#2D0A0A,#5C2A0A)', padding: '80px 20px' },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 48 },
  whyCard: { background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.2)' },
  whyIcon: { fontSize: 32, marginBottom: 14 },
  whyTitle: { fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#F0D080', marginBottom: 10 },
  whyDesc: { fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 },
  testiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 },
  testiCard: { background: '#fff', borderRadius: 16, padding: '32px 28px', border: '1px solid #E8DCC8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', position: 'relative' },
  testiQuote: { fontSize: 64, color: '#F0D080', fontFamily: "'Playfair Display',serif", lineHeight: 1, marginBottom: -10 },
  testiText: { fontSize: 15, color: '#4A4A4A', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' },
  testiNames: { fontWeight: 700, fontSize: 16, color: '#1A1A1A', fontFamily: "'Playfair Display',serif" },
  testiMeta: { fontSize: 13, color: '#C9A84C', marginTop: 4 },
  cta: { background: 'linear-gradient(135deg,#C9A84C,#8B6914)', padding: '80px 20px', textAlign: 'center' },
  ctaTitle: { fontFamily: "'Playfair Display',serif", fontSize: 40, color: '#fff', marginBottom: 16 },
  ctaSub: { fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 36 },
  ctaBtn: { display: 'inline-block', padding: '16px 44px', background: '#fff', color: '#8B6914', borderRadius: 12, fontWeight: 700, fontSize: 17, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' },
}
