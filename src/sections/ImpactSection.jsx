import React from 'react'
import { impactMetrics } from '../data/siteData'
import SectionHeader from '../components/ui/SectionHeader'
import AnimatedCounter from '../components/ui/AnimatedCounter'

export default function ImpactSection() {
  const blocks = [
    'bg-urbanBlue-500/20 border-urbanBlue-500/40 text-urbanBlue-100 shadow-[0_0_20px_rgba(45,93,143,0.15)]',
    'bg-emerald-500/20 border-emerald-500/40 text-emerald-100 shadow-[0_0_20px_rgba(31,164,127,0.15)]',
    'bg-steelBlue-500/20 border-steelBlue-500/40 text-steelBlue-100 shadow-[0_0_20px_rgba(76,120,165,0.15)]',
    'bg-rust-500/20 border-rust-500/40 text-rust-100 shadow-[0_0_20px_rgba(204,111,52,0.15)]',
    'bg-gold-500/20 border-gold-500/40 text-gold-100 shadow-[0_0_20px_rgba(191,164,109,0.15)]',
  ]

  return (
    <section className="section-frame py-16 md:py-24 bg-onyx/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Numbers"
          title="Impact by the Numbers"
          description="A snapshot of execution outcomes designed to build momentum and trust."
          light
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {impactMetrics.map((item, index) => (
            <div
              key={item.label}
              data-levitate
              className={`rounded-2xl p-6 text-center border backdrop-blur-xl transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden ${blocks[index % blocks.length]}`}
            >
              <AnimatedCounter value={item.value} label={item.label} suffix="+" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
