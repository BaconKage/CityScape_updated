import React from 'react'
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
} from 'lucide-react'
import { brand, navLinks, socialLinks, contactInfo } from '../data/siteData'

const iconMap = {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Youtube,
}

export default function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-charcoal py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-[1.2fr_0.8fr_1fr] gap-8">
        <div>
          <h2 className="text-2xl font-display">{brand.name}</h2>
          <p className="mt-3 text-sm text-stone/75 leading-relaxed max-w-sm">
            Premium mandate representation for real estate developers, investors, and partner networks seeking disciplined
            growth and trustworthy execution.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gold-100">Navigation</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-interactive
                  className="text-sm text-stone/80 hover:text-gold-100 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gold-100">Contact</p>
          <p className="mt-3 text-sm text-stone/80">{contactInfo.address}</p>
          <p className="mt-1 text-sm text-stone/80">{contactInfo.email}</p>
          <p className="mt-1 text-sm text-stone/80">{contactInfo.phone}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  data-interactive
                  aria-label={social.platform}
                  className="h-9 w-9 rounded-full border border-white/20 grid place-items-center text-stone/80 hover:text-gold-100 hover:border-gold-100/50 transition-colors"
                >
                  {Icon && <Icon size={16} />}
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-stone/70">
        Copyright {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  )
}

