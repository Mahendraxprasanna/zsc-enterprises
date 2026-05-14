import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Brands from './pages/Brands'
import Leadership from './pages/Leadership'
import Community from './pages/Community'
import Team from './pages/Team'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />} />
        <Route path="/brands"     element={<Brands />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/community"  element={<Community />} />
        <Route path="/team"       element={<Team />} />
        <Route path="/contact"    element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return children
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && (
        <IntroAnimation onComplete={() => setIntroDone(true)} />
      )}
      <div style={{
  opacity: introDone ? 1 : 0,
  transition: 'opacity 0.8s ease',
  filter: introDone ? 'blur(0px)' : 'blur(8px)',
  margin: 0,
  padding: 0,
}}>
        <BrowserRouter>
          <LenisProvider>
            <Navbar />
            <AnimatedRoutes />
          </LenisProvider>
        </BrowserRouter>
      </div>
    </>
  )
}