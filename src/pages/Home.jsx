import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

import heroBg      from '../assets/images/street.png'
import dunkinVideo   from '../assets/videos/donutrotate.mp4'
import baskinVideo   from '../assets/videos/baskinrotate.mp4'
import smoothieVideo from '../assets/videos/smoothierotate.mp4'
import jimmyVideo    from '../assets/videos/jimmyrotate.mp4'
import teamImg from '../assets/images/team.jpg'
// ─────────────────────────────────────────────────────────
// CIRCULAR ORBIT TEXT
// ─────────────────────────────────────────────────────────
function CircularOrbit({ id, text, color, size = 480, duration = 22 }) {
  const r = size / 2 - 24
  const cx = size / 2
  const cy = size / 2
  const repeated = `${text} · ${text} · ${text} · `
  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}
      animate={{ rotate: -360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <path id={`c-${id}`} d={`M${cx},${cy} m-${r},0 a${r},${r} 0 1,1 ${r*2},0 a${r},${r} 0 1,1-${r*2},0`} />
      </defs>
      <text fontSize="11.5" fontFamily="'Jost',sans-serif" fontWeight="800" letterSpacing="5" fill={color} opacity="0.85">
        <textPath href={`#c-${id}`} startOffset="0%">{repeated}</textPath>
      </text>
    </motion.svg>
  )
}

