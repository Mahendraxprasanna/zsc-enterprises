import logoImg from '../assets/images/zsc-logo.png'

export default function ZSCLogo({ size = 40 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <img
        src={logoImg}
        alt="ZSC Enterprises"
        style={{ height: size, width: 'auto', objectFit: 'contain' }}
      />
      <span style={{
        fontSize: '0.32rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        fontFamily: 'Jost, sans-serif',
        fontWeight: 600,
        color: 'rgba(250,247,242,0.6)',
      }}>Enterprises</span>
    </div>
  )
}