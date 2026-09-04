import { motion } from 'framer-motion'
import { useState } from 'react'
import Footer from '../components/Footer'

const ROLES = [
  'Restaurant Team Member',
  'Shift Leader',
  'Restaurant Manager',
  'Above Restaurant Leader',
  'Other / General Inquiry',
]

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => { e.preventDefault(); setSubmitted(true) }

  const inputStyle = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '0.5px solid rgba(42,30,16,0.2)',
    color: '#1A1208', padding: '0.75rem 0',
    fontSize: '0.88rem', fontFamily: 'Jost, sans-serif',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.25s ease',
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ background: '#F3EDE3', paddingTop: 72 }}>

      {/* ══ HEADER ══ */}
      <section style={{ padding: '6rem 5rem 5rem', borderBottom: '0.5px solid rgba(42,30,16,0.08)' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.2rem' }}>
            <div style={{ width: 22, height: 1, background: '#E8650A' }} />
            <span style={{ fontSize: '0.44rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700 }}>Careers & Contact</span>
          </div>
          <h1 className="font-playfair font-black" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.92, color: '#1A1208', letterSpacing: '-0.025em', maxWidth: 700, marginBottom: '1.5rem' }}>
            Your Career Journey<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>Starts Here.</em>
          </h1>
          <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', lineHeight: 2.1, color: 'rgba(42,30,16,0.55)', fontWeight: 300, maxWidth: 600 }}>
            At ZSC Enterprises, we believe that our people are the foundation of our success — delivering exceptional guest service and leadership across our QSR franchises nationwide.
          </p>
        </Reveal>
      </section>

      {/* ══ WHY + FORM ══ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }}>

        {/* LEFT — Why ZSC */}
        <div style={{ padding: '5rem', borderRight: '0.5px solid rgba(42,30,16,0.08)' }}>
          <Reveal>
            <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)', lineHeight: 1.0, color: '#1A1208', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Why Choose<br />
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>ZSC Enterprises?</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontSize: '0.88rem', lineHeight: 2.1, color: 'rgba(42,30,16,0.62)', fontWeight: 300, marginBottom: '1.5rem' }}>
              At ZSC Enterprises, we believe that our people are the foundation of our success. We are dedicated to hiring talented individuals for roles such as restaurant team members, shift leaders, and managers who can deliver exceptional guest service and leadership across our quick-service restaurant (QSR) franchises nationwide.
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 2.1, color: 'rgba(42,30,16,0.62)', fontWeight: 300, marginBottom: '1.5rem' }}>
              Our operational teams are committed to upholding the highest standards for each QSR brand we serve, ensuring an outstanding dining experience for every customer.
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 2.1, color: 'rgba(42,30,16,0.62)', fontWeight: 300, marginBottom: '2.5rem' }}>
              We are always seeking passionate and driven individuals to join our team. Even if you don't see a current opening that aligns with your interests, we encourage you to submit your resume for future opportunities.
            </p>
            <p className="font-playfair italic" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#1A1208', fontWeight: 400, marginBottom: '3rem', paddingLeft: '1rem', borderLeft: '3px solid #E8650A' }}>
              "Your career journey in the QSR industry starts here with ZSC Enterprises."
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #E8650A, #D4186C)',
                color: '#fff', textDecoration: 'none',
                padding: '1.6rem 2.2rem',
                boxShadow: '0 16px 48px rgba(232,101,10,0.28)',
                transition: 'transform 0.25s, box-shadow 0.25s',
                marginBottom: '1rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 22px 56px rgba(232,101,10,0.42)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(232,101,10,0.28)' }}>
              <div>
                <div style={{ fontSize: '0.42rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Ready to join us?</div>
                <div className="font-playfair font-black" style={{ fontSize: '1.3rem', lineHeight: 1 }}>Explore Job Opportunities</div>
              </div>
              <div style={{ fontSize: '1.8rem', opacity: 0.8 }}>→</div>
            </a>
            <div style={{ fontSize: '0.42rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.3)', textAlign: 'center' }}>
              Powered by HigherMe · ZSC Enterprises Careers Portal
            </div>
          </Reveal>
        </div>

        {/* RIGHT — Form */}
        <div style={{ padding: '5rem' }}>
          <Reveal>
            <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)', lineHeight: 1.0, color: '#1A1208', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
              Get In<br />
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>Touch.</em>
            </h2>
          </Reveal>

          {submitted ? (
            <Reveal>
              <div style={{ padding: '3rem 2rem', textAlign: 'center', border: '0.5px solid rgba(232,101,10,0.25)', background: 'rgba(232,101,10,0.04)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
                <div className="font-playfair font-bold" style={{ fontSize: '1.2rem', color: '#1A1208', marginBottom: '0.5rem' }}>Message Received!</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(42,30,16,0.45)', fontWeight: 300 }}>We'll be in touch with you shortly.</div>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Full Name</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="Your name"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@email.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Phone</label>
                  <input name="phone" value={form.phone} onChange={handle} placeholder="770-000-0000"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Role of Interest</label>
                  <select name="role" value={form.role} onChange={handle}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'}>
                    <option value="">Select a role...</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Message</label>
                <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Tell us about yourself..."
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
                  onFocus={e => e.target.style.borderColor = '#E8650A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
              </div>
              <button type="submit"
                style={{ alignSelf: 'flex-start', background: 'linear-gradient(135deg, #E8650A, #D4186C)', color: '#fff', border: 'none', padding: '0.9rem 2.8rem', fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 28px rgba(232,101,10,0.28)', transition: 'opacity 0.25s, transform 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
                Send Message →
              </button>
            </form>
          )}

          {/* Contact info */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', paddingTop: '2.5rem', borderTop: '0.5px solid rgba(42,30,16,0.08)' }}>
            {[
              { label: 'Phone',   value: '770-249-8082', href: 'tel:7702498082' },
              { label: 'Address', value: '3200 Windy Hill Rd SE, Atlanta GA', href: null },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                {item.href ? (
                  <a href={item.href} style={{ fontSize: '0.78rem', color: 'rgba(42,30,16,0.55)', textDecoration: 'none', fontWeight: 300 }}>{item.value}</a>
                ) : (
                  <div style={{ fontSize: '0.78rem', color: 'rgba(42,30,16,0.55)', fontWeight: 300 }}>{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}