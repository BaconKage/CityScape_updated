import React from 'react'
import { motion } from 'framer-motion'

const bars = Array.from({ length: 7 })

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-shell"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
    >
      <motion.div className="loading-layer" aria-hidden initial={{ opacity: 0.85 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

      <motion.div
        className="loading-card"
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.985 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <motion.div
          className="loading-mark"
          initial={{ rotate: -3 }}
          animate={{ rotate: 3 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 3.6,
            ease: 'easeInOut',
            repeatDelay: 0.12,
          }}
        >
          <img src="/images/cityscape-logo.png" alt="Cityscape Consulting logo" className="loading-mark-image" />
        </motion.div>

        <p className="loading-title">Cityscape Consulting</p>
        <p className="loading-subtitle">Real Estate Consulting Experience</p>

        <div className="loading-bars mt-8">
          {bars.map((_, index) => (
            <motion.span
              key={`loading-bar-${index}`}
              className="loading-bar"
              initial={{ scaleY: 0.25 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.82,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: index * 0.14,
                repeatDelay: 0.16,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
