import { motion } from 'framer-motion'
import { useState } from 'react'
import Footer from '../components/Footer'
import teamImg from '../assets/images/office.jpeg'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

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
      style={{ background: '#F3EDE3' }}>

      {/* ══ HEADER ══ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '55vh', paddingTop: 72 }}>

        {/* LEFT */}
        <div style={{ background: '#F3EDE3', padding: '6rem 5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.8rem' }}>
            <div style={{ width: 22, height: 1, background: '#E8650A' }} />
            <span style={{ fontSize: '0.44rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700 }}>Careers & Contact</span>
          </div>
          <h1 className="font-playfair font-black" style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', lineHeight: 0.9, color: '#1A1208', letterSpacing: '-0.025em', marginBottom: '2rem' }}>
            Your Career Journey<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>Starts Here.</em>
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(42,30,16,0.6)', fontWeight: 300, maxWidth: 420 }}>
            At ZSC Enterprises, we believe that our people are the foundation of our success — delivering exceptional guest service and leadership across our QSR franchises nationwide.
          </p>
        </div>

        {/* RIGHT — image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={teamImg} alt="ZSC Team"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.82) saturate(0.9)', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #F3EDE3 0%, transparent 18%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
        </div>
      </section>

      {/* ══ WHY + FORM ══ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>

        {/* LEFT — gradient */}
        <div style={{ background: 'linear-gradient(145deg, #E8650A 0%, #D4186C 100%)', padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)', lineHeight: 1.0, color: '#fff', marginBottom: '2rem', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
  Why Choose<br />
  <span style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.8)' }}>ZSC Enterprises?</span>
</h2>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '0.88rem', lineHeight: 2.1, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '1.5rem' }}>
              At ZSC Enterprises, we believe that our people are the foundation of our success. We are dedicated to hiring talented individuals for roles such as restaurant team members, shift leaders, and managers who can deliver exceptional guest service and leadership across our quick-service restaurant (QSR) franchises nationwide.
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 2.1, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '1.5rem' }}>
              Our operational teams are committed to upholding the highest standards for each QSR brand we serve, ensuring an outstanding dining experience for every customer.
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 2.1, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '2.5rem' }}>
              We are always seeking passionate and driven individuals to join our team. Even if you don't see a current opening that aligns with your interests, we encourage you to submit your resume for future opportunities.
            </p>
            <p className="font-playfair" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#fff', fontWeight: 400, marginBottom: '3rem', paddingLeft: '1rem', borderLeft: '3px solid rgba(255,255,255,0.5)' }}>
              "Your career journey in the QSR industry starts here with ZSC Enterprises."
            </p>

            <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#fff', color: '#E8650A', textDecoration: 'none',
                padding: '1.6rem 2.2rem', marginBottom: '1rem',
                boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 22px 56px rgba(0,0,0,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.15)' }}>
              <div>
                <div style={{ fontSize: '0.42rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(232,101,10,0.6)', marginBottom: 6 }}>Ready to join us?</div>
                <div className="font-playfair font-black" style={{ fontSize: '1.3rem', lineHeight: 1 }}>Explore Job Opportunities</div>
              </div>
              <div style={{ fontSize: '1.8rem', opacity: 0.7 }}>→</div>
            </a>
            <div style={{ fontSize: '0.42rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
              Powered by HigherMe · ZSC Enterprises Careers Portal
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{ background: '#F3EDE3', padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)', lineHeight: 1.0, color: '#1A1208', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            Get In<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>Touch.</em>
          </h2>

          {submitted ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', border: '0.5px solid rgba(232,101,10,0.25)', background: 'rgba(232,101,10,0.04)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
              <div className="font-playfair font-bold" style={{ fontSize: '1.2rem', color: '#1A1208', marginBottom: '0.5rem' }}>Message Received!</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(42,30,16,0.45)', fontWeight: 300 }}>We'll be in touch with you shortly.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your name"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="770-000-0000"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Role of Interest</label>
                  <select name="role" value={formData.role} onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'}>
                    <option value="">Select a role...</option>
                    <option>Restaurant Team Member</option>
                    <option>Shift Leader</option>
                    <option>Restaurant Manager</option>
                    <option>Above Restaurant Leader</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 8 }}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about yourself..."
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

          <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', paddingTop: '2.5rem', borderTop: '0.5px solid rgba(42,30,16,0.08)' }}>
            {[
              { label: 'Phone',   value: '770-249-8082', href: 'tel:7702498082' },
              { label: 'Address', value: '3200 Windy Hill Rd SE, Atlanta GA', href: null },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                {item.href
                  ? <a href={item.href} style={{ fontSize: '0.78rem', color: 'rgba(42,30,16,0.55)', textDecoration: 'none', fontWeight: 300 }}>{item.value}</a>
                  : <div style={{ fontSize: '0.78rem', color: 'rgba(42,30,16,0.55)', fontWeight: 300 }}>{item.value}</div>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}