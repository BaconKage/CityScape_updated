import React from 'react'
import { useEffect, useRef, useState } from 'react'

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export default function AnimatedCounter({ value, suffix = '', label = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!inView) return
    let raf = null
    const duration = 1200
    const start = performance.now()

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => raf && cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <div className="p-5 md:p-6" ref={ref}>
      <p className="text-4xl md:text-5xl font-display font-semibold text-gold-100">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm md:text-base text-stone/80 tracking-wide">{label}</p>
    </div>
  )
}
