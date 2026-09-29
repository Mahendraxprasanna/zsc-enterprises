import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Footer from '../components/Footer'
import useIsMobile from '../hooks/useIsMobile'

import hero1 from '../assets/images/community/hero1.jpg'
import hero2 from '../assets/images/community/hero2.jpg'
import hero3 from '../assets/images/community/hero3.jpg'
import school1 from '../assets/images/community/school1.jpg'
import school2 from '../assets/images/community/school2.jpg'
import school3 from '../assets/images/community/school3.jpg'
import police1 from '../assets/images/community/police1.jpeg'
import police2 from '../assets/images/community/police2.jpeg'
import fire1   from '../assets/images/community/fire1.jpeg'
import santa1  from '../assets/images/community/santa1.jpg'
import santa2  from '../assets/images/community/santa2.jpg'
import employee1   from '../assets/images/community/employee1.jpg'
import employee2   from '../assets/images/community/employee2.jpg'
import employee3   from '../assets/images/community/employee3.jpg'
import event1  from '../assets/images/community/event1.jpg'
import event2  from '../assets/images/community/event2.jpg'
import event3  from '../assets/images/community/event3.jpg'
import foundation1 from '../assets/images/community/foundation1.jpg'

function FloatingCard({ img, height = 320, rotate = 0, onClick, compact = false }) {
  const isMobile = useIsMobile()
  const tiny = isMobile && compact // only the phone hero collage uses this

  return (
    <motion.div
      whileHover={isMobile ? undefined : { y: -12, scale: 1.04, rotate: rotate + 1 }}
      whileTap={isMobile ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.45 }}
      onClick={onClick}
      style={{
        height, borderRadius: tiny ? 10 : isMobile ? 18 : 30, overflow: 'hidden', position: 'relative', flex: 1, minWidth: 0,
        transform: `rotate(${rotate}deg)`,
        boxShadow: tiny ? '0 8px 20px rgba(0,0,0,0.14)' : isMobile ? '0 14px 36px rgba(0,0,0,0.16)' : '0 30px 80px rgba(0,0,0,0.16)',
        border: tiny ? '2px solid rgba(255,255,255,0.85)' : isMobile ? '3px solid rgba(255,255,255,0.8)' : '5px solid rgba(255,255,255,0.7)',
        // backdrop blur on many cards makes scrolling laggy on phones (esp. Android), so it's PC-only
        backdropFilter: isMobile ? undefined : 'blur(12px)',
        cursor: 'zoom-in',
      }}>
      <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }} />
    </motion.div>
  )
}

