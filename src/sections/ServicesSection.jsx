import React from 'react'
import { motion } from 'framer-motion'
import {
  Award,
  LineChart,
  BadgeCheck,
  MousePointerClick,
  Handshake,
  Wallet,
  Search,
  ArrowRight,
  Users,
} from 'lucide-react'
import { serviceCards } from '../data/siteData'
import SectionHeader from '../components/ui/SectionHeader'

const serviceIcons = {
  Award,
  LineChart,
  BadgeCheck,
  MousePointerClick,
  Users,
  Handshake,
  Wallet,
  Search,
}

export default function ServicesSection() {
  return (
    <section id="services" className="section-frame py-16 md:py-24 bg-onyx/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services"
          title="High-impact services, designed for premium mandates"
          description="Every engagement is built around measurable campaigns, disciplined sales execution, and brand-level clarity."
        />

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {serviceCards.map((service, idx) => {
            const Icon = serviceIcons[service.icon] || Award
            const colors = [
              'text-urbanBlue-100 border-urbanBlue-500/30 from-urbanBlue-500/10 to-transparent',
              'text-emerald-100 border-emerald-500/30 from-emerald-500/10 to-transparent',
              'text-gold-100 border-gold-500/30 from-gold-500/10 to-transparent',
              'text-rust-100 border-rust-500/30 from-rust-500/10 to-transparent',
              'text-steelBlue-100 border-steelBlue-500/30 from-steelBlue-500/10 to-transparent',
            ]
            const activeColor = colors[idx % colors.length]
            return (
              <motion.div
                key={service.title}
                data-interactive
                data-levitate
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                className={`group section-surface border bg-gradient-to-br ${activeColor} p-5 md:p-6 transition-all duration-300 hover:scale-[1.02] shadow-lg`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`h-11 w-11 rounded-xl border border-current/25 bg-charcoal/45 grid place-items-center text-current`}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="text-xs text-gold-100 uppercase tracking-wide">Service</span>
                </div>
                <h3 className="mt-4 text-2xl leading-snug">{service.title}</h3>
                <p className="mt-3 text-sm text-stone/80 leading-relaxed">{service.description}</p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center text-sm text-gold-100 hover:text-gold-50 transition-colors"
                >
                  Learn More <ArrowRight size={16} className="ml-2" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