// ─────────────────────────────────────────────────────────
// BRAND SECTION — sticky scroll reveal
// ─────────────────────────────────────────────────────────
function BrandSection({ id, orbitText, orbitColor, orbitDuration, image, video, imageAlt, eyebrow, accentColor, heading, headingLine2, headingGradient, body, ctaLabel, ctaLink, ctaBg, ctaText='#fff', ctaBorder, bg, textColor, subtleColor, flip=false, videoCrop={ top:0, right:0, bottom:0, left:0 }, videoScale=1, videoShape='circle' }) {
  const ref = useRef(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  const imgScale   = useTransform(progress, [0, 0.45, 1], [0.75, 1, 1.08])
  const imgRotate  = useTransform(progress, [0, 1], [-6, 16])
  const imgOpacity = useTransform(progress, [0, 0.15], [0.3, 1])

  const txtOpacity = useTransform(progress, [0.05, 0.3], [0, 1])
  const txtX       = useTransform(progress, [0.05, 0.35], [flip ? -60 : 60, 0])
  const txtBlur    = useTransform(progress, [0.05, 0.32], [12, 0])

  const lineW      = useTransform(progress, [0.1, 0.38], [0, 42])
  const ctaOpacity = useTransform(progress, [0.2, 0.45], [0, 1])
  const ctaY       = useTransform(progress, [0.2, 0.45], [24, 0])

  return (
    <section ref={ref} style={{ height: '250vh', background: bg, position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
      }}>

        {/* ── IMAGE ── */}
        <div style={{
          order: flip ? 2 : 1,
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: bg, overflow: 'hidden',
        }}>
          {/* Large ambient glow behind image */}
          <div style={{
            position: 'absolute', width: '70%', height: '70%', borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}28 0%, transparent 70%)`,
            filter: 'blur(48px)', pointerEvents: 'none', zIndex: 1,
          }} />

          {/* Orbit container */}
          <motion.div style={{
            position: 'relative',
            width: 'clamp(280px, 36vw, 460px)',
            height: 'clamp(280px, 36vw, 460px)',
            scale: imgScale,
            rotate: imgRotate,
            opacity: imgOpacity,
          }}>
            <div style={{
  position: 'absolute',
  top: videoShape === 'sub' ? '20%' : '5%',
  left: videoShape === 'sub' ? '2%' : '5%',
  width: videoShape === 'sub' ? '96%' : '90%',
  height: videoShape === 'sub' ? '60%' : '90%',
  zIndex: 3,
  overflow: 'hidden',
  borderRadius: videoShape === 'sub' ? '120px' : '50%',
  clipPath: videoShape === 'sub' ? 'none' : 'circle(50% at 50% 50%)',
}}>
  {video ? (
    <video
      autoPlay muted loop playsInline
      style={{
        width: '100%', height: '100%',
        objectFit: 'cover',
        transform: `scale(${videoScale})`,
        transformOrigin: 'center center',
        filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.22))',
      }}>
      <source src={video} type="video/mp4" />
    </video>
  ) : (
    <img src={image} alt={imageAlt} style={{
      width: '100%', height: '100%',
      objectFit: 'contain',
      filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.22))',
    }} />
  )}
</div>
          </motion.div>
        </div>

        {/* ── TEXT ── */}
        <motion.div style={{
          order: flip ? 1 : 2,
          background: bg,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(3rem, 7vw, 9rem)',
          opacity: txtOpacity,
          x: txtX,
          filter: txtBlur.get ? undefined : 'none',
        }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.6rem' }}>
            <motion.div style={{ height: 1.5, background: accentColor, width: lineW, flexShrink: 0 }} />
            <span style={{ fontSize: '0.99rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: accentColor, fontWeight: 800, whiteSpace: 'nowrap' }}>
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-playfair font-black" style={{
            fontSize: 'clamp(2.6rem, 5vw, 5.2rem)',
            lineHeight: 0.9, color: textColor,
            marginBottom: '1.8rem', letterSpacing: '-0.03em',
          }}>
            {heading}<br />
            <em style={{
  fontStyle: 'italic', display: 'inline-block',
  background: headingGradient,
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  paddingRight: '0.05em',
}}>{headingLine2}</em>
          </h2>

          {/* Thin divider */}
          <div style={{ width: 48, height: 1, background: accentColor, opacity: 0.3, marginBottom: '2rem' }} />

          {/* Body */}
          <p style={{
            fontSize: 'clamp(0.88rem, 1.1vw, 1rem)',
            lineHeight: 2.1, color: subtleColor,
            fontWeight: 300, maxWidth: 400, marginBottom: '3rem',
          }}>{body}</p>

          {/* CTA */}
          <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
            <Link to={ctaLink} style={{
              display: 'inline-block',
              background: ctaBg,
              color: ctaText,
              textDecoration: 'none',
              padding: '0.85rem 2.6rem',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 700,
              border: ctaBorder || 'none',
              transition: 'opacity 0.25s, transform 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
              {ctaLabel}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* BG image */}
        <motion.img src={heroBg} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(1) saturate(1) sepia(0.4)' }}
          initial={{ scale: 1.08 }} animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} />

        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,2,0,0.15) 0%, rgba(4,2,0,0.82) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center 40%, rgba(232,101,10,0.12) 0%, transparent 60%)' }} />

        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem', maxWidth: 900 }}>

          {/* Eyebrow */}
          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '2.4rem' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
            <span style={{ fontSize: '0.43rem', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)', fontWeight: 500 }}>
              Atlanta · Est. 2016 · Franchise Group
            </span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
          </motion.div>

          {/* Main headline */}
          <div style={{ overflow: 'hidden', marginBottom: '0.3rem' }}>
            <motion.h1 className="font-playfair font-black"
              style={{ fontSize: 'clamp(4.5rem, 11vw, 11rem)', lineHeight: 0.84, color: '#FAF7F2', letterSpacing: '-0.03em' }}
              initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              ZSC
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '3rem' }}>
  <motion.h1 className="font-playfair font-black"
    style={{
      fontSize: 'clamp(4.5rem, 11vw, 11rem)', lineHeight: 0.95,
      paddingBottom: '0.1em',
                letterSpacing: '-0.03em', fontStyle: 'italic',
                background: 'linear-gradient(90deg, #E8650A 0%, #D4186C 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', display: 'inline-block',
              }}
              initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}>
              Enterprises
            </motion.h1>
          </div>

          <motion.p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.9, color: 'rgba(250,247,242,0.44)', fontWeight: 300, maxWidth: 520, margin: '0 auto 4rem' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75 }}>
            Building memorable experiences, one cup, one scoop, one smile at a time.
          </motion.p>

          <motion.div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.92 }}>
            <Link to="/brands" style={{
              background: 'linear-gradient(135deg, #E8650A, #D4186C)',
              color: '#fff', textDecoration: 'none',
              padding: '1.05rem 3.2rem',
              fontSize: '0.56rem', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 700,
              boxShadow: '0 16px 48px rgba(232,101,10,0.42)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 22px 56px rgba(232,101,10,0.52)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(232,101,10,0.42)' }}>
              Explore Our Brands
            </Link>
            <Link to="/leadership" style={{
              color: 'rgba(250,247,242,0.5)', textDecoration: 'none',
              padding: '1.05rem 2.6rem',
              fontSize: '0.56rem', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 400,
              border: '1px solid rgba(250,247,242,0.18)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8650A'; e.currentTarget.style.color = '#FAF7F2' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,247,242,0.18)'; e.currentTarget.style.color = 'rgba(250,247,242,0.5)' }}>
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 10 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
          <motion.div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, transparent, rgba(232,101,10,0.75))' }}
            animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          2. TICKER
      ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
          3. DUNKIN'
      ══════════════════════════════════════ */}
      <BrandSection
        id="dunkin"
        orbitText="DUNKIN' · COFFEE · DONUTS · ESPRESSO"
        orbitColor="#FF671F"
        orbitDuration={22}
        video={dunkinVideo}
        videoCrop={{ top: 5, right: 8, bottom: 5, left: 8 }}
        videoScale={1.1} 
        eyebrow=" Dunkin'"
        accentColor="#FF671F"
        heading="Fresh. Fast."
        headingLine2="Every Time."
        headingGradient="linear-gradient(135deg, #E8650A, #D4186C)"
        body="From fresh-glazed donuts to bold espresso and cold brew on tap — ZSC Enterprises operates 45+ Dunkin' locations across Atlanta, delivering the full Dunkin' experience with speed, warmth, and consistency every single day."
        ctaLabel="Explore Dunkin&apos;"
        ctaLink="/brands"
        ctaBg="transparent"
        ctaText="#FF671F"
        ctaBorder="1.5px solid #FF671F"
        bg="#FFF8F2"
        textColor="#1A0E06"
        subtleColor="rgba(26,14,6,0.52)"
        flip={false}
      />

      {/* ══════════════════════════════════════
          4. BASKIN ROBBINS
      ══════════════════════════════════════ */}
      <BrandSection
        id="baskin"
        orbitText="BASKIN ROBBINS · ICE CREAM · 100+ FLAVORS"
        orbitColor="#F05097"
        orbitDuration={26}
        video={baskinVideo}
videoCrop={{ top: 0, right: 0, bottom: 0, left: 0 }}
videoScale={1}
        eyebrow="Baskin Robbins"
        accentColor="#F05097"
        heading="More Flavors."
        headingLine2="More Smiles."
        headingGradient="linear-gradient(135deg, #F05097, #D4186C)"
        body="The world's largest ice cream specialty chain — seven decades of premium hard-serve ice cream and iconic flavors. Co-located with our Dunkin' stores for the ultimate treat experience."
        ctaLabel="Explore Baskin Robbins"
        ctaLink="/brands?brand=baskin"
        ctaBg="transparent"
        ctaText="#F05097"
        ctaBorder="1.5px solid #F05097"
        bg="#FFF5F8"
        textColor="#2A0A18"
        subtleColor="rgba(42,10,24,0.5)"
        flip={true}
      />

      {/* ══════════════════════════════════════
          5. SMOOTHIE KING
      ══════════════════════════════════════ */}
      <BrandSection
        id="smoothie"
        orbitText="SMOOTHIE KING · REAL FRUIT · WELLNESS · PURPOSE"
        orbitColor="#E31B23"
        orbitDuration={24}
        video={smoothieVideo}
videoCrop={{ top: 0, right: 0, bottom: 0, left: 0 }}
videoScale={1}
        eyebrow="Smoothie King"
        accentColor="#E31B23"
        heading="Smoothies With"
        headingLine2="Purpose."
        headingGradient="linear-gradient(135deg, #E31B23, #B5121B)"
        body="Purpose-driven blends made with real fruit and wholesome ingredients — helping Atlanta guests fuel their active lifestyle. ZSC brings the Smoothie King mission to life every single day."
        ctaLabel="Explore Smoothie King"
        ctaLink="/brands?brand=smoothie"
        ctaBg="transparent"
        ctaText="#E31B23"
        ctaBorder="1.5px solid #E31B23"
        bg="#FFF5F5"
        textColor="#1A0808"
        subtleColor="rgba(26,8,8,0.5)"
        flip={false}
      />

      {/* ══════════════════════════════════════
          6. JIMMY JOHN'S
      ══════════════════════════════════════ */}
      <BrandSection
        id="jimmy"
        orbitText="JIMMY JOHN'S · FREAKY FAST · GOURMET SUBS"
        orbitColor="#C41230"
        orbitDuration={20}
        video={jimmyVideo}
videoShape="sub"
videoScale={1}
        eyebrow=" Jimmy John's"
        accentColor="#C41230"
        heading="Freaky Fast."
        headingLine2="Seriously Good."
        headingGradient="linear-gradient(135deg, #C41230, #8B0000)"
        body="ZSC Enterprises brings the Jimmy John's experience to the Southeast — delivering gourmet sandwiches made with fresh-baked bread and hand-sliced meats, freaky fast."
        ctaLabel="Explore Jimmy John's"
        ctaLink="/brands?brand=jimmyjohns"
        ctaBg="transparent"
        ctaText="#C41230"
        ctaBorder="1.5px solid #C41230"
        bg="#FAFAF8"
        textColor="#0A0A0A"
        subtleColor="rgba(10,10,10,0.46)"
        flip={true}
      />

      {/* ══════════════════════════════════════
          7. FINAL CTA
      ══════════════════════════════════════ */}
      <section style={{
  minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#0a0602', position: 'relative', overflow: 'hidden',
  textAlign: 'center', padding: '10rem 3rem',
}}>
  <img src={teamImg} alt="" style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', objectPosition: 'center',
    filter: 'brightness(0.22) saturate(0.5)',
  }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,101,10,0.11) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(212,24,108,0.08) 0%, transparent 52%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <motion.div style={{ width: 1, height: 72, background: 'linear-gradient(to bottom, transparent, #D4186C)', margin: '0 auto 4.5rem' }}
            initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }}
            viewport={{ once: true }} transition={{ duration: 1 }} />

          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '2rem' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
            <span style={{ fontSize: '0.43rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.28)', fontWeight: 500 }}>ZSC Enterprises · Atlanta, Georgia</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
          </motion.div>

          <motion.h2 className="font-playfair font-black"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.8rem)', color: '#FAF7F2', lineHeight: 0.9, marginBottom: '2rem', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}>
            Four Iconic Brands.<br />
            <em style={{
              fontStyle: 'italic', display: 'inline-block',
              background: 'linear-gradient(90deg, #E8650A, #D4186C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>One Trusted Partner.</em>
          </motion.h2>

          <motion.p style={{ fontSize: '1.05rem', lineHeight: 2.1, color: 'rgba(250,247,242,0.35)', fontWeight: 300, maxWidth: 480, margin: '0 auto 4rem' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}>
            Proudly serving communities with passion, quality, and care across Atlanta and beyond.
          </motion.p>

          <motion.div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.42 }}>
            <Link to="/brands" style={{
              background: 'linear-gradient(135deg, #E8650A, #D4186C)', color: '#fff', textDecoration: 'none',
              padding: '1.1rem 3.2rem', fontSize: '0.56rem', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 700,
              boxShadow: '0 14px 44px rgba(232,101,10,0.35)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 52px rgba(232,101,10,0.48)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(232,101,10,0.35)' }}>
              Learn More About Us
            </Link>
          </motion.div>

          {/* Brand names row */}
          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.8rem', marginTop: '5rem', flexWrap: 'wrap' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }}>
            {[["Dunkin'", "#FF671F"], ["Baskin Robbins", "#F05097"], ["Smoothie King", "#E31B23"], ["Jimmy John's", "#C41230"]].map(([name, color], i) => (
              <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.8rem' }}>
                <span style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.2)', fontWeight: 500 }}>{name}</span>
                {i < 3 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: color, opacity: 0.5 }} />}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}