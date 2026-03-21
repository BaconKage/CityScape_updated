import React from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroData, contactInfo } from '../data/siteData'
import PrimaryButton from '../components/ui/PrimaryButton'
import AdaptiveImage from '../components/ui/AdaptiveImage'

export default function HeroSection() {
  const { scrollYProgress } = useScroll()
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section id="home" className="relative min-h-[92vh] md:min-h-screen">
      <motion.div
        style={{ y: parallax }}
        className="absolute inset-0"
        aria-hidden
      >
        <AdaptiveImage
          src={heroData.backgroundImage}
          alt="Architectural skyline"
          className="h-full w-full object-cover"
          fallback="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/65 to-charcoal" />
      </motion.div>

      <div className="relative isolate pt-28 md:pt-36 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:items-start md:flex-row gap-10 lg:gap-16 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-[0.9rem] tracking-[0.22em] uppercase text-emerald-100 font-bold mb-4 sm:mb-6">
                Cityscape Consulting
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] sm:leading-[0.95] text-ivory font-semibold">
                {heroData.title}
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-stone/90 leading-relaxed max-w-2xl font-medium">
                {heroData.subtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <PrimaryButton
                  href="#projects"
                  iconRight={<ArrowRight size={18} />}
                  className="w-full sm:w-auto justify-center bg-urbanBlue-600 hover:bg-urbanBlue-500 border-urbanBlue-500 text-white shadow-[0_0_20px_rgba(45,93,143,0.3)]"
                >
                  Explore Projects
                </PrimaryButton>
                <PrimaryButton href="#contact" variant="secondary" className="w-full sm:w-auto justify-center border-white/20 hover:bg-white/10">
                  Contact Us
                </PrimaryButton>
              </div>
            </motion.div>
          </div>

          <div className="relative mt-20 md:mt-24 w-full">
            <div className="grid sm:grid-cols-3 gap-5 lg:gap-8">
              {heroData.statCards.map((card, index) => {
                const colors = [
                  'bg-urbanBlue-500/10 border-urbanBlue-500/30 from-urbanBlue-500/5 to-charcoal/80',
                  'bg-emerald-500/10 border-emerald-500/30 from-emerald-500/5 to-charcoal/80',
                  'bg-rust-500/10 border-rust-500/30 from-rust-500/5 to-charcoal/80',
                ]
                const glowColors = [
                  'bg-urbanBlue-500/30',
                  'bg-emerald-500/30',
                  'bg-rust-500/30',
                ]
                const textColors = [
                  'text-urbanBlue-100',
                  'text-emerald-100',
                  'text-rust-100',
                ]
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    key={card.label}
                    data-levitate
                    className={`rounded-2xl p-6 relative overflow-hidden border backdrop-blur-xl bg-gradient-to-br shadow-xl ${colors[index % colors.length]}`}
                  >
                    <p className="text-xs lg:text-sm uppercase tracking-wider font-semibold text-ivory/80">{card.label}</p>
                    <p className={`mt-3 text-4xl lg:text-5xl font-display font-bold ${textColors[index % textColors.length]}`}>{card.value}</p>
                    <p className="mt-2 text-xs lg:text-sm text-stone/80 font-medium">{card.note}</p>
                    <div className={`absolute -bottom-8 -right-8 h-28 w-28 rounded-full blur-[40px] opacity-70 ${glowColors[index % glowColors.length]}`} />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <a
        href={contactInfo.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="fixed left-4 sm:left-10 bottom-5 sm:bottom-6 z-30"
        aria-label="Chat on WhatsApp"
        data-interactive
        data-levitate
      >
        <button
          type="button"
          className="h-12 px-4 sm:px-5 rounded-full bg-green-600/95 text-white text-sm sm:text-sm font-semibold backdrop-blur-md shadow-luxe transition-transform hover:scale-105"
        >
          Chat on WhatsApp
        </button>
      </a>
    </section>
  )
}
