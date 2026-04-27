import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>About MaitriVivaah</h1>
        <p style={s.heroSub}>Connecting Jain hearts with tradition and trust since our founding</p>
      </div>
      <div className="container" style={s.body}>
        <div style={s.missionBlock}>
          <h2 style={s.h2}>Our Mission 🪷</h2>
          <p style={s.p}>MaitriVivaah was founded with a single purpose — to give the Jain community a matrimony platform that truly understands its values, traditions, and the importance of sect, gotra, and kul in finding the right life partner.</p>
          <p style={s.p}>We believe that marriage is a sacred journey, and finding the right partner requires more than just swiping. It requires understanding, trust, and community.</p>
        </div>
        <div style={s.valuesGrid}>
          {[['🙏','Community First','Built exclusively for the Jain community. Every feature is designed keeping Jain traditions in mind.'],['🔒','Privacy & Safety','All profiles are manually verified. Your contact details stay hidden until you choose to share.'],['💯','No Fake Profiles','Our team personally reviews every registration before it goes live on the platform.'],['❤️','Real Connections','We focus on meaningful matches, not just numbers. Quality over quantity, always.']].map(([icon, title, desc]) => (
            <div key={title} style={s.valueCard}>
              <div style={s.valueIcon}>{icon}</div>
              <h3 style={s.valueTitle}>{title}</h3>
              <p style={s.valueDesc}>{desc}</p>
            </div>
          ))}
        </div>
        <div style={s.teamBlock}>
          <h2 style={s.h2}>Our Promise to You</h2>
          <p style={s.p}>Every family that joins MaitriVivaah becomes part of our community. We are here to guide you at every step — from creating your profile to making the final decision. Our WhatsApp support team is always a message away.</p>
          <Link to="/register" style={s.cta}>Join MaitriVivaah Today →</Link>
        </div>
      </div>
    </div>
  )
}

const s = {
  hero: { background: 'linear-gradient(135deg,#2D0A0A,#5C2A0A)', padding: '80px 20px', textAlign: 'center' },
  heroTitle: { fontFamily: "'Playfair Display',serif", fontSize: 44, color: '#fff', marginBottom: 16 },
  heroSub: { fontSize: 18, color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto' },
  body: { padding: '60px 20px' },
  missionBlock: { maxWidth: 720, margin: '0 auto 60px', textAlign: 'center' },
  h2: { fontFamily: "'Playfair Display',serif", fontSize: 32, color: '#1A1A1A', marginBottom: 20 },
  p: { fontSize: 16, color: '#555', lineHeight: 1.8, marginBottom: 16 },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 60 },
  valueCard: { background: '#fff', borderRadius: 16, padding: '32px 24px', textAlign: 'center', border: '1px solid #E8DCC8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  valueIcon: { fontSize: 40, marginBottom: 16 },
  valueTitle: { fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#1A1A1A', marginBottom: 10 },
  valueDesc: { fontSize: 14, color: '#666', lineHeight: 1.6 },
  teamBlock: { textAlign: 'center', maxWidth: 600, margin: '0 auto', padding: '48px 32px', background: '#FDF8F0', borderRadius: 20, border: '1px solid #E8DCC8' },
  cta: { display: 'inline-block', marginTop: 28, padding: '14px 36px', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 16 },
}
