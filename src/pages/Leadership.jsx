import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

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
  { n: '$10M', l: 'CCB Led' },
  { n: '100+', l: 'Jobs Created' },
]

const TIMELINE = [
  { year: '1999', title: 'Started in QSR at Age 14',           sub: 'Popeyes, Gainesville GA. Rose to Weekend Manager within months.',                                                  tag: 'Origin',    color: '#E8650A' },
  { year: '2007', title: "Acquired First 3 Dunkin' Locations",  sub: 'Chose franchising over corporate America after GSU & PwC internship.',                                             tag: 'Founder',   color: '#D4186C' },
  { year: '2011', title: 'MBA · Georgia Tech',                  sub: 'Master of Business Administration while growing his franchise portfolio.',                                          tag: 'Education', color: '#E8650A' },
  { year: '2016', title: 'Founded ZSC Enterprises',             sub: "Dunkin', Baskin Robbins & Smoothie King franchise group, Atlanta.",                                                 tag: 'Founder',   color: '#D4186C' },
  { year: '2020', title: 'Co-Founded CCB · $10M State-Backed', sub: 'Announced by Governor Brian P. Kemp. 31,150 sq ft in Federal Opportunity Zone, Fulton County. Creates 70+ jobs.', tag: 'Industry',  color: '#E8650A' },
  { year: '—',    title: 'Chairman · NDCP Board',               sub: "Elected Chairman — highest office in the Dunkin' franchise system.",                                                tag: 'Chairman',  color: '#D4186C' },
]

const NDCP_STATS = [
  { n: '9,600+',    l: "Dunkin' Locations Powered" },
  { n: 'All 50',    l: 'States Covered' },
  { n: 'Elected',   l: 'By Fellow Franchisees' },
  { n: '$3 Billion',l: 'Supply Chain Management' },
]

