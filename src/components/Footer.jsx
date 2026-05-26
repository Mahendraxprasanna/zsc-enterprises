import { Link } from 'react-router-dom'
import ZSCLogo from './ZSCLogo'

const links = [
  { to: '/',           label: 'Home' },
  { to: '/brands',     label: 'Brands' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/team',       label: 'Team' },
  { to: '/community',  label: 'Community' },
  { to: '/contact',    label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f0a06', borderTop: '1px solid rgba(250,247,242,0.05)', padding: '3rem 5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '2rem' }}>

        {/* Left — Logo */}
        <ZSCLogo size={32} dark={false} />

        {/* Center — Links */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to}
              style={{ fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#E8650A'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,242,0.3)'}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right — Copy */}
        <div style={{ textAlign: 'right', fontSize: '0.44rem', letterSpacing: '0.1em', color: 'rgba(250,247,242,0.18)' }}>
          © 2026 ZSC Enterprises · Atlanta, GA
        </div>

      </div>
    </footer>
  )
}