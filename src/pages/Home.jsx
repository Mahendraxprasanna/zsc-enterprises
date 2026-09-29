import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

import heroBg      from '../assets/images/street.png'
import teamImg     from '../assets/images/team.jpeg'
import teamserve   from '../assets/images/serve.jpg'
import dunkinVideo   from '../assets/videos/dunkinad.mp4'
import baskinVideo   from '../assets/videos/baskinad.mp4'
import smoothieVideo from '../assets/videos/smoothiead.mp4'
import jimmyVideo    from '../assets/videos/jimmyad.mp4'

// ─────────────────────────────────────────────────────────
// RESPONSIVE HOOK
// ─────────────────────────────────────────────────────────
function useResponsive() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])
  return {
    isMobile: width < 768,
    isTablet: width < 1024,
    width,
  }
}

// ─────────────────────────────────────────────────────────
// BRANDS DATA
// ─────────────────────────────────────────────────────────
const BRANDS = [
  {
    id: 0, name: "Dunkin'", tagline: "America Runs on Dunkin'", label: 'Brand 01 · ZSC Enterprises',
    desc: "ZSC Enterprises operates 50+ Dunkin' locations across the Atlanta metro — freshly brewed coffee, premium espresso, donuts, and breakfast delivered with speed and consistency every single day.",
    stats: [{ n: '50+', l: 'Locations' }, { n: '2007', l: 'Since' }, { n: 'ATL', l: 'Market' }],
    tags: ['Coffee', 'Espresso', 'Donuts', 'Breakfast', 'Cold Brew'],
    video: dunkinVideo, accent: '#E8650A', accentAlt: '#FF671F',
    bg: 'linear-gradient(145deg, #0f0800 0%, #1a1000 40%, #0f0800 100%)',
    glow: 'rgba(232,101,10,0.45)', link: '/brands',
    est: '1950', world: "World's Largest", worldSub: 'Coffee & Donuts Chain', floatTags: ['Coffee', 'Espresso'],
  },
  {
    id: 1, name: 'Baskin Robbins', tagline: 'More Flavors. More Smiles.', label: 'Brand 02 · ZSC Enterprises',
    desc: "The world's largest ice cream specialty chain — seven decades of premium hard-serve ice cream and iconic flavors. Co-located with our Dunkin' stores for the ultimate treat experience.",
    stats: [{ n: '31+', l: 'Flavors' }, { n: '1945', l: 'Since' }, { n: 'ATL', l: 'Market' }],
    tags: ['Ice Cream', 'Cakes', 'Shakes', 'Desserts'],
    video: baskinVideo, accent: '#D4186C', accentAlt: '#F05097',
    bg: 'linear-gradient(145deg, #0f0008 0%, #1a0010 40%, #0f0008 100%)',
    glow: 'rgba(212,24,108,0.45)', link: '/brands?brand=baskin',
    est: '1945', world: "World's Largest", worldSub: 'Ice Cream Specialty Chain', floatTags: ['Ice Cream', 'Cakes'],
  },
  {
    id: 2, name: 'Smoothie King', tagline: 'Smoothies With Purpose.', label: 'Brand 03 · ZSC Enterprises',
    desc: "Purpose-driven blends made with real fruit and wholesome ingredients — helping Atlanta guests fuel their active lifestyle. ZSC brings the Smoothie King mission to life every day.",
    stats: [{ n: '10+', l: 'Locations' }, { n: '1973', l: 'Since' }, { n: 'ATL', l: 'Market' }],
    tags: ['Smoothies', 'Real Fruit', 'Wellness', 'Energy'],
    video: smoothieVideo, accent: '#E31B23', accentAlt: '#FF4444',
    bg: 'linear-gradient(145deg, #0f0000 0%, #1a0000 40%, #0f0000 100%)',
    glow: 'rgba(227,27,35,0.45)', link: '/brands?brand=smoothie',
    est: '1973', world: 'Wellness Focused', worldSub: 'Smoothie Chain', floatTags: ['Smoothies', 'Wellness'],
  },
  {
    id: 3, name: "Jimmy John's", tagline: 'Freaky Fast. Freaky Fresh.', label: 'Brand 04 · ZSC Enterprises',
    desc: "ZSC Enterprises brings the Jimmy John's experience to the Southeast — delivering gourmet sandwiches made with fresh-baked bread and hand-sliced meats, freaky fast.",
    stats: [{ n: '5+', l: 'Locations' }, { n: '1983', l: 'Since' }, { n: 'SE', l: 'Region' }],
    tags: ['Gourmet Subs', 'Fresh Bread', 'Catering', 'Fast Delivery'],
    video: jimmyVideo, accent: '#C41230', accentAlt: '#FF2244',
    bg: 'linear-gradient(145deg, #0a0000 0%, #150000 40%, #0a0000 100%)',
    glow: 'rgba(196,18,48,0.45)', link: '/brands?brand=jimmyjohns',
    est: '1983', world: 'Gourmet Sub', worldSub: 'Sandwich Chain', floatTags: ['Subs', 'Fresh'],
  },
]