function StorySection({ eyebrow, title, titleLine2, desc, images, reverse = false, bg, onImageClick }) {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '4.5rem 1.5rem' : '9rem 5rem', position: 'relative', overflow: 'hidden', background: bg }}>
      <div style={{ position: 'absolute', width: isMobile ? 300 : 500, height: isMobile ? 300 : 500, borderRadius: '50%', background: 'rgba(232,101,10,0.06)', filter: 'blur(120px)', top: '-10%', left: reverse ? 'auto' : '-10%', right: reverse ? '-10%' : 'auto', opacity: 0.8 }} />
      <div style={{ position: 'absolute', width: isMobile ? 260 : 420, height: isMobile ? 260 : 420, borderRadius: '50%', background: 'rgba(212,24,108,0.05)', filter: 'blur(120px)', bottom: '-10%', right: reverse ? 'auto' : '-10%', left: reverse ? '-10%' : 'auto', opacity: 0.7 }} />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2.5rem' : '5rem', alignItems: 'center', position: 'relative', zIndex: 5 }}>

        {/* IMAGES — PC: side collage (unchanged) · Phone: smaller collage below the text */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ order: isMobile ? 2 : (reverse ? 2 : 1), position: 'relative', height: isMobile ? 400 : 650 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '65%', zIndex: 3 }}>
            <FloatingCard img={images[0]} height={isMobile ? 210 : 350} rotate={-6} onClick={() => onImageClick(images[0])} />
          </div>
          <div style={{ position: 'absolute', top: isMobile ? 80 : 120, right: 0, width: '55%', zIndex: 2 }}>
            <FloatingCard img={images[1]} height={isMobile ? 170 : 280} rotate={5} onClick={() => onImageClick(images[1])} />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: '18%', width: '58%', zIndex: 4 }}>
            <FloatingCard img={images[2]} height={isMobile ? 190 : 320} rotate={-2} onClick={() => onImageClick(images[2])} />
          </div>
        </motion.div>

        {/* TEXT — always on top on phone */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ order: isMobile ? 1 : (reverse ? 1 : 2), position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: isMobile ? 16 : 20 }}>
            <div style={{ width: isMobile ? 30 : 42, height: 3, borderRadius: 999, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
            <span style={{ fontSize: isMobile ? '0.62rem' : '0.72rem', letterSpacing: isMobile ? '0.26em' : '0.32em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 800 }}>{eyebrow}</span>
          </div>
          <h2 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(2.1rem, 9.5vw, 2.8rem)' : 'clamp(3rem, 5vw, 5.5rem)', lineHeight: isMobile ? 1 : 0.94, color: '#1A1208', marginBottom: isMobile ? '1.2rem' : '1.6rem' }}>
            {title}<br />
            <em style={{
              fontStyle: 'italic', display: 'inline-block',
              paddingRight: isMobile ? '0.06em' : undefined,
              background: 'linear-gradient(135deg, #E8650A, #D4186C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{titleLine2}</em>
          </h2>
          <p style={{ fontSize: isMobile ? '0.98rem' : '1rem', lineHeight: isMobile ? 1.8 : 2, color: isMobile ? 'rgba(42,30,16,0.75)' : 'rgba(42,30,16,0.7)', fontWeight: 300, maxWidth: 560 }}>{desc}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Community() {
  const [lightboxImg, setLightboxImg] = useState(null)
  const isMobile = useIsMobile()

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ background: '#F3EDE3', overflow: 'hidden', paddingTop: isMobile ? 104 : 72 }}>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.96)', cursor: 'zoom-out' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}>
            <motion.img src={lightboxImg} alt=""
              style={{ maxWidth: isMobile ? '94vw' : '88vw', maxHeight: isMobile ? '78dvh' : '88vh', objectFit: 'contain', borderRadius: isMobile ? 8 : 12, boxShadow: '0 40px 120px rgba(0,0,0,0.5)' }}
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()} />
            <div style={{ position: 'absolute', top: isMobile ? 'calc(20px + env(safe-area-inset-top, 0px))' : 28, right: isMobile ? 20 : 36, fontSize: isMobile ? '0.65rem' : '0.44rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: isMobile ? 'rgba(250,247,242,0.6)' : 'rgba(250,247,242,0.35)', cursor: 'pointer', padding: isMobile ? '8px 0' : undefined }}
              onClick={() => setLightboxImg(null)}>{isMobile ? 'Tap to close ✕' : 'ESC to close'}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══ */}
      {/* Text on top, the 8 photos underneath (PC and phone) */}
      <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#F3EDE3' }}>

        {/* Subtle gradient glows — no emojis */}
        <div style={{ position: 'absolute', width: isMobile ? 320 : 600, height: isMobile ? 320 : 600, borderRadius: '50%', background: 'rgba(232,101,10,0.08)', filter: 'blur(120px)', top: '-10%', left: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: isMobile ? 280 : 500, height: isMobile ? 280 : 500, borderRadius: '50%', background: 'rgba(212,24,108,0.07)', filter: 'blur(120px)', bottom: '-10%', right: '-5%', pointerEvents: 'none' }} />

        {/* Collage — sits below the heading. Phone: all 8 photos fit as 2 rows of 4 */}
        <div style={{ position: 'relative', zIndex: 5, padding: isMobile ? '0 0.9rem 3rem' : '1.5rem 2rem 7rem' }}>
          <div style={isMobile
            ? { display: 'flex', gap: 8, marginBottom: 12, transform: 'rotate(-2deg)' }
            : { display: 'flex', gap: 22, marginBottom: 24, transform: 'rotate(-2deg)' }}>
            <FloatingCard compact img={hero1}     height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(hero1)} />
            <FloatingCard compact img={school1}   height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(school1)} />
            <FloatingCard compact img={police1}   height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(police1)} />
            <FloatingCard compact img={hero2}     height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(hero2)} />
          </div>
          <div style={isMobile
            ? { display: 'flex', gap: 8, transform: 'rotate(2deg)' }
            : { display: 'flex', gap: 22, transform: 'rotate(2deg)' }}>
            <FloatingCard compact img={event1}    height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(event1)} />
            <FloatingCard compact img={employee1} height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(employee1)} />
            <FloatingCard compact img={fire1}     height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(fire1)} />
            <FloatingCard compact img={hero3}     height={isMobile ? 'min(32vw, 150px)' : 320} onClick={() => setLightboxImg(hero3)} />
          </div>
        </div>

        {/* Heading — placed ABOVE the photos (order: -1 moves it to the top of the column) */}
        <div style={{
          position: 'relative', order: -1, zIndex: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          padding: isMobile ? '3rem 1.25rem 2.2rem' : '6rem 2rem 2.5rem',
          width: '100%', boxSizing: 'border-box',
        }}>
          <div>
            <motion.div style={{ marginBottom: isMobile ? 12 : 22, fontSize: isMobile ? '0.62rem' : '0.78rem', letterSpacing: isMobile ? '0.28em' : '0.34em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 800 }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              ZSC COMMUNITY
            </motion.div>
            <motion.h1 className="font-playfair font-black"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
              style={{ fontSize: isMobile ? 'clamp(1.9rem, 9vw, 2.6rem)' : 'clamp(4rem, 10vw, 9rem)', lineHeight: isMobile ? 0.98 : 0.88, marginBottom: isMobile ? 0 : '1.5rem', color: '#1A1208' }}>
              WE SHOW UP<br />
            <em style={{
    fontStyle: 'italic',
    background: 'linear-gradient(90deg, #E8650A, #D4186C)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    paddingRight: isMobile ? '0.06em' : undefined,
  }}>FOR OUR PEOPLE.</em>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ══ STORY SECTIONS ══ */}
      <StorySection
        eyebrow="Schools & Students"
        title="Fueling Students,"
        titleLine2="Teachers & Families."
        desc="From Teacher Appreciation Week to marching band support and Back-2-School events, we love showing up for students, teachers, and families across every community we serve."
        images={[school1, school2, school3]}
        bg="#F3EDE3"
        onImageClick={setLightboxImg}
      />

      <StorySection
        eyebrow="First Responders"
        title="Serving Those Who"
        titleLine2="Serve Everyone Else."
        desc="Whether it's police departments, firefighters, or local frontline heroes, we are proud to support the people who keep our communities safe every single day."
        images={[police1, police2, fire1]}
        reverse={true}
        bg="#FAF7F2"
        onImageClick={setLightboxImg}
      />

      {/* ══ QUOTE ══ */}
      <section style={{ position: 'relative', padding: isMobile ? '5rem 1.5rem' : '9rem 2rem', overflow: 'hidden', textAlign: 'center', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.h2 className="font-playfair font-black"
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ fontSize: isMobile ? 'clamp(1.7rem, 7.5vw, 2.3rem)' : 'clamp(2.7rem, 5vw, 5.5rem)', lineHeight: isMobile ? 1.12 : 1.02, color: '#fff', position: 'relative', zIndex: 5, maxWidth: 900, margin: '0 auto' }}>
          "Community isn't part<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.75)' }}>of our business.</em>
          <br />It's the reason we exist."
        </motion.h2>
        <motion.p style={{ marginTop: isMobile ? '1.5rem' : '2rem', fontSize: isMobile ? '0.6rem' : '0.46rem', letterSpacing: isMobile ? '0.26em' : '0.32em', textTransform: 'uppercase', color: isMobile ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 5 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
          ZSC Enterprises · Atlanta, Georgia
        </motion.p>
      </section>

      <StorySection
        eyebrow="Events & Celebrations"
        title="Moments That Bring"
        titleLine2="Communities Together."
        desc="From Taste of Henry to holiday events and Dunkin' refreshment pop-ups, we love creating experiences that bring smiles, laughter, joy, and connection."
        images={[event1, event2, santa1]}
        bg="#F3EDE3"
        onImageClick={setLightboxImg}
      />
{/* ══ FINAL GRID + CTA ══ */}
<section style={{ position: 'relative', padding: isMobile ? '0 1rem 4rem' : '0 3rem 6rem', overflow: 'hidden', background: '#F3EDE3' }}>
  <div style={{ position: 'absolute', width: isMobile ? 260 : 400, height: isMobile ? 260 : 400, borderRadius: '50%', background: 'rgba(232,101,10,0.06)', filter: 'blur(100px)', top: '10%', left: '10%', pointerEvents: 'none' }} />
  <div style={{ position: 'absolute', width: isMobile ? 260 : 400, height: isMobile ? 260 : 400, borderRadius: '50%', background: 'rgba(212,24,108,0.05)', filter: 'blur(100px)', bottom: '10%', right: '10%', pointerEvents: 'none' }} />

  {/* CTA */}
  <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: isMobile ? '3.5rem 0.5rem 2.5rem' : '5rem 3rem 3rem' }}>
    <h2 className="font-playfair font-black" style={{ fontSize: isMobile ? 'clamp(2.2rem, 10vw, 3rem)' : 'clamp(3rem, 6vw, 6.5rem)', lineHeight: isMobile ? 1 : 0.94, color: '#1A1208', marginBottom: isMobile ? '1.2rem' : '1.5rem' }}>
      Together, we make<br />
      <em style={{
        fontStyle: 'italic', display: 'inline-block',
        paddingRight: isMobile ? '0.06em' : undefined,
        background: 'linear-gradient(135deg, #E8650A, #D4186C)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>a difference.</em>
    </h2>
    <p style={{ maxWidth: 780, margin: '0 auto', fontSize: isMobile ? '0.98rem' : '1rem', lineHeight: isMobile ? 1.8 : 2, color: 'rgba(42,30,16,0.72)', fontWeight: 300 }}>
      Every event, every donation, every classroom, and every smile is part of a bigger story — one built through people, partnerships, and community.
    </p>
  </div>

  {/* Grid — PC: 4 across (unchanged) · Phone: 2 across */}
  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20, position: 'relative', zIndex: 5 }}>
    {[employee1, employee2, employee3, santa2, foundation1, event3, school2, hero3].map((img, i) => (
      <FloatingCard key={i} img={img}
        height={isMobile ? 170 + (i % 2) * 40 : 260 + (i % 2) * 70}
        rotate={i % 2 === 0 ? -2 : 2}
        onClick={() => setLightboxImg(img)} />
    ))}
  </div>
</section>

      <Footer />
    </motion.div>
  )
}