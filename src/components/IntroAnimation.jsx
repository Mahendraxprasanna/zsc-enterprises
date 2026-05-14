import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './IntroAnimation.css'

const BOKEH_ORBS = [
  { color: 'rgba(228,217,200,0.45)', size: 320, x: 14, y: 22 },
  { color: 'rgba(237,229,216,0.55)', size: 260, x: 80, y: 28 },
  { color: 'rgba(228,217,200,0.40)', size: 360, x: 20, y: 78 },
  { color: 'rgba(237,229,216,0.45)', size: 220, x: 70, y: 82 },
  { color: 'rgba(243,237,227,0.65)', size: 380, x: 50, y: 12 },
  { color: 'rgba(228,217,200,0.40)', size: 280, x: 88, y: 60 },
]
const PARTICLE_COLORS = ['#E8650A', '#FF7A20', '#D4186C', '#E8267E', '#ffffff']
const SPARK_COLORS    = ['#E8650A', '#FF7A20', '#D4186C', '#E8267E', '#7A2F03']


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
  <stop offset="0%"   stopColor="#FFD088"/>
  <stop offset="18%"  stopColor="#FF9530"/>
  <stop offset="45%"  stopColor="#FF6B0E"/>
  <stop offset="75%"  stopColor="#D14808"/>
  <stop offset="100%" stopColor="#5C1E02"/>
</linearGradient>
                    <linearGradient id="iBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%"   stopColor="#A8C6F5"/>
  <stop offset="18%"  stopColor="#6E94E0"/>
  <stop offset="48%"  stopColor="#3D67C8"/>
  <stop offset="80%"  stopColor="#1E3D8C"/>
  <stop offset="100%" stopColor="#0A1B4A"/>
</linearGradient>
                    <linearGradient id="iPinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%"   stopColor="#8E0846"/>
  <stop offset="22%"  stopColor="#D4186C"/>
  <stop offset="50%"  stopColor="#FF4FA1"/>
  <stop offset="78%"  stopColor="#D4186C"/>
  <stop offset="100%" stopColor="#8E0846"/>
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

                  {/* Orange top half — 7 layer extrusion */}
<g className="intro-top-half" clipPath="url(#iTopClip)" filter="url(#iLetterDepth)">
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#2a0f02" opacity="0.95" transform="translate(7,11)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#3a1604" opacity="0.95" transform="translate(6,9.5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#4a1a04" opacity="0.95" transform="translate(5,8)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#5c2206" opacity="0.95" transform="translate(4,6.5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#6d2606" opacity="0.95" transform="translate(3,5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#7e3008" opacity="0.95" transform="translate(2,3.5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#8e3a0a" opacity="0.95" transform="translate(1,2)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="url(#iOrangeGrad)">ZSC</text>
</g>

                  {/* Blue bottom half — 7 layer extrusion */}
<g className="intro-bottom-half" clipPath="url(#iBottomClip)" filter="url(#iLetterDepth)">
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#040a1c" opacity="0.95" transform="translate(7,11)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#0a1530" opacity="0.95" transform="translate(6,9.5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#0f1d3e" opacity="0.95" transform="translate(5,8)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#152448" opacity="0.95" transform="translate(4,6.5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#1a2b56" opacity="0.95" transform="translate(3,5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#1f3265" opacity="0.95" transform="translate(2,3.5)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="#243a74" opacity="0.95" transform="translate(1,2)">ZSC</text>
  <text x="450" y="285" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="300" fill="url(#iBlueGrad)">ZSC</text>
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