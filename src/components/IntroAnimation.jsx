import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './IntroAnimation.css'

const BOKEH_ORBS = [
  { color: 'rgba(232,130,80,0.55)',  size: 280, x: 12, y: 18 },
  { color: 'rgba(218,72,120,0.45)',  size: 220, x: 78, y: 30 },
  { color: 'rgba(88,120,181,0.45)',  size: 320, x: 18, y: 78 },
  { color: 'rgba(232,213,190,0.30)', size: 180, x: 65, y: 82 },
  { color: 'rgba(218,72,120,0.30)',  size: 240, x: 88, y: 60 },
  { color: 'rgba(120,90,140,0.40)',  size: 360, x: 50, y: 10 },
]

const PARTICLE_COLORS = ['#DC5A2D', '#5878B5', '#DA4878', '#ffffff', '#ffffff']
const SPARK_COLORS    = ['#fff', '#fff', '#FFC9A8', '#F77AAA', '#9FB6E0']

function generateParticles(count = 70) {
  return Array.from({ length: count }, (_, i) => {
    const size  = Math.random() * 3 + 0.5
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
    return {
      id: i, size, color,
      left: Math.random() * 100,
      top:  100 + Math.random() * 30,
      duration: Math.random() * 18 + 12,
      delay:    Math.random() * 8,
    }
  })
}

function generateSparks(count = 28) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5) * 0.3
    const dist  = 120 + Math.random() * 220
    const x     = Math.cos(angle) * dist
    const y     = Math.sin(angle) * dist * 0.35
    const size  = Math.random() * 3 + 2
    const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]
    return { id: i, x, y, size, color, delay: 2.5 + Math.random() * 0.1 }
  })
}

