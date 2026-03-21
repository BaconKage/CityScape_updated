import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function isInteractiveTarget(target) {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest('[data-interactive]') ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('label'),
  )
}

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const [clickPulse, setClickPulse] = useState({ show: false, x: 0, y: 0 })
  const glowSize = 448
  const haloSize = 144

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setActive(isInteractiveTarget(event.target))
    }

    const onDown = (event) => {
      setClickPulse({ show: true, x: event.clientX, y: event.clientY })
      setTimeout(() => setClickPulse((prev) => ({ ...prev, show: false })), 450)
    }

    const onLeave = () => setActive(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <motion.div
        className="absolute h-[28rem] w-[28rem] rounded-full opacity-0"
        style={{
          left: position.x - glowSize / 2,
          top: position.y - glowSize / 2,
        }}
        animate={{
          opacity: active ? 0.38 : 0.22,
          scale: active ? 1 : 0.82,
        }}
        transition={{ type: 'spring', stiffness: 65, damping: 20 }}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(220,198,140,0.45)_0%,_rgba(220,198,140,0.12)_34%,_rgba(220,198,140,0.02)_58%,_rgba(220,198,140,0)_74%)] blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute h-36 w-36 rounded-full border border-gold-200/20 opacity-0"
        style={{
          left: position.x - haloSize / 2,
          top: position.y - haloSize / 2,
        }}
        animate={{
          opacity: active ? 0.5 : 0.17,
          scale: active ? 1.1 : 0.7,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.06)_45%,_rgba(255,255,255,0)_72%)]" />
      </motion.div>

      {clickPulse.show && (
        <motion.div
          key="clickPulse"
          className="absolute rounded-full h-16 w-16 border border-gold-100/70"
          style={{ left: clickPulse.x - 32, top: clickPulse.y - 32 }}
          initial={{ scale: 1, opacity: 0.65 }}
          animate={{ scale: 7.6, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}
