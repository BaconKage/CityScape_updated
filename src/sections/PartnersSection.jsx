import React, { useState } from 'react'
import { motion } from 'framer-motion'
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

      </div>
    </section>
  )
}
