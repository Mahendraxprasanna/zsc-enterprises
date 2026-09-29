import { motion } from 'framer-motion'
import { useState } from 'react'
import Footer from '../components/Footer'
import useIsMobile from '../hooks/useIsMobile'
import teamImg from '../assets/images/office.jpeg'
import head from '../assets/images/head.jpeg'
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const isMobile = useIsMobile()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  const inputStyle = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '0.5px solid rgba(42,30,16,0.2)',
    color: '#1A1208', padding: isMobile ? '0.8rem 0' : '0.75rem 0',
    // iPhone zooms into any field with text smaller than 16px — 16px on phone stops that
    fontSize: isMobile ? '16px' : '0.88rem', fontFamily: 'Jost, sans-serif',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.25s ease',
    // phone: remove iOS/Android default rounded corners, shading and inner shadow on fields
    ...(isMobile ? { borderRadius: 0, WebkitAppearance: 'none', appearance: 'none' } : {}),
  }

  // Phone-only readable label size
  const labelStyle = {
    display: 'block', fontSize: isMobile ? '0.6rem' : '0.38rem', letterSpacing: isMobile ? '0.2em' : '0.24em',
    textTransform: 'uppercase', color: isMobile ? 'rgba(42,30,16,0.55)' : 'rgba(42,30,16,0.4)', marginBottom: isMobile ? 4 : 8,
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ background: '#F3EDE3' }}>
      {/* ══ HEADER ══ */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : '55vh', paddingTop: isMobile ? 64 : 72 }}>

        {/* LEFT */}
       <div style={{ background: '#1A0E06', padding: isMobile ? '3rem 1.5rem 2.5rem' : '6rem 5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? '1.2rem' : '1.8rem' }}>
            <div style={{ width: 22, height: 1, background: '#E8650A' }} />
            <span style={{ fontSize: isMobile ? '0.6rem' : '0.44rem', letterSpacing: isMobile ? '0.28em' : '0.34em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700 }}>Careers & Contact</span>
          </div>
          <h1 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(2rem, 9vw, 2.6rem)' : 'clamp(3rem, 5vw, 5.5rem)', lineHeight: isMobile ? 1.02 : 0.9, letterSpacing: '-0.025em', marginBottom: isMobile ? '1.3rem' : '2rem' }}>
  <span style={{ color: '#FAF7F2' }}>We Don't Just Build Restaurants</span><br />
  <em style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', paddingRight: isMobile ? '0.06em' : undefined, marginTop: isMobile ? '0.2em' : undefined }}>We Build Careers</em>
</h1>
          <p style={{ fontSize: isMobile ? '0.98rem' : '1rem', lineHeight: isMobile ? 1.8 : 1.9, color: isMobile ? 'rgba(250,247,242,0.68)' : 'rgba(250,247,242,0.55)', fontWeight: 300, maxWidth: 420 }}>
            At ZSC Enterprises, we believe that our people are the foundation of our success — delivering exceptional guest service and leadership across our QSR franchises nationwide and thats our official office located in Atlanta.
          </p>
        </div>

        {/* RIGHT — image (below the text on phone) */}
        <div style={{ position: 'relative', overflow: 'hidden', height: isMobile ? 'min(62vw, 300px)' : undefined }}>
          <img src={teamImg} alt="ZSC Team"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(1) saturate(1)', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: isMobile ? 'linear-gradient(to bottom, #1A0E06 0%, transparent 22%)' : 'linear-gradient(to right, #1A0E06 0%, transparent 18%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
        </div>
      </section>

      {/* ══ WHY + FORM ══ */}
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : '100vh' }}>

        {/* LEFT — gradient */}
        <div style={{ background: 'linear-gradient(145deg, #E8650A 0%, #D4186C 100%)', padding: isMobile ? '3rem 1.5rem' : '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

          <h2 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.2rem)' : 'clamp(1.8rem, 2.8vw, 2.6rem)', lineHeight: isMobile ? 1.05 : 1.0, color: '#fff', marginBottom: isMobile ? '1.5rem' : '2rem', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
  Why Choose<br />
  <span style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.8)' }}>ZSC Enterprises?</span>
</h2>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: isMobile ? '0.96rem' : '0.88rem', lineHeight: isMobile ? 1.8 : 2.1, color: isMobile ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: isMobile ? '1.2rem' : '1.5rem' }}>
              At ZSC Enterprises, we believe that our people are the foundation of our success. We are dedicated to hiring talented individuals for roles such as restaurant team members, shift leaders, and managers who can deliver exceptional guest service and leadership across our quick-service restaurant (QSR) franchises nationwide.
            </p>
            <p style={{ fontSize: isMobile ? '0.96rem' : '0.88rem', lineHeight: isMobile ? 1.8 : 2.1, color: isMobile ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: isMobile ? '1.2rem' : '1.5rem' }}>
              Our operational teams are committed to upholding the highest standards for each QSR brand we serve, ensuring an outstanding dining experience for every customer.
            </p>
            <p style={{ fontSize: isMobile ? '0.96rem' : '0.88rem', lineHeight: isMobile ? 1.8 : 2.1, color: isMobile ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: isMobile ? '2rem' : '2.5rem' }}>
              We are always seeking passionate and driven individuals to join our team. Even if you don't see a current opening that aligns with your interests, we encourage you to submit your resume for future opportunities.
            </p>
            <p className="font-playfair" style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#fff', fontWeight: 400, marginBottom: isMobile ? '2.2rem' : '3rem', paddingLeft: '1rem', borderLeft: '3px solid rgba(255,255,255,0.5)' }}>
              "Your career journey in the QSR industry starts here with ZSC Enterprises."
            </p>

            <a href="https://app.higherme.com/brands/65d78e9e803a9?page=1" target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: isMobile ? 12 : undefined,
                background: '#fff', color: '#E8650A', textDecoration: 'none',
                padding: isMobile ? '1.2rem 1.3rem' : '1.6rem 2.2rem', marginBottom: '1rem',
                boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={isMobile ? undefined : e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 22px 56px rgba(0,0,0,0.25)' }}
              onMouseLeave={isMobile ? undefined : e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.15)' }}>
              <div>
                <div style={{ fontSize: isMobile ? '0.56rem' : '0.42rem', letterSpacing: isMobile ? '0.22em' : '0.28em', textTransform: 'uppercase', color: isMobile ? 'rgba(232,101,10,0.75)' : 'rgba(232,101,10,0.6)', marginBottom: 6 }}>Ready to join us?</div>
                <div className="font-playfair font-black" style={{ fontSize: isMobile ? '1.12rem' : '1.3rem', lineHeight: isMobile ? 1.15 : 1 }}>Explore Job Opportunities</div>
              </div>
              <div style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', opacity: 0.7, flexShrink: 0 }}>→</div>
            </a>
            <div style={{ fontSize: isMobile ? '0.54rem' : '0.42rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: isMobile ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: isMobile ? 1.7 : undefined }}>
              Powered by HigherMe · ZSC Enterprises Careers Portal
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{ background: '#F3EDE3', padding: isMobile ? '3rem 1.5rem 3.5rem' : '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.2rem)' : 'clamp(1.8rem, 2.8vw, 2.6rem)', lineHeight: 1.0, color: '#1A1208', marginBottom: isMobile ? '1.8rem' : '2.5rem', letterSpacing: '-0.02em' }}>
            Get In<br />
            <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', paddingRight: isMobile ? '0.06em' : undefined }}>Touch.</em>
          </h2>

          {submitted ? (
            <div style={{ padding: isMobile ? '2.5rem 1.5rem' : '3rem 2rem', textAlign: 'center', border: '0.5px solid rgba(232,101,10,0.25)', background: 'rgba(232,101,10,0.04)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
              <div className="font-playfair font-bold" style={{ fontSize: '1.2rem', color: '#1A1208', marginBottom: '0.5rem' }}>Message Received!</div>
              <div style={{ fontSize: isMobile ? '0.9rem' : '0.78rem', color: isMobile ? 'rgba(42,30,16,0.6)' : 'rgba(42,30,16,0.45)', fontWeight: 300 }}>We'll be in touch with you shortly.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.4rem' : '1.8rem' }}>
              {/* PC: 2 fields per row · Phone: one field per row */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1.4rem' : '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="Your name"
                    autoComplete={isMobile ? 'name' : undefined}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="you@email.com"
                    autoComplete={isMobile ? 'email' : undefined}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1.4rem' : '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Phone</label>
                  {/* type="tel" on phone opens the number keypad on iPhone & Android */}
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="770-000-0000"
                    type={isMobile ? 'tel' : undefined}
                    autoComplete={isMobile ? 'tel' : undefined}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
                </div>
                <div style={{ position: 'relative' }}>
                  <label style={labelStyle}>Role of Interest</label>
                  <select name="role" value={formData.role} onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', paddingRight: isMobile ? '1.5rem' : undefined, color: isMobile && !formData.role ? 'rgba(42,30,16,0.45)' : inputStyle.color }}
                    onFocus={e => e.target.style.borderColor = '#E8650A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'}>
                    <option value="">Select a role...</option>
                    <option>Restaurant Team Member</option>
                    <option>Shift Leader</option>
                    <option>Restaurant Manager</option>
                    <option>Above Restaurant Leader</option>
                    <option>Other / General Inquiry</option>
                  </select>
                  {/* Phone only: small arrow so people can tell it's a dropdown */}
                  {isMobile && (
                    <span style={{ position: 'absolute', right: 2, bottom: '0.85rem', fontSize: '0.75rem', color: 'rgba(42,30,16,0.45)', pointerEvents: 'none' }}>▾</span>
                  )}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about yourself..."
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
                  onFocus={e => e.target.style.borderColor = '#E8650A'}
                  onBlur={e => e.target.style.borderColor = 'rgba(42,30,16,0.2)'} />
              </div>
              <button type="submit"
                style={{
                  alignSelf: isMobile ? 'stretch' : 'flex-start', background: 'linear-gradient(135deg, #E8650A, #D4186C)', color: '#fff', border: 'none',
                  padding: isMobile ? '1.05rem 1.5rem' : '0.9rem 2.8rem', fontSize: isMobile ? '0.68rem' : '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(232,101,10,0.28)', transition: 'opacity 0.25s, transform 0.25s',
                  ...(isMobile ? { borderRadius: 0, WebkitAppearance: 'none' } : {}),
                }}
                onMouseEnter={isMobile ? undefined : e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={isMobile ? undefined : e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
                Send Message →
              </button>
            </form>
          )}

          {/* PC: side by side (unchanged) · Phone: stacked, and the address opens Maps */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '1.4rem' : '3rem', marginTop: isMobile ? '2.8rem' : '4rem', paddingTop: isMobile ? '2rem' : '2.5rem', borderTop: '0.5px solid rgba(42,30,16,0.08)' }}>
            {[
              { label: 'Phone',   value: '770-249-8082', href: 'tel:7702498082' },
              { label: 'Address', value: '3200 Windy Hill Rd SE, Atlanta GA', href: isMobile ? 'https://maps.google.com/?q=3200+Windy+Hill+Rd+SE+Atlanta+GA+30339' : null },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: isMobile ? '0.58rem' : '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                {item.href
                  ? <a href={item.href} target={item.label === 'Address' ? '_blank' : undefined} rel={item.label === 'Address' ? 'noreferrer' : undefined}
                      style={{ fontSize: isMobile ? '1rem' : '0.78rem', color: isMobile ? 'rgba(42,30,16,0.75)' : 'rgba(42,30,16,0.55)', textDecoration: 'none', fontWeight: isMobile ? 400 : 300 }}>{item.value}</a>
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