import { motion } from 'framer-motion'

const contactItems = [
  {
    icon: '📍',
    label: 'Address',
    value: '3200 Windy Hill Rd SE\nAtlanta, GA 30339, USA',
    href: null,
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '770-249-8082',
    href: 'tel:7702498082',
  },
  {
    icon: '💼',
    label: 'Careers',
    value: 'Apply on HigherMe →',
    href: 'https://app.higherme.com/brands/5ffdef1452b26',
  },
]

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: 68 }}
    >
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 68px)' }}>

        {/* ── LEFT (dark) ── */}
        <div className="px-[4.5rem] py-20 flex flex-col justify-between" style={{ background: '#1A1208' }}>
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-[1px]" style={{ background: '#FF7A20' }} />
              <span className="text-[0.52rem] tracking-[0.3em] uppercase text-[#FF7A20] font-medium">Get in Touch</span>
            </div>
            <h1 className="font-playfair font-black text-[#FAF7F2] leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Let's Start a <em className="grad-text">Conversation.</em>
            </h1>
            <p className="text-[0.85rem] leading-[1.8] font-light" style={{ color: 'rgba(250,247,242,0.45)', maxWidth: 420 }}>
              We'd love to hear from you. Whether you're interested in careers, partnerships,
              or just want to say hello — reach out and we'll get back to you.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-6 mt-10">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-sm"
                    style={{
                      background: 'rgba(232,101,10,0.1)',
                      border: '1px solid rgba(232,101,10,0.18)',
                    }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[0.44rem] tracking-[0.25em] uppercase mb-1"
                      style={{ color: 'rgba(250,247,242,0.25)' }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-[0.82rem] no-underline transition-colors duration-200 hover:text-[#E8650A]"
                        style={{ color: 'rgba(250,247,242,0.72)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[0.82rem] whitespace-pre-line" style={{ color: 'rgba(250,247,242,0.72)' }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-10">
              {[
                { label: 'fb', href: 'https://facebook.com/zscenterprises2025', title: 'Facebook' },
                { label: 'in', href: 'https://linkedin.com/company/zsc-enterprises', title: 'LinkedIn' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.title}
                  className="w-10 h-10 flex items-center justify-center no-underline text-[0.6rem] font-semibold tracking-wider transition-all duration-200"
                  style={{
                    border: '1px solid rgba(250,247,242,0.1)',
                    color: 'rgba(250,247,242,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8650A'; e.currentTarget.style.color = '#E8650A'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(250,247,242,0.1)'; e.currentTarget.style.color = 'rgba(250,247,242,0.4)'; }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="text-[0.5rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(250,247,242,0.15)' }}>
            © 2026 ZSC Enterprises
          </div>
        </div>

        {/* ── RIGHT (light) ── */}
        <div className="px-[4.5rem] py-20 flex flex-col justify-center" style={{ background: '#F3EDE3' }}>
          <h2 className="font-playfair font-black text-[#1A1208] text-[1.8rem] mb-1">Send a Message</h2>
          <p className="text-[0.75rem] text-[rgba(42,30,16,0.38)] mb-10 tracking-[0.04em]">
            Fill out the form below and we'll get back to you shortly.
          </p>

          {/* Form */}
          <div className="grid gap-0" style={{ gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
            {[['First Name', 'John', 'text'], ['Last Name', 'Smith', 'text']].map(([label, ph, type]) => (
              <div key={label} className="mb-6">
                <label className="block text-[0.5rem] tracking-[0.2em] uppercase text-[rgba(42,30,16,0.38)] font-medium mb-2">
                  {label}
                </label>
                <input type={type} placeholder={ph}
                  className="w-full px-4 py-3 text-[0.82rem] text-[#2A1E10] outline-none transition-colors duration-200"
                  style={{ background: '#FAF7F2', border: '1px solid rgba(42,30,16,0.12)' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#E8650A'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(42,30,16,0.12)'}
                />
              </div>
            ))}
          </div>

          {[
            ['Email Address', 'john@example.com', 'email'],
            ['Subject', 'Partnership, Careers, General...', 'text'],
          ].map(([label, ph, type]) => (
            <div key={label} className="mb-6">
              <label className="block text-[0.5rem] tracking-[0.2em] uppercase text-[rgba(42,30,16,0.38)] font-medium mb-2">
                {label}
              </label>
              <input type={type} placeholder={ph}
                className="w-full px-4 py-3 text-[0.82rem] text-[#2A1E10] outline-none transition-colors duration-200"
                style={{ background: '#FAF7F2', border: '1px solid rgba(42,30,16,0.12)' }}
                onFocus={e => e.currentTarget.style.borderColor = '#E8650A'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(42,30,16,0.12)'}
              />
            </div>
          ))}

          <div className="mb-8">
            <label className="block text-[0.5rem] tracking-[0.2em] uppercase text-[rgba(42,30,16,0.38)] font-medium mb-2">
              Message
            </label>
            <textarea placeholder="Tell us how we can help..."
              className="w-full px-4 py-3 text-[0.82rem] text-[#2A1E10] outline-none transition-colors duration-200 resize-y"
              style={{ background: '#FAF7F2', border: '1px solid rgba(42,30,16,0.12)', minHeight: 120 }}
              onFocus={e => e.currentTarget.style.borderColor = '#E8650A'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(42,30,16,0.12)'}
            />
          </div>

          <button
            className="w-full grad-bg text-white py-4 text-[0.6rem] tracking-[0.2em] uppercase font-semibold border-none cursor-pointer transition-opacity duration-200 hover:opacity-85"
          >
            Send Message
          </button>

          {/* Careers box */}
          <div className="mt-10 p-8" style={{ border: '1px solid rgba(42,30,16,0.1)', background: '#FAF7F2' }}>
            <h3 className="font-playfair font-bold text-[1rem] text-[#1A1208] mb-2">Looking for a Job?</h3>
            <p className="text-[0.72rem] leading-[1.65] text-[rgba(42,30,16,0.6)] font-light mb-5">
              We're always looking for great people to join our team across 50+ Atlanta locations.
            </p>
            <a href="https://app.higherme.com/brands/5ffdef1452b26" target="_blank" rel="noreferrer"
              className="grad-bg text-white no-underline px-6 py-3 text-[0.58rem] tracking-[0.2em] uppercase font-semibold inline-block transition-opacity hover:opacity-85">
              Explore Opportunities
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
