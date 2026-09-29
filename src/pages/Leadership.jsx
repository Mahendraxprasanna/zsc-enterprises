import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import useIsMobile from '../hooks/useIsMobile'

import govKempImg        from '../assets/images/govkemp.png'
import ndcpBoardImg      from '../assets/images/ndcpboard.png'
import boardDirectorsImg from '../assets/images/boarddirectors.png'
import peterbiltImg      from '../assets/images/peterbilt.png'
import ribbonCuttingImg from '../assets/images/cutting.png'
import heroVideo from '../assets/videos/shams-hero.mp4'
import ccbVideo from '../assets/videos/ccb.mp4'
import shamsImg from '../assets/images/headshot.jpg'
import shamsPortrait from '../assets/images/shamsport.png'

const STATS = [
  { n: '25+',  l: 'Years QSR' },
  { n: '50+',  l: 'Locations' },
  { n: '$15M', l: 'CCB Led' },
  { n: '50+', l: 'Jobs Created' },
]

const TIMELINE = [
  { year: '1999', title: 'Started in QSR at Age 14',           sub: 'Popeyes, Gainesville GA. Rose to Weekend Manager within months.',                                                  tag: 'Origin',    color: '#E8650A' },
  { year: '2007', title: "Acquired First 3 Dunkin' Locations",  sub: 'Chose franchising over corporate America after GSU & PwC internship.',                                             tag: 'Founder',   color: '#D4186C' },
  { year: '2011', title: 'MBA · Georgia Tech',                  sub: 'Master of Business Administration while growing his franchise portfolio.',                                          tag: 'Education', color: '#E8650A' },
  { year: '2016', title: 'Founded ZSC Enterprises',             sub: "Dunkin', Baskin Robbins & Smoothie King franchise group, Atlanta.",                                                 tag: 'Founder',   color: '#D4186C' },
  { year: '2020', title: 'Co-Founded CCB · $10M State-Backed', sub: 'Announced by Governor Brian P. Kemp. 31,150 sq ft in Federal Opportunity Zone, Fulton County. Creates 50+ jobs.', tag: 'Industry',  color: '#E8650A' },
  { year: '—',    title: 'Chairman · NDCP Board',               sub: "Elected Chairman — highest office in the Dunkin' franchise system.",                                                tag: 'Chairman',  color: '#D4186C' },
]

const NDCP_STATS = [
  { n: '9,600+',    l: "Dunkin' Locations Powered" },
  { n: 'All 50',    l: 'States Covered' },
  { n: 'Elected',   l: 'By Fellow Franchisees' },
  { n: '$3 Billion',l: 'Supply Chain Management' },
]

const CCB_STATS = [
  { n: '$15M', l: 'Investment' },
  { n: '145+', l: 'Locations Served' },
  { n: '50+',  l: 'Jobs Created' },
  { n: '2020', l: 'Gov. Kemp Opening' },
]

const FIELD_PHOTOS = [
  { img: govKempImg,        tag: 'CCB Opening',    title: 'With Gov. Kemp' },
  { img: ndcpBoardImg,      tag: 'NDCP Board',     title: 'With Industry Leaders' },
  { img: boardDirectorsImg, tag: 'NDCP Directors', title: 'Board of Directors' },
  { img: peterbiltImg,      tag: 'Operations',     title: 'Peterbilt Tour' },
]

