import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import { partners } from '../data/siteData'

function LogoPill({ partner }) {
  const fallbackText = partner.label || partner.name.slice(0, 2).toUpperCase()
  const [showFallback, setShowFallback] = useState(false)

  return (
    <div className="flex items-center justify-center w-full h-full relative group">
      {!showFallback && (
        <img
          src={partner.logo}
          alt={partner.name}
          onError={() => setShowFallback(true)}
          onLoad={() => setShowFallback(false)}
          className="h-10 md:h-14 max-w-[140px] md:max-w-[180px] object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          data-partner-logo
        />
      )}
      {showFallback && (
        <span className="text-lg md:text-xl font-bold tracking-widest text-white/80">
          {fallbackText}
        </span>
      )}
    </div>
  )
}

export default function PartnersSection() {
  const duplicated = [...partners, ...partners]

  return (
    <section id="partners" className="section-frame py-16 md:py-24 bg-onyx/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Trusted by Developers"
          title="Trusted by Developers & Partners"
          description="We collaborate with high-performing development teams through disciplined execution and shared growth outcomes."
        />

        <div className="mt-10 overflow-hidden group">
          <div className="border-y border-white/10 py-6">
            <div className="flex w-max gap-4 md:gap-5 animate-marquee transition-all">
              {duplicated.map((partner, index) => {
                const innerClass = "h-24 md:h-32 min-w-[200px] md:min-w-[280px] px-8 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 will-change-transform"
                
                return partner.website ? (
                  <a
                    key={`${partner.name}-${index}`}
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    className={innerClass + " cursor-pointer hover:bg-white/5 rounded-3xl group/logo"}
                  >
                    <LogoPill partner={partner} />
                  </a>
                ) : (
                  <div
                    key={`${partner.name}-${index}`}
                    className={innerClass + " cursor-default group/logo"}
                  >
                    <LogoPill partner={partner} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl glass border border-white/10 p-6 md:p-8 grid md:grid-cols-[1fr_1.5fr] gap-5">
          <div className="section-surface p-6" data-levitate>
            <p className="text-sm uppercase tracking-[0.2em] text-gold-100">Partner Voice</p>
            <h3 className="mt-4 text-2xl md:text-3xl">What our development partners say</h3>
            <p className="mt-3 text-stone/75">
              Trusted alliance-led consulting for selective mandate projects.
            </p>
          </div>

          <div className="section-surface p-6 md:p-8" data-levitate>
            <div className="mb-3 h-10 w-10 rounded-full bg-gold-100/15 text-gold-100 grid place-items-center">
              <Quote size={18} />
            </div>
            <p className="text-lg leading-relaxed text-stone/85">
              "Cityscape gave us a clear premium positioning and an execution partner who understands every stage from
              demand generation to conversion. Their discipline around pricing and communication consistency raised our sales
              confidence substantially."
            </p>
            <p className="mt-5 text-sm text-gold-100">
              - Partner Team, Meridian Developers
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
