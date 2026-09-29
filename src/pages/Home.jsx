import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import ZSCLogo from '../components/ZSCLogo'
import useIsMobile from '../hooks/useIsMobile'

import heroBg      from '../assets/images/street.png'
import heroBgMobile from '../assets/images/street-mobile.jpeg' // portrait image used on phones only
import teamImg     from '../assets/images/team.jpeg'

// Brand videos (for carousel background)
import dunkinVideo   from '../assets/videos/dunkinad.mp4'
import baskinVideo   from '../assets/videos/baskinad.mp4'
import smoothieVideo from '../assets/videos/smoothiead.mp4'
import jimmyVideo    from '../assets/videos/jimmyad.mp4'
import dunkinImg   from '../assets/images/dd.jpg'
import baskinImg   from '../assets/images/br.jpg'
import smoothieImg from '../assets/images/sk.jpg'
import jimmyImg    from '../assets/images/jj.webp'
import teamserve from '../assets/images/serve.jpeg'
// ─────────────────────────────────────────────────────────
// BRANDS DATA — mirrors Brands.jsx style
// ─────────────────────────────────────────────────────────
const BRANDS = [
  {
    id: 0,
    name: "Dunkin'",
    tagline: "America Runs on Dunkin'",
    label: 'Brand · ZSC Enterprises',
    desc: "ZSC Enterprises operates 50+ Dunkin' locations across the Atlanta metro — freshly brewed coffee, premium espresso, donuts, and breakfast delivered with speed and consistency every single day.",
    stats: [{ n: '50+', l: 'Locations' }, { n: '2007', l: 'Since' }, { n: 'ATL', l: 'Market' }],
    tags: ['Coffee', 'Espresso', 'Donuts', 'Breakfast', 'Cold Brew'],
    video: dunkinVideo,
    accent: '#E8650A',
    accentAlt: '#FF671F',
    bg: 'linear-gradient(145deg, #0f0800 0%, #1a1000 40%, #0f0800 100%)',
    glow: 'rgba(232,101,10,0.45)',
    link: '/brands',
    est: '1950',
    world: "World's Largest",
    worldSub: 'Coffee & Donuts Chain',
    thumb: dunkinImg,
    floatTags: ['Coffee', 'Espresso'],
  },
  {
    id: 1,
    name: 'Baskin Robbins',
    tagline: 'More Flavors. More Smiles.',
    label: 'Brand · ZSC Enterprises',
    desc: "The world's largest ice cream specialty chain — seven decades of premium hard-serve ice cream and iconic flavors. Co-located with our Dunkin' stores for the ultimate treat experience.",
    stats: [{ n: '31+', l: 'Flavors' }, { n: '1945', l: 'Since' }, { n: 'ATL', l: 'Market' }],
    tags: ['Ice Cream', 'Cakes', 'Shakes', 'Desserts'],
    video: baskinVideo,
    accent: '#D4186C',
    accentAlt: '#F05097',
    bg: 'linear-gradient(145deg, #0f0008 0%, #1a0010 40%, #0f0008 100%)',
    glow: 'rgba(212,24,108,0.45)',
    link: '/brands?brand=baskin',
    est: '1945',
    thumb: baskinImg,
    world: "World's Largest",
    worldSub: 'Ice Cream Specialty Chain',
    floatTags: ['Ice Cream', 'Cakes'],
  },
  {
    id: 2,
    name: 'Smoothie King',
    tagline: 'Smoothies With Purpose.',
    label: 'Brand 03 · ZSC Enterprises',
    desc: "Purpose-driven blends made with real fruit and wholesome ingredients — helping Atlanta guests fuel their active lifestyle. ZSC brings the Smoothie King mission to life every day.",
    stats: [{ n: '10+', l: 'Locations' }, { n: '1973', l: 'Since' }, { n: 'ATL', l: 'Market' }],
    tags: ['Smoothies', 'Real Fruit', 'Wellness', 'Energy'],
    video: smoothieVideo,
    thumb: smoothieImg,
    accent: '#E31B23',
    accentAlt: '#FF4444',
    bg: 'linear-gradient(145deg, #0f0000 0%, #1a0000 40%, #0f0000 100%)',
    glow: 'rgba(227,27,35,0.45)',
    link: '/brands?brand=smoothie',
    est: '1973',
    world: 'Wellness Focused',
    worldSub: 'Smoothie Chain',
    floatTags: ['Smoothies', 'Wellness'],
  },
  {
    id: 3,
    name: "Jimmy John's",
    tagline: 'Freaky Fast. Freaky Fresh.',
    label: 'Brand 04 · ZSC Enterprises',
    desc: "ZSC Enterprises brings the Jimmy John's experience to the Southeast — delivering gourmet sandwiches made with fresh-baked bread and hand-sliced meats, freaky fast.",
    stats: [{ n: '5+', l: 'Locations' }, { n: '1983', l: 'Since' }, { n: 'SE', l: 'Region' }],
    tags: ['Gourmet Subs', 'Fresh Bread', 'Catering', 'Fast Delivery'],
    video: jimmyVideo,
    accent: '#C41230',
    accentAlt: '#FF2244',
    bg: 'linear-gradient(145deg, #0a0000 0%, #150000 40%, #0a0000 100%)',
    glow: 'rgba(196,18,48,0.45)',
    link: '/brands?brand=jimmyjohns',
    est: '1983',
    thumb: jimmyImg,
    world: 'Gourmet Sub',
    worldSub: 'Sandwich Chain',
    floatTags: ['Subs', 'Fresh'],
  },
]