export default function IntroAnimation({ onComplete }) {
  const [visible,   setVisible]   = useState(true)
  const [particles]               = useState(() => generateParticles())
  const [sparks]                  = useState(() => generateSparks())

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        document.body.style.overflow = ''
        onComplete?.()
      }, 900)
    }, 5800)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  const skip = () => {
    setVisible(false)
    setTimeout(() => {
      document.body.style.overflow = ''
      onComplete?.()
    }, 900)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-stage"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(18px)' }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="intro-floor" />

          {/* Bokeh */}
          <div className="intro-bokeh">
            {BOKEH_ORBS.map((o, i) => (
              <div key={i} className="intro-bokeh-orb" style={{
                width:  o.size, height: o.size,
                left:   `calc(${o.x}% - ${o.size / 2}px)`,
                top:    `calc(${o.y}% - ${o.size / 2}px)`,
                background: `radial-gradient(circle at 35% 35%, ${o.color} 0%, transparent 70%)`,
                animationDuration: `${14 + i * 3}s`,
                animationDelay:    `${-i * 2}s`,
              }} />
            ))}
          </div>

          {/* Particles */}
          <div className="intro-particles">
            {particles.map(p => (
              <div key={p.id} className="intro-particle" style={{
                width:  p.size, height: p.size,
                left:   `${p.left}%`,
                top:    `${p.top}%`,
                background: p.color,
                boxShadow:  `0 0 ${p.size * 3}px ${p.color}`,
                animationDuration: `${p.duration}s`,
                animationDelay:    `${p.delay}s`,
              }} />
            ))}
          </div>

          <div className="intro-grain" />

          {/* Shake + logo */}
          <div className="intro-shake">
            <div className="intro-logo-stage">
              <div className="intro-logo-wrap">

                <div className="intro-anamorphic" />
                <div className="intro-impact-flash" />

                {/* Sparks */}
                <div className="intro-sparks">
                  {sparks.map(s => (
                    <div key={s.id} className="intro-spark" style={{
                      width:  s.size, height: s.size,
                      background: s.color, color: s.color,
                      '--x': `${s.x}px`, '--y': `${s.y}px`,
                      animationDelay: `${s.delay}s`,
                    }} />
                  ))}
                </div>

                {/* SVG Logo */}
                <svg className="intro-logo-svg" viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="iOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%"   stopColor="#FFC9A8"/>
                      <stop offset="25%"  stopColor="#F08555"/>
                      <stop offset="55%"  stopColor="#DC5A2D"/>
                      <stop offset="90%"  stopColor="#B83E14"/>
                      <stop offset="100%" stopColor="#7A2808"/>
                    </linearGradient>
                    <linearGradient id="iBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%"   stopColor="#9FB6E0"/>
                      <stop offset="20%"  stopColor="#7593C9"/>
                      <stop offset="50%"  stopColor="#5878B5"/>
                      <stop offset="85%"  stopColor="#2D4A8C"/>
                      <stop offset="100%" stopColor="#15264F"/>
                    </linearGradient>
                    <linearGradient id="iPinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="#A82D5C"/>
                      <stop offset="25%"  stopColor="#DA4878"/>
                      <stop offset="50%"  stopColor="#F77AAA"/>
                      <stop offset="75%"  stopColor="#DA4878"/>
                      <stop offset="100%" stopColor="#A82D5C"/>
                    </linearGradient>
                    <clipPath id="iTopClip">
                      <path d="M 0 0 L 900 0 L 900 240 Q 450 130 0 240 Z" />
                    </clipPath>
                    <clipPath id="iBottomClip">
                      <path d="M 0 240 Q 450 130 900 240 L 900 360 L 0 360 Z" />
                    </clipPath>
                    <filter id="iLetterDepth" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                      <feOffset dx="3" dy="6" result="shadowOffset"/>
                      <feComponentTransfer><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
                      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>

                  {/* Orange top half */}
                  <g className="intro-top-half" clipPath="url(#iTopClip)" filter="url(#iLetterDepth)">
                    <text x="450" y="285" textAnchor="middle"
                      fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
                      fill="#3a1604" opacity="0.6" transform="translate(4,6)">ZSC</text>
                    <text x="450" y="285" textAnchor="middle"
                      fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
                      fill="#5a230a" opacity="0.8" transform="translate(2,3)">ZSC</text>
                    <text x="450" y="285" textAnchor="middle"
                      fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
                      fill="url(#iOrangeGrad)">ZSC</text>
                  </g>

                  {/* Blue bottom half */}
                  <g className="intro-bottom-half" clipPath="url(#iBottomClip)" filter="url(#iLetterDepth)">
                    <text x="450" y="285" textAnchor="middle"
                      fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
                      fill="#0a1530" opacity="0.6" transform="translate(4,6)">ZSC</text>
                    <text x="450" y="285" textAnchor="middle"
                      fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
                      fill="#152448" opacity="0.8" transform="translate(2,3)">ZSC</text>
                    <text x="450" y="285" textAnchor="middle"
                      fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
                      fill="url(#iBlueGrad)">ZSC</text>
                  </g>

                  {/* Pink arc */}
                  <path className="intro-arc-fill"
                    d="M 35 255 Q 450 115 865 255 Q 450 130 35 255 Z"
                    fill="url(#iPinkGrad)" stroke="none"/>
                  <path className="intro-arc-streak"
                    d="M 35 255 Q 450 115 865 255"
                    stroke="#fff" strokeWidth="2.5"
                    strokeLinecap="round" fill="none" opacity="0"/>
                </svg>

                {/* Tagline */}
                <div className="intro-tagline-wrap">
                  <div className="intro-tagline">ENTERPRISES</div>
                  <div className="intro-tagline-frame">
                    <div className="tl-line" />
                    <div className="tl-dot" />
                    <div className="tl-line" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Skip */}
          <button onClick={skip} style={{
            position: 'fixed', bottom: 28, right: 28,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(218,72,120,0.4)',
            color: '#ccc', padding: '8px 20px',
            fontFamily: 'Jost, sans-serif', fontSize: 11,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            cursor: 'pointer', zIndex: 100, backdropFilter: 'blur(8px)',
          }}>
            Skip
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  )
}