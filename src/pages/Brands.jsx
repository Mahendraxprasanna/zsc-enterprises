import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

import dunkinvideo   from '../assets/videos/dunkinad.mp4'
import baskinvideo   from '../assets/videos/baskinad.mp4'
import smoothievideo from '../assets/videos/smoothiead.mp4'

// ─────────────────────────────────────────────
// BRAND DATA
// ─────────────────────────────────────────────
const BRANDS = [
  {
    id: 'dunkin',
    index: 0,
    name: "Dunkin'",
    tagline: "America Runs on Dunkin'.",
    label: 'Brand 01',
    desc: "ZSC Enterprises operates 50+ Dunkin' locations across the Atlanta metro — freshly brewed coffee, premium espresso, donuts, and breakfast delivered with speed and consistency every single day.",
    stats: [{ n: '50+', l: 'Locations' }, { n: '2007', l: 'Since' }, { n: 'ATL', l: 'Market' }],

    // ── DUNKIN' — Hot pink #E11383 + Bright orange #F5821F ──────────
    bg: `linear-gradient(145deg,
      #1a0010 0%,
      #2a0820 25%,
      #1f0515 50%,
      #2d0e00 75%,
      #1a0800 100%)`,
    glow:     'rgba(241,19,131,0.50)',
    glowAlt:  'rgba(245,130,31,0.35)',
    accent:   '#F5821F',
    accentAlt:'#E11383',
    textPrimary: '#FFF8F5',
    textMuted:   'rgba(255,248,245,0.52)',
    gradText: 'linear-gradient(135deg, #E11383 0%, #F5821F 100%)',
    borderColor: 'rgba(225,19,131,0.30)',
    statBg:   'rgba(245,130,31,0.08)',
    particles: ['#E11383','#F5821F','#FF6EC7','#FFB347','#FFF8F5'],
    shapes: [
      // Hot pink dominant glow — top right
      { size: 750, x: 80, y: 5,   color: 'rgba(225,19,131,0.18)',  blur: 140 },
      // Orange warmth — bottom left
      { size: 550, x: 5,  y: 70,  color: 'rgba(245,130,31,0.16)',  blur: 120 },
      // Pink mid accent
      { size: 350, x: 45, y: 50,  color: 'rgba(225,19,131,0.10)',  blur: 80  },
      // Orange top left whisper
      { size: 280, x: 20, y: 15,  color: 'rgba(245,130,31,0.08)',  blur: 70  },
    ],
    productLabel: "Dunkin' Product Photo",
    heroLabel:    "Dunkin' Store Interior",
    floatLabel:   "Dunkin' Pastries",
    tags: ['Coffee', 'Espresso', 'Donuts', 'Breakfast', 'Cold Brew'],
    floatCardEst:   '1950',
    floatCardTitle: "World's Largest",
    floatCardSub:   'Coffee & Donuts Chain',
    icon: '☕',
    video: dunkinvideo,
  },

  {
    id: 'baskin',
    index: 1,
    name: 'Baskin Robbins',
    tagline: 'Make It Memorable.',
    label: 'Brand 02',
    desc: "The world's largest ice cream specialty chain — seven decades of premium hard-serve ice cream and iconic flavors. Co-located with our Dunkin' stores for the ultimate treat experience.",
    stats: [{ n: '70+', l: 'Years' }, { n: '#1', l: 'Ice Cream' }, { n: '100+', l: 'Flavors' }],

    // ── BASKIN ROBBINS — Signature pink #F05097 + Deep burgundy #402021 ──
    bg: `linear-gradient(145deg,
      #140508 0%,
      #200a0d 25%,
      #2a0d12 50%,
      #1a0608 75%,
      #0f0305 100%)`,
    glow:     'rgba(240,80,151,0.50)',
    glowAlt:  'rgba(64,32,33,0.80)',
    accent:   '#F05097',
    accentAlt:'#7A2830',
    textPrimary: '#FFF5F8',
    textMuted: 'rgba(255,220,230,0.55)',
    gradText: 'linear-gradient(135deg, #F05097 0%, #7A2830 60%, #3D1012 100%)',
    borderColor: 'rgba(240,80,151,0.22)',
    statBg: 'rgba(122,40,48,0.15)',
    particles: ['#F05097','#7A2830','#C4405A','#3D1012','#FFF5F8'],
    shapes: [
  { size: 800, x: 82, y: 8,   color: 'rgba(240,80,151,0.18)',  blur: 150 },
  { size: 700, x: 8,  y: 72,  color: 'rgba(122,40,48,0.55)',   blur: 140 },
  { size: 500, x: 50, y: 45,  color: 'rgba(61,16,18,0.70)',    blur: 100 },
  { size: 350, x: 22, y: 18,  color: 'rgba(196,64,90,0.12)',   blur: 70  },
  { size: 280, x: 65, y: 75,  color: 'rgba(122,40,48,0.40)',   blur: 80  },
  ],
    productLabel: 'Baskin Robbins Ice Cream Photo',
    heroLabel:    'Baskin Robbins Store',
    floatLabel:   'Ice Cream Scoops',
    tags: ['Ice Cream', '100+ Flavors', 'Hard Serve', 'Co-Located', 'Premium'],
    floatCardEst:   '1945',
    floatCardTitle: 'Premium Flavors',
    floatCardSub:   'Ice Cream Specialty',
    icon: '🍦',
    video: baskinvideo,
  },

  {
    id: 'smoothie',
    index: 2,
    name: 'Smoothie King',
    tagline: 'Reign Supreme.',
    label: 'Brand 03',
    desc: "Purpose-driven blends made with real fruit and wholesome ingredients — helping Atlanta guests fuel their active lifestyle. ZSC brings the Smoothie King mission to life every single day.",
    stats: [{ n: '1,000+', l: 'US Locations' }, { n: 'Real', l: 'Fruit Only' }, { n: 'ATL', l: 'Market' }],

    // ── SMOOTHIE KING — Bold red #E31B23 + Deep crimson #B5121B ──────
    bg: `linear-gradient(145deg,
      #0f0000 0%,
      #1e0000 25%,
      #180000 50%,
      #220202 75%,
      #100000 100%)`,
    glow:     'rgba(227,27,35,0.50)',
    glowAlt:  'rgba(181,18,27,0.35)',
    accent:   '#E31B23',
    accentAlt:'#B5121B',
    textPrimary: '#FFF5F5',
    textMuted:   'rgba(255,245,245,0.52)',
    gradText: 'linear-gradient(135deg, #E31B23 0%, #B5121B 100%)',
    borderColor: 'rgba(227,27,35,0.30)',
    statBg:   'rgba(227,27,35,0.08)',
    particles: ['#E31B23','#FF4D4D','#B5121B','#FF8080','#FFF5F5'],
    shapes: [
      // Bold red burst — top right
      { size: 750, x: 78, y: 8,   color: 'rgba(227,27,35,0.20)',   blur: 140 },
      // Deep crimson — bottom left
      { size: 600, x: 6,  y: 68,  color: 'rgba(181,18,27,0.16)',   blur: 120 },
      // Red mid-field glow
      { size: 420, x: 48, y: 48,  color: 'rgba(227,27,35,0.12)',   blur: 90  },
      // Crimson whisper top left
      { size: 260, x: 25, y: 20,  color: 'rgba(181,18,27,0.08)',   blur: 60  },
    ],
    productLabel: 'Smoothie King Product Photo',
    heroLabel:    'Smoothie King Store',
    floatLabel:   'Fresh Smoothie',
    tags: ['Real Fruit', 'Wellness', 'Blends', 'Fitness', 'Clean'],
    floatCardEst:   '1973',
    floatCardTitle: 'Purpose Driven',
    floatCardSub:   'Smoothie Authority',
    icon: '🥤',
    video: smoothievideo,
  },
]

