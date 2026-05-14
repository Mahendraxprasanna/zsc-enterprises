import { motion } from 'framer-motion'
import Footer from '../components/Footer'

const pillars = [
  { icon: '🏫', title: 'Local Schools', desc: 'Supporting education in the Atlanta metro through fundraising drives, donations, and community partnerships that put students first.' },
  { icon: '🚒', title: 'Frontline Workers', desc: 'Showing appreciation for the first responders and frontline heroes who keep our communities safe — every single day.' },
  { icon: '🤝', title: 'Fundraising Events', desc: 'Hosting and participating in community fundraising events that bring people together and create lasting positive impact.' },
]

export default function Community() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: 68 }}
    >
      {/* ── HERO ── */}
      <section className="px-[4.5rem] py-24 relative overflow-hidden" style={{ background: '#1A1208' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(212,24,108,0.07) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-[1px]" style={{ background: '#E8650A' }} />
            <span className="text-[0.52rem] tracking-[0.3em] uppercase text-[#E8650A] font-medium">Community Engagement</span>
          </div>
          <h1 className="font-playfair font-black text-[#FAF7F2] leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Committed to Our <em className="grad-text">Community.</em>
          </h1>
          <p className="text-[0.88rem] leading-[1.8] font-light" style={{ color: 'rgba(250,247,242,0.5)', maxWidth: 560 }}>
            At ZSC Enterprises, our passion extends beyond serving great coffee, ice cream and smoothies —
            we are dedicated to making a positive impact in the communities we call home.
          </p>
        </div>
      </section>

      {/* ── COMMITMENT ── */}
      <motion.section
        className="px-[4.5rem] py-20"
        style={{ background: '#FAF7F2', borderTop: '1px solid rgba(42,30,16,0.1)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-[1px]" style={{ background: '#E8650A' }} />
          <span className="text-[0.52rem] tracking-[0.3em] uppercase text-[#E8650A] font-medium">Our Commitment</span>
        </div>
        <p className="text-[0.9rem] leading-[1.9] font-light text-[rgba(42,30,16,0.65)]" style={{ maxWidth: 820 }}>
          Since our founding in 2016, we have prioritized building strong relationships with local organizations,
          schools, first responders, and charitable initiatives to support and uplift those around us.
          Whether it's hosting fundraising events, supporting local schools, or showing appreciation for
          frontline workers, we believe in giving back to the people who make our communities thrive.
        </p>
      </motion.section>

      {/* ── PILLARS ── */}
      <section className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(42,30,16,0.1)' }}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            className="px-12 py-16 transition-colors duration-200"
            style={{
              borderRight: i < pillars.length - 1 ? '1px solid rgba(42,30,16,0.1)' : 'none',
              background: '#FAF7F2',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ background: '#F3EDE3' }}
          >
            <div className="w-11 h-11 flex items-center justify-center grad-bg mb-6 text-xl">
              {p.icon}
            </div>
            <h3 className="font-playfair font-bold text-[1.2rem] text-[#1A1208] mb-3">{p.title}</h3>
            <p className="text-[0.8rem] leading-[1.8] text-[rgba(42,30,16,0.6)] font-light">{p.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ── VIDEO ── */}
      <section className="px-[4.5rem] py-20" style={{ background: '#F3EDE3', borderTop: '1px solid rgba(42,30,16,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-[1px]" style={{ background: '#E8650A' }} />
          <span className="text-[0.52rem] tracking-[0.3em] uppercase text-[#E8650A] font-medium">See It in Action</span>
        </div>
        <h2 className="font-playfair font-black text-[#1A1208] mb-8"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
          Our Community Story
        </h2>
        <div className="relative mx-auto overflow-hidden"
          style={{ maxWidth: 860, aspectRatio: '16/9', background: '#1A1208' }}>
          <iframe
            src="https://player.vimeo.com/video/1052837780?badge=0&autopause=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="ZSC Community Engagement"
            className="absolute inset-0 w-full h-full border-none"
          />
        </div>
      </section>

      {/* ── TAGLINE ── */}
      <section className="px-[4.5rem] py-20 text-center"
        style={{ background: '#EDE5D8', borderTop: '1px solid rgba(42,30,16,0.1)' }}>
        <p className="font-playfair font-black text-[#1A1208]"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          "Together, we make <em className="grad-text">a difference!</em>"
        </p>
        <div className="mt-4 text-[0.5rem] tracking-[0.3em] uppercase text-[rgba(42,30,16,0.35)]">
          ZSC Enterprises · Atlanta, Georgia
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
