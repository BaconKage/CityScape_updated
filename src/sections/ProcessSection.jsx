import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/ui/SectionHeader'
import { processSteps } from '../data/siteData'

export default function ProcessSection() {
  return (
    <section className="section-frame py-16 md:py-24 bg-charcoal/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Process"
          title="How We Work"
          description="A sequence designed for premium execution, not ad-hoc campaign drops."
        />

        <div className="mt-12 relative">
          <div className="absolute inset-x-6 top-10 h-[2px] bg-gradient-to-r from-transparent via-urbanBlue-200/55 to-transparent hidden md:block" />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {processSteps.map((step, index) => {
              const numColors = [
                'text-urbanBlue-500/30',
                'text-emerald-500/30',
                'text-gold-500/30',
                'text-rust-500/30',
                'text-steelBlue-500/30',
              ]
              const bgColors = [
                'bg-urbanBlue-500/10 border-urbanBlue-500/30 from-urbanBlue-500/5 to-transparent',
                'bg-emerald-500/10 border-emerald-500/30 from-emerald-500/5 to-transparent',
                'bg-gold-500/10 border-gold-500/30 from-gold-500/5 to-transparent',
                'bg-rust-500/10 border-rust-500/30 from-rust-500/5 to-transparent',
                'bg-steelBlue-500/10 border-steelBlue-500/30 from-steelBlue-500/5 to-transparent',
              ]
              const barColors = [
                'bg-urbanBlue-500',
                'bg-emerald-500',
                'bg-gold-500',
                'bg-rust-500',
                'bg-steelBlue-500',
              ]
              
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  data-interactive
                  data-levitate
                  whileTap={{ scale: 0.985 }}
                  className={`section-surface p-5 md:p-6 relative overflow-hidden border bg-gradient-to-br shadow-lg ${bgColors[index % bgColors.length]}`}
                >
                  <div className={`absolute -top-3 right-4 text-7xl font-display font-bold select-none ${numColors[index % numColors.length]}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="pt-4 relative z-10">
                    <div className={`mb-5 h-1 w-12 rounded-full ${barColors[index % barColors.length]}`} />
                    <h3 className="text-2xl font-semibold text-ivory/95">{step.title}</h3>
                    <p className="mt-3 text-sm text-stone/90 leading-relaxed font-medium">{step.details}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
