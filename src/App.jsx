import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import PartnersSection from './sections/PartnersSection'
import ProcessSection from './sections/ProcessSection'
import FAQSection from './sections/FAQSection'
import ImpactSection from './sections/ImpactSection'
import TestimonialsSection from './sections/TestimonialsSection'
import ContactSection from './sections/ContactSection'
import FooterSection from './sections/FooterSection'
import ChatWidget from './sections/ChatWidget'
import MouseGlow from './components/effects/MouseGlow'
import ScrollExperience from './components/effects/ScrollExperience'
import LoadingScreen from './components/effects/LoadingScreen'

function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('cityscape_loader_seen')
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!loading) return

    let hideTimer
    let fallbackTimer
    const minTimeMs = 1800
    const start = performance.now()

    const hide = () => {
      const elapsed = performance.now() - start
      const remaining = Math.max(0, minTimeMs - elapsed)
      hideTimer = window.setTimeout(() => setLoading(false), remaining)
      sessionStorage.setItem('cityscape_loader_seen', '1')
    }

    const startFallback = window.setTimeout(() => hide(), 3600)
    fallbackTimer = startFallback

    if (document.readyState === 'complete') {
      hide()
    } else {
      window.addEventListener('load', hide, { once: true })
    }

    return () => {
      if (hideTimer) window.clearTimeout(hideTimer)
      if (fallbackTimer) window.clearTimeout(fallbackTimer)
      window.removeEventListener('load', hide)
    }
  }, [])

  return (
    <div className="bg-charcoal text-ivory min-h-screen">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      <MouseGlow />
      <ScrollExperience />
      <Navbar />
      <main className="relative">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,#1d2130_0%,#0f1116_38%,#0a0a0d_100%)]"
          aria-hidden
        />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <PartnersSection />
        <ProcessSection />
        <FAQSection />
        <ImpactSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection />
      <ChatWidget />
    </div>
  )
}

export default App