const gradStyle = {
  background: 'linear-gradient(135deg, #E8650A, #D4186C)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 40 : 0, x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}

function Lightbox({ photos, active, onClose, onNav }) {
  const isMobile = useIsMobile() // hook must run before the early return
  if (active === null) return null

  // Phone: arrows sit at the bottom (clear of the image and the iPhone home bar)
  // PC: arrows stay on the left/right sides exactly as before
  const arrowStyle = (side) => isMobile ? {
    position: 'absolute', [side]: 20, bottom: 'calc(28px + env(safe-area-inset-bottom, 0px))',
    width: 48, height: 48, background: '#E8650A', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', zIndex: 10,
  } : {
    position: 'absolute', [side]: 24, top: '50%', transform: 'translateY(-50%)',
    width: 52, height: 52, background: '#E8650A', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', zIndex: 10,
  }

  return (
    <motion.div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.95)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button onClick={e => { e.stopPropagation(); onNav(-1) }} style={arrowStyle('left')}>←</button>
      <div style={{ maxWidth: isMobile ? '92vw' : '72vw' }} onClick={e => e.stopPropagation()}>
        <img src={photos[active].img} alt={photos[active].title} style={{ maxWidth: isMobile ? '92vw' : '72vw', maxHeight: isMobile ? '65dvh' : '78vh', objectFit: 'contain', display: 'block' }} />
        <div style={{ textAlign: 'center', marginTop: 16, color: 'rgba(250,247,242,0.6)', fontSize: isMobile ? '0.9rem' : '0.82rem' }}>
          {photos[active].title} &nbsp;·&nbsp; {photos[active].tag}
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); onNav(1) }} style={arrowStyle('right')}>→</button>
      <div style={{ position: 'absolute', top: isMobile ? 'calc(20px + env(safe-area-inset-top, 0px))' : 24, right: isMobile ? 20 : 32, fontSize: isMobile ? '0.65rem' : '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: isMobile ? 'rgba(250,247,242,0.55)' : 'rgba(250,247,242,0.3)', cursor: 'pointer' }}
        onClick={onClose}>{isMobile ? 'Tap to close ✕' : 'ESC to close'}</div>
    </motion.div>
  )
}

