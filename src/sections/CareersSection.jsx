import React, { useState } from 'react'
import { BriefcaseBusiness, MapPin, MessageCircle } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import { careerOpenings, contactInfo } from '../data/siteData'

export default function CareersSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: careerOpenings[0]?.title || '',
    experience: '',
    message: '',
  })

  const updateField = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const lines = [
      'Hello Cityscape Consulting,',
      '',
      'I would like to apply for a current opportunity.',
      '',
      `Role: ${formData.role || 'Not provided'}`,
      `Full Name: ${formData.fullName || 'Not provided'}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Experience: ${formData.experience || 'Not provided'}`,
      `Message: ${formData.message || 'Not provided'}`,
    ]

    const whatsappUrl = `${contactInfo.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="careers" className="section-frame py-16 md:py-24 bg-charcoal/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Careers"
          title="Opportunities at Cityscape"
          description="Current openings can be shared here, and interested candidates can send a structured application directly on WhatsApp."
        />

        <div className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-6">
          <div className="space-y-4">
            {careerOpenings.map((opening) => (
              <div
                key={opening.title}
                className="section-surface p-6 md:p-7 bg-gradient-to-br from-white/6 via-white/4 to-rust-500/8"
                data-levitate
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl border border-gold-100/25 bg-gold-100/10 grid place-items-center text-gold-100">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-semibold text-ivory">{opening.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-stone/75">
                      <span>{opening.type}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} className="text-gold-100" />
                        {opening.location}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm md:text-base text-stone/80 leading-relaxed">{opening.summary}</p>
              </div>
            ))}
          </div>

          <form className="section-surface p-6 md:p-8" data-levitate onSubmit={handleSubmit}>
            <p className="text-sm uppercase tracking-[0.22em] text-gold-100">Apply on WhatsApp</p>
            <h3 className="mt-3 text-2xl md:text-3xl">Send your profile directly</h3>
            <p className="mt-3 text-stone/78 leading-relaxed">
              Fill in your details, choose the role, and we will open WhatsApp with a preformatted application message.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <label className="text-sm">
                Full Name
                <input
                  value={formData.fullName}
                  onChange={updateField('fullName')}
                  data-interactive
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm">
                Phone Number
                <input
                  value={formData.phone}
                  onChange={updateField('phone')}
                  data-interactive
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                  placeholder="+91"
                />
              </label>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <label className="text-sm">
                Email
                <input
                  value={formData.email}
                  onChange={updateField('email')}
                  type="email"
                  data-interactive
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                  placeholder="you@email.com"
                />
              </label>
              <label className="text-sm">
                Applying For
                <select
                  value={formData.role}
                  onChange={updateField('role')}
                  data-interactive
                  className="mt-2 w-full rounded-xl border border-white/20 bg-charcoal px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                >
                  {careerOpenings.map((opening) => (
                    <option key={opening.title} value={opening.title}>
                      {opening.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 block text-sm">
              Experience
              <input
                value={formData.experience}
                onChange={updateField('experience')}
                data-interactive
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                placeholder="Example: 2 years in inside sales"
              />
            </label>

            <label className="mt-4 block text-sm">
              Message
              <textarea
                value={formData.message}
                onChange={updateField('message')}
                data-interactive
                className="mt-2 w-full min-h-[120px] rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-100/40"
                placeholder="Add a short note about your profile, availability, or interest."
              />
            </label>

            <button
              type="submit"
              data-interactive
              data-levitate
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-green-600 text-white font-semibold hover:bg-green-500 transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle size={18} />
              Send Application on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
