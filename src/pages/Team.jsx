import { motion } from 'framer-motion'
import Footer from '../components/Footer'

const featured = [
  {
    name: 'Shams Charania',
    role: 'Managing Partner',
    bio: 'Founder and visionary behind ZSC Enterprises. Chairman of the Board at National DCP ($3B+ co-op). MBA from Georgia Tech. Built ZSC from 3 locations to 50+ across the Atlanta metro.',
  },
  {
    name: 'Mark Seibert',
    role: 'Senior Director of Operations',
    bio: "Started his restaurant career in Birmingham, AL in the early 80s. Owner-Operator of Ragtime Café, Joint Venture Partner with Panera Bread, joined Dunkin' in 2011. Joined ZSC in 2021.",
  },
  {
    name: 'Rakib Hasan',
    role: 'Director of Operations',
    bio: 'Started as a crew member in 2011. Previously Senior Executive at Telenor. MBA + Bachelor\'s in Finance from Kennesaw State. OSHA Certified Lead Auditor, ServSafe Certified Instructor.',
  },
]

const extended = [
  {
    name: 'Hemalatha Arunachalam, CPA',
    role: 'Accounting & Finance Officer',
    bio: "Born and raised in India, passionate about commerce and finance. Earned Bachelor's, Master's, and Doctorate in Commerce. Former professor of accounting and taxation. Relocated to the US in 2024, completed Master's in Accounting at Clark University, passed all CPA exams. Member of Beta Alpha Psi.",
  },
  {
    name: 'Arslan Khan',
    role: 'Director of Operations',
    bio: 'Started as a crew member in 2010 at age 17, rose to Director of Operations in under 10 years. Known for turning around restaurants and driving profitability. A mentor to many within the organization.',
  },
]

const mini = [
  { name: 'Blake Lairsey', role: 'Marketing & Communications Director' },
  { name: 'Michelle May', role: 'Recruiting / HR' },
  { name: 'Shahzad Ajanee', role: 'Above Restaurant Leader' },
  { name: 'Ajene Alleyne', role: 'Above Restaurant Leader' },
  { name: 'Maryam Almamlouk', role: 'AP / Payroll Administrator' },
  { name: 'Ambrin Firdaus', role: 'Above Restaurant Leader' },
  { name: 'Sabita Gurung', role: 'Above Restaurant Leader' },
  { name: 'Shirley Hyde', role: 'Above Restaurant Leader' },
  { name: 'Bilal Khan', role: 'Above Restaurant Leader' },
  { name: 'Shaheryar Khan', role: 'Above Restaurant Leader' },
  { name: 'Mohammad Tahir', role: 'Above Restaurant Leader' },
  { name: 'Elida Schmittou', role: 'Office Manager' },
]

export default function Team() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: 68 }}
    >
      {/* ── HERO ── */}
      <section className="px-[4.5rem] py-20" style={{ background: '#F3EDE3', borderBottom: '1px solid rgba(42,30,16,0.1)' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-[1px]" style={{ background: '#E8650A' }} />
          <span className="text-[0.52rem] tracking-[0.3em] uppercase text-[#E8650A] font-medium">Meet Our Team</span>
        </div>
        <h1 className="font-playfair font-black text-[#1A1208] leading-[1.05] mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          The People Behind <em className="grad-text">Every Cup.</em>
        </h1>
        <p className="text-[0.88rem] leading-[1.8] text-[rgba(42,30,16,0.6)] font-light" style={{ maxWidth: 520 }}>
          Our team is our greatest asset. Each member brings expertise, passion, and a commitment
          to excellence that drives everything we do at ZSC Enterprises.
        </p>
      </section>

      {/* ── FEATURED 3 ── */}
      <section className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(42,30,16,0.1)' }}>
        {featured.map((m, i) => (
          <motion.div
            key={m.name}
            className="transition-colors duration-200"
            style={{
              borderRight: i < featured.length - 1 ? '1px solid rgba(42,30,16,0.1)' : 'none',
              background: '#FAF7F2',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ background: '#F3EDE3' }}
          >
            {/* Image placeholder */}
            <div className="flex items-center justify-center flex-col gap-2"
              style={{ aspectRatio: '4/3', background: '#EDE5D8' }}>
              <span style={{ fontSize: '3rem', opacity: 0.15 }}>👤</span>
              <span className="text-[0.45rem] tracking-[0.2em] uppercase text-[rgba(42,30,16,0.3)]">Photo Placeholder</span>
            </div>
            {/* Body */}
            <div className="px-9 pt-8 pb-10">
              <div className="font-playfair font-bold text-[1.1rem] text-[#1A1208] mb-1">{m.name}</div>
              <div className="text-[0.52rem] tracking-[0.2em] uppercase grad-text font-semibold mb-4">{m.role}</div>
              <p className="text-[0.75rem] leading-[1.75] text-[rgba(42,30,16,0.6)] font-light">{m.bio}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── EXTENDED BIOS ── */}
      <section className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {extended.map((m, i) => (
          <div key={m.name}
            className="px-14 py-16"
            style={{
              background: i % 2 === 0 ? '#F3EDE3' : '#FAF7F2',
              borderRight: i === 0 ? '1px solid rgba(42,30,16,0.1)' : 'none',
              borderTop: '1px solid rgba(42,30,16,0.1)',
            }}>
            <div className="font-playfair font-bold text-[1.2rem] text-[#1A1208] mb-1">{m.name}</div>
            <div className="text-[0.52rem] tracking-[0.2em] uppercase grad-text font-semibold mb-4">{m.role}</div>
            <p className="text-[0.8rem] leading-[1.8] text-[rgba(42,30,16,0.6)] font-light">{m.bio}</p>
          </div>
        ))}
      </section>

      {/* ── MINI GRID ── */}
      <section className="px-12 py-16" style={{ borderTop: '1px solid rgba(42,30,16,0.1)', background: '#FAF7F2' }}>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[0.5rem] tracking-[0.3em] uppercase text-[rgba(42,30,16,0.38)]">Our Full Team</span>
          <div className="flex-1 h-[1px]" style={{ background: 'rgba(42,30,16,0.1)' }} />
        </div>
        <div className="grid gap-[1px]"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', background: 'rgba(42,30,16,0.1)' }}>
          {mini.map((m) => (
            <motion.div
              key={m.name}
              className="px-6 py-7 transition-colors duration-200"
              style={{ background: '#FAF7F2' }}
              whileHover={{ background: '#F3EDE3' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl"
                style={{ background: '#EDE5D8' }}>
                👤
              </div>
              <div className="font-playfair font-bold text-[0.95rem] text-[#1A1208] mb-1">{m.name}</div>
              <div className="text-[0.48rem] tracking-[0.18em] uppercase text-[rgba(42,30,16,0.38)] font-medium">{m.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
