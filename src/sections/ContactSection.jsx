import React from 'react'
import { MapPinned, Mail, MapPin, Phone, MessageCircle, Send } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import { contactInfo } from '../data/siteData'

export default function ContactSection() {
  return (
    <section id="contact" className="section-frame py-16 md:py-24 bg-onyx/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Plan Your Next Launch"
          description="We will respond with a focused discussion plan for your project mandate."
          light
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          <div className="section-surface p-6 md:p-8" data-levitate>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-100">Office</p>
            <h3 className="mt-3 text-3xl md:text-4xl">Cityscape Consulting</h3>
            <p className="mt-5 text-stone/80 leading-relaxed flex gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-100" />
              {contactInfo.address}
            </p>
            <p className="mt-3 text-stone/80 flex gap-2">
              <Mail size={18} className="text-gold-100" /> {contactInfo.email}
            </p>
            <p className="mt-3 text-stone/80 flex gap-2">
              <Phone size={18} className="text-gold-100" /> {contactInfo.phone}
            </p>

            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-interactive
              data-levitate
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>

            <a
              href={contactInfo.googleMaps}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Cityscape Consulting on Google Maps"
              data-interactive
              data-levitate
              className="mt-8 block rounded-2xl overflow-hidden border border-white/15 bg-white/5 hover:border-gold-100/40 transition-colors"
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-stone/80">
                  <MapPinned size={16} className="text-gold-100" />
                  <span>Interactive map preview</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-gold-100">Open in Google Maps</span>
              </div>
              <iframe
                src={contactInfo.mapEmbed}
                title="Cityscape Consulting location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 md:h-60 w-full border-0 pointer-events-none"
              />
            </a>
          </div>

          <form className="section-surface p-6 md:p-8" data-levitate onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-sm">
                Full Name
                <input
                  data-interactive
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm">
                Email
                <input
                  data-interactive
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                  placeholder="you@email.com"
                  type="email"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm">
              Project / Partner Focus
            <input
              data-interactive
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
              placeholder="Residential / Commercial / Investment"
            />
            </label>

            <label className="mt-4 block text-sm">
              Message
            <textarea
              data-interactive
              className="mt-2 w-full min-h-[120px] rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
              placeholder="Tell us about your project and objective"
            />
            </label>

              <button
                type="submit"
                data-interactive
                data-levitate
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-gold-600 text-charcoal font-semibold hover:bg-gold-700 transition-colors w-full sm:w-auto justify-center"
              >
                <Send size={18} />
                Send Inquiry
              </button>
          </form>
        </div>
      </div>
    </section>
  )
}

