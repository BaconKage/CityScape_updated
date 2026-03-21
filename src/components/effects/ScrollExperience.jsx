import React, { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { navLinks } from '../../data/siteData'

const navTargets = navLinks.map((link) => ({
  id: link.href.replace('#', ''),
  label: link.label,
}))

export default function ScrollExperience() {
  const { scrollYProgress, scrollY } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 18, mass: 0.85 })
  const shimmerX = useTransform(smoothProgress, [0, 1], ['-30%', '110%'])
  const glow = useTransform(smoothProgress, [0, 1], ['rgba(220,198,140,0.18)', 'rgba(220,198,140,0.3)'])

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('down')

  const sectionOffsets = useMemo(() => navTargets.map((target) => target.id), [])

  useEffect(() => {
    if (!sectionOffsets.length) return

    let previousY = window.scrollY

    const update = () => {
      const y = window.scrollY
      setDirection(y > previousY ? 'down' : 'up')
      previousY = y

      let nearest = 0
      let shortest = Number.POSITIVE_INFINITY
      const viewportY = y + window.innerHeight * 0.5

      sectionOffsets.forEach((id, index) => {
        const el = document.getElementById(id)
        if (!el) return

        const rect = el.getBoundingClientRect()
        const sectionCenter = rect.top + window.scrollY + rect.height * 0.5
        const distance = Math.abs(sectionCenter - viewportY)

        if (distance < shortest) {
          shortest = distance
          nearest = index
        }
      })

      setActiveIndex(nearest)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionOffsets])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none scroll-track-wrap">
        <div className="scroll-track-bg" />
        <motion.div className="scroll-track-fill" style={{ scaleX: smoothProgress }} />
        <motion.div className="scroll-track-shine" style={{ left: shimmerX, backgroundColor: glow }} />
      </div>

      <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 scroll-nav">
        {navTargets.map((target, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={target.id}
              type="button"
              onClick={() => {
                document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              data-interactive
              className={`scroll-nav-dot ${isActive ? 'is-active' : ''}`}
              aria-label={`Jump to ${target.label}`}
            >
              <span className="sr-only">{target.label}</span>
              <span className="scroll-nav-label">{target.label}</span>
              <span className="scroll-nav-thumb" />
            </button>
          )
        })}
      </div>

      <motion.div
        key={direction}
        className="pointer-events-none fixed right-5 bottom-5 z-40 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.2 }}
      >
        <div className="rounded-full border border-white/20 bg-charcoal/70 backdrop-blur-xl px-3 py-2 text-xs tracking-[0.2em] text-ivory/80">
          {direction === 'down' ? 'SCROLLING' : 'SCROLLING UP'}
        </div>
      </motion.div>
    </>
  )
}
