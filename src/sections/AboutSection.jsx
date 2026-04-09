import React from 'react'
import { motion } from 'framer-motion'
import { Award, Search, Users, TrendingUp, ShieldCheck, Linkedin } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import AdaptiveImage from '../components/ui/AdaptiveImage'
import { aboutData } from '../data/siteData'

const iconMap = {
  ShieldCheck,
  Award,
  TrendingUp,
  Search,
  Users,
}

export default function AboutSection() {
  return (
    <section id="about" className="section-frame relative py-16 md:py-24 bg-charcoal/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About"
          title="Cityscape Consulting"
          description="A premium, mandate-first partner for measurable launch velocity and trusted sales execution."
        />

        <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-surface p-6 md:p-8"
            data-levitate
          >
            <p className="text-sm uppercase tracking-[0.24em] text-gold-100">Cityscape in 40 seconds</p>
            <h3 className="mt-4 text-3xl md:text-4xl leading-tight">
              Boutique mandate consulting for visible, faster growth
            </h3>
            <div className="mt-5 space-y-4 text-stone/85 text-lg leading-relaxed">
              {aboutData.story.map((line, index) => (
                <p key={line + index}>{line}</p>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {aboutData.approach.map((item) => (
                <p
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone/82"
                >
                  {item}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            data-interactive
            data-levitate
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-surface relative min-h-[320px] overflow-hidden"
          >
            <AdaptiveImage
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80"
              alt="Modern luxury residential building exterior"
              className="absolute inset-0 h-full w-full object-cover"
              fallback="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/10" />
            <div className="relative flex h-full min-h-[320px] items-end p-6 md:p-8">
              <div className="max-w-md rounded-2xl border border-white/10 bg-charcoal/55 px-5 py-4 backdrop-blur-lg">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-100">Cityscape Presence</p>
                <p className="mt-3 text-2xl md:text-3xl font-display text-ivory">
                  Premium project storytelling backed by focused execution.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-surface p-6 md:p-8"
            data-levitate
          >
            <p className="text-sm uppercase tracking-[0.24em] text-gold-100">Execution Framework</p>
            <h4 className="mt-3 text-2xl md:text-3xl font-semibold">Execution model</h4>
            <div className="mt-5 grid gap-3">
              {aboutData.models.map((model) => (
                <div
                  key={model.title}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm md:text-base text-stone/82"
                >
                  <p className="font-medium text-white">{model.title}</p>
                  <p className="mt-1">{model.points[0]}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="section-surface p-6 md:p-8"
            data-levitate
          >
            <p className="text-sm uppercase tracking-[0.24em] text-gold-100">Lead Engine</p>
            <h4 className="mt-3 text-2xl md:text-3xl font-semibold">How leads are generated</h4>
            <p className="mt-3 text-stone/80 leading-relaxed">{aboutData.leadGeneration.approach}</p>
            <div className="mt-5 grid gap-3">
              {aboutData.leadGeneration.pillars.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/10 bg-gradient-to-r from-urbanBlue-500/10 to-transparent px-4 py-3 text-sm"
                >
                  <span className="text-gold-100">-</span> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aboutData.highlights.map((item) => {
            const Icon = iconMap[item.icon] || ShieldCheck
            return (
              <div key={item.title} data-interactive data-levitate className="section-surface p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl border border-gold-100/30 bg-gold-100/10 grid place-items-center text-gold-100">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="mt-1 text-sm text-stone/78 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {aboutData.leadership.map((person) => (
            <a
              key={person.name}
              href={person.profile}
              target="_blank"
              rel="noreferrer"
              className="section-surface p-6 flex items-start justify-between gap-4 hover:border-gold-100/45 transition-all"
              data-levitate
            >
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gold-100/90">Partner</p>
                <p className="mt-2 text-2xl md:text-3xl">{person.name}</p>
                <p className="mt-1 text-stone/75">{person.title}</p>
                <p className="mt-2">
                  <span className="text-sm text-stone/55">Email: </span>
                  <span className="text-sm text-gold-100/90">{person.email}</span>
                </p>
                <div className="mt-3 space-y-2 text-sm text-stone/80 max-w-xl leading-relaxed">
                  {(Array.isArray(person.description) ? person.description : [person.description]).map((line) => (
                    <p key={`${person.name}-${line}`}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-full border border-white/15 h-10 w-10 grid place-items-center text-gold-100 mt-1">
                <Linkedin size={18} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