const CCB_STATS = [
  { n: '$10M', l: 'Investment' },
  { n: '145+', l: 'Locations Served' },
  { n: '70+',  l: 'Jobs Created' },
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
  if (active === null) return null
  return (
    <motion.div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.95)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button onClick={e => { e.stopPropagation(); onNav(-1) }}
        style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', width: 52, height: 52, background: '#E8650A', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', zIndex: 10 }}>←</button>
      <div style={{ maxWidth: '72vw' }} onClick={e => e.stopPropagation()}>
        <img src={photos[active].img} alt={photos[active].title} style={{ maxWidth: '72vw', maxHeight: '78vh', objectFit: 'contain', display: 'block' }} />
        <div style={{ textAlign: 'center', marginTop: 16, color: 'rgba(250,247,242,0.6)', fontSize: '0.82rem' }}>
          {photos[active].title} &nbsp;·&nbsp; {photos[active].tag}
        </div>
      </div>
      <button onClick={e => { e.stopPropagation(); onNav(1) }}
        style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', width: 52, height: 52, background: '#E8650A', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', zIndex: 10 }}>→</button>
      <div style={{ position: 'absolute', top: 24, right: 32, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', cursor: 'pointer' }}
        onClick={onClose}>ESC to close</div>
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ paddingTop: 72 }}>

      {/* ── HERO VIDEO POPUP ── */}
      <AnimatePresence>
        {videoOpen && heroVideo && (
          <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 72, background: 'rgba(0,0,0,0.96)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoOpen(false)}>
            <motion.div style={{ width: '88vw', maxWidth: 1100, position: 'relative', marginTop: '2rem' }}
              initial={{ scale: 0.96, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1.2rem', background: 'rgba(20,10,4,0.95)', border: '0.5px solid rgba(232,101,10,0.3)', borderBottom: 'none' }}>
                <div>
                  <div style={{ fontSize: '0.44rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 3, ...gradStyle }}>ZSC Enterprises · Leadership</div>
                  <div className="font-playfair font-bold" style={{ fontSize: '0.95rem', color: '#FAF7F2' }}>Shams Charania — Managing Partner</div>
                </div>
                <button onClick={() => setVideoOpen(false)} style={{ background: 'none', border: '0.5px solid rgba(250,247,242,0.2)', color: 'rgba(250,247,242,0.7)', width: 36, height: 36, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
              <video autoPlay controls style={{ width: '100%', display: 'block', background: '#000', maxHeight: 'calc(100vh - 220px)' }}>
                <source src={heroVideo} type="video/mp4" />
              </video>
              <div style={{ padding: '0.75rem 1.2rem', background: 'rgba(0,0,0,0.9)', borderTop: '2px solid #E8650A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.44rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)' }}>Click outside to close</span>
                <span style={{ fontSize: '0.44rem', letterSpacing: '0.18em', textTransform: 'uppercase', ...gradStyle }}>ZSC Enterprises</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          1. VIDEO HERO
      ══════════════════════════════════════ */}
{/*      <section style={{ position: 'relative', height: 'calc(100vh - 72px)', overflow: 'hidden', cursor: heroVideo ? 'pointer' : 'default' }}
        onClick={() => heroVideo && setVideoOpen(true)}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(145deg, #0d0800 0%, #1a0e05 40%, #0a0500 100%)' }} />
        <motion.div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', width: 700, height: 700, borderRadius: '50%', left: 'calc(50% - 350px)', top: 'calc(50% - 350px)', background: 'radial-gradient(circle, rgba(232,101,10,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', width: 500, height: 500, borderRadius: '50%', right: '8%', bottom: '15%', background: 'radial-gradient(circle, rgba(212,24,108,0.09) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        {heroVideo && (
          <video ref={bgVideoRef} autoPlay loop playsInline muted
            style={{ position: 'absolute', inset: 0, zIndex: 2, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', filter: 'brightness(0.5) saturate(0.7)' }}>
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.15) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 2rem' }}>
          <motion.div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div style={{ width: 24, height: 1, background: '#E8650A' }} />
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500, ...gradStyle }}>ZSC Enterprises &nbsp;·&nbsp; Leadership</span>
            <div style={{ width: 24, height: 1, background: '#D4186C' }} />
          </motion.div>
          <motion.h1 className="font-playfair font-black"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 1.0, marginBottom: '1rem', background: 'linear-gradient(135deg, #FAF7F2 0%, #FAF7F2 35%, #E8650A 65%, #D4186C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, delay: 0.2 }}>
            Meet Our Visionary Leader
          </motion.h1>
          <motion.p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', lineHeight: 1.8, fontWeight: 300, maxWidth: 540, marginBottom: '2.5rem', background: 'linear-gradient(135deg, rgba(250,247,242,0.85), rgba(232,101,10,0.75))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
            The driving force behind ZSC Enterprises — a franchise pioneer,<br />community leader, and industry innovator.
          </motion.p>
          <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}>
            <motion.div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(232,101,10,0.25), rgba(212,24,108,0.25))', border: '1px solid rgba(232,101,10,0.5)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#FAF7F2' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>▶</motion.div>
            <span style={{ fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', ...gradStyle }}>
              {heroVideo ? 'Tap to Watch with Sound' : 'Video Coming Soon'}
            </span>
          </motion.div>
        </div>
        {heroVideo && (
          <motion.button onClick={e => { e.stopPropagation(); setBgMuted(v => !v) }}
            style={{ position: 'absolute', bottom: 28, left: 28, zIndex: 20, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.5)', border: '0.5px solid rgba(232,101,10,0.35)', backdropFilter: 'blur(12px)', padding: '8px 16px', cursor: 'pointer' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} whileHover={{ borderColor: '#E8650A' }}>
            <span style={{ fontSize: '1rem' }}>{bgMuted ? '🔇' : '🔊'}</span>
            <span style={{ fontSize: '0.46rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif', fontWeight: 600, ...gradStyle }}>{bgMuted ? 'Unmute' : 'Mute'}</span>
          </motion.button>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 5, pointerEvents: 'none', background: 'linear-gradient(to top, #0d0800, transparent)' }} />
      </section>
*/}

      {/* ══════════════════════════════════════
          3. INTRO — Photo + Name + Roles
      ══════════════════════════════════════ }
      <section zstyle={{ background: '#F3EDE3', borderTop: '0.5px solid rgba(42,30,16,0.1)' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4rem', padding: '4rem 5rem', background: '#F3EDE3' }}>
            <motion.div style={{ flexShrink: 0, position: 'relative' }}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <div style={{ position: 'relative' }}>
                <img src={shamsImg} alt="Shams Charania" style={{ width: 300, display: 'block', objectFit: 'cover', objectPosition: 'center top', border: '2px solid #E8650A', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
              </div>
            </motion.div>
            <motion.div style={{ flex: 1, paddingTop: '0.5rem' }}
              initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }} whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 20, height: 1, background: '#E8650A' }} />
                <span style={{ fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.45)', fontWeight: 500 }}>Managing Partner · ZSC Enterprises</span>
              </div>
              <div className="font-playfair font-black" style={{ lineHeight: 1.0, marginBottom: 20, WebkitTextFillColor: 'initial' }}>
                <motion.span style={{ fontSize: 'clamp(2.8rem,4.5vw,4.5rem)', color: '#1A1208', display: 'block' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>Shams</motion.span>
                <motion.span style={{ fontSize: 'clamp(2.8rem,4.5vw,4.5rem)', fontStyle: 'italic', display: 'inline-block', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>Charania</motion.span>
              </div>
              <motion.div style={{ width: 40, height: '0.5px', background: 'rgba(42,30,16,0.15)', marginBottom: 22 }}
                initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {[
                  { bold: 'Managing Partner',      rest: '· ZSC Enterprises' },
                  { bold: 'Chairman of the Board', rest: '· National DCP' },
                  { bold: 'Co-Founder',            rest: '· Coffee Cafe Bakery' },
                  { bold: 'Past Member',           rest: "· Dunkin' Brand Advisory Council" },
                ].map((item, i) => (
                  <motion.div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: i % 2 === 0 ? '#E8650A' : '#D4186C', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'rgba(42,30,16,0.85)' }}>
                      <strong style={{ fontWeight: 700, marginRight: 8 }}>{item.bold}</strong>
                      <span style={{ color: 'rgba(42,30,16,0.45)', fontWeight: 400 }}>{item.rest}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Reveal>
      </section>
      */}


{/* ══════════════════════════════════════
    5. BIO + KEY ACCOMPLISHMENTS
══════════════════════════════════════ */}
<section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '90vh', borderTop: '0.5px solid rgba(250,247,242,0.06)' }}>

  {/* LEFT — Biography text */}
  <motion.div
    style={{ padding: '6rem 5rem', background: '#0f0a06', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '0.5px solid rgba(250,247,242,0.06)' }}
    initial={{ opacity: 0, x: -60, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>

    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
      <div style={{ width: 20, height: 1, background: '#E8650A' }} />
      <span style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600 }}>Biography</span>
    </div>
    <div className="font-playfair font-black" style={{ lineHeight: 1.0, marginBottom: 20, WebkitTextFillColor: 'initial' }}>
                <motion.span style={{ fontSize: 'clamp(3.2rem,4.5vw,3.2rem)', fontStyle: 'italic', display: 'inline-block', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>Shams Charania</motion.span>
              </div>

    <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', color: '#FAF7F2', lineHeight: 1.02, marginBottom: 16 }}>
      From Crew Member<br />
      <em style={{ fontStyle: 'italic', background: 'linear-gradient(90deg, #E8650A, #D4186C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
        to Industry Leader
      </em>
    </h2>

    <motion.div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #E8650A, #D4186C)', marginBottom: 36 }}
      initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }} />

    <p style={{ fontSize: '1.05rem', lineHeight: 2, color: 'rgba(250,247,242,0.65)', fontWeight: 300, marginBottom: '1.6rem' }}>
Shams Charania's story begins in 1999 — a 14-year-old who moved to Atlanta and started working weekends at a Popeyes in Gainesville, GA. Within months he was managing the restaurant on weekends in the owner's absence.    </p>

    <p style={{ fontSize: '1.05rem', lineHeight: 2, color: 'rgba(250,247,242,0.65)', fontWeight: 300, marginBottom: '2.2rem' }}>
While attending Georgia State University, Shams joined Dunkin’ in 2003 as an Assistant Manager. Together with his brother, he helped grow sales and earned recognition for operating clean, high-quality, and efficient restaurants.     </p>

    <blockquote style={{ padding: '1.6rem 1.8rem', borderLeft: '3px solid #E8650A', marginBottom: '1.8rem', background: 'rgba(232,101,10,0.06)' }}>
      <p className="font-playfair italic" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(250,247,242,0.88)' }}>
        "We are in the PEOPLE business, and the continuous development of the PEOPLE in our organization is a hallmark of our operation."
      </p>
      <cite style={{ display: 'block', marginTop: 10, fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', fontStyle: 'normal' }}>
        — Shams Charania
      </cite>
    </blockquote>
    <p style={{ fontSize: '1.05rem', lineHeight: 2, color: 'rgba(250,247,242,0.65)', fontWeight: 300, marginBottom: '2.2rem' }}>
      After graduating with an accounting degree and completing an internship at PwC, Shams realized his passion was in the restaurant business. In 2007, he acquired three Dunkin’ restaurants with his brother and a former Popeyes owner—marking the beginning of his journey as a franchise owner and entrepreneur.</p>
    <p style={{ fontSize: '1.05rem', lineHeight: 2, color: 'rgba(250,247,242,0.65)', fontWeight: 300 }}>
      Today, Shams leads ZSC Enterprises as Managing Partner, focusing on organizational strategy, development, new opportunities, and most importantly, developing people within the organization. He holds an MBA from Georgia Tech and serves as Chairman of the Board of National DCP, a multi-billion-dollar supply chain cooperative serving more than 10,000 Dunkin’ restaurants. He has also held several leadership roles within the Dunkin’ brand.    </p>
  </motion.div>

  {/* RIGHT — Portrait */}
  <motion.div style={{ position: 'relative', overflow: 'hidden' }}
    initial={{ opacity: 0, x: 60, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
    <img src={shamsPortrait} alt="Shams Charania"
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'brightness(0.82) saturate(0.85) contrast(1.08)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0f0a06 0%, transparent 20%)' }} />
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to top, #0f0a06, transparent)' }} />
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
  </motion.div>

</section>
      {/* ══════════════════════════════════════
          2. STATS STRIP — with hover fill effect
      ══════════════════════════════════════ */}
      <Reveal>
        <style>{`
          .ldr-stat { position: relative; overflow: hidden; cursor: pointer; transition: background 0.4s ease; }
          .ldr-stat::before { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 0%; background: linear-gradient(135deg, #E8650A, #D4186C); transition: height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); z-index: 0; }
          .ldr-stat:hover::before { height: 100%; }
          .ldr-stat:hover .ldr-n { background: #F3EDE3; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .ldr-stat:hover .ldr-l { color: rgba(250,247,242,0.6) !important; }
          .ldr-stat .ldr-inner { position: relative; z-index: 1; }
          .ldr-n { font-family: 'Playfair Display', serif; font-weight: 900; background: linear-gradient(135deg, #E8650A, #D4186C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.5rem; font-size: 2.8rem; transition: all 0.3s ease; }
        `}</style>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', background: '#F3EDE3' }}>
          {STATS.map((s, i) => (
            <div key={s.l} className="ldr-stat" style={{ padding: '2.5rem 2.5rem', borderRight: i < 3 ? '0.5px solid rgba(42,30,16,0.06)' : 'none' }}>
              <div className="ldr-inner">
                <div className="ldr-n">{s.n}</div>
                <div className="ldr-l" style={{ fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.38)', fontWeight: 500 }}>{s.l}</div>
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
              <motion.div style={{ width: '85vw', maxWidth: 1100, position: 'relative' }}
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1.2rem', background: 'rgba(20,10,4,0.95)', border: '0.5px solid rgba(232,101,10,0.3)', borderBottom: 'none' }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 3, ...gradStyle }}>ZSC Enterprises · Coffee Cafe Bakery</div>
                    <div className="font-playfair font-bold" style={{ fontSize: '0.95rem', color: '#FAF7F2' }}>CCB Grand Opening — Governor Brian P. Kemp</div>
                  </div>
                  <button onClick={() => setCcbVideoOpen(false)} style={{ background: 'none', border: '0.5px solid rgba(250,247,242,0.2)', color: 'rgba(250,247,242,0.7)', width: 36, height: 36, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                </div>
                <video autoPlay controls controlsList="nodownload" style={{ width: '100%', display: 'block', background: '#000', maxHeight: 'calc(100vh - 180px)' }}>
                  <source src={ccbVideo} type="video/mp4" />
                </video>
                <div style={{ padding: '0.75rem 1.2rem', background: 'rgba(0,0,0,0.85)', borderTop: '2px solid #E8650A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.44rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)' }}>Click outside to close</span>
                  <span style={{ fontSize: '0.44rem', letterSpacing: '0.18em', textTransform: 'uppercase', ...gradStyle }}>Coffee Cafe Bakery</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal>
          <div style={{ padding: '5rem 4rem 3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, background: '#D4186C', borderRadius: '50%' }} />
              <span style={{ fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D4186C', fontWeight: 600 }}>Co-Founder · Major Partner</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.4)', marginBottom: 4 }}>Partner Venture</p>
                <h2 className="font-playfair font-black leading-[0.95]" style={{ fontSize: 'clamp(3rem,6vw,5rem)', color: '#1A1208' }}>
                  Coffee Cafe<br /><em style={{ fontStyle: 'italic', ...gradStyle }}>Bakery.</em>
                </h2>
              </div>
              <a href="https://coffeecafebakery.com" target="_blank" rel="noreferrer"
                style={{ marginTop: '1rem', display: 'inline-block', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg,#E8650A,#D4186C)', color: '#fff', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
                Visit CoffeeCafeBakery.com →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 500 }}>
            <div style={{ padding: '3rem 4rem', borderRight: '0.5px solid rgba(42,30,16,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(42,30,16,0.6)', fontWeight: 300, marginBottom: '1.2rem' }}>
                  Coffee Cafe Bakery is a state-of-the-art Dunkin' Centralized Manufacturing Location (CML) — one of fewer than 100 such facilities in the entire United States. A $10 million, 31,150 sq ft highly automated production facility in Fulton County, Atlanta, co-founded by Shams Charania through ZSC Enterprises.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(42,30,16,0.5)', fontWeight: 300 }}>
                  Announced by Governor Brian P. Kemp at the grand opening — backed by the State of Georgia, City of Atlanta, and the Georgia Department of Economic Development. Located in a Federal Opportunity Zone in Fulton County.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(42,30,16,0.08)', marginTop: '2rem' }}>
  {CCB_STATS.map(s => (
    <div key={s.l} style={{ padding: '1.2rem 1.5rem', background: '#F3EDE3' }}>
      <div className="font-playfair font-black leading-none mb-1" style={{ fontSize: '1.8rem', ...gradStyle }}>{s.n}</div>
      <div style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.38)', fontWeight: 500 }}>{s.l}</div>
    </div>
  ))}
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 500, cursor: ccbVideo ? 'pointer' : 'default' }}
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
                  <span style={{ fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)' }}>Video Coming Soon</span>
                </div>
              )}
              {ccbVideo && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)' }} />}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#E8650A,#D4186C)', zIndex: 2 }} />
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
  <section style={{ padding: '4rem 4rem', textAlign: 'center', background: 'linear-gradient(145deg, #1A0E05 0%, #0D0800 50%, #1A0E05 100%)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,101,10,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
      <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, transparent, #D4186C)', margin: '0 auto 1.8rem' }} />
      <blockquote className="font-playfair italic" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)', color: 'rgba(250,247,242,0.88)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
        "If you want to walk fast, walk alone. But if you want to walk far, walk together."
      </blockquote>
      <cite style={{ fontSize: '0.44rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', fontStyle: 'normal' }}>
        — Ratan Tata &nbsp;·&nbsp; A quote Shams lives by
      </cite>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
        <Link to="/team" style={{ background: 'linear-gradient(135deg,#E8650A,#D4186C)', color: '#fff', textDecoration: 'none', padding: '0.75rem 2rem', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, boxShadow: '0 8px 24px rgba(232,101,10,0.22)' }}>Meet The Full Team</Link>
        <Link to="/contact" style={{ background: 'transparent', color: 'rgba(250,247,242,0.5)', textDecoration: 'none', padding: '0.75rem 2rem', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, border: '0.5px solid rgba(250,247,242,0.18)' }}>Get in Touch</Link>
      </div>
    </div>
  </section>
</Reveal>
 
      {/* ══════════════════════════════════════
          8. IN THE FIELD
      ══════════════════════════════════════ */}
      <section style={{ background: '#1A0E05' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '3.5rem 4rem 2.5rem' }}>
            <div style={{ height: 1, width: 60, background: '#E8650A' }} />
            <span style={{ fontSize: '0.48rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.45)', fontWeight: 500 }}>In The Field</span>
            <div style={{ height: 1, width: 60, background: '#E8650A' }} />
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '0 3rem 3rem', gap: 12 }}>
          {FIELD_PHOTOS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(250,247,242,0.08)', cursor: 'pointer' }} onClick={() => setLightboxActive(i)}>
                <img src={p.img} alt={p.title}
                  style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'brightness(0.72)', transition: 'transform 0.5s, filter 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.72)' }} />
                <div style={{ background: '#1C0F08', padding: '10px 14px 14px', borderTop: '2px solid #E8650A' }}>
                  <div style={{ fontSize: '0.44rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600, marginBottom: 3 }}>{p.tag}</div>
                  <div className="font-playfair font-bold" style={{ fontSize: '0.95rem', color: '#FAF7F2', lineHeight: 1.2 }}>{p.title}</div>
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