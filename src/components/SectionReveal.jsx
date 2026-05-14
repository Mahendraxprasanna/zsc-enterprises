import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionReveal({
  children,
  className = '',
  style = {},
  delay = 0,
  direction = 'up',
  distance = 40,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      filter: 'blur(6px)',
      scale: 0.98,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.85,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}