// ─────────────────────────────────────────────────────────
// BRAND ACCORDION
// ─────────────────────────────────────────────────────────
function BrandAccordion() {
  const [active, setActive] = useState(0)
  const { isMobile } = useResponsive()

  return (
    <section style={{ background: '#0a0602' }}>
      <div style={{ textAlign: 'center', padding: isMobile ? '3rem 2rem 2rem' : '5rem 5rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ height: 1, width: 44, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
          <span style={{ fontSize: '0.46rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600 }}>Our Portfolio</span>
          <div style={{ height: 1, width: 44, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
        </div>
        <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', color: '#FAF7F2', lineHeight: 0.95 }}>
          Four Brands.<br />
          <em style={{ fontStyle: 'italic', display: 'inline-block', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One Standard.</em>
        </h2>
      </div>

      {/* Mobile — stacked cards */}
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '0 1rem 2rem' }}>
          {BRANDS.map((brand, i) => (
            <div key={brand.id} style={{ position: 'relative', height: 220, borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => window.location.href = brand.link}>
              <video muted loop playsInline autoPlay
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) saturate(0.8)' }}>
                <source src={brand.video} type="video/mp4" />
              </video>
              <div style={{ position: 'absolute', inset: 0, background: brand.bg, opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                <div style={{ fontSize: '0.38rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: brand.accent, fontWeight: 700, marginBottom: 4 }}>{brand.label}</div>
                <h3 className="font-playfair font-black" style={{ fontSize: '1.8rem', color: '#FAF7F2', lineHeight: 0.95 }}>{brand.name}</h3>
                <p className="font-playfair italic" style={{ fontSize: '0.85rem', color: brand.accent, marginTop: 4 }}>{brand.tagline}</p>
              </div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${brand.accent}, ${brand.accentAlt})` }} />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop — accordion */
        <div style={{ display: 'flex', height: '85vh', padding: '0 3rem 3rem' }}>
          {BRANDS.map((brand, i) => {
            const isActive = active === i
            return (
              <motion.div
                key={brand.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => window.location.href = brand.link}
                animate={{ flex: isActive ? 4 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: 16, margin: '0 4px' }}
              >
                <video
                  muted loop playsInline
                  ref={el => { if (el) { isActive ? el.play() : el.pause() } }}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                    filter: `brightness(${isActive ? 0.88 : 0.65}) saturate(0.95)`,
                    transition: 'filter 0.6s ease',
                  }}>
                  <source src={brand.video} type="video/mp4" />
                </video>
                <div style={{ position: 'absolute', inset: 0, background: brand.bg, opacity: isActive ? 0.35 : 0.5, transition: 'opacity 0.6s ease', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${brand.glow} 0%, transparent 70%)`, opacity: isActive ? 0 : 0, transition: 'opacity 0.6s ease', zIndex: 2 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)', zIndex: 3 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${brand.accent}, ${brand.accentAlt})`, opacity: isActive ? 1 : 0.3, transition: 'opacity 0.5s ease', zIndex: 4 }} />

                {/* Collapsed — vertical name */}
                {!isActive && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
                    <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Jost', sans-serif", fontWeight: 900, fontSize: 'clamp(1.2rem, 2vw, 2rem)', color: '#ffffff', letterSpacing: '0.18em', textTransform: 'uppercase', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                      {brand.name}
                    </div>
                  </div>
                )}

                {/* Expanded — full content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 2.8rem', zIndex: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
                        <div style={{ width: 20, height: 1, background: brand.accent }} />
                        <span style={{ fontSize: '0.4rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: brand.accent, fontWeight: 700 }}>ZSC Enterprises</span>
                      </div>
                      <h3 className="font-playfair font-black" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', lineHeight: 0.9, color: '#FAF7F2', letterSpacing: '-0.025em' }}>{brand.name}</h3>
                      <p className="font-playfair italic" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)', marginTop: '0.5rem', background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>{brand.tagline}</p>
                      <Link to={brand.link} style={{ display: 'block', marginTop: '1.5rem', fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: brand.accent, textDecoration: 'none', fontWeight: 700 }}>Explore →</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────
export default function Home() {
  const { isMobile, isTablet } = useResponsive()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      {/* ══ 1. HERO ══ */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.img src={heroBg} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(1) saturate(1) sepia(0.4)' }}
          initial={{ scale: 1.08 }} animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,2,0,0.05) 0%, rgba(4,2,0,0.5) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center 40%, rgba(232,101,10,0.12) 0%, transparent 60%)' }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: isMobile ? '0 1.5rem' : '0 2rem', maxWidth: 900 }}>
          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 8 : 16, marginBottom: isMobile ? '1.5rem' : '2.4rem' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <div style={{ width: isMobile ? 20 : 40, height: 1, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
            <span style={{ fontSize: isMobile ? '0.36rem' : '0.43rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)', fontWeight: 500 }}>
              {isMobile ? 'Atlanta · Est. 2016' : 'Atlanta · Est. 2016 · Franchise Group'}
            </span>
            <div style={{ width: isMobile ? 20 : 40, height: 1, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
          </motion.div>

          <div style={{ overflow: 'visible', marginBottom: '0.3rem' }}>
            <motion.h1 className="font-playfair font-black"
              style={{ fontSize: isMobile ? 'clamp(4rem, 18vw, 5.5rem)' : 'clamp(4.5rem, 11vw, 11rem)', lineHeight: 0.95, color: '#FFFFFF', letterSpacing: '-0.03em', paddingBottom: '0.1em', textShadow: '0 2px 32px rgba(0,0,0,0.55)' }}
              initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              ZSC
            </motion.h1>
          </div>
          <div style={{ overflow: 'visible', marginBottom: isMobile ? '1.5rem' : '3rem' }}>
            <motion.h1 className="font-playfair font-black"
              style={{ fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(4.5rem, 11vw, 11rem)', lineHeight: 0.95, letterSpacing: '-0.03em', fontStyle: 'italic', background: 'linear-gradient(90deg, #E8650A 0%, #D4186C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', paddingBottom: '0.15em' }}
              initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}>
              Enterprises
            </motion.h1>
          </div>

          <motion.p style={{ fontSize: isMobile ? '0.85rem' : 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.9, color: 'rgba(250,247,242,0.9)', fontWeight: 300, maxWidth: 520, margin: '0 auto', marginBottom: isMobile ? '2rem' : '4rem', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75 }}>
            Building memorable experiences, one cup, one scoop, one smile at a time.
          </motion.p>

          <motion.div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.92 }}>
            <Link to="/brands" style={{ background: 'linear-gradient(135deg, #E8650A, #D4186C)', color: '#fff', textDecoration: 'none', padding: isMobile ? '0.85rem 2rem' : '1.05rem 3.2rem', fontSize: isMobile ? '0.5rem' : '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, boxShadow: '0 16px 48px rgba(232,101,10,0.42)' }}>
              Explore Our Brands
            </Link>
            <Link to="/leadership" style={{ color: 'rgba(250,247,242,0.5)', textDecoration: 'none', padding: isMobile ? '0.85rem 1.6rem' : '1.05rem 2.6rem', fontSize: isMobile ? '0.5rem' : '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 400, border: '1px solid rgba(250,247,242,0.18)' }}>
              Our Story
            </Link>
          </motion.div>
        </div>

        <motion.div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', display: isMobile ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 10 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <motion.div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, transparent, rgba(232,101,10,0.75))' }}
            animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </section>

      {/* ══ 2. TICKER ══ */}
      <div style={{ overflow: 'hidden', background: '#0a0602', borderTop: '0.5px solid rgba(250,247,242,0.06)', borderBottom: '0.5px solid rgba(250,247,242,0.06)', padding: '16px 0' }}>
        <motion.div style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          {[...Array(2)].flatMap((_, ri) =>
            ["ZSC Enterprises","Dunkin'","Baskin Robbins","Smoothie King","Jimmy John's","Atlanta, Georgia","Est. 2016","45+ Locations","NDCP Chairman","Coffee Cafe Bakery"].map((item, i) => (
              <span key={`${ri}-${i}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: '0.46rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.26)', padding: '0 2.4rem', fontWeight: 500 }}>{item}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#E8650A', opacity: 0.4, flexShrink: 0 }} />
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ══ 3. MISSION ══ */}
      <section style={{ position: 'relative', padding: isMobile ? '2rem 2rem' : '3rem 4rem', overflow: 'hidden', textAlign: 'center', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.p style={{ fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.6rem', position: 'relative', zIndex: 5 }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          Our Mission
        </motion.p>
        <motion.p className="font-playfair"
          style={{ fontSize: isMobile ? 'clamp(0.85rem, 3.5vw, 1rem)' : 'clamp(1rem, 1.6vw, 1.3rem)', lineHeight: 1.75, color: '#fff', position: 'relative', zIndex: 5, maxWidth: 780, margin: '0 auto' }}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
          "To inspire our team to become the best part of the day for our guests through our various brands."
        </motion.p>
        <motion.p style={{ marginTop: '0.8rem', fontSize: '0.42rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', position: 'relative', zIndex: 5 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
          ZSC Enterprises · Atlanta, Georgia
        </motion.p>
      </section>

      {/* ══ IMAGE STRIP ══ */}
      <div style={{ height: isMobile ? 240 : 580, overflow: 'hidden' }}>
        <motion.img src={teamserve} alt="ZSC"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          whileHover={{ scale: 1.03 }} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} />
      </div>

      {/* ══ 4. BRAND ACCORDION ══ */}
      <BrandAccordion />

      {/* ══ 5. OUR STORY ══ */}
      <section style={{ background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)', padding: isMobile ? '4rem 2rem' : '7rem 8rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '2rem' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontSize: '0.46rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>Our Story</span>
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.4)' }} />
          </motion.div>
          <motion.h2 className="font-playfair font-black"
            style={{ fontSize: isMobile ? 'clamp(2.5rem, 8vw, 3.5rem)' : 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.9, color: '#fff', letterSpacing: '-0.025em', marginBottom: '2.5rem' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}>
            One Vision.<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', paddingBottom: '0.15em', display: 'inline-block' }}>Endless Opportunity.</em>
          </motion.h2>
          <motion.p style={{ fontSize: isMobile ? '0.88rem' : 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 2.1, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            From one vision in 2016 to a thriving multistate, multibrand franchise group, ZSC Enterprises has grown with a commitment to excellence, people, and opportunity.
          </motion.p>
          <motion.p style={{ fontSize: isMobile ? '0.88rem' : 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 2.1, color: 'rgba(255,255,255,0.85)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
            As franchisees of iconic brands such as Dunkin', Baskin-Robbins, Smoothie King, and Jimmy John's, we continue to expand our footprint while staying true to what matters most — our guests, our teams, and the communities we call home.
          </motion.p>
        </div>
      </section>

      {/* ══ 6. FINAL CTA ══ */}
      <section style={{ minHeight: isMobile ? '50vh' : '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', textAlign: 'center', padding: isMobile ? '5rem 2rem' : '9rem 3rem' }}>
        <img src={teamImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.22) saturate(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,101,10,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,6,2,0.55)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <motion.div style={{ width: 1, height: isMobile ? 40 : 64, background: 'linear-gradient(to bottom, transparent, #D4186C)', margin: '0 auto', marginBottom: isMobile ? '2.5rem' : '4rem' }}
            initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />

          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '2rem' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ width: isMobile ? 20 : 40, height: 1, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
            <span style={{ fontSize: '0.43rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', fontWeight: 500 }}>ZSC Enterprises · Atlanta, Georgia</span>
            <div style={{ width: isMobile ? 20 : 40, height: 1, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
          </motion.div>

          <motion.h2 className="font-playfair font-black"
            style={{ fontSize: isMobile ? 'clamp(2rem, 7vw, 2.8rem)' : 'clamp(2.8rem, 5.5vw, 5.5rem)', color: '#FAF7F2', lineHeight: 0.92, marginBottom: '2rem', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}>
            Four Iconic Brands.<br />
            <em style={{ fontStyle: 'italic', display: 'inline-block', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One Trusted Partner.</em>
          </motion.h2>

          <motion.p style={{ fontSize: isMobile ? '0.85rem' : '1.05rem', lineHeight: 2.1, color: 'rgba(250,247,242,0.38)', fontWeight: 300, maxWidth: 480, margin: '0 auto', marginBottom: isMobile ? '2.5rem' : '4rem' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}>
            Proudly serving communities with passion, quality, and care across Atlanta and beyond.
          </motion.p>

          <motion.div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.42 }}>
            <Link to="/brands" style={{ background: 'linear-gradient(135deg, #E8650A, #D4186C)', color: '#fff', textDecoration: 'none', padding: isMobile ? '0.85rem 2rem' : '1.1rem 3.2rem', fontSize: isMobile ? '0.5rem' : '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, boxShadow: '0 14px 44px rgba(232,101,10,0.35)' }}>
              Learn More About Us
            </Link>
            <Link to="/team" style={{ color: 'rgba(250,247,242,0.45)', textDecoration: 'none', padding: isMobile ? '0.85rem 1.6rem' : '1.1rem 2.6rem', fontSize: isMobile ? '0.5rem' : '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 400, border: '1px solid rgba(250,247,242,0.18)' }}>
              Meet Our Team
            </Link>
          </motion.div>

          {!isMobile && (
            <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '4.5rem', flexWrap: 'wrap' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}>
              {[["Dunkin'", "#FF671F"], ["Baskin Robbins", "#F05097"], ["Smoothie King", "#E31B23"], ["Jimmy John's", "#C41230"]].map(([name, color], i) => (
                <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem' }}>
                  <span style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.2)', fontWeight: 500 }}>{name}</span>
                  {i < 3 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: color, opacity: 0.5 }} />}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}