// ─────────────────────────────────────────────────────────
// BRAND ACCORDION
// Desktop: horizontal, hover to expand (unchanged)
// Phone:   vertical stack, tap to expand, tap again to open brand
// ─────────────────────────────────────────────────────────
function BrandAccordion() {
  const [active, setActive] = useState(0)
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  return (
    <section style={{ background: '#0a0602' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: isMobile ? '3.5rem 1.5rem 2rem' : '5rem 5rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ height: 1, width: isMobile ? 28 : 44, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
          <span style={{ fontSize: isMobile ? '0.6rem' : '0.46rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600 }}>Our Portfolio</span>
          <div style={{ height: 1, width: isMobile ? 28 : 44, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
        </div>
        <h2 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(2rem, 9vw, 2.6rem)' : 'clamp(2.5rem, 4.5vw, 4rem)', color: '#FAF7F2', lineHeight: 0.95 }}>
          Four Brands.<br />
          <em style={{ fontStyle: 'italic', display: 'inline-block', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One Standard.</em>
        </h2>
      </div>

      {/* Accordion */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? 'auto' : '85vh',
        padding: isMobile ? '0 1rem 2.5rem' : '0 3rem 3rem',
      }}>
        {BRANDS.map((brand, i) => {
          const isActive = active === i
          return (
            <motion.div
              // key includes isMobile so the panel remounts cleanly when switching layouts
              key={`${brand.id}-${isMobile ? 'm' : 'd'}`}
              onMouseEnter={isMobile ? undefined : () => setActive(i)}
              onClick={() => {
                if (isMobile) {
                  if (isActive) navigate(brand.link)
                  else setActive(i)
                } else {
                  window.location.href = brand.link
                }
              }}
              initial={false}
              animate={isMobile ? { height: isActive ? 420 : 84 } : { flex: isActive ? 4 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: isMobile ? 14 : 16,
                margin: isMobile ? '4px 0' : '0 4px',
                cursor: 'pointer',
                flexShrink: isMobile ? 0 : undefined,
              }}
            >

<video
  muted loop playsInline
ref={el => { if (el) { isActive ? el.play().catch(() => {}) : el.pause() } }}
  style={{
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    filter: `brightness(${isActive ? 0.7 : 0.45}) saturate(0.85)`,
    transition: 'filter 0.6s ease',
    zIndex: 1,
  }}>
  <source src={brand.video} type="video/mp4" />
</video>

              {/* Colour overlay */}
              <div style={{ position: 'absolute', inset: 0, background: brand.bg, opacity: isActive ? 0.7 : 0.85, transition: 'opacity 0.6s ease' }} />

              {/* Bottom gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)', }} />

              {/* Accent top line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${brand.accent}, ${brand.accentAlt})`, opacity: isActive ? 1 : 0.3, transition: 'opacity 0.5s ease' }} />

{/* COLLAPSED — vertical name on desktop, horizontal row on phone */}
{!isActive && (
  <div style={{
    position: 'absolute', inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 20,
  }}>
    <div style={isMobile ? {
      fontFamily: "'Jost', sans-serif",
      fontWeight: 900,
      fontSize: '1.05rem',
      color: '#ffffff',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      textAlign: 'center',
      textShadow: '0 2px 20px rgba(0,0,0,0.5)',
    } : {
      writingMode: 'vertical-rl',
      transform: 'rotate(180deg)',
      fontFamily: "'Jost', sans-serif",
      fontWeight: 900,
      fontSize: 'clamp(1.2rem, 2vw, 2rem)',
      color: '#ffffff',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      textAlign: 'center',
      textShadow: '0 2px 20px rgba(0,0,0,0.5)',
    }}>
      {brand.name}
    </div>
  </div>
)}

<AnimatePresence>
  {isActive && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: isMobile ? '1.6rem 1.4rem' : '2.5rem 2.8rem', zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
        <div style={{ width: 20, height: 1, background: brand.accent }} />
        <span style={{ fontSize: isMobile ? '0.55rem' : '0.4rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: brand.accent, fontWeight: 700 }}>ZSC Enterprises</span>
      </div>
      <h3 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(2rem, 9vw, 2.6rem)' : 'clamp(2rem, 3.5vw, 3.5rem)', lineHeight: 0.9, color: '#FAF7F2', letterSpacing: '-0.025em' }}>
        {brand.name}
      </h3>
      <p className="font-playfair italic" style={{ fontSize: isMobile ? '1rem' : 'clamp(0.8rem, 1.2vw, 1.1rem)', marginTop: '0.5rem', background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
        {brand.tagline}
      </p>
      <Link to={brand.link} onClick={e => e.stopPropagation()} style={{ display: 'block', marginTop: '1.5rem', fontSize: isMobile ? '0.62rem' : '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: brand.accent, textDecoration: 'none', fontWeight: 700 }}>
        Explore →
      </Link>
    </motion.div>
  )}
</AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────
export default function Home() {
  const isMobile = useIsMobile()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={isMobile ? { overflowX: 'hidden' } : undefined}>

      {/* ══ 1. HERO ══ */}
      <section style={{ position: 'relative', height: isMobile ? '100svh' : '100vh', minHeight: isMobile ? 560 : undefined, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img src={isMobile ? heroBgMobile : heroBg} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(1.25) saturate(1) sepia(.25)' }}
          initial={{ scale: 1.08 }} animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,2,0,0.05) 0%, rgba(4,2,0,0.5) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center 40%, rgba(232,101,10,0.12) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: isMobile ? '0 1.25rem' : '0 2rem', maxWidth: 900, width: isMobile ? '100%' : undefined }}>
          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 10 : 16, marginBottom: isMobile ? '1.6rem' : '2.4rem' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <div style={{ width: isMobile ? 20 : 40, height: 1, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
            <span style={{ fontSize: isMobile ? '0.55rem' : '0.43rem', letterSpacing: isMobile ? '0.26em' : '0.42em', textTransform: 'uppercase', color: isMobile ? 'rgba(250,247,242,0.6)' : 'rgba(250,247,242,0.4)', fontWeight: 500 }}>Atlanta · Est. 2016 · Franchise Group</span>
            <div style={{ width: isMobile ? 20 : 40, height: 1, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
          </motion.div>

          <div style={{ overflow: 'visible', marginBottom: '0.3rem' }}>
            <motion.h1 className="font-playfair font-black"
              style={{ fontSize: isMobile ? 'clamp(2.6rem, 17vw, 4.5rem)' : 'clamp(4.5rem, 11vw, 11rem)', lineHeight: 0.95, color: '#FFFFFF', letterSpacing: '-0.03em', paddingBottom: '0.1em', textShadow: '0 2px 32px rgba(0,0,0,0.55)' }}
              initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              ZSC
            </motion.h1>
          </div>
          <div style={{ overflow: 'visible', marginBottom: isMobile ? '1.8rem' : '3rem' }}>
            <motion.h1 className="font-playfair font-black"
              style={{ fontSize: isMobile ? 'clamp(2.4rem, 12.5vw, 4.5rem)' : 'clamp(4.5rem, 11vw, 11rem)', lineHeight: 0.95, letterSpacing: '-0.03em', fontStyle: 'italic', background: 'linear-gradient(90deg, #E8650A 0%, #D4186C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', paddingBottom: '0.1em',paddingRight: ' 0.08em' }}
              initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}>
              Enterprises
            </motion.h1>
          </div>

          <motion.p style={{ fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: isMobile ? 1.7 : 1.9, color: 'rgba(250,247,242,0.9)', fontWeight: 300, maxWidth: 520, margin: isMobile ? '0 auto 2.5rem' : '0 auto 4rem', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75 }}>
          We are proud to serve quality, flavor, and purpose in every scoop, sip, and bite.
          </motion.p>

          <motion.div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '0.8rem' : '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.92 }}>
            <Link to="/brands" style={{ background: 'linear-gradient(135deg, #E8650A, #D4186C)', color: '#fff', textDecoration: 'none', padding: isMobile ? '1rem 1.5rem' : '1.05rem 3.2rem', width: isMobile ? '100%' : undefined, maxWidth: isMobile ? 300 : undefined, boxSizing: 'border-box', textAlign: 'center', fontSize: isMobile ? '0.66rem' : '0.56rem', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 700, boxShadow: '0 16px 48px rgba(232,101,10,0.42)', transition: 'transform 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 22px 56px rgba(232,101,10,0.52)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(232,101,10,0.42)' }}>
              Explore Our Brands
            </Link>
            <Link to="/leadership" style={{ color: isMobile ? 'rgba(250,247,242,0.75)' : 'rgba(250,247,242,0.5)', textDecoration: 'none', padding: isMobile ? '1rem 1.5rem' : '1.05rem 2.6rem', width: isMobile ? '100%' : undefined, maxWidth: isMobile ? 300 : undefined, boxSizing: 'border-box', textAlign: 'center', fontSize: isMobile ? '0.66rem' : '0.56rem', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 400, border: '1px solid rgba(250,247,242,0.18)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8650A'; e.currentTarget.style.color = '#FAF7F2' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,247,242,0.18)'; e.currentTarget.style.color = isMobile ? 'rgba(250,247,242,0.75)' : 'rgba(250,247,242,0.5)' }}>
              Our Story
            </Link>
          </motion.div>
        </div>

        <motion.div style={{ position: 'absolute', bottom: isMobile ? 20 : 44, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 10 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <motion.div style={{ width: 1, height: isMobile ? 36 : 56, background: 'linear-gradient(to bottom, transparent, rgba(232,101,10,0.75))' }}
            animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </section>

      {/* ══ 2. TICKER ══ */}
      <div style={{ overflow: 'hidden', background: '#0a0602', borderTop: '0.5px solid rgba(250,247,242,0.06)', borderBottom: '0.5px solid rgba(250,247,242,0.06)', padding: isMobile ? '14px 0' : '16px 0' }}>
        <motion.div style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }} transition={{ duration: isMobile ? 28 : 40, repeat: Infinity, ease: 'linear' }}>
          {[...Array(2)].flatMap((_, ri) =>
            ["ZSC Enterprises","Dunkin'","Baskin Robbins","Smoothie King","Jimmy John's","Atlanta, Georgia","Est. 2016","50+ Locations"].map((item, i) => (
              <span key={`${ri}-${i}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: isMobile ? '0.58rem' : '0.46rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.26)', padding: isMobile ? '0 1.4rem' : '0 2.4rem', fontWeight: 500 }}>{item}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#E8650A', opacity: 0.4, flexShrink: 0 }} />
              </span>
            ))
          )}
        </motion.div>
      </div>
{/* ══ 4. OUR STORY ══ */}
<section style={{ background: '#F3EDE3', padding: isMobile ? '4.5rem 1.5rem' : '7rem 8rem', position: 'relative', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.15) 0%, transparent 55%)', pointerEvents: 'none' }} />

  <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>

    {/* ZSC logo above the "Our Story" label — dark version for the light cream background */}
    <motion.div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '1.2rem' : '1.6rem' }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7 }}>
      <ZSCLogo size={isMobile ? 52 : 68} dark />
    </motion.div>

    <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: isMobile ? '1.4rem' : '2rem' }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7 }}>
      <div style={{ width: 32, height: 1, background: 'rgba(42,30,16,0.2)' }} />
      <span style={{ fontSize: isMobile ? '0.6rem' : '0.7rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 700 }}>Our Story</span>
      <div style={{ width: 32, height: 1, background: 'rgba(42,30,16,0.2)' }} />
    </motion.div>

    <motion.h2 className="font-playfair font-black"
      style={{ fontSize: isMobile ? 'clamp(2.2rem, 10vw, 3rem)' : 'clamp(3rem, 6vw, 6rem)', lineHeight: isMobile ? 1 : 0.9, color: '#1A1208', letterSpacing: '-0.025em', marginBottom: isMobile ? '1.8rem' : '2.5rem' }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
      One Vision.<br />
      <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block',paddingBottom: '0.15em' }}>Endless Opportunity.</em>
    </motion.h2>

    <motion.p style={{ fontSize: isMobile ? '0.98rem' : 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: isMobile ? 1.85 : 2.1, color: isMobile ? 'rgba(42,30,16,0.72)' : 'rgba(42,30,16,0.62)', fontWeight: 300, marginBottom: '1.5rem' }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
      From one vision in 2016 to a thriving multistate, multibrand franchise group, ZSC Enterprises has grown with a commitment to excellence, people, and opportunity.
    </motion.p>

    <motion.p style={{ fontSize: isMobile ? '0.98rem' : 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: isMobile ? 1.85 : 2.1, color: isMobile ? 'rgba(42,30,16,0.72)' : 'rgba(42,30,16,0.62)', fontWeight: 300 }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
      As franchisees of iconic brands such as Dunkin', Baskin-Robbins, Smoothie King, and Jimmy John's, we continue to expand our footprint while staying true to what matters most — our guests, our teams, and the communities we call home.
    </motion.p>
  </div>
</section>
{/* ══ MISSION ══ */}
      <section style={{ position: 'relative', padding: isMobile ? '3rem 1.5rem' : '3rem 4rem', overflow: 'hidden', textAlign: 'center', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ fontSize: isMobile ? '0.62rem' : '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.6rem', position: 'relative', zIndex: 5 }}>
          Our Mission
        </motion.p>
        <motion.p className="font-playfair italic"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: isMobile ? '1.1rem' : 'clamp(1rem, 1.6vw, 1.3rem)', lineHeight: 1.75, color: '#fff', position: 'relative', zIndex: 5, maxWidth: 780, margin: '0 auto' }}>
          "To inspire our team to become the best part of the day for our guests through our various brands."
        </motion.p>
        <motion.p style={{ marginTop: '0.8rem', fontSize: isMobile ? '0.55rem' : '0.42rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', position: 'relative', zIndex: 5 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
          ZSC Enterprises · Atlanta, Georgia
        </motion.p>
      </section>

{/* ══ IMAGE STRIP ══ */}
<div style={{ height: isMobile ? 280 : 500, overflow: 'hidden' }}>
  <motion.img src={teamserve} alt="ZSC"
    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
    whileHover={isMobile ? undefined : { scale: 1.05 }} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} />
</div>
      {/* ══ 3. BRAND ACCORDION ══ */}
      <BrandAccordion />
      <Footer />
    </motion.div>
  )
}