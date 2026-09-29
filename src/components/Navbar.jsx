import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ZSCLogo from './ZSCLogo'
import useIsMobile from '../hooks/useIsMobile'

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Brands',     to: '/brands' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Team',       to: '/team' },
  { label: 'Community',  to: '/community' },
  { label: 'Career',    to: '/contact' },
]

// Phone navbar = 64px top bar + 40px page row = 104px total.
// Pages use paddingTop 104 on phone so content starts below it.
const MOBILE_TOP_BAR = 64
const MOBILE_ROW     = 40

export default function Navbar() {
  const [visible,   setVisible]   = useState(true)
  const [atTop,     setAtTop]     = useState(true)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const lastScrollY = useRef(0)
  const hideTimer   = useRef(null)
  const rowRef      = useRef(null)
  const location    = useLocation()
  const isMobile    = useIsMobile()

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Phone: slide the page row so the current page is in view (matters on small phones where the row scrolls)
  useEffect(() => {
    if (!isMobile || !rowRef.current) return
    const row = rowRef.current
    const active = row.querySelector('[data-active="true"]')
    if (active) {
      row.scrollTo({ left: active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2, behavior: 'smooth' })
    }
  }, [location.pathname, isMobile])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      const current = window.pageYOffset
      const isAtTop = current < 12
      setAtTop(isAtTop)
      if (isAtTop) {
        setVisible(true)
      } else if (current < lastScrollY.current) {
        setVisible(true)
      } else if (current > lastScrollY.current + 4) {
        setVisible(false)
        setMenuOpen(false)
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-hide on brands page after 3 seconds
  useEffect(() => {
    if (location.pathname === '/brands') {
      setVisible(true)
      hideTimer.current = setTimeout(() => {
        setVisible(false)
      }, 3000)
    } else {
      clearTimeout(hideTimer.current)
      setVisible(true)
    }
    return () => clearTimeout(hideTimer.current)
  }, [location.pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const lightPage = atTop && location.pathname !== '/' && location.pathname !== '/brands'

  return (
    <>
      {/* Phone: hide the page row's scrollbar (it still swipes) */}
      <style>{`.zsc-navrow::-webkit-scrollbar { display: none; }`}</style>

      {/* ── NAVBAR ── */}
      <nav style={isMobile ? {
        // PHONE: two rows — [logo … phone] on top, all pages underneath
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        height: MOBILE_TOP_BAR + MOBILE_ROW,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: `${MOBILE_TOP_BAR}px ${MOBILE_ROW}px`,
        gridTemplateAreas: '"logo right" "links links"',
        alignItems: 'center',
        padding: '0 1.25rem',
        background: atTop ? 'rgba(6,3,1,0.35)' : 'rgba(10, 5, 2, 0.55)',
        backdropFilter: atTop ? 'blur(12px)' : 'blur(28px)',
        WebkitBackdropFilter: atTop ? 'blur(12px)' : 'blur(28px)',
        borderBottom: '1px solid rgba(250,247,242,0.06)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: [
          'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          'background 0.4s ease',
          'backdrop-filter 0.4s ease',
          'border-color 0.4s ease',
        ].join(', '),
      } : {
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
background: atTop ? 'rgba(6,3,1,0.35)' : 'rgba(10, 5, 2, 0.55)',
backdropFilter: atTop ? 'blur(12px)' : 'blur(28px)',
WebkitBackdropFilter: atTop ? 'blur(12px)' : 'blur(28px)',
borderBottom: atTop ? '1px solid rgba(250,247,242,0.06)' : '1px solid rgba(250,247,242,0.06)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: [
          'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          'background 0.4s ease',
          'backdrop-filter 0.4s ease',
          'border-color 0.4s ease',
        ].join(', '),
      }}>

        {/* ── LEFT — Logo ── */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gridArea: isMobile ? 'logo' : undefined }}>
        <ZSCLogo size={isMobile ? 32 : 38} dark={lightPage} />
        </Link>

        {/* ── CENTER — Nav links
             PC: centred in the bar (unchanged)
             Phone: second row, full width, swipeable if it doesn't fit ── */}
        <div
          ref={rowRef}
          className={isMobile ? 'zsc-navrow' : undefined}
          style={isMobile ? {
            gridArea: 'links',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: MOBILE_ROW,
            margin: '0 -1.25rem',          // run edge to edge
            padding: '0 0.75rem',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            position: 'relative',
            borderTop: lightPage ? '0.5px solid rgba(42,30,16,0.1)' : '0.5px solid rgba(250,247,242,0.08)',
          } : {
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to}
              data-active={isActive(link.to) ? 'true' : 'false'}
              style={{
              textDecoration: 'none',
              padding: isMobile ? '0.75rem 0.5rem' : '0.45rem 0.9rem',
              fontSize: isMobile ? '0.58rem' : '0.46rem',
              letterSpacing: isMobile ? '0.12em' : '0.2em',
              textTransform: 'uppercase',
              fontWeight: isMobile ? 600 : 500,
              fontFamily: 'Jost, sans-serif',
              whiteSpace: isMobile ? 'nowrap' : undefined,
              flexShrink: isMobile ? 0 : undefined,
              color: isActive(link.to)
  ? (lightPage ? '#1A1208' : '#FAF7F2')
  : (lightPage
      ? (isMobile ? 'rgba(42,30,16,0.6)' : 'rgba(42,30,16,0.5)')
      : (isMobile ? 'rgba(250,247,242,0.6)' : 'rgba(250,247,242,0.45)')),
              position: 'relative',
              transition: 'color 0.25s ease',
            }}
              onMouseEnter={isMobile ? undefined : e => { if (!isActive(link.to)) e.currentTarget.style.color = atTop && location.pathname !== '/' ? 'rgba(42,30,16,0.85)' : 'rgba(250,247,242,0.85)' }}
              onMouseLeave={isMobile ? undefined : e => { if (!isActive(link.to)) e.currentTarget.style.color = atTop && location.pathname !== '/' ? 'rgba(42,30,16,0.5)' : 'rgba(250,247,242,0.45)' }}
            >
              {link.label}
              {isActive(link.to) && (
                <span style={{
                  position: 'absolute',
                  bottom: isMobile ? 6 : -2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isMobile ? 18 : 16,
                  height: isMobile ? 2 : 1.5,
                  background: 'linear-gradient(90deg, #E8650A, #D4186C)',
                  borderRadius: 1,
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* ── RIGHT — Phone + hamburger (phone: tap-to-call number only, no hamburger) ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0, gridArea: isMobile ? 'right' : undefined, justifySelf: isMobile ? 'end' : undefined }}>
          <a href="tel:7702498082" style={{
            display: 'inline',
            fontSize: isMobile ? '0.62rem' : '0.46rem',
            letterSpacing: '0.14em',
            fontWeight: isMobile ? 500 : undefined,
           color: lightPage
             ? (isMobile ? 'rgba(42,30,16,0.65)' : 'rgba(42,30,16,0.45)')
             : (isMobile ? 'rgba(250,247,242,0.7)' : 'rgba(250,247,242,0.45)'),
            textDecoration: 'none',
            fontFamily: 'Jost, sans-serif',
            transition: 'color 0.25s ease',
            padding: isMobile ? '10px 0' : undefined,
          }}
            onMouseEnter={isMobile ? undefined : e => e.currentTarget.style.color = '#E8650A'}
            onMouseLeave={isMobile ? undefined : e => e.currentTarget.style.color = atTop && location.pathname !== '/' ? 'rgba(42,30,16,0.45)' : 'rgba(250,247,242,0.45)'}
          >
            770-249-8082
          </a>

          {!isMobile && (
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              width: 28,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                height: 1,
                borderRadius: 1,
                background: menuOpen
  ? 'rgba(250,247,242,0.6)'
  : lightPage
    ? 'rgba(42,30,16,0.5)'
    : 'rgba(250,247,242,0.5)',
                transition: 'all 0.35s ease',
                transformOrigin: 'center',
                width: i === 1 ? (menuOpen ? '100%' : '65%') : '100%',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
          )}
        </div>
      </nav>

{/* Brands page: desktop reveals the navbar on hover; phones reveal it with a tap on a thin top strip */}
{location.pathname === '/brands' && !visible && (
  isMobile ? (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 28,
        zIndex: 9001,
      }}
      onClick={() => setVisible(true)}
    />
  ) : (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 120,
        zIndex: 9001,
        cursor: 'default',
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    />
  )
)}

      {/* ── FULL MENU OVERLAY (PC hamburger only) ── */}
      {!isMobile && (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8999,
        background: 'rgba(6, 3, 1, 0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        pointerEvents: menuOpen ? 'all' : 'none',
        opacity: menuOpen ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(232,101,10,0.07) 0%, transparent 60%)',
        }} />

        {NAV_LINKS.map((link, i) => (
          <Link key={link.to} to={link.to}
            style={{
              textDecoration: 'none',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontStyle: isActive(link.to) ? 'italic' : 'normal',
              letterSpacing: '-0.01em',
              color: isActive(link.to) ? 'transparent' : 'rgba(250,247,242,0.82)',
              background: isActive(link.to) ? 'linear-gradient(135deg, #E8650A, #D4186C)' : 'none',
              WebkitBackgroundClip: isActive(link.to) ? 'text' : 'initial',
              WebkitTextFillColor: isActive(link.to) ? 'transparent' : 'initial',
              backgroundClip: isActive(link.to) ? 'text' : 'initial',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, opacity 0.4s ease ${i * 0.06}s, color 0.25s ease`,
              lineHeight: 1.3,
            }}
            onMouseEnter={e => {
              if (!isActive(link.to)) {
                e.currentTarget.style.color = 'transparent'
                e.currentTarget.style.background = 'linear-gradient(135deg, #E8650A, #D4186C)'
                e.currentTarget.style.WebkitBackgroundClip = 'text'
                e.currentTarget.style.WebkitTextFillColor = 'transparent'
              }
            }}
            onMouseLeave={e => {
              if (!isActive(link.to)) {
                e.currentTarget.style.color = 'rgba(250,247,242,0.82)'
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.WebkitBackgroundClip = 'initial'
                e.currentTarget.style.WebkitTextFillColor = 'initial'
              }
            }}
          >
            {link.label}
          </Link>
        ))}

        <a href="tel:7702498082" style={{
          marginTop: '2rem',
          fontSize: '0.56rem',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: 'rgba(250,247,242,0.25)',
          textDecoration: 'none',
          fontFamily: 'Jost, sans-serif',
          transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
          opacity: menuOpen ? 1 : 0,
          transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${NAV_LINKS.length * 0.06 + 0.05}s, opacity 0.4s ease ${NAV_LINKS.length * 0.06 + 0.05}s`,
        }}>
          770-249-8082
        </a>
      </div>
      )}
    </>
  )
}