export default function Leadership() {
  const [videoOpen,      setVideoOpen]      = useState(false)
  const [ccbVideoOpen,   setCcbVideoOpen]   = useState(false)
  const [lightboxActive, setLightboxActive] = useState(null)
  const [bgMuted,        setBgMuted]        = useState(true)
  const bgVideoRef    = useRef(null)
  const ccbBgVideoRef = useRef(null)
  const isMobile      = useIsMobile()

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.muted = bgMuted
      if (!bgMuted) bgVideoRef.current.volume = 0.2
    }
  }, [bgMuted])

  useEffect(() => {
    if (ccbBgVideoRef.current) {
      if (ccbVideoOpen) ccbBgVideoRef.current.pause()
      else ccbBgVideoRef.current.play().catch(() => {})
    }
  }, [ccbVideoOpen])

  const handleLightboxNav = dir =>
    setLightboxActive(prev => (prev + dir + FIELD_PHOTOS.length) % FIELD_PHOTOS.length)

  // Phone-only readable sizes for the tiny uppercase labels
  const label = (desktopSize) => isMobile ? '0.6rem' : desktopSize

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={isMobile ? { paddingTop: 64, overflowX: 'hidden' } : { paddingTop: 72 }}>

      {/* ── HERO VIDEO POPUP ── */}
      <AnimatePresence>
        {videoOpen && heroVideo && (
          <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: isMobile ? 64 : 72, background: 'rgba(0,0,0,0.96)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoOpen(false)}>
            <motion.div style={{ width: isMobile ? '94vw' : '88vw', maxWidth: 1100, position: 'relative', marginTop: isMobile ? '1rem' : '2rem' }}
              initial={{ scale: 0.96, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0.7rem 0.9rem' : '0.8rem 1.2rem', background: 'rgba(20,10,4,0.95)', border: '0.5px solid rgba(232,101,10,0.3)', borderBottom: 'none' }}>
                <div>
                  <div style={{ fontSize: label('0.44rem'), letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 3, ...gradStyle }}>ZSC Enterprises · Leadership</div>
                  <div className="font-playfair font-bold" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', color: '#FAF7F2' }}>Shams Charania — Managing Partner</div>
                </div>
                <button onClick={() => setVideoOpen(false)} style={{ background: 'none', border: '0.5px solid rgba(250,247,242,0.2)', color: 'rgba(250,247,242,0.7)', width: isMobile ? 40 : 36, height: isMobile ? 40 : 36, flexShrink: 0, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
              <video autoPlay controls playsInline style={{ width: '100%', display: 'block', background: '#000', maxHeight: isMobile ? 'calc(100dvh - 200px)' : 'calc(100vh - 220px)' }}>
                <source src={heroVideo} type="video/mp4" />
              </video>
              <div style={{ padding: '0.75rem 1.2rem', background: 'rgba(0,0,0,0.9)', borderTop: '2px solid #E8650A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: label('0.44rem'), letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)' }}>{isMobile ? 'Tap outside to close' : 'Click outside to close'}</span>
                <span style={{ fontSize: label('0.44rem'), letterSpacing: '0.18em', textTransform: 'uppercase', ...gradStyle }}>ZSC Enterprises</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          1. VIDEO HERO  (commented out — unchanged)
      ══════════════════════════════════════ */}
      {/* Your original commented-out hero section and intro section go here unchanged.
          They were commented out, so they don't render on PC or phone. */}


{/* ══════════════════════════════════════
    5. BIO + KEY ACCOMPLISHMENTS
    PC: text left, portrait right (unchanged)
    Phone: portrait on top, text below
══════════════════════════════════════ */}
<section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : '90vh', borderTop: '0.5px solid rgba(250,247,242,0.06)' }}>

  {/* LEFT — Biography text */}
  <motion.div
    style={{ padding: isMobile ? '2.5rem 1.5rem 3.5rem' : '6rem 5rem', background: '#0f0a06', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: isMobile ? 'none' : '0.5px solid rgba(250,247,242,0.06)' }}
    initial={isMobile ? { opacity: 0, y: 40, filter: 'blur(12px)' } : { opacity: 0, x: -60, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: isMobile ? 20 : 28 }}>
      <div style={{ width: 20, height: 1, background: '#E8650A' }} />
      <span style={{ fontSize: label('0.5rem'), letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600 }}>Biography</span>
    </div>
    <div className="font-playfair font-black" style={{ lineHeight: 1.0, marginBottom: 20, WebkitTextFillColor: 'initial' }}>
                <motion.span style={{ fontSize: isMobile ? 'clamp(2.2rem, 11vw, 2.8rem)' : 'clamp(2.8rem,4.5vw,4.2rem)', fontStyle: 'italic', display: 'inline-block', paddingRight: '0.06em', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>Shams Charania</motion.span>
              </div>
    <h2 className="font-playfair font-black" style={{ fontSize: isMobile ? '1.2rem' : 'clamp(1.4rem, 4.5vw, 1.4rem)', color: '#FAF7F2', lineHeight: 1.02, marginBottom: 16 }}>
      -Managing Partner<br />
    </h2>
    <h2 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(2rem, 9vw, 2.6rem)' : 'clamp(2.8rem, 4.5vw, 4.2rem)', color: '#FAF7F2', lineHeight: isMobile ? 1.08 : 1.02, marginBottom: 16 }}>
      From Crew Member<br />
      <em style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', paddingRight: isMobile ? '0.06em' : undefined }}>
        to Industry Leader
      </em>
    </h2>

    <motion.div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #E8650A, #D4186C)', marginBottom: isMobile ? 28 : 36 }}
      initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }} />

    <p style={{ fontSize: isMobile ? '1rem' : '1.05rem', lineHeight: isMobile ? 1.85 : 2, color: isMobile ? 'rgba(250,247,242,0.72)' : 'rgba(250,247,242,0.65)', fontWeight: 300, marginBottom: '1.6rem' }}>
Shams Charania's story begins in 1999 — a 14-year-old who moved to Atlanta and started working weekends at a Popeyes in Gainesville, GA. Within months he was managing the restaurant on weekends in the owner's absence.    </p>

    <p style={{ fontSize: isMobile ? '1rem' : '1.05rem', lineHeight: isMobile ? 1.85 : 2, color: isMobile ? 'rgba(250,247,242,0.72)' : 'rgba(250,247,242,0.65)', fontWeight: 300, marginBottom: '2.2rem' }}>
While attending Georgia State University, Shams joined Dunkin’ in 2003 as an Assistant Manager. Together with his brother, he helped grow sales and earned recognition for operating clean, high-quality, and efficient restaurants.     </p>

    <blockquote style={{ padding: isMobile ? '1.2rem 1.2rem' : '1.6rem 1.8rem', borderLeft: '3px solid #E8650A', marginBottom: '1.8rem', background: 'rgba(232,101,10,0.06)' }}>
      <p className="font-playfair italic" style={{ fontSize: isMobile ? '1.05rem' : '1.1rem', lineHeight: isMobile ? 1.7 : 1.8, color: 'rgba(250,247,242,0.88)' }}>
        "We are in the PEOPLE business, and the continuous development of the PEOPLE in our organization is a hallmark of our operation."
      </p>
      <cite style={{ display: 'block', marginTop: 10, fontSize: label('0.48rem'), letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', fontStyle: 'normal' }}>
        — Shams Charania
      </cite>
    </blockquote>
    <p style={{ fontSize: isMobile ? '1rem' : '1.05rem', lineHeight: isMobile ? 1.85 : 2, color: isMobile ? 'rgba(250,247,242,0.72)' : 'rgba(250,247,242,0.65)', fontWeight: 300, marginBottom: '2.2rem' }}>
      After graduating with an accounting degree and completing an internship at PwC, Shams realized his passion was in the restaurant business. In 2007, he acquired three Dunkin’ restaurants with his brother and a former Popeyes owner—marking the beginning of his journey as a franchise owner and entrepreneur.</p>
    <p style={{ fontSize: isMobile ? '1rem' : '1.05rem', lineHeight: isMobile ? 1.85 : 2, color: isMobile ? 'rgba(250,247,242,0.72)' : 'rgba(250,247,242,0.65)', fontWeight: 300 }}>
      Today, Shams leads ZSC Enterprises as Managing Partner, focusing on organizational strategy, development, new opportunities, and most importantly, developing people within the organization. He holds an MBA from Georgia Tech and serves as Chairman of the Board of National DCP, a 3 billion dollar supply chain cooperative serving more than 10,000 Dunkin’ restaurants. He has also held several leadership roles within the Dunkin’ brand.    </p>
  </motion.div>

  {/* RIGHT — Portrait (moves to the top on phone) */}
  <motion.div style={{ position: 'relative', overflow: 'hidden', order: isMobile ? -1 : undefined, height: isMobile ? 'min(125vw, 520px)' : undefined }}
    initial={isMobile ? { opacity: 0, filter: 'blur(12px)' } : { opacity: 0, x: 60, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
    <img src={shamsPortrait} alt="Shams Charania"
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'brightness(0.82) saturate(0.85) contrast(1.08)' }} />
    {!isMobile && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0f0a06 0%, transparent 20%)' }} />}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to top, #0f0a06, transparent)' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
  </motion.div>

</section>
      {/* ══════════════════════════════════════
          2. STATS STRIP — with hover fill effect
          Hover effect only runs on devices with a real mouse (hover: hover),
          so on iPhone/Android a tap doesn't leave the box stuck orange.
      ══════════════════════════════════════ */}
      <Reveal>
        <style>{`
          .ldr-stat { position: relative; overflow: hidden; cursor: pointer; transition: background 0.4s ease; }
          .ldr-stat::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 0%; background: linear-gradient(135deg, #E8650A, #D4186C); transition: height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); z-index: 0; }
          @media (hover: hover) {
            .ldr-stat:hover::before { height: 100%; }
            .ldr-stat:hover .ldr-n { background: #F3EDE3; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            .ldr-stat:hover .ldr-l { color: rgba(250,247,242,0.6) !important; }
          }
          .ldr-stat .ldr-inner { position: relative; z-index: 1; }
          .ldr-n { font-family: 'Playfair Display', serif; font-weight: 900; background: linear-gradient(135deg, #E8650A, #D4186C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.5rem; font-size: 2.8rem; transition: all 0.3s ease; }
          @media (max-width: 768px) { .ldr-n { font-size: 2.2rem; } }
        `}</style>
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', background: '#F3EDE3' }}>
          {STATS.map((s, i) => (
            <div key={s.l} className="ldr-stat" style={isMobile ? {
              padding: '1.8rem 1.4rem',
              borderRight: i % 2 === 0 ? '0.5px solid rgba(42,30,16,0.08)' : 'none',
              borderTop: i >= 2 ? '0.5px solid rgba(42,30,16,0.08)' : 'none',
            } : { padding: '2.5rem 2.5rem', borderRight: i < 3 ? '0.5px solid rgba(42,30,16,0.06)' : 'none' }}>
              <div className="ldr-inner">
                <div className="ldr-n">{s.n}</div>
                <div className="ldr-l" style={{ fontSize: label('0.5rem'), letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.38)', fontWeight: 500 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </section>
      </Reveal>



      {/* ══════════════════════════════════════
          6. COFFEE CAFE BAKERY
      ══════════════════════════════════════ */}
      <section style={{ background: '#F3EDE3' }}>
        <AnimatePresence>
          {ccbVideoOpen && ccbVideo && (
            <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCcbVideoOpen(false)}>
              <motion.div style={{ width: isMobile ? '94vw' : '85vw', maxWidth: 1100, position: 'relative' }}
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: isMobile ? '0.7rem 0.9rem' : '0.8rem 1.2rem', background: 'rgba(20,10,4,0.95)', border: '0.5px solid rgba(232,101,10,0.3)', borderBottom: 'none' }}>
                  <div>
                    <div style={{ fontSize: isMobile ? '0.58rem' : '0.88rem', letterSpacing: isMobile ? '0.16em' : '0.22em', textTransform: 'uppercase', marginBottom: 3, ...gradStyle }}>ZSC Enterprises · Coffee Cafe Bakery</div>
                    <div className="font-playfair font-bold" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', color: '#FAF7F2' }}>CCB Grand Opening — Governor Brian P. Kemp</div>
                  </div>
                  <button onClick={() => setCcbVideoOpen(false)} style={{ background: 'none', border: '0.5px solid rgba(250,247,242,0.2)', color: 'rgba(250,247,242,0.7)', width: isMobile ? 40 : 36, height: isMobile ? 40 : 36, flexShrink: 0, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
                <video autoPlay controls playsInline controlsList="nodownload" style={{ width: '100%', display: 'block', background: '#000', maxHeight: isMobile ? 'calc(100dvh - 180px)' : 'calc(100vh - 180px)' }}>
                  <source src={ccbVideo} type="video/mp4" />
                </video>
                <div style={{ padding: '0.75rem 1.2rem', background: 'rgba(0,0,0,0.85)', borderTop: '2px solid #E8650A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: label('0.44rem'), letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)' }}>{isMobile ? 'Tap outside to close' : 'Click outside to close'}</span>
                  <span style={{ fontSize: label('0.44rem'), letterSpacing: '0.18em', textTransform: 'uppercase', ...gradStyle }}>Coffee Cafe Bakery</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal>
          <div style={{ padding: isMobile ? '3.5rem 1.5rem 2rem' : '5rem 4rem 3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, background: '#D4186C', borderRadius: '50%' }} />
              <span style={{ fontSize: label('0.48rem'), letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D4186C', fontWeight: 600 }}>Co-Founder · Major Partner</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: isMobile ? '1rem' : '2rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: label('0.5rem'), letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 4 }}>Partner Venture</p>
                <h2 className="font-playfair font-black leading-[0.95]" style={{ fontSize: isMobile ? 'clamp(2.4rem, 12vw, 3rem)' : 'clamp(3rem,6vw,5rem)', color: '#1A1208' }}>
                  Coffee Cafe<br /><em style={{ fontStyle: 'italic', ...gradStyle, display: isMobile ? 'inline-block' : undefined, paddingRight: isMobile ? '0.06em' : undefined }}>Bakery.</em>
                </h2>
              </div>
              <a href="https://coffeecafebakery.com" target="_blank" rel="noreferrer"
                style={isMobile ? {
                  marginTop: '0.5rem', display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center',
                  fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0.95rem 1rem',
                  background: 'linear-gradient(135deg,#E8650A,#D4186C)', color: '#fff', textDecoration: 'none', fontWeight: 600,
                } : { marginTop: '1rem', display: 'inline-block', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg,#E8650A,#D4186C)', color: '#fff', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
                Visit CoffeeCafeBakery.com →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : 500 }}>
            <div style={{ padding: isMobile ? '0.5rem 1.5rem 2.5rem' : '3rem 4rem', borderRight: isMobile ? 'none' : '0.5px solid rgba(42,30,16,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: isMobile ? '0.98rem' : '1rem', lineHeight: isMobile ? 1.8 : 1.9, color: isMobile ? 'rgba(42,30,16,0.72)' : 'rgba(42,30,16,0.6)', fontWeight: 300, marginBottom: '1.2rem' }}>
                  Coffee Cafe Bakery is a state-of-the-art Dunkin' Centralized Manufacturing Location (CML) — one of fewer than 100 such facilities in the entire United States. A $10 million, 31,150 sq ft highly automated production facility in Fulton County, Atlanta, co-founded by Shams Charania through ZSC Enterprises.
                </p>
                <p style={{ fontSize: isMobile ? '0.98rem' : '1rem', lineHeight: isMobile ? 1.8 : 1.9, color: isMobile ? 'rgba(42,30,16,0.62)' : 'rgba(42,30,16,0.5)', fontWeight: 300 }}>
                  Announced by Governor Brian P. Kemp at the grand opening — backed by the State of Georgia, City of Atlanta, and the Georgia Department of Economic Development. Located in a Federal Opportunity Zone in Fulton County.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(42,30,16,0.08)', marginTop: '2rem' }}>
  {CCB_STATS.map(s => (
    <div key={s.l} style={{ padding: isMobile ? '1rem 1.1rem' : '1.2rem 1.5rem', background: '#F3EDE3' }}>
      <div className="font-playfair font-black leading-none mb-1" style={{ fontSize: isMobile ? '1.6rem' : '1.8rem', ...gradStyle }}>{s.n}</div>
      <div style={{ fontSize: isMobile ? '0.56rem' : '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.38)', fontWeight: 500 }}>{s.l}</div>
    </div>
  ))}
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? 260 : 500, cursor: ccbVideo ? 'pointer' : 'default' }}
              onClick={() => ccbVideo && setCcbVideoOpen(true)}>
              {ccbVideo ? (
                <video ref={ccbBgVideoRef} autoPlay loop playsInline muted
                  style={{ position: 'absolute', inset: 0, width: '120%', height: '120%', objectFit: 'cover', objectPosition: 'center', display: 'block', filter: 'brightness(0.92) saturate(1.05)' }}>
                  <source src={ccbVideo} type="video/mp4" />
                </video>
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A0800, #2D1208)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                  <motion.div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(232,101,10,0.25), rgba(212,24,108,0.25))', border: '1px solid rgba(232,101,10,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#FAF7F2' }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>▶</motion.div>
                  <span style={{ fontSize: label('0.48rem'), letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)' }}>Video Coming Soon</span>
                </div>
              )}
              {ccbVideo && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)' }} />}
              {/* Phone-only hint so people know the video is tappable */}
              {ccbVideo && isMobile && (
                <div style={{ position: 'absolute', left: 14, bottom: 14, zIndex: 3, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.55)', padding: '8px 12px', pointerEvents: 'none' }}>
                  <span style={{ color: '#fff', fontSize: '0.8rem' }}>▶</span>
                  <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', fontWeight: 600 }}>Tap to watch</span>
                </div>
              )}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#E8650A,#D4186C)', zIndex: 2 }} />
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
  <section style={{ padding: isMobile ? '3.5rem 1.5rem' : '4rem 4rem', textAlign: 'center', background: 'linear-gradient(145deg, #1A0E05 0%, #0D0800 50%, #1A0E05 100%)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,101,10,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
      <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, transparent, #D4186C)', margin: '0 auto 1.8rem' }} />
      <blockquote className="font-playfair italic" style={{ fontSize: isMobile ? '1.15rem' : 'clamp(1rem, 1.8vw, 1.5rem)', color: 'rgba(250,247,242,0.88)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
        "If you want to walk fast, walk alone. But if you want to walk far, walk together."
      </blockquote>
      <cite style={{ fontSize: label('0.44rem'), letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', fontStyle: 'normal', lineHeight: 1.8 }}>
        — Ratan Tata &nbsp;·&nbsp; A quote Shams lives by
      </cite>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '0.8rem' : '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
        <Link to="/team" style={{ background: 'linear-gradient(135deg,#E8650A,#D4186C)', color: '#fff', textDecoration: 'none', padding: isMobile ? '0.95rem 1.5rem' : '0.75rem 2rem', width: isMobile ? '100%' : undefined, maxWidth: isMobile ? 300 : undefined, boxSizing: 'border-box', textAlign: 'center', fontSize: isMobile ? '0.64rem' : '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, boxShadow: '0 8px 24px rgba(232,101,10,0.22)' }}>Meet The Full Team</Link>
        <Link to="/contact" style={{ background: 'transparent', color: isMobile ? 'rgba(250,247,242,0.75)' : 'rgba(250,247,242,0.5)', textDecoration: 'none', padding: isMobile ? '0.95rem 1.5rem' : '0.75rem 2rem', width: isMobile ? '100%' : undefined, maxWidth: isMobile ? 300 : undefined, boxSizing: 'border-box', textAlign: 'center', fontSize: isMobile ? '0.64rem' : '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, border: '0.5px solid rgba(250,247,242,0.18)' }}>Get in Touch</Link>
      </div>
    </div>
  </section>
</Reveal>

      {/* ══════════════════════════════════════
          8. IN THE FIELD
          PC: 4 across (unchanged) · Phone: 2 × 2 grid
      ══════════════════════════════════════ */}
      <section style={{ background: '#1A0E05' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 12 : 16, padding: isMobile ? '3rem 1.5rem 1.8rem' : '3.5rem 4rem 2.5rem' }}>
            <div style={{ height: 1, width: isMobile ? 36 : 60, background: '#E8650A' }} />
            <span style={{ fontSize: label('0.48rem'), letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.45)', fontWeight: 500 }}>In The Field</span>
            <div style={{ height: 1, width: isMobile ? 36 : 60, background: '#E8650A' }} />
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', padding: isMobile ? '0 1rem 2.5rem' : '0 3rem 3rem', gap: isMobile ? 8 : 12 }}>
          {FIELD_PHOTOS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(250,247,242,0.08)', cursor: 'pointer' }} onClick={() => setLightboxActive(i)}>
                <img src={p.img} alt={p.title}
                  style={{ width: '100%', height: isMobile ? 170 : 260, objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: isMobile ? 'brightness(0.85)' : 'brightness(0.72)', transition: 'transform 0.5s, filter 0.3s' }}
                  onMouseEnter={isMobile ? undefined : e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(0.5)' }}
                  onMouseLeave={isMobile ? undefined : e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.72)' }} />
                <div style={{ background: '#1C0F08', padding: isMobile ? '8px 10px 12px' : '10px 14px 14px', borderTop: '2px solid #E8650A' }}>
                  <div style={{ fontSize: isMobile ? '0.52rem' : '0.44rem', letterSpacing: isMobile ? '0.18em' : '0.26em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600, marginBottom: 3 }}>{p.tag}</div>
                  <div className="font-playfair font-bold" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', color: '#FAF7F2', lineHeight: 1.2 }}>{p.title}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        <Lightbox photos={FIELD_PHOTOS} active={lightboxActive} onClose={() => setLightboxActive(null)} onNav={handleLightboxNav} />
      </AnimatePresence>
      <Footer />
    </motion.div>
  )
}