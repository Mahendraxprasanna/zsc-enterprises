import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Footer from '../components/Footer'

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

function FloatingCard({ img, height = 320, rotate = 0, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.04, rotate: rotate + 1 }}
      transition={{ duration: 0.45 }}
      onClick={onClick}
      style={{
        height, borderRadius: 30, overflow: 'hidden', position: 'relative', flex: 1,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.16)',
        border: '5px solid rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        cursor: 'zoom-in',
      }}>
      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }} />
    </motion.div>
  )
}

function StorySection({ eyebrow, title, titleLine2, desc, images, reverse = false, bg, onImageClick }) {
  return (
    <section style={{ padding: '9rem 5rem', position: 'relative', overflow: 'hidden', background: bg }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(232,101,10,0.06)', filter: 'blur(120px)', top: '-10%', left: reverse ? 'auto' : '-10%', right: reverse ? '-10%' : 'auto', opacity: 0.8 }} />
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'rgba(212,24,108,0.05)', filter: 'blur(120px)', bottom: '-10%', right: reverse ? 'auto' : '-10%', left: reverse ? '-10%' : 'auto', opacity: 0.7 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 5 }}>

        {/* IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ order: reverse ? 2 : 1, position: 'relative', height: 650 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '65%', zIndex: 3 }}>
            <FloatingCard img={images[0]} height={350} rotate={-6} onClick={() => onImageClick(images[0])} />
          </div>
          <div style={{ position: 'absolute', top: 120, right: 0, width: '55%', zIndex: 2 }}>
            <FloatingCard img={images[1]} height={280} rotate={5} onClick={() => onImageClick(images[1])} />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: '18%', width: '58%', zIndex: 4 }}>
            <FloatingCard img={images[2]} height={320} rotate={-2} onClick={() => onImageClick(images[2])} />
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ order: reverse ? 1 : 2, position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 42, height: 3, borderRadius: 999, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 800 }}>{eyebrow}</span>
          </div>
          <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)', lineHeight: 0.94, color: '#1A1208', marginBottom: '1.6rem' }}>
            {title}<br />
            <em style={{
              fontStyle: 'italic', display: 'inline-block',
              background: 'linear-gradient(135deg, #E8650A, #D4186C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{titleLine2}</em>
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 2, color: 'rgba(42,30,16,0.7)', fontWeight: 300, maxWidth: 560 }}>{desc}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Community() {
  const [lightboxImg, setLightboxImg] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ background: '#F3EDE3', overflow: 'hidden', paddingTop: 72 }}>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.96)', cursor: 'zoom-out' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}>
            <motion.img src={lightboxImg} alt=""
              style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 40px 120px rgba(0,0,0,0.5)' }}
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()} />
            <div style={{ position: 'absolute', top: 28, right: 36, fontSize: '0.44rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', cursor: 'pointer' }}
              onClick={() => setLightboxImg(null)}>ESC to close</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', minHeight: '125vh', overflow: 'hidden', background: '#F3EDE3' }}>

        {/* Subtle gradient glows — no emojis */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'rgba(232,101,10,0.08)', filter: 'blur(120px)', top: '-10%', left: '-5%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(212,24,108,0.07)', filter: 'blur(120px)', bottom: '-10%', right: '-5%', pointerEvents: 'none' }} />

        {/* Collage */}
        <div style={{ position: 'relative', zIndex: 5, padding: '7rem 2rem' }}>
          <div style={{ display: 'flex', gap: 22, marginBottom: 24, transform: 'rotate(-2deg)' }}>
            <FloatingCard img={hero1}     onClick={() => setLightboxImg(hero1)} />
            <FloatingCard img={school1}   onClick={() => setLightboxImg(school1)} />
            <FloatingCard img={police1}   onClick={() => setLightboxImg(police1)} />
            <FloatingCard img={hero2}     onClick={() => setLightboxImg(hero2)} />
          </div>
          <div style={{ display: 'flex', gap: 22, transform: 'rotate(2deg)' }}>
            <FloatingCard img={event1}    onClick={() => setLightboxImg(event1)} />
            <FloatingCard img={employee1} onClick={() => setLightboxImg(employee1)} />
            <FloatingCard img={fire1}     onClick={() => setLightboxImg(fire1)} />
            <FloatingCard img={hero3}     onClick={() => setLightboxImg(hero3)} />
          </div>
        </div>

        {/* Center text overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 2rem', pointerEvents: 'none' }}>
          <motion.div style={{ marginBottom: 22, fontSize: '0.78rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 800 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            ZSC COMMUNITY
          </motion.div>
          <motion.h1 className="font-playfair font-black"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: 0.88, marginBottom: '1.5rem', color: '#1A1208', textShadow: '0 4px 40px rgba(243,237,227,0.8)' }}>
            WE SHOW UP<br />
            <em style={{
              fontStyle: 'italic', display: 'inline-block',
              background: 'linear-gradient(90deg, #E8650A, #D4186C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>FOR PEOPLE.</em>
          </motion.h1>
        </div>

        {/* Bottom caption */}
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, textAlign: 'center', zIndex: 20, pointerEvents: 'none' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(42,30,16,0.7)', fontWeight: 400, maxWidth: 680, margin: '0 auto', padding: '0 2rem' }}>
            Through schools, local events, first responders, and charitable initiatives — we are proud to serve communities far beyond our storefronts.
          </p>
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
      <section style={{ position: 'relative', padding: '9rem 2rem', overflow: 'hidden', textAlign: 'center', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.h2 className="font-playfair font-black"
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ fontSize: 'clamp(2.7rem, 5vw, 5.5rem)', lineHeight: 1.02, color: '#fff', position: 'relative', zIndex: 5, maxWidth: 900, margin: '0 auto' }}>
          "Community isn't part<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.75)' }}>of our business.</em>
          <br />It's the reason we exist."
        </motion.h2>
        <motion.p style={{ marginTop: '2rem', fontSize: '0.46rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 5 }}
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

      {/* ══ IMPACT STATS ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '9rem 5rem', background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', position: 'relative', zIndex: 5 }}>
          {[
            { n: '400+', l: 'Refreshers Served' },
            { n: '$9K',  l: 'Donated to Operation Lunchbox' },
            { n: '100+', l: 'Families Supported' },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{ padding: '3rem', borderRadius: 32, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.25)', textAlign: 'center' }}>
              <div className="font-playfair font-black" style={{ fontSize: '5rem', lineHeight: 1, marginBottom: 14 }}>{s.n}</div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', opacity: 0.92 }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

{/* ══ FINAL GRID + CTA ══ */}
<section style={{ position: 'relative', padding: '0 3rem 6rem', overflow: 'hidden', background: '#F3EDE3' }}>
  <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(232,101,10,0.06)', filter: 'blur(100px)', top: '10%', left: '10%', pointerEvents: 'none' }} />
  <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(212,24,108,0.05)', filter: 'blur(100px)', bottom: '10%', right: '10%', pointerEvents: 'none' }} />

  {/* CTA */}
  <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '5rem 3rem 3rem' }}>
    <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', lineHeight: 0.94, color: '#1A1208', marginBottom: '1.5rem' }}>
      Together, we make<br />
      <em style={{
        fontStyle: 'italic', display: 'inline-block',
        background: 'linear-gradient(135deg, #E8650A, #D4186C)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>a difference.</em>
    </h2>
    <p style={{ maxWidth: 780, margin: '0 auto', fontSize: '1rem', lineHeight: 2, color: 'rgba(42,30,16,0.72)', fontWeight: 300 }}>
      Every event, every donation, every classroom, and every smile is part of a bigger story — one built through people, partnerships, and community.
    </p>
  </div>

  {/* Grid */}
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, position: 'relative', zIndex: 5 }}>
    {[employee1, employee2, employee3, santa2, foundation1, event3, school2, hero3].map((img, i) => (
      <FloatingCard key={i} img={img} height={260 + (i % 2) * 70} rotate={i % 2 === 0 ? -2 : 2}
        onClick={() => setLightboxImg(img)} />
    ))}
  </div>
</section>

      <Footer />
    </motion.div>
  )
}