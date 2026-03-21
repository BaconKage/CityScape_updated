import React, { useState } from 'react'
import { ChevronDown, MessageCircle, ExternalLink } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import { faqs, contactInfo } from '../data/siteData'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section-frame py-16 md:py-24 bg-charcoal/95">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions you may have"
          description="Clear answers for developers evaluating premium mandate consulting."
        />

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex
            return (
              <div
                key={faq.question}
                className="section-surface p-5 md:p-6"
                data-levitate
              >
                <button
                  type="button"
                  className="w-full text-left flex items-start justify-between gap-4"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <p className="text-base md:text-lg font-medium">{faq.question}</p>
                  <span className="mt-1 shrink-0">
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>

                {isOpen ? (
                  <div className="mt-4 text-stone/80 leading-relaxed">
                    <p>{faq.answer}</p>
                    {faq.contactCta ? (
                      <p className="mt-3 text-sm flex items-start gap-2">
                        <MessageCircle size={16} className="mt-0.5" />
                        Need precision for a specific mandate? Share details via
                        {' '}
                        <a
                          href={contactInfo.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-gold-100 hover:text-gold-50"
                        >
                          WhatsApp <ExternalLink size={13} />
                        </a>
                        .
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
