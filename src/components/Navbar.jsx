import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ZSCLogo from './ZSCLogo'

const links = [
  { to: '/',           label: 'Home' },
  { to: '/brands',     label: 'Brands' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/community',  label: 'Community' },
  { to: '/team',       label: 'Meet Our Team' },
  { to: '/contact',    label: 'Get in Touch' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 900, height: 72,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        background: 'rgba(243,237,227,0.97)',
        borderBottom: '1px solid rgba(42,30,16,0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 4px 32px rgba(42,30,16,0.08)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>

        <NavLink to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <ZSCLogo size={34} dark={false} />
        </NavLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? '#E8650A' : 'rgba(42,30,16,0.38)',
                borderBottom: isActive ? '1px solid #E8650A' : '1px solid transparent',
                paddingBottom: 2,
                transition: 'color 0.2s',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <a href="tel:7702498082" style={{
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          fontWeight: 600,
          textDecoration: 'none',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #E8650A, #D4186C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          770 - 249 - 8082
        </a>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5, padding: 4,
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <span style={{ display: 'block', width: 22, height: 1.5, background: '#2A1E10', transition: 'transform 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: '#2A1E10', transition: 'opacity 0.3s', opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: '#2A1E10', transition: 'transform 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0,
              zIndex: 800,
              display: 'flex', flexDirection: 'column',
              background: 'rgba(243,237,227,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(42,30,16,0.1)',
            }}
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                style={({ isActive }) => ({
                  padding: '1rem 2rem',
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(42,30,16,0.06)',
                  color: isActive ? '#E8650A' : 'rgba(42,30,16,0.5)',
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <a href="tel:7702498082" style={{
              padding: '1rem 2rem',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              fontWeight: 600,
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #E8650A, #D4186C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              770 - 249 - 8082
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}