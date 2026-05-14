import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
      }}>
        <BrowserRouter>
          <Navbar />
          <AnimatedRoutes />
        </BrowserRouter>
      </div>
    </>
  )
}