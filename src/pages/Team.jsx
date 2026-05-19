import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

import shamsPhoto     from '../assets/images/meet our team/sams.webp'
import markPhoto      from '../assets/images/meet our team/mark.webp'
import rakibPhoto     from '../assets/images/meet our team/rakib.webp'
import arslanPhoto    from '../assets/images/meet our team/arslan.webp'
import hemPhoto       from '../assets/images/meet our team/hema.webp'
import blakePhoto     from '../assets/images/meet our team/blake.webp'
import rajPhoto       from '../assets/images/meet our team/raj.webp'
import michellePhoto  from '../assets/images/meet our team/michelle.webp'
import elidaPhoto     from '../assets/images/meet our team/elida.webp'
import rajendraPhoto  from '../assets/images/meet our team/rajendra.webp'
import shahzadPhoto   from '../assets/images/meet our team/shahzad.webp'
import ajenePhoto     from '../assets/images/meet our team/ajene.webp'
import ambrinPhoto    from '../assets/images/meet our team/ambrin.webp'
import sabitaPhoto    from '../assets/images/meet our team/sabita.webp'
import shirleyPhoto   from '../assets/images/meet our team/shirley.webp'
import bilalPhoto     from '../assets/images/meet our team/bilal.webp'
import shaheryarPhoto from '../assets/images/meet our team/shah.webp'
import tahirPhoto     from '../assets/images/meet our team/tahir.webp'

// ── TEAM DATA ─────────────────────────────────────────────
const TEAM = [
  {
    name: 'Shams Charania',
    title: 'Managing Partner',
    photo: shamsPhoto,
    bio: "Shams' QSR journey started when his parents immigrated to Atlanta, Georgia in 1999. At 14 years old and still in high school, he went to work at a Popeyes in Gainesville, GA on the weekends. Slowly but surely, Shams learned every aspect of store operations and was soon named Manager of that franchise, running the restaurant on weekends in the owner's absence. After graduating from Georgia State University with an accounting degree and completing an internship at PricewaterhouseCoopers, Shams walked away from corporate America. In 2007, he acquired his first three Dunkin' locations and never looked back.",
  },
  {
    name: 'Mark Seibert',
    title: 'Senior Director of Operations',
    photo: markPhoto,
    bio: "Mark began his restaurant career in Birmingham, Alabama in the early '80s while attending UAB. His passion for quality food, people development, and customer experience led him to roles as Owner-Operator of Ragtime Café, Joint Venture Partner with Panera Bread, and later into the QSR industry with Dunkin'. Mark brings decades of operational mastery and a people-first leadership philosophy to ZSC Enterprises.",
  },
  {
    name: 'Rakib Hasan',
    title: 'Director of Operations',
    photo: rakibPhoto,
    bio: "Rakib embodies ZSC's growth-from-within culture, starting as a crew member in 2011 after moving to the U.S. He previously served as Senior Executive, Business Assurance & HR at Telenor, a global telecom leader. With expertise in sales, operations, business development, and finance, he excels in driving results in diverse and fast-paced environments.",
  },
  {
    name: 'Arslan Khan',
    title: 'Director of Operations',
    photo: arslanPhoto,
    bio: "Arslan exemplifies ZSC's culture of recognizing and promoting talent. Starting as a crew member at 17 in 2010, he rose to Director of Operations in under 10 years. Having held every restaurant position, he knows what it takes to run a successful QSR network. A mentor to many, Arslan is known for turning around restaurants and building strong, motivated teams.",
  },
  {
    name: 'Hemalatha Arunachalam',
    title: 'Accounting & Finance Officer, CPA',
    photo: hemPhoto,
    bio: "Hemalatha was born and raised in India, where her passion for commerce, business, and finance laid the foundation for an impressive academic and professional journey. She earned her Bachelor's, Master's, and Doctorate in Commerce while balancing family life and developing a keen interest in how financial systems drive business success. She brings deep expertise in accounting, financial reporting, and compliance to ZSC Enterprises.",
  },
  {
    name: 'Blake Lairsey',
    title: 'Marketing & Communications Director',
    photo: blakePhoto,
    bio: null,
  },
  {
    name: 'Raj Dhanani',
    title: 'Partner — Development & Construction',
    photo: rajPhoto,
    bio: null,
  },
  {
    name: 'Michelle May',
    title: 'Recruiting / HR',
    photo: michellePhoto,
    bio: null,
  },
  {
    name: 'Elida Schmittou',
    title: 'Office Manager',
    photo: elidaPhoto,
    bio: null,
  },
  {
    name: 'Rajendra Atluri',
    title: 'AP Specialist',
    photo: rajendraPhoto,
    bio: null,
  },
  {
    name: 'Shahzad Ajanee',
    title: 'Above Restaurant Leader',
    photo: shahzadPhoto,
    bio: null,
  },
  {
    name: 'Ajene Alleyne',
    title: 'Above Restaurant Leader',
    photo: ajenePhoto,
    bio: null,
  },
  {
    name: 'Ambrin Firdaus',
    title: 'Above Restaurant Leader',
    photo: ambrinPhoto,
    bio: null,
  },
  {
    name: 'Sabita Gurung',
    title: 'Above Restaurant Leader',
    photo: sabitaPhoto,
    bio: null,
  },
  {
    name: 'Shirley Hyde',
    title: 'Above Restaurant Leader',
    photo: shirleyPhoto,
    bio: null,
  },
  {
    name: 'Bilal Khan',
    title: 'Above Restaurant Leader',
    photo: bilalPhoto,
    bio: null,
  },
  {
    name: 'Shaheryar Khan',
    title: 'Above Restaurant Leader',
    photo: shaheryarPhoto,
    bio: null,
  },
  {
    name: 'Mohammad Tahir',
    title: 'Above Restaurant Leader',
    photo: tahirPhoto,
    bio: null,
  },
]

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

// ── MEMBER POPUP ──────────────────────────────────────────
function MemberPopup({ member, onClose }) {
  useEffect(() => {
    if (member) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [member])

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)',
            padding: '0 0 0 0',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            style={{
              width: '100%',
              maxWidth: '100vw',
              background: '#F3EDE3',
              borderRadius: '0 0 24px 24px',
              overflow: 'hidden',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
            initial={{ y: '-100%' }}
animate={{ y: 0 }}
exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={e => e.stopPropagation()}
          >
            {member.bio ? (
              /* ── EXTENDED BIO LAYOUT ── */
              <div>
                {/* Top gradient accent */}
                <div style={{ height: 4, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', minHeight: 420 }}>
                  {/* Left — photo */}
                  <div style={{ position: 'relative', overflow: 'hidden', background: '#1A1208' }}>
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} style={{
                        width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                        display: 'block',
                      }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #E8650A, #D4186C)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '2rem', color: '#fff' }}>{getInitials(member.name)}</span>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay on photo */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #F3EDE3 100%)' }} />
                  </div>

                  {/* Right — info */}
                  <div style={{ padding: '3rem 3rem 3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {/* Eyebrow */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 16, height: 1, background: '#E8650A' }} />
                      <span style={{ fontSize: '0.46rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600 }}>ZSC Enterprises</span>
                    </div>

                    {/* Name */}
                    <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.0, marginBottom: 6, color: '#1A1208' }}>
                      {member.name.split(' ')[0]}<br />
                      <em style={{
                        fontStyle: 'italic',
                        background: 'linear-gradient(135deg, #E8650A, #D4186C)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>{member.name.split(' ').slice(1).join(' ')}</em>
                    </h2>

                    {/* Title */}
                    <div style={{
                      fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600,
                      color: 'rgba(42,30,16,0.4)', marginBottom: '1.5rem',
                      paddingBottom: '1.5rem', borderBottom: '0.5px solid rgba(42,30,16,0.1)',
                    }}>{member.title}</div>

                    {/* Bio */}
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.9, color: 'rgba(42,30,16,0.65)', fontWeight: 300, maxWidth: 540 }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* ── SIMPLE POPUP for no-bio members ── */
              <div>
                <div style={{ height: 4, background: 'linear-gradient(90deg, #E8650A, #D4186C)' }} />
                <div style={{ padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  {/* Small photo */}
                  <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#E8DDD0' }}>
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #E8650A, #D4186C)' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>{getInitials(member.name)}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-playfair font-black" style={{ fontSize: '1.8rem', color: '#1A1208', lineHeight: 1.1, marginBottom: 6 }}>
                      {member.name}
                    </h3>
                    <div style={{
                      fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600,
                      background: 'linear-gradient(135deg, #E8650A, #D4186C)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{member.title}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <button onClick={onClose} style={{
                      background: 'none', border: '0.5px solid rgba(42,30,16,0.2)',
                      width: 40, height: 40, cursor: 'pointer', fontSize: '1rem',
                      color: 'rgba(42,30,16,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8,
                    }}>✕</button>
                  </div>
                </div>
              </div>
            )}

            {/* Close bar for bio popups */}
            {member.bio && (
              <div style={{
                padding: '1rem 3rem', background: 'rgba(42,30,16,0.03)',
                borderTop: '0.5px solid rgba(42,30,16,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.44rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(42,30,16,0.3)' }}>
                  Click outside to close
                </span>
                <button onClick={onClose} style={{
                  background: 'linear-gradient(135deg, #E8650A, #D4186C)',
                  border: 'none', color: '#fff', padding: '0.5rem 1.5rem',
                  fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  cursor: 'pointer', fontWeight: 600, borderRadius: 6,
                }}>Close</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── PORTRAIT CARD (marquee) ───────────────────────────────
function PortraitCard({ member, halfCut = false, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'relative',
        width: halfCut ? 200 : 220,
        height: halfCut ? 140 : 290,
        borderRadius: 20,
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'pointer',
        background: '#E8DDD0',
      }}
    >
      {member.photo ? (
        <>
          <img src={member.photo} alt={member.name} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            filter: 'grayscale(100%) brightness(0.9)',
            transition: 'opacity 0.5s ease',
            opacity: hovered ? 0 : 1,
          }} />
          <img src={member.photo} alt={member.name} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            transition: 'opacity 0.5s ease',
            opacity: hovered ? 1 : 0,
          }} />
        </>
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'linear-gradient(145deg, #E8DDD0, #D4C8B8)' : 'linear-gradient(145deg, #E0D5C5, #C8BBA8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8,
          transition: 'background 0.4s ease',
        }}>
          <div style={{
            width: halfCut ? 48 : 68, height: halfCut ? 48 : 68, borderRadius: '50%',
            background: hovered ? 'linear-gradient(135deg, #E8650A, #D4186C)' : 'rgba(42,30,16,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.4s ease',
          }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900,
              fontSize: halfCut ? '1rem' : '1.4rem',
              color: hovered ? '#fff' : 'rgba(42,30,16,0.5)', transition: 'color 0.3s ease',
            }}>{getInitials(member.name)}</span>
          </div>
        </div>
      )}

      {!halfCut && (
        <>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, padding: '1rem',
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            opacity: hovered ? 1 : 0,
            transition: 'transform 0.35s ease, opacity 0.35s ease',
          }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '0.88rem', color: '#FAF7F2', lineHeight: 1.2, marginBottom: 4 }}>{member.name}</div>
            <div style={{
              fontSize: '0.4rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500,
              background: 'linear-gradient(135deg, #E8650A, #D4186C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{member.title}</div>
          </div>
        </>
      )}
    </motion.div>
  )
}

// ── MARQUEE ROW ───────────────────────────────────────────
function MarqueeRow({ members, direction = 1, speed = 40, halfCut = false, onCardClick }) {
  const items = [...members, ...members, ...members, ...members]
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <motion.div
        style={{ display: 'flex', gap: 12, width: 'max-content' }}
        animate={{ x: direction > 0 ? ['0%', '-25%'] : ['-25%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      >
        {items.map((member, i) => (
          <PortraitCard
            key={`${member.name}-${i}`}
            member={member}
            halfCut={halfCut}
            onClick={() => onCardClick(member)}
          />
        ))}
      </motion.div>
    </div>
  )
}

// ── STATIC GRID CARD ──────────────────────────────────────
function StaticCard({ member, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        aspectRatio: '3/4', background: '#E8DDD0', cursor: 'pointer',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.03 }}
    >
      {member.photo ? (
        <>
          <img src={member.photo} alt={member.name} style={{
  position: 'absolute', inset: 0, width: '100%', height: '100%',
  objectFit: 'cover', objectPosition: 'center top',
  transition: 'transform 0.5s ease',
  transform: hovered ? 'scale(1.05)' : 'scale(1)',
}} />
        </>
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'linear-gradient(145deg, #e0d5c5, #ccc0aa)' : 'linear-gradient(145deg, #E8DDD0, #D4C8B8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10,
          transition: 'background 0.5s ease',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: hovered ? 'linear-gradient(135deg, #E8650A, #D4186C)' : 'rgba(42,30,16,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.4s ease',
            boxShadow: hovered ? '0 8px 24px rgba(232,101,10,0.4)' : 'none',
          }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: '1.2rem',
              color: hovered ? '#fff' : 'rgba(42,30,16,0.4)', transition: 'color 0.3s ease',
            }}>{getInitials(member.name)}</span>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease',
      }} />

      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 3,
        background: 'linear-gradient(90deg, #E8650A, #D4186C)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 0.4s ease', borderRadius: '20px 20px 0 0',
      }} />

      {/* Name + title */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4, padding: '1rem',
        transform: hovered ? 'translateY(0)' : 'translateY(8px)',
        opacity: hovered ? 1 : 0,
        transition: 'transform 0.35s ease, opacity 0.35s ease',
      }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700,
          fontSize: '0.88rem', color: '#FAF7F2', lineHeight: 1.2, marginBottom: 4,
        }}>{member.name}</div>
        <div style={{
          fontSize: '0.4rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
          background: 'linear-gradient(135deg, #E8650A, #D4186C)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>{member.title}</div>
        {member.bio && (
          <div style={{
            marginTop: 6, fontSize: '0.42rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.5)', fontWeight: 400,
          }}>Tap to read more →</div>
        )}
      </div>
    </motion.div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────
export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null)

  const row1 = TEAM.slice(0, 9)
  const row2 = TEAM.slice(4, 13)
  const row3 = TEAM.slice(8, 17)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      style={{ paddingTop: 72, background: '#F3EDE3' }}
    >

      {/* Member popup */}
      <MemberPopup member={selectedMember} onClose={() => setSelectedMember(null)} />

      {/* ══════════════════════════════════════
          HERO — marquee with gradient text overlay
      ══════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#F3EDE3', paddingBottom: '3rem' }}>

        {/* Half-cut top row */}
        <div style={{ marginBottom: 12 }}>
          <MarqueeRow members={row1} direction={1} speed={38} halfCut={true} onCardClick={setSelectedMember} />
        </div>

        {/* Full rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <MarqueeRow members={row2} direction={-1} speed={42} onCardClick={setSelectedMember} />
          <MarqueeRow members={row3} direction={1} speed={36} onCardClick={setSelectedMember} />
        </div>

        {/* Giant gradient text overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 20,
        }}>
          <motion.h1
            className="font-playfair font-black"
            style={{
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              lineHeight: 0.88, letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              userSelect: 'none', textAlign: 'center',
              filter: 'drop-shadow(0 4px 24px rgba(232,101,10,0.18))',
            }}
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'drop-shadow(0 4px 24px rgba(232,101,10,0.18))' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Meet Our<br />
            <em style={{ fontStyle: 'italic' }}>Team.</em>
          </motion.h1>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to top, #F3EDE3, transparent)',
          zIndex: 10, pointerEvents: 'none',
        }} />
      </section>

<section style={{
  padding: '4rem 5rem',
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
  background: 'linear-gradient(135deg, #E8650A 0%, #D4186C 100%)',
}}>
  <motion.div
    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.7 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.5)' }} />
      <span style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>ZSC Enterprises</span>
    </div>
    <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#fff', lineHeight: 1.05 }}>
      The People Who<br />
      <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.75)' }}>Make It Happen.</em>
    </h2>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
    <p style={{ fontSize: '0.9rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontWeight: 300, marginBottom: '2rem' }}>
      18 operators, leaders, and builders running 45+ locations across Atlanta. Every one of them shows up every single day with an uncompromising standard of excellence.
    </p>
    <div style={{ display: 'flex', gap: '3rem' }}>
      {[{ n: '18', l: 'Team Members' }, { n: '45+', l: 'Locations' }, { n: '3', l: 'Brands' }].map(s => (
        <div key={s.l}>
          <div className="font-playfair font-black" style={{
            fontSize: '2rem', lineHeight: 1, marginBottom: 4,
            color: '#fff',
          }}>{s.n}</div>
          <div style={{ fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{s.l}</div>
        </div>
      ))}
    </div>
  </motion.div>
</section>

      {/* ══════════════════════════════════════
          FULL TEAM GRID — fully coloured
      ══════════════════════════════════════ */}
      <section style={{ padding: '5rem', background: '#F3EDE3' }}>

        {/* Leadership */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
  <h2 className="font-playfair font-black" style={{
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    lineHeight: 1,
    background: 'linear-gradient(135deg, #E8650A, #D4186C)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    marginBottom: 10,
  }}>Leadership &amp; Operations</h2>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
    <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4186C' }} />
    <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
  </div>
</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {TEAM.slice(0, 10).map((m, i) => (
              <StaticCard key={m.name} member={m} index={i} onClick={() => setSelectedMember(m)} />
            ))}
          </div>
        </div>

        {/* ARLs */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
  <h2 className="font-playfair font-black" style={{
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    lineHeight: 1,
    background: 'linear-gradient(135deg, #E8650A, #D4186C)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    marginBottom: 10,
  }}>Above Restaurant Leaders</h2>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
    <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #E8650A)' }} />
    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4186C' }} />
    <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #D4186C, transparent)' }} />
  </div>
</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {TEAM.slice(10).map((m, i) => (
              <StaticCard key={m.name} member={m} index={i} onClick={() => setSelectedMember(m)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOIN CTA
      ══════════════════════════════════════ */}
      <section style={{
        padding: '7rem 5rem', background: '#1A1208',
        display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(232,101,10,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <motion.div style={{ position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 20, height: 1, background: '#E8650A' }} />
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8650A', fontWeight: 600 }}>Join The Team</span>
          </div>
          <h2 className="font-playfair font-black" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#FAF7F2', lineHeight: 1.0, marginBottom: 12 }}>
            Ready to Build<br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #E8650A, #D4186C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Something Great?</em>
          </h2>
          <p style={{ fontSize: '0.86rem', lineHeight: 1.85, color: 'rgba(250,247,242,0.45)', fontWeight: 300, maxWidth: 420 }}>
            We're always looking for driven people who share our values. Come grow with us.
          </p>
        </motion.div>

        <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
            style={{
              background: 'linear-gradient(135deg, #E8650A, #D4186C)', color: '#fff',
              textDecoration: 'none', padding: '0.9rem 2.5rem', fontSize: '0.6rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
              whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(232,101,10,0.25)',
            }}>
            Explore Opportunities
          </a>
          <Link to="/contact" style={{
            textAlign: 'center', fontSize: '0.48rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', textDecoration: 'none',
          }}>
            Get in Touch →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </motion.div>
  )
}