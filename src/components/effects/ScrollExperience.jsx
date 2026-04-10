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

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!media.matches || reduceMotion.matches) return

    const elements = Array.from(document.querySelectorAll(':is([data-levitate], .section-surface, .glass)'))
    if (!elements.length) return

    const cleanupFns = []

    elements.forEach((element) => {
      let frameId = null
      let animationFrame = null
      const current = { rotateX: 0, rotateY: 0, shiftX: 0, shiftY: 0, glowX: 50, glowY: 50 }
      const target = { rotateX: 0, rotateY: 0, shiftX: 0, shiftY: 0, glowX: 50, glowY: 50 }

      const reset = () => {
        element.style.setProperty('--tilt-x', '0deg')
        element.style.setProperty('--tilt-y', '0deg')
        element.style.setProperty('--shift-x', '0px')
        element.style.setProperty('--shift-y', '0px')
        element.style.setProperty('--glow-x', '50%')
        element.style.setProperty('--glow-y', '50%')
      }

      const animate = () => {
        const easing = 0.14

        current.rotateX += (target.rotateX - current.rotateX) * easing
        current.rotateY += (target.rotateY - current.rotateY) * easing
        current.shiftX += (target.shiftX - current.shiftX) * easing
        current.shiftY += (target.shiftY - current.shiftY) * easing
        current.glowX += (target.glowX - current.glowX) * easing
        current.glowY += (target.glowY - current.glowY) * easing

        element.style.setProperty('--tilt-x', `${current.rotateX.toFixed(2)}deg`)
        element.style.setProperty('--tilt-y', `${current.rotateY.toFixed(2)}deg`)
        element.style.setProperty('--shift-x', `${current.shiftX.toFixed(2)}px`)
        element.style.setProperty('--shift-y', `${current.shiftY.toFixed(2)}px`)
        element.style.setProperty('--glow-x', `${current.glowX.toFixed(1)}%`)
        element.style.setProperty('--glow-y', `${current.glowY.toFixed(1)}%`)

        const isMoving =
          Math.abs(target.rotateX - current.rotateX) > 0.02 ||
          Math.abs(target.rotateY - current.rotateY) > 0.02 ||
          Math.abs(target.shiftX - current.shiftX) > 0.02 ||
          Math.abs(target.shiftY - current.shiftY) > 0.02 ||
          Math.abs(target.glowX - current.glowX) > 0.05 ||
          Math.abs(target.glowY - current.glowY) > 0.05

        if (isMoving) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          animationFrame = null
        }
      }

      const startAnimation = () => {
        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      const update = (event) => {
        if (frameId) cancelAnimationFrame(frameId)

        frameId = requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect()
          const px = (event.clientX - rect.left) / rect.width
          const py = (event.clientY - rect.top) / rect.height

          target.rotateY = (px - 0.5) * 12
          target.rotateX = (0.5 - py) * 10
          target.shiftX = (px - 0.5) * 10
          target.shiftY = (py - 0.5) * 8
          target.glowX = px * 100
          target.glowY = py * 100

          startAnimation()
        })
      }

      const handleLeave = () => {
        if (frameId) cancelAnimationFrame(frameId)

        target.rotateX = 0
        target.rotateY = 0
        target.shiftX = 0
        target.shiftY = 0
        target.glowX = 50
        target.glowY = 50
        startAnimation()
      }

      reset()
      element.addEventListener('pointermove', update)
      element.addEventListener('pointerleave', handleLeave)

      cleanupFns.push(() => {
        if (frameId) cancelAnimationFrame(frameId)
        if (animationFrame) cancelAnimationFrame(animationFrame)
        element.removeEventListener('pointermove', update)
        element.removeEventListener('pointerleave', handleLeave)
        reset()
      })
    })

    return () => {
      cleanupFns.forEach((cleanup) => cleanup())
    }
  }, [])

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
