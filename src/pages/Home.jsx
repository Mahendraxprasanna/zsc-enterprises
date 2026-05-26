import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionReveal from '../components/SectionReveal'
import heroBg from '../assets/images/dunkinbackground.webp'
import donutsImg from '../assets/images/donuts.jpeg'
import snacksImg from '../assets/images/snacks.jpeg'
import stallImg from '../assets/images/stall.jpeg'
import govKempImg from '../assets/images/govkemp.png'
import ndcpBoardImg from '../assets/images/ndcpboard.png'
import boardDirectorsImg from '../assets/images/boarddirectors.png'
import peterbiltImg from '../assets/images/peterbilt.png'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import dunkinCardImg from '../assets/images/dd.jpg'
import baskinCardImg from '../assets/images/br.jpg'
import smoothieCardImg from '../assets/images/sk.jpg'
import jimmyCardImg from '../assets/images/jj.webp'
function FieldGallery({ photos }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (active === null) return
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((active + 1) % photos.length)
      if (e.key === 'ArrowLeft') setActive((active - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active, photos.length])

  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  return (
    <>
      {/* GRID */}
      <div className="grid px-12 pb-14 gap-4"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {photos.map((p, i) => (
          <div key={p.title}
            className="relative overflow-hidden group cursor-pointer"
            style={{ border: '1px solid rgba(250,247,242,0.08)', borderRadius: 2 }}
            onClick={() => setActive(i)}
          >
            <img src={p.img} alt={p.alt}
              className="w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              style={{ height: 280, objectFit: 'contain', objectPosition: 'center top', display: 'block' }} />
            <div style={{ background: '#1C0F08', padding: '12px 14px 16px', borderTop: '2px solid #E8650A' }}>
              <div className="text-[0.44rem] tracking-[0.26em] uppercase font-semibold mb-1"
                style={{ color: '#E8650A' }}>{p.tag}</div>
              <div className="font-playfair font-bold text-[#FAF7F2] leading-[1.2]"
                style={{ fontSize: '1rem' }}>{p.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(10,5,2,0.96)' }}
          onClick={() => setActive(null)}
        >
          {/* Prev */}
          <button
            className="absolute left-6 z-10 flex items-center justify-center transition-all duration-200"
            style={{
              width: 52, height: 52,
              background: '#E8650A',
              border: 'none', cursor: 'pointer', color: '#fff',
              fontSize: '1.2rem', fontWeight: 700,
            }}
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + photos.length) % photos.length) }}
          >
            ←
          </button>

          {/* Image */}
          <div
            className="relative"
            style={{ maxWidth: '72vw', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[active].img}
              alt={photos[active].alt}
              style={{
                maxWidth: '72vw',
                maxHeight: '78vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div className="text-center mt-4"
              style={{ color: 'rgba(250,247,242,0.65)', fontSize: '0.82rem', letterSpacing: '0.04em' }}>
              {photos[active].title} &nbsp;·&nbsp; {photos[active].tag}
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-6 z-10 flex items-center justify-center transition-all duration-200"
            style={{
              width: 52, height: 52,
              background: '#E8650A',
              border: 'none', cursor: 'pointer', color: '#fff',
              fontSize: '1.2rem', fontWeight: 700,
            }}
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % photos.length) }}
          >
            →
          </button>

          {/* Close hint */}
          <div className="absolute top-6 right-8 text-[0.5rem] tracking-[0.2em] uppercase"
            style={{ color: 'rgba(250,247,242,0.3)', cursor: 'pointer' }}
            onClick={() => setActive(null)}>
            ESC to close
          </div>
        </div>
      )}
    </>
  )
}
const tickerItems = [
  "ZSC Enterprises","Dunkin'","Baskin Robbins","Smoothie King",
  "Atlanta, Georgia","Est. 2016","45+ Locations","Jimmy Johns","Multi Brand","Multi State"
]

const stats = [
  { n: '45', sup: '+', label: "Dunkin' Locations Operated" },
  { n: '4',  sup: '',  label: 'World-Class Brands' },
  { n: '3',sup: 'M', label: 'Georgia, Alabama & Florida-Multi State Operated' },
  { n: '25', sup: '+', label: 'Years of QSR Excellence' },
]