// ─────────────────────────────────────────────
// FLOATING PARTICLES
// ─────────────────────────────────────────────
function Particles({ colors, active }) {
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      xDrift: (Math.random() - 0.5) * 40,
    }))
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {particles.current.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={active ? {
            y: [0, -120, -240],
            x: [0, p.xDrift, p.xDrift * 1.5],
            opacity: [0, 0.8, 0],
          } : { opacity: 0 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// AMBIENT BG SHAPES
// ─────────────────────────────────────────────
function AmbientShapes({ shapes }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: `calc(${s.x}% - ${s.size / 2}px)`,
            top: `calc(${s.y}% - ${s.size / 2}px)`,
            background: `radial-gradient(circle at 40% 40%, ${s.color} 0%, transparent 70%)`,
            filter: `blur(${s.blur}px)`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
function StatCard({ n, l, accent, borderColor, statBg, delay }) {
  return (
    <motion.div
      className="flex-1 px-5 py-4 flex flex-col"
      style={{
        border: `0.5px solid ${borderColor}`,
        background: statBg,
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="font-playfair font-black leading-none mb-1"
        style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
          background: accent === '#F05097'
  ? 'linear-gradient(135deg, #F05097 0%, #C4405A 50%, #7A2830 100%)'
  : accent.includes('gradient') ? accent : `linear-gradient(135deg, ${accent}, ${accent}dd)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
        {n}
      </div>
      <div style={{ fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)', fontWeight: 500 }}>
        {l}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// PRODUCT PLACEHOLDER
// ─────────────────────────────────────────────
function ProductPlaceholder({ label, accent, glow, size = 'lg' }) {
  const dim = size === 'lg' ? { w: '100%', h: 320 } : { w: '100%', h: 200 }
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center flex-col gap-3"
      style={{
        width: dim.w,
        height: dim.h,
        background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 70%)`,
        border: `0.5px solid ${accent}22`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* ── REPLACE: swap the div below with <img src={yourImage} className="w-full h-full object-cover" /> */}
      <div style={{ fontSize: '4rem', opacity: 0.15 }}>
        {label.includes('Dunkin') ? '☕' : label.includes('Baskin') ? '🍦' : '🥤'}
      </div>
      <span style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${accent}66` }}>
        {label}
      </span>
      {/* ── END REPLACE ── */}

      {/* Animated glow ring */}
      <motion.div
        className="absolute inset-0 rounded-none pointer-events-none"
        style={{ border: `1px solid ${accent}`, opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0], scale: [0.95, 1.02, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// SINGLE BRAND SLIDE
// ─────────────────────────────────────────────
function BrandSlide({ brand, isActive }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3])
  const bgX = useTransform(mouseX, [-0.5, 0.5], ['-2%', '2%'])
  const bgY = useTransform(mouseY, [-0.5, 0.5], ['-2%', '2%'])

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: brand.bg }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── FULL BLEED BACKGROUND IMAGE ── */}
      {brand.video && (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    style={{ x: bgX, y: bgY, scale: 1.08 }}
  >
    <video
      src={brand.video}
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        filter: 'brightness(0.72) saturate(1.05)',
      }}
    />
  </motion.div>
)}

      {/* Ambient background shapes on top of image */}
      <AmbientShapes shapes={brand.shapes} />

      {/* Particles */}
      <Particles colors={brand.particles} active={isActive} />

      {/* Left-side gradient fade — so text is readable */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(to right,
          rgba(0,0,0,0.96) 0%,
          rgba(0,0,0,0.85) 28%,
          rgba(0,0,0,0.45) 55%,
          rgba(0,0,0,0.10) 100%)`,
        zIndex: 5,
      }} />

      {/* Bottom fade */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
        zIndex: 5,
      }} />

      {/* Top fade */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%)',
        zIndex: 5,
      }} />

      {/* Colored tint overlay matching brand */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 80% 50%, ${brand.glow} 0%, transparent 60%)`,
        zIndex: 4,
      }} />

      {/* Noise grain */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 6,
        opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
      }} />

      {/* ── CONTENT OVERLAY ── */}
      <div
        className="absolute inset-0 flex items-center"
        style={{ zIndex: 10, padding: '0 5vw' }}
      >
        <div className="w-full max-w-[600px]">

          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{ width: 24, height: 1, background: brand.accent }} />
            <span style={{
              fontSize: '0.48rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: brand.accent, fontWeight: 600,
            }}>
              {brand.label} &nbsp;·&nbsp; ZSC Enterprises
            </span>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            className="font-playfair font-black leading-[0.9] mb-4"
            style={{
              fontSize: 'clamp(3.5rem, 7vw, 7rem)',
              color: brand.textPrimary,
              textShadow: `0 0 120px ${brand.glow}, 0 0 40px ${brand.glow}`,
            }}
            initial={{ opacity: 0, y: 50, filter: 'blur(16px)' }}
            animate={isActive ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(16px)' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {brand.name}
          </motion.h1>

          {/* Tagline */}
          <motion.div
            className="font-playfair font-bold italic mb-5"
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.7rem)',
              background: brand.id === 'baskin'
                ? 'linear-gradient(135deg, #F05097 0%, #C4405A 40%, #7A2830 100%)'
                : brand.gradText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {brand.tagline}
          </motion.div>

          {/* Accent line */}
          <motion.div
            style={{
              width: 56, height: 2, marginBottom: 22,
              background: brand.id === 'baskin'
                ? 'linear-gradient(90deg, #F05097, #7A2830, #3D1012)'
                : brand.gradText,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          />

          {/* Description */}
          <motion.p
            style={{
              fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)',
              lineHeight: 1.9,
              color: brand.textMuted,
              fontWeight: 300,
              maxWidth: 520,
              marginBottom: 28,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {brand.desc}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex gap-0 mb-7"
            style={{ maxWidth: 420 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {brand.stats.map((s, i) => (
              <StatCard
                key={s.l}
                n={s.n} l={s.l}
                accent={brand.id === 'baskin' ? '#F05097' : brand.accent}
                borderColor={brand.borderColor}
                statBg={brand.statBg}
                delay={0.55 + i * 0.08}
              />
            ))}
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
          >
            {brand.tags.map(t => (
              <span key={t} style={{
                fontSize: '0.44rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', padding: '5px 12px',
                border: brand.id === 'baskin'
                  ? '0.5px solid rgba(240,80,151,0.25)'
                  : `0.5px solid ${brand.accent}44`,
                color: brand.id === 'baskin' ? '#C4405A' : `${brand.accent}cc`,
                background: brand.id === 'baskin'
                  ? 'rgba(122,40,48,0.15)'
                  : `${brand.accent}0a`,
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
              }}>
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.70 }}
          >
            <Link to="/contact"
              className="no-underline px-7 py-3 font-semibold transition-opacity hover:opacity-85"
              style={{
                fontSize: '0.58rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                background: brand.id === 'baskin'
                  ? 'linear-gradient(135deg, #F05097, #7A2830)'
                  : brand.gradText,
                color: '#fff',
              }}>
              Partner With Us
            </Link>
            <Link to="/team"
              className="no-underline px-7 py-3 font-medium transition-all"
              style={{
                fontSize: '0.58rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: `0.5px solid ${brand.borderColor}`,
                color: brand.textMuted,
                backdropFilter: 'blur(8px)',
                background: 'rgba(0,0,0,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = brand.accent
                e.currentTarget.style.color = brand.accent
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = brand.borderColor
                e.currentTarget.style.color = brand.textMuted
              }}
            >
              Meet Our Team
            </Link>
          </motion.div>

        </div>

        {/* ── FLOATING RIGHT SIDE CARD ── */}
        <motion.div
          className="absolute right-[6vw] bottom-24 flex flex-col gap-2 p-5"
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(24px)',
            border: `0.5px solid ${brand.borderColor}`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 0.5px ${brand.accent}18`,
            minWidth: 220,
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{
              fontSize: '0.44rem', letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: brand.id === 'baskin' ? '#C4405A' : brand.accent,
              marginBottom: 4,
            }}>
              Est. {brand.floatCardEst}
            </div>
            <div className="font-playfair font-bold"
              style={{ fontSize: '1rem', color: brand.textPrimary, marginBottom: 2 }}>
              {brand.floatCardTitle}
            </div>
            <div style={{
              fontSize: '0.5rem', color: brand.textMuted, fontWeight: 300,
              marginBottom: 12,
            }}>
              {brand.floatCardSub}
            </div>
            <div style={{
              height: 1,
              background: brand.id === 'baskin'
                ? 'linear-gradient(90deg, #F05097, #7A2830)'
                : brand.gradText,
              marginBottom: 10,
            }} />
            <div className="flex gap-2">
              {brand.tags.slice(0, 2).map(t => (
                <span key={t} style={{
                  fontSize: '0.4rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', padding: '3px 8px',
                  border: `0.5px solid ${brand.borderColor}`,
                  color: brand.id === 'baskin' ? '#F05097' : brand.accent,
                  background: 'rgba(0,0,0,0.3)',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// NAVIGATION DOTS
// ─────────────────────────────────────────────
function NavDots({ current, total, brands, onChange }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      {brands.map((b, i) => (
        <button
          key={b.id}
          onClick={() => onChange(i)}
          className="relative flex items-center gap-3 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}
        >
          <motion.div
            style={{
              width: current === i ? 24 : 6,
              height: 2,
              background: current === i ? b.accent : 'rgba(250,247,242,0.2)',
              borderRadius: 2,
            }}
            animate={{ width: current === i ? 24 : 6 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            style={{
              fontSize: '0.44rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: current === i ? b.accent : 'rgba(250,247,242,0.3)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
            animate={{ opacity: current === i ? 1 : 0.4 }}
          >
            {b.name}
          </motion.span>
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// SLIDE TRANSITION VARIANTS
// ─────────────────────────────────────────────
const slideVariants = {
  enterFromRight: {
    x: '100%',
    opacity: 0,
    scale: 0.96,
    filter: 'blur(12px)',
  },
  enterFromLeft: {
    x: '-100%',
    opacity: 0,
    scale: 0.96,
    filter: 'blur(12px)',
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.6 },
      filter: { duration: 0.5 },
    },
  },
  exitToLeft: {
    x: '-100%',
    opacity: 0,
    scale: 0.96,
    filter: 'blur(12px)',
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 30 },
      opacity: { duration: 0.3 },
      filter: { duration: 0.3 },
    },
  },
  exitToRight: {
    x: '100%',
    opacity: 0,
    scale: 0.96,
    filter: 'blur(12px)',
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 30 },
      opacity: { duration: 0.3 },
      filter: { duration: 0.3 },
    },
  },
}

// ─────────────────────────────────────────────
// MAIN BRANDS PAGE
// ─────────────────────────────────────────────
export default function Brands() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const isAnimating = useRef(false)

  const navigate = useCallback((dir) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setDirection(dir)
    setCurrent(prev => (prev + dir + BRANDS.length) % BRANDS.length)
    setTimeout(() => { isAnimating.current = false }, 700)
  }, [])

  const goTo = useCallback((index) => {
    if (isAnimating.current || index === current) return
    isAnimating.current = true
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
    setTimeout(() => { isAnimating.current = false }, 700)
  }, [current])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft')  navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  // Touch/drag
  const onDragStart = (e) => {
    dragStart.current = e.touches ? e.touches[0].clientX : e.clientX
    setDragging(true)
  }
  const onDragEnd = (e) => {
    if (!dragging || dragStart.current === null) return
    const end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStart.current - end
    if (Math.abs(diff) > 60) navigate(diff > 0 ? 1 : -1)
    setDragging(false)
    dragStart.current = null
  }

  const brand = BRANDS[current]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: 68 }}
    >
      {/* ── SLIDER CONTAINER ── */}
      <div
  className="relative overflow-hidden"
  style={{
    height: 'calc(100vh - 68px)',
    userSelect: 'none',

    // ADD THESE
    background: `
      radial-gradient(circle at center,
      rgba(20,20,20,1) 0%,
      rgba(5,5,5,1) 100%)
    `,
  }}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        {/* Slide */}
        <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={current}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? 'enterFromRight' : 'enterFromLeft'}
            animate="center"
            exit={direction > 0 ? 'exitToLeft' : 'exitToRight'}
          >
            <BrandSlide brand={brand} isActive={true} />
          </motion.div>
        </AnimatePresence>

        {/* ── LEFT ARROW ── */}
        <motion.button
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center z-50"
          style={{
            width: 48, height: 48,
            background: 'rgba(10,5,2,0.6)',
            backdropFilter: 'blur(12px)',
            border: `0.5px solid ${brand.borderColor}`,
            color: brand.textPrimary,
            fontSize: '1rem',
            cursor: 'pointer',
            outline: 'none',
          }}
          whileHover={{ scale: 1.1, background: brand.accent, borderColor: brand.accent }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          transition={{ duration: 0.2 }}
        >
          ←
        </motion.button>

        {/* ── RIGHT ARROW ── */}
        <motion.button
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center z-50"
          style={{
            width: 48, height: 48,
            background: 'rgba(10,5,2,0.6)',
            backdropFilter: 'blur(12px)',
            border: `0.5px solid ${brand.borderColor}`,
            color: brand.textPrimary,
            fontSize: '1rem',
            cursor: 'pointer',
            outline: 'none',
          }}
          whileHover={{ scale: 1.1, background: brand.accent, borderColor: brand.accent }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(1)}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.button>

        {/* ── RIGHT SIDE NAV DOTS ── */}
        <div className="absolute right-20 md:right-24 top-1/2 -translate-y-1/2 z-50">
          <NavDots current={current} total={BRANDS.length} brands={BRANDS} onChange={goTo} />
        </div>

        {/* ── TOP LEFT BREADCRUMB ── */}
        <div className="absolute top-6 left-8 z-50 flex items-center gap-2">
          <Link to="/" style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', textDecoration: 'none' }}>
            ZSC
          </Link>
          <span style={{ color: 'rgba(250,247,242,0.2)', fontSize: '0.5rem' }}>›</span>
          <span style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: brand.accent }}>
            Brands
          </span>
        </div>

        {/* ── ANIMATED ACCENT LINE ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] z-50"
          style={{
  background: brand.id === 'baskin'
    ? 'linear-gradient(90deg, #F05097, #7A2830, #3D1012)'
    : brand.gradText
}}
          key={`line-${current}`}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  )
}