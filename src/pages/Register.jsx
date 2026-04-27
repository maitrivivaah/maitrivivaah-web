import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI, profileAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const STEPS = ['Account', 'Personal', 'Religion', 'Career', 'Partner', 'Plan']

const PLANS = [
  { id: 'free', name: 'Free', price: '₹0', duration: '30 days', features: ['1 photo', 'Browse profiles', 'Send interests'] },
  { id: 'silver', name: 'Silver', price: '₹999', duration: '90 days', features: ['5 photos', 'View contacts', 'Priority listing'] },
  { id: 'gold', name: 'Gold', price: '₹2,499', duration: '180 days', features: ['10 photos', 'AI match score', 'Featured profile', 'Priority support'] },
  { id: 'platinum', name: 'Platinum', price: '₹4,999', duration: '365 days', features: ['20 photos', 'All Gold features', 'Top placement', 'Dedicated support'] },
]

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [account, setAccount] = useState({ email: '', password: '', confirm: '', full_name: '', phone: '' })
  const [personal, setPersonal] = useState({ date_of_birth: '', gender: '', height_cm: '', city: '', state: '', marital_status: 'never_married', mother_tongue: '', about_me: '' })
  const [religion, setReligion] = useState({ jain_sect: '', gotra: '', kul: '' })
  const [career, setCareer] = useState({ education_level: '', occupation: '', annual_income: '', employer: '' })
  const [partner, setPartner] = useState({ partner_age_min: '', partner_age_max: '', partner_jain_sect: [] })
  const [plan, setPlan] = useState('free')

  const next = () => { setError(''); setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)

  const h = (setter) => (e) => setter(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async () => {
    if (account.password !== account.confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    try {
      const signupRes = await authAPI.signup({ email: account.email, password: account.password, full_name: account.full_name, phone: account.phone })
      login(signupRes.data)

      const profileData = {
        ...personal,
        ...religion,
        ...career,
        ...partner,
        selected_plan: plan,
        height_cm: personal.height_cm ? parseInt(personal.height_cm) : null,
        partner_age_min: partner.partner_age_min ? parseInt(partner.partner_age_min) : null,
        partner_age_max: partner.partner_age_max ? parseInt(partner.partner_age_max) : null,
      }
      await profileAPI.create(profileData)
      navigate('/matches')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <h1 style={s.title}>🪷 Create Your Profile</h1>
          <p style={s.sub}>Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>

        {error && <div style={s.error}>{error}</div>}

        {/* STEP 0: Account */}
        {step === 0 && (
          <div style={s.fields}>
            <h2 style={s.stepHead}>Account Details</h2>
            {[['full_name','Full Name','text','Enter your full name'],['email','Email','email','you@example.com'],['phone','WhatsApp Number','tel','+91 9876543210'],['password','Password','password','Min 8 characters'],['confirm','Confirm Password','password','Re-enter password']].map(([name, label, type, ph]) => (
              <div key={name} style={s.field}>
                <label style={s.label}>{label}</label>
                <input style={s.input} name={name} type={type} placeholder={ph} value={account[name]} onChange={h(setAccount)} />
              </div>
            ))}
            <button style={s.btn} onClick={next} disabled={!account.email || !account.password || !account.full_name}>Next →</button>
            <p style={s.loginLink}>Already registered? <Link to="/login" style={s.link}>Login</Link></p>
          </div>
        )}

        {/* STEP 1: Personal */}
        {step === 1 && (
          <div style={s.fields}>
            <h2 style={s.stepHead}>Personal Details</h2>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Date of Birth</label>
                <input style={s.input} name="date_of_birth" type="date" value={personal.date_of_birth} onChange={h(setPersonal)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Gender</label>
                <select style={s.input} name="gender" value={personal.gender} onChange={h(setPersonal)}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Height (cm)</label>
                <input style={s.input} name="height_cm" type="number" placeholder="e.g. 170" value={personal.height_cm} onChange={h(setPersonal)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Mother Tongue</label>
                <input style={s.input} name="mother_tongue" placeholder="e.g. Hindi, Gujarati" value={personal.mother_tongue} onChange={h(setPersonal)} />
              </div>
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>City</label>
                <input style={s.input} name="city" placeholder="e.g. Mumbai" value={personal.city} onChange={h(setPersonal)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>State</label>
                <input style={s.input} name="state" placeholder="e.g. Maharashtra" value={personal.state} onChange={h(setPersonal)} />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Marital Status</label>
              <select style={s.input} name="marital_status" value={personal.marital_status} onChange={h(setPersonal)}>
                <option value="never_married">Never Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>About Me</label>
              <textarea style={{ ...s.input, height: 90 }} name="about_me" placeholder="Write a short intro about yourself..." value={personal.about_me} onChange={h(setPersonal)} />
            </div>
            <div style={s.navBtns}>
              <button style={s.backBtn} onClick={back}>← Back</button>
              <button style={s.btn} onClick={next} disabled={!personal.gender || !personal.date_of_birth || !personal.city}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 2: Religion */}
        {step === 2 && (
          <div style={s.fields}>
            <h2 style={s.stepHead}>Jain Background</h2>
            <div style={s.field}>
              <label style={s.label}>Jain Sect *</label>
              <select style={s.input} name="jain_sect" value={religion.jain_sect} onChange={h(setReligion)}>
                <option value="">Select your sect</option>
                <option value="digambar">Digambar</option>
                <option value="shwetambar">Shwetambar</option>
                <option value="sthanakvasi">Sthanakvasi</option>
                <option value="terapanthi">Terapanthi</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Gotra</label>
                <input style={s.input} name="gotra" placeholder="e.g. Golecha" value={religion.gotra} onChange={h(setReligion)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Kul</label>
                <input style={s.input} name="kul" placeholder="e.g. Oswaal" value={religion.kul} onChange={h(setReligion)} />
              </div>
            </div>
            <div style={s.navBtns}>
              <button style={s.backBtn} onClick={back}>← Back</button>
              <button style={s.btn} onClick={next} disabled={!religion.jain_sect}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 3: Career */}
        {step === 3 && (
          <div style={s.fields}>
            <h2 style={s.stepHead}>Education & Career</h2>
            <div style={s.field}>
              <label style={s.label}>Education Level</label>
              <select style={s.input} name="education_level" value={career.education_level} onChange={h(setCareer)}>
                <option value="">Select</option>
                <option value="high_school">High School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Occupation</label>
              <input style={s.input} name="occupation" placeholder="e.g. Software Engineer, Business Owner" value={career.occupation} onChange={h(setCareer)} />
            </div>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Employer / Company</label>
                <input style={s.input} name="employer" placeholder="Company name" value={career.employer} onChange={h(setCareer)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Annual Income</label>
                <select style={s.input} name="annual_income" value={career.annual_income} onChange={h(setCareer)}>
                  <option value="">Select range</option>
                  {['Below 3 LPA','3-5 LPA','5-10 LPA','10-20 LPA','20-50 LPA','50+ LPA'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div style={s.navBtns}>
              <button style={s.backBtn} onClick={back}>← Back</button>
              <button style={s.btn} onClick={next}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 4: Partner Preferences */}
        {step === 4 && (
          <div style={s.fields}>
            <h2 style={s.stepHead}>Partner Preferences</h2>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Age From</label>
                <input style={s.input} name="partner_age_min" type="number" placeholder="e.g. 22" value={partner.partner_age_min} onChange={h(setPartner)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Age To</label>
                <input style={s.input} name="partner_age_max" type="number" placeholder="e.g. 32" value={partner.partner_age_max} onChange={h(setPartner)} />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Preferred Jain Sect</label>
              <div style={s.checkGroup}>
                {['digambar','shwetambar','sthanakvasi','terapanthi','other'].map(sect => (
                  <label key={sect} style={s.checkLabel}>
                    <input type="checkbox" checked={partner.partner_jain_sect.includes(sect)}
                      onChange={(e) => {
                        setPartner(p => ({
                          ...p,
                          partner_jain_sect: e.target.checked
                            ? [...p.partner_jain_sect, sect]
                            : p.partner_jain_sect.filter(x => x !== sect)
                        }))
                      }} />
                    {sect.charAt(0).toUpperCase() + sect.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <div style={s.navBtns}>
              <button style={s.backBtn} onClick={back}>← Back</button>
              <button style={s.btn} onClick={next}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 5: Plan */}
        {step === 5 && (
          <div style={s.fields}>
            <h2 style={s.stepHead}>Choose Your Plan</h2>
            <div style={s.plansGrid}>
              {PLANS.map(p => (
                <div key={p.id} style={{ ...s.planCard, ...(plan === p.id ? s.planActive : {}) }} onClick={() => setPlan(p.id)}>
                  {p.id === 'gold' && <div style={s.planBadge}>Popular</div>}
                  <div style={s.planName}>{p.name}</div>
                  <div style={s.planPrice}>{p.price}</div>
                  <div style={s.planDur}>{p.duration}</div>
                  {p.features.map(f => <div key={f} style={s.planFeat}>✓ {f}</div>)}
                </div>
              ))}
            </div>
            <div style={s.navBtns}>
              <button style={s.backBtn} onClick={back}>← Back</button>
              <button style={{ ...s.btn, background: loading ? '#ccc' : 'linear-gradient(135deg,#C9A84C,#8B6914)' }} onClick={submit} disabled={loading}>
                {loading ? 'Creating Profile...' : '🪷 Complete Registration'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg,#FDF8F0,#F5EDD8)', padding: '40px 20px', display: 'flex', justifyContent: 'center' },
  card: { background: '#fff', borderRadius: 20, padding: '40px', width: '100%', maxWidth: 640, boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #E8DCC8', height: 'fit-content' },
  header: { marginBottom: 32 },
  title: { fontFamily: "'Playfair Display',serif", fontSize: 26, color: '#1A1A1A', marginBottom: 6 },
  sub: { fontSize: 14, color: '#888', marginBottom: 14 },
  progressBar: { height: 6, background: '#F0E8D0', borderRadius: 3 },
  progressFill: { height: '100%', background: 'linear-gradient(90deg,#C9A84C,#8B6914)', borderRadius: 3, transition: 'width .4s' },
  error: { background: '#FFF5F5', border: '1px solid #FFC0C0', color: '#C0392B', borderRadius: 8, padding: '12px 16px', fontSize: 14, marginBottom: 20 },
  fields: { display: 'flex', flexDirection: 'column', gap: 18 },
  stepHead: { fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#1A1A1A', marginBottom: 4 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#4A4A4A' },
  input: { padding: '11px 13px', border: '1.5px solid #E8DCC8', borderRadius: 8, fontSize: 15, outline: 'none', background: '#FAFAFA' },
  btn: { padding: '13px', background: 'linear-gradient(135deg,#C9A84C,#8B6914)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, flex: 1 },
  backBtn: { padding: '13px 20px', background: '#F5EDD8', color: '#8B6914', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 15 },
  navBtns: { display: 'flex', gap: 12, marginTop: 8 },
  loginLink: { textAlign: 'center', fontSize: 14, color: '#666', marginTop: 8 },
  link: { color: '#8B6914', fontWeight: 700 },
  checkGroup: { display: 'flex', flexWrap: 'wrap', gap: 12, padding: '12px', background: '#FAFAFA', borderRadius: 8, border: '1.5px solid #E8DCC8' },
  checkLabel: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer', fontWeight: 500 },
  plansGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
  planCard: { border: '2px solid #E8DCC8', borderRadius: 12, padding: '16px', cursor: 'pointer', position: 'relative', transition: 'all .2s' },
  planActive: { border: '2px solid #C9A84C', background: '#FDF8F0', boxShadow: '0 0 0 3px rgba(201,168,76,0.2)' },
  planBadge: { position: 'absolute', top: -10, right: 12, background: '#C9A84C', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 10 },
  planName: { fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display',serif", color: '#1A1A1A', marginBottom: 4 },
  planPrice: { fontSize: 22, fontWeight: 700, color: '#8B6914', marginBottom: 2 },
  planDur: { fontSize: 12, color: '#888', marginBottom: 10 },
  planFeat: { fontSize: 13, color: '#555', lineHeight: 1.8 },
}