const fieldPhotos = [
  { img: govKempImg,        tag: 'CCB Opening',    title: 'With Gov. Kemp',        alt: 'Shams with Governor Kemp' },
  { img: ndcpBoardImg,      tag: 'NDCP Board',     title: 'With Industry Leaders', alt: 'NDCP Board meeting' },
  { img: boardDirectorsImg, tag: 'NDCP Directors', title: 'Board of Directors',    alt: 'Board of Directors' },
  { img: peterbiltImg,      tag: 'Operations',     title: 'Peterbilt Tour',        alt: 'Peterbilt facility tour' },
]
const brandModes = [
  { title: '', img: dunkinCardImg,   subtitle: '', scale: 1,    link: '/brands' },
  { title: '', img: baskinCardImg,   subtitle: '', scale: 1,    link: '/brands?brand=baskin' },
  { title: '', img: smoothieCardImg, subtitle: '', scale: 1,    link: '/brands?brand=smoothie' },
  { title: '', img: jimmyCardImg,    subtitle: '', scale: 2, link: '/brands?brand=jimmyjohns' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* ══ 1. HERO ══ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
  minHeight: '100vh',
  paddingTop: '120px',
  paddingBottom: '40px'
}}
      >
        <img
          src={heroBg}
          alt="Dunkin store interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(1) saturate(1) sepia(.1)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(18,8,3,0.97) 0%, rgba(18,8,3,0.75) 45%, rgba(18,8,3,0.15) 100%)' }}
        />
        <div className="relative z-10 px-16 max-w-[620px]">
          <motion.div
            className="flex items-center gap-3 mb-6"
            style={{ fontSize: '0.48rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.38)' }}
            variants={fadeUp} initial="hidden" animate="show" custom={0}
          >
            <span style={{ display: 'block', width: 20, height: 1, background: '#E8650A', flexShrink: 0 }} />
            Atlanta, Georgia &nbsp;·&nbsp; Est. 2016 &nbsp;·&nbsp; Franchise Group
          </motion.div>

          <motion.h1
            className="font-playfair font-black text-[#F3EDE3] leading-[0.95] mb-6"
            style={{ fontSize: 'clamp(4rem, 8.5vw, 7.5rem)' }}
            variants={fadeUp} initial="hidden" animate="show" custom={1}
          >
            Building Brands.<br />
            <em style={{
  fontStyle: 'italic',
  background: 'linear-gradient(90deg, #E8650A 0%, #D4186C 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}}>Inspiring People.</em>
          </motion.h1>

          <motion.p
            className="text-[0.88rem] leading-[1.85] font-light mb-8"
            style={{ color: 'rgba(250,247,242,0.5)' }}
            variants={fadeUp} initial="hidden" animate="show" custom={2}
          >
            ZSC Enterprises is one of Atlanta's fastest-growing franchise groups —
            operating Dunkin', Baskin Robbins, and Smoothie King with an
            uncompromising standard of excellence.
          </motion.p>

          <motion.div className="flex gap-4"
            variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <Link to="/leadership"
              className="grad-bg text-white no-underline px-8 py-3 text-[0.6rem] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85">
              Meet Our Leader
            </Link>
            <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
              className="no-underline px-8 py-3 text-[0.6rem] tracking-[0.2em] uppercase font-medium text-[#F3EDE3] transition-all duration-200"
              style={{ border: '1px solid rgba(250,247,242,0.28)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#E8650A'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(250,247,242,0.28)'}
            >
              Join Our Team
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-16 z-10 flex flex-col items-center gap-2">
          <div className="w-[1px] h-10"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(250,247,242,0.3))' }} />
          <span className="text-[0.42rem] tracking-[0.3em] uppercase text-[rgba(250,247,242,0.22)]"
            style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

      {/* ══ 2. TICKER ══ */}
      <div className="overflow-hidden py-[13px]"
        style={{ background: '#1A1208', borderTop: '0.5px solid rgba(250,247,242,0.05)' }}>
        <div className="flex whitespace-nowrap"
          style={{ animation: 'ticker 30s linear infinite', width: 'max-content' }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="text-[0.52rem] tracking-[0.26em] uppercase font-medium px-5"
                style={{ color: 'rgba(250,247,242,0.4)' }}>{item}</span>
              <span className="w-[3px] h-[3px] rounded-full flex-shrink-0"
                style={{ background: '#E8650A' }} />
            </span>
          ))}
        </div>
      </div>

      {/* ══ 3. NUMBERS ══ */}
      <SectionReveal>
      <style>{`
  .stat-block {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: background 0.4s ease;
  }
  .stat-block::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0%;
    background: linear-gradient(180deg, #E8650A, #D4186C);
    transition: height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 0;
  }
  .stat-block:hover::before {
    height: 100%;
  }
  .stat-block:hover .stat-n {
    background: #F3EDE3;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .stat-block:hover .stat-l {
    color: rgba(250,247,242,0.6) !important;
  }
  .stat-block .stat-inner {
    position: relative;
    z-index: 1;
  }
  .stat-n {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    background: linear-gradient(135deg, #E8650A, #D4186C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 0.5rem;
    font-size: 2.8rem;
    transition: all 0.3s ease;
  }
`}
    </style>

<div className="grid"
  style={{ gridTemplateColumns: 'repeat(4, 1fr)', background: '#F3EDE3', borderBottom: '0.5px solid rgba(42,30,16,0.1)' }}>
  {stats.map((s, i) => (
    <motion.div
      key={s.label}
      className="stat-block px-8 py-7"
      style={{ borderRight: i < 3 ? '0.5px solid rgba(42,30,16,0.1)' : 'none' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
    >
      <div className="stat-inner">
        <div className="stat-n">
          {s.n}<sup style={{ fontSize: '1.2rem', verticalAlign: 'super' }}>{s.sup}</sup>
        </div>
        <div className="stat-l text-[0.48rem] tracking-[0.22em] uppercase font-medium"
          style={{ color: 'rgba(42,30,16,0.38)' }}>
          {s.label}
        </div>
      </div>
    </motion.div>
  ))}
</div>
</SectionReveal>

      {/* ══ 4. ABOUT SPLIT ══ */}
      <SectionReveal direction="up" delay={0.1}>
      <section className="grid"
        style={{ gridTemplateColumns: '1fr 1fr', borderTop: '0.5px solid rgba(42,30,16,0.1)' }}>
        <div className="relative overflow-hidden" style={{ minHeight: 360 }}>
          <img src={donutsImg} alt="Dunkin donuts and coffee"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(1) saturate(0.9) contrast(1.1)' }} />
        </div>
        <motion.div className="px-14 py-16 flex flex-col justify-center"
          style={{ background: '#F3EDE3' }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-[1px]" style={{ background: '#E8650A' }} />
            <span className="text-[0.5rem] tracking-[0.28em] uppercase text-[#E8650A] font-medium">About Us</span>
          </div>
          <h2 className="font-playfair font-black leading-[1.1] text-[#1A1208] mb-5"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
            A Different Kind of<br />
<em className="grad-text not-italic">Franchise Group.</em>
          </h2>
          <p className="text-[0.86rem] leading-[1.9] font-light mb-8"
            style={{ color: 'rgba(42,30,16,0.6)' }}>
            ZSC Enterprises is one of Atlanta's fastest-growing franchise groups, built on
            a culture of excellence, people development, and community impact. We operate
            with an uncompromising standard — because our guests deserve nothing less.
          </p>
          <div className="flex items-start gap-3 pt-6"
            style={{ borderTop: '0.5px solid rgba(42,30,16,0.1)' }}>
            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center grad-bg text-white text-xs">📍</div>
            <div>
              <div className="text-[0.44rem] tracking-[0.22em] uppercase mb-1"
                style={{ color: 'rgba(42,30,16,0.35)' }}>Headquarters</div>
              <div className="text-[0.82rem] leading-[1.6]"
                style={{ color: 'rgba(42,30,16,0.7)' }}>
                3200 Windy Hill Rd SE<br />Atlanta, GA 30339
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      </SectionReveal>

      {/* ══ 5. STORE PHOTO GRID ══ */}
      <SectionReveal direction="up" delay={0.1}>
      <section style={{ background: '#1A1208' }}>
  <div className="px-16 py-16 text-center">
    <h2 className="font-playfair font-black text-[#F3EDE3] leading-[1.1]"
      style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
      The Experience We Deliver.<br />
      <em className="grad-text">Every Single Day.</em>
    </h2>
  </div>

  {/* Row 01 */}
  <div className="grid"
    style={{ gridTemplateColumns: '1fr 1fr', borderTop: '0.5px solid rgba(250,247,242,0.06)' }}>
    <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
      <img src={snacksImg} alt="Fresh pastries and donuts"
        className="w-full h-full object-cover object-center"
       style={{ filter: 'brightness(0.85) saturate(1.1) contrast(1.05)' }} />
      <div className="absolute top-6 left-6 font-playfair font-black"
        style={{ fontSize: '5rem', color: 'rgba(232,101,10,0.18)', lineHeight: 1 }}></div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] grad-bg" />
    </div>
    <div className="px-14 py-16 flex flex-col justify-center"
      style={{ background: '#F3EDE3' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-5 h-[1px]" style={{ background: '#E8650A' }} />
        <span className="text-[0.48rem] tracking-[0.28em] uppercase font-medium text-[#E8650A]">
          Our Dunkin' Experience
        </span>
      </div>
      <h3 className="font-playfair font-black text-[#1A1208] leading-[1.1] mb-5"
  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
  Modern. Vibrant.<br />
  <em className="grad-text not-italic">Always Fresh.</em>
      </h3>
      <p className="text-[0.86rem] leading-[1.9] font-light mb-8"
        style={{ color: 'rgba(42,30,16,0.65)' }}>
        Our Dunkin' locations are designed for the modern guest — bright, energetic
        spaces featuring cold brew on tap, premium espresso, and the full Dunkin' menu
        delivered with the warmth and speed our guests expect every time they walk
        through our doors.
      </p>
      <div className="flex gap-2 flex-wrap">
        {['Coffee','Espresso','Donuts','Breakfast','Pastries'].map(t => (
          <span key={t}
            className="text-[0.44rem] tracking-[0.16em] uppercase px-3 py-[5px] font-semibold"
            style={{ border: '1px solid rgba(232,101,10,0.35)', color: '#E8650A', background: 'rgba(232,101,10,0.05)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Row 02 flipped */}
  <div className="grid"
    style={{ gridTemplateColumns: '1fr 1fr', borderTop: '0.5px solid rgba(42,30,16,0.08)' }}>
    <div className="px-14 py-16 flex flex-col justify-center"
      style={{ background: '#F3EDE3' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-5 h-[1px]" style={{ background: '#E8650A' }} />
        <span className="text-[0.48rem] tracking-[0.28em] uppercase font-medium text-[#E8650A]">
          Signature Beverages
        </span>
      </div>
      <h3 className="font-playfair font-black text-[#1A1208] leading-[1.1] mb-5"
  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
  Cold Brew, Nitro<br />
  <em className="grad-text not-italic">&amp; Beyond.</em>
      </h3>
      <p className="text-[0.86rem] leading-[1.9] font-light mb-8"
        style={{ color: 'rgba(42,30,16,0.65)' }}>
        From nitro cold brew on tap to seasonal signature beverages — our Dunkin'
        locations are built to satisfy every craving, every time of day. Seven taps.
        Endless possibilities. Always on.
      </p>
      <div className="flex gap-2 flex-wrap">
        {['Nitro','Cold Brew','Iced Tea','Sweet Tea','Refreshers'].map(t => (
          <span key={t}
            className="text-[0.44rem] tracking-[0.16em] uppercase px-3 py-[5px] font-semibold"
            style={{ border: '1px solid rgba(232,101,10,0.35)', color: '#E8650A', background: 'rgba(232,101,10,0.05)' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
    <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
      <img src={stallImg} alt="Cold brew nitro taps"
        className="w-full h-full object-cover object-center"
        style={{ filter: 'brightness(0.85) saturate(1.1) contrast(1.05)' }} />
      <div className="absolute top-6 right-6 font-playfair font-black"
        style={{ fontSize: '5rem', color: 'rgba(232,101,10,0.18)', lineHeight: 1 }}></div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] grad-bg" />
    </div>
  </div>
      </section>
      </SectionReveal>
      {/* ══ 6. MISSION ══ */}
<SectionReveal delay={0.15}>
<section className="px-32 py-28 text-center"
  style={{ background: '#1C0F08', borderTop: '0.5px solid rgba(250,247,242,0.06)' }}>
  <div className="w-[1px] h-12 mx-auto mb-10" style={{ background: 'linear-gradient(to bottom, transparent, #D4186C)' }} />
  <blockquote className="font-playfair font-normal italic leading-[1.65] mx-auto"
    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', maxWidth: 820, color: 'rgba(250,247,242,0.88)' }}>
    "To inspire our team to become the{' '}
    <strong className="not-italic font-black grad-text">best part of the day</strong>
    {' '}for our guests through our various brands."
  </blockquote>
  <p className="mt-10 text-[0.48rem] tracking-[0.32em] uppercase"
    style={{ color: 'rgba(250,247,242,0.22)' }}>
    ZSC Enterprises &nbsp;·&nbsp; Mission Statement &nbsp;·&nbsp; Atlanta, Georgia
  </p>
</section>  
</SectionReveal>
      {/* ══ BRAND MODES ══ */}
<SectionReveal direction="up" delay={0.1}>
<section
  className="relative px-12 py-16 overflow-hidden"
  style={{
  background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)'
  }}
>
  <div className="text-center mb-10">
    <div style={{ textAlign: 'center', marginBottom: 8 }}>
  <h2 className="font-playfair font-black" style={{
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.0,
    marginBottom: 8,
  }}>
    Our Brands
  </h2>
  <div style={{
    fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)', fontWeight: 500,
  }}>
    Four Brands. One Standard of Excellence.
  </div>
</div>
  </div>

  <div
    className="grid gap-6 mx-auto"
    style={{
      gridTemplateColumns: 'repeat(4, 1fr)',
      maxWidth: 1150
    }}
  >
    {brandModes.map((brand, i) => (
      <motion.div
  key={i}
  whileHover={{ y: -8, scale: 1.02 }}
  onClick={() => window.location.href = brand.link}
  style={{ cursor: 'pointer' }}
        transition={{ duration: 0.25 }}
        className="relative overflow-hidden cursor-pointer group"
        style={{
          border: '4px solid rgba(255,255,255,0.25)',
          background: '#111',
          minHeight: 320,
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)'
        }}
      >
        <div
  className="absolute inset-0 flex items-center justify-center p-6"
  style={{ background: '#ffffff' }}
>
  <img
    src={brand.img}
    alt={brand.title}
    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
    style={{
      objectFit: 'contain',
      objectPosition: 'center',
      transform: `scale(${brand.scale || 1})`,
    }}
  />
</div>

        {/* OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 45%)'
          }}
        />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h2
            className="font-black leading-[0.9] uppercase"
            style={{
              fontSize: 'clamp(2.6rem, 4vw, 4.5rem)',
              color: '#fff',
              textShadow: '0 4px 12px rgba(0,0,0,0.45)'
            }}
          >
            {brand.title}
          </h2>

          <div
            className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] font-semibold"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            {brand.subtitle}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>
</SectionReveal>
      <SectionReveal delay={0.1}></SectionReveal>
      {/* ══ 7. CAREERS ══ */}
      <SectionReveal direction="up" delay={0.1}>
      <section className="grid items-start px-14 py-14"
  style={{ gridTemplateColumns: '1fr auto', gap: '2rem', background: '#F3EDE3', borderTop: '0.5px solid rgba(42,30,16,0.08)' }}>
        <div>
          <h2 className="font-playfair font-black text-[#1A1208] leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            We Build Careers,<br />
<em className="grad-text not-italic">Not Just Shifts.</em>
          </h2>
          <p className="text-[0.86rem] leading-[1.85] font-light"
            style={{ color: 'rgba(42,30,16,0.52)', maxWidth: 440 }}>
            Join a team where growth is expected, people are valued, and excellence is the only standard.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 pt-1 flex-shrink-0">
          <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
            className="grad-bg text-white no-underline px-8 py-4 text-[0.6rem] tracking-[0.22em] uppercase font-semibold whitespace-nowrap transition-opacity hover:opacity-85">
            Explore Opportunities
          </a>
          <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
            className="text-[0.5rem] tracking-[0.2em] uppercase no-underline transition-colors hover:text-[#E8650A]"
            style={{ color: 'rgba(42,30,16,0.35)' }}>
            Current Openings →
          </a>
        </div>
      </section>
      </SectionReveal>

      <SectionReveal delay={0.1}>
      {/* ══ FOOTER ══ */}
      <Footer />
      </SectionReveal>

    </motion.div>
  )
}