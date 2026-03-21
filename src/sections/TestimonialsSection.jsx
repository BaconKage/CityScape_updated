import React, { useEffect, useState } from 'react'
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../data/siteData'
import SectionHeader from '../components/ui/SectionHeader'

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6500)
    return () => clearInterval(interval)
  }, [])

  const goTo = (direction) => {
    setIndex((prev) => {
      const total = testimonials.length
      if (direction === 'prev') return (prev - 1 + total) % total
      return (prev + 1) % total
    })
  }

  return (
    <section className="section-frame py-16 md:py-24 bg-charcoal/95">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Social Proof"
          title="Trusted by Developers and Builders"
          description="Testimonial style content prepared for real case studies and authentic client quotes."
        />

        <div className="mt-10 relative">
          <div className="section-surface min-h-[280px] p-7 md:p-10">
            <AnimatePresence mode="wait">
            <motion.div
                key={testimonials[index].name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
                data-interactive
                data-levitate
              >
                <Quote size={24} className="text-gold-100" />
                <p className="mt-4 text-lg md:text-2xl leading-relaxed text-stone/85 max-w-4xl">
                  {testimonials[index].quote}
                </p>
                <p className="mt-7 text-sm uppercase tracking-[0.2em] text-gold-100">
                  {testimonials[index].name}
                </p>
                <p className="text-stone/70 text-sm">{testimonials[index].role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => goTo('prev')}
              data-interactive
              data-levitate
              className="h-11 w-11 rounded-full border border-white/20 grid place-items-center hover:text-gold-100 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    data-interactive
                    data-levitate
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === index ? 'bg-gold-100 w-6' : 'bg-white/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo('next')}
              data-interactive
              data-levitate
              className="h-11 w-11 rounded-full border border-white/20 grid place-items-center hover:text-gold-100 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
