import { Link } from 'react-router-dom'
import logoImg from '../assets/images/zsc-logo.png'

const NAV = [
  { label: 'Home',       to: '/' },
  { label: 'Brands',     to: '/brands' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Team',       to: '/team' },
  { label: 'Community',  to: '/community' },
  { label: 'Contact',    to: '/contact' },
]

const BRANDS = [
  { name: "Dunkin'",        to: '/brands' },
  { name: 'Baskin Robbins', to: '/brands?brand=baskin' },
  { name: 'Smoothie King',  to: '/brands?brand=smoothie' },
  { name: "Jimmy John's",   to: '/brands?brand=jimmyjohns' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0a0602', borderTop: '0.5px solid rgba(250,247,242,0.06)' }}>

      {/* ── TOP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: '4rem', padding: '5rem 5rem 4rem' }}>

        {/* Brand column */}
        <div>
          <img src={logoImg} alt="ZSC Enterprises" style={{ height: 52, width: 'auto', objectFit: 'contain', marginBottom: '1.2rem', display: 'block' }} />
          <p style={{ fontSize: '0.78rem', lineHeight: 1.9, color: 'rgba(250,247,242,0.3)', fontWeight: 300, maxWidth: 260, marginBottom: '1.8rem' }}>
            One of Atlanta's fastest-growing franchise groups — built on excellence, people, and community.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8650A' }} />
            <span style={{ fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.22)', fontWeight: 500 }}>Atlanta, Georgia · Est. 2016</span>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <div style={{ fontSize: '0.44rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700, marginBottom: '1.4rem' }}>Navigate</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {NAV.map(l => (
              <Link key={l.to} to={l.to} style={{ fontSize: '0.76rem', color: 'rgba(250,247,242,0.35)', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FAF7F2'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,242,0.35)'}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <div style={{ fontSize: '0.44rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4186C', fontWeight: 700, marginBottom: '1.4rem' }}>Our Brands</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {BRANDS.map(b => (
              <Link key={b.name} to={b.to} style={{ fontSize: '0.76rem', color: 'rgba(250,247,242,0.35)', textDecoration: 'none', fontWeight: 300, transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FAF7F2'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,242,0.35)'}>
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '0.44rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700, marginBottom: '1.4rem' }}>Get In Touch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.38rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.22)', marginBottom: 4 }}>Phone</div>
              <a href="tel:7702498082" style={{ fontSize: '0.76rem', color: 'rgba(250,247,242,0.35)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E8650A'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,242,0.35)'}>
                770-249-8082
              </a>
            </div>
            <div>
              <div style={{ fontSize: '0.38rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.22)', marginBottom: 4 }}>Address</div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(250,247,242,0.35)', fontWeight: 300, lineHeight: 1.7 }}>
                3200 Windy Hill Rd SE<br />Atlanta, GA 30339
              </div>
            </div>
            <div>
  <div style={{ fontSize: '0.38rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.22)', marginBottom: 10 }}>Follow Us</div>
  <div style={{ display: 'flex', gap: 10 }}>
    <a href="https://www.facebook.com/zscenterprises2025" target="_blank" rel="noreferrer"
      style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(250,247,242,0.06)', border: '0.5px solid rgba(250,247,242,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.25s ease' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#E8650A'; e.currentTarget.style.borderColor = '#E8650A' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(250,247,242,0.06)'; e.currentTarget.style.borderColor = 'rgba(250,247,242,0.12)' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(250,247,242,0.7)">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    </a>
    <a href="https://www.linkedin.com/company/zsc-enterprises/" target="_blank" rel="noreferrer"
      style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(250,247,242,0.06)', border: '0.5px solid rgba(250,247,242,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.25s ease' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#E8650A'; e.currentTarget.style.borderColor = '#E8650A' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(250,247,242,0.06)'; e.currentTarget.style.borderColor = 'rgba(250,247,242,0.12)' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(250,247,242,0.7)">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
      </svg>
    </a>
  </div>
</div>
            <div>
              <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
                style={{ display: 'inline-block', marginTop: 4, fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E8650A', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid rgba(232,101,10,0.3)', paddingBottom: 2 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#E8650A'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(232,101,10,0.3)'}>
                Careers →
              </a>
            </div>
          </div>
          
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(250,247,242,0.08) 20%, rgba(250,247,242,0.08) 80%, transparent)', margin: '0 5rem' }} />

      {/* ── BOTTOM ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.6rem 5rem' }}>
        <div style={{ fontSize: '0.42rem', letterSpacing: '0.1em', color: 'rgba(250,247,242,0.18)' }}>
          © 2026 ZSC Enterprises LLC · All Rights Reserved
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 16, height: 1, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
          <span style={{ fontSize: '0.38rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.18)' }}>Building Brands. Inspiring People.</span>
          <div style={{ width: 16, height: 1, background: 'linear-gradient(90deg, #D4186C, #E8650A)' }} />
        </div>
        <div style={{ fontSize: '0.42rem', letterSpacing: '0.1em', color: 'rgba(250,247,242,0.18)' }}>
          Dunkin' · Baskin Robbins · Smoothie King · Jimmy John's
        </div>
      </div>

    </footer>
  )
}