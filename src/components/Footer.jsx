import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/brands', label: 'Brands' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/community', label: 'Community' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="px-14 py-10 grid gap-6"
      style={{
        background: '#1A1208',
        borderTop: '1px solid rgba(250,247,242,0.06)',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}
    >
      {/* Logo */}
      <div className="font-playfair text-[1rem] font-black tracking-[0.22em] uppercase text-[rgba(250,247,242,0.85)]">
        ZSC <span className="grad-text">&amp;</span> Enterprises
      </div>

      {/* Nav Links */}
      <div className="flex gap-8 justify-center flex-wrap">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-[0.52rem] tracking-[0.2em] uppercase text-[rgba(250,247,242,0.3)] no-underline transition-colors duration-200 hover:text-[#E8650A]"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Copy */}
      <div className="text-right text-[0.5rem] tracking-[0.08em] text-[rgba(250,247,242,0.2)]">
        © 2026 ZSC Enterprises · Atlanta, GA
      </div>
    </footer>
  )
}