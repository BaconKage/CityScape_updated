import React from 'react'
import { ArrowRight } from 'lucide-react'
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
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/45 to-charcoal/90" />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mt-16 md:mt-20 max-w-xl"
          >
            <div className="rounded-[1.75rem] border border-rust-300/30 bg-[linear-gradient(135deg,rgba(88,49,34,0.78),rgba(33,20,16,0.7))] p-7 md:p-8 shadow-[0_26px_70px_-34px_rgba(132,78,49,0.75)] backdrop-blur-xl">
              <p className="text-xs md:text-sm uppercase tracking-[0.16em] font-semibold text-stone/85">
                Premium Mandate Execution
              </p>
              <p className="mt-5 text-5xl md:text-6xl font-display font-bold text-[#f0c9a6]">
                4-5
              </p>
              <p className="mt-3 text-base md:text-lg text-stone/90 font-medium max-w-md">
                mandate execution with focused ownership and boutique-level attention.
              </p>
            </div>
          </motion.div>
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
