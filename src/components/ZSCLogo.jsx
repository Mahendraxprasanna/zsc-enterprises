export default function ZSCLogo({ size = 40, dark = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

      <svg
        viewBox="0 0 900 360"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: size * 2.2, height: size, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="nl-orange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#FFC9A8"/>
            <stop offset="25%"  stopColor="#F08555"/>
            <stop offset="55%"  stopColor="#DC5A2D"/>
            <stop offset="90%"  stopColor="#B83E14"/>
            <stop offset="100%" stopColor="#7A2808"/>
          </linearGradient>
          <linearGradient id="nl-blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#9FB6E0"/>
            <stop offset="20%"  stopColor="#7593C9"/>
            <stop offset="50%"  stopColor="#5878B5"/>
            <stop offset="85%"  stopColor="#2D4A8C"/>
            <stop offset="100%" stopColor="#15264F"/>
          </linearGradient>
          <linearGradient id="nl-pink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#A82D5C"/>
            <stop offset="25%"  stopColor="#DA4878"/>
            <stop offset="50%"  stopColor="#F77AAA"/>
            <stop offset="75%"  stopColor="#DA4878"/>
            <stop offset="100%" stopColor="#A82D5C"/>
          </linearGradient>
          <clipPath id="nl-top">
            <path d="M 0 0 L 900 0 L 900 240 Q 450 130 0 240 Z" />
          </clipPath>
          <clipPath id="nl-bottom">
            <path d="M 0 240 Q 450 130 900 240 L 900 360 L 0 360 Z" />
          </clipPath>
          <filter id="nl-depth" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="3" dy="6" result="s"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Orange top half */}
        <g clipPath="url(#nl-top)" filter="url(#nl-depth)">
          <text x="450" y="285" textAnchor="middle"
            fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
            fill="#3a1604" opacity="0.6" transform="translate(4,6)">ZSC</text>
          <text x="450" y="285" textAnchor="middle"
            fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
            fill="#5a230a" opacity="0.8" transform="translate(2,3)">ZSC</text>
          <text x="450" y="285" textAnchor="middle"
            fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
            fill="url(#nl-orange)">ZSC</text>
        </g>

        {/* Blue bottom half */}
        <g clipPath="url(#nl-bottom)" filter="url(#nl-depth)">
          <text x="450" y="285" textAnchor="middle"
            fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
            fill="#0a1530" opacity="0.6" transform="translate(4,6)">ZSC</text>
          <text x="450" y="285" textAnchor="middle"
            fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
            fill="#152448" opacity="0.8" transform="translate(2,3)">ZSC</text>
          <text x="450" y="285" textAnchor="middle"
            fontFamily="Georgia, serif" fontWeight="700" fontSize="300"
            fill="url(#nl-blue)">ZSC</text>
        </g>

        {/* Pink arc */}
        <path
          d="M 35 255 Q 450 115 865 255 Q 450 130 35 255 Z"
          fill="url(#nl-pink)"
          stroke="none"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(218,72,120,0.85)) drop-shadow(0 0 8px rgba(218,72,120,0.5))',
          }}
        />
      </svg>

      <span style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: size * 0.18,
        fontWeight: 500,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
color: dark ? 'rgba(42,30,16,0.5)' : 'rgba(250,247,242,0.6)',
        lineHeight: 1,
        textIndent: '0.35em',
      }}>
        Enterprises
      </span>

    </div>
  )
}