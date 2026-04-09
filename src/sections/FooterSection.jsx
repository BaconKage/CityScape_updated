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
          <div
            className="mt-6 rounded-2xl border border-[#f5dc94]/55 bg-[radial-gradient(circle_at_top,rgba(255,234,163,0.38),rgba(201,152,51,0.24)_38%,rgba(70,42,8,0.88)_100%)] p-4 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,221,138,0.14),0_28px_80px_-34px_rgba(255,202,84,0.75)]"
            data-levitate
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#fff4c7]">Follow Cityscape</p>
            <p className="mt-2 text-sm text-[#fff0bf]/90">Stay connected across our active platforms.</p>
            <div className="mt-4 flex flex-wrap gap-3">
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
                  className="group flex h-12 w-12 rounded-full border border-[#ffe4a3]/55 bg-[linear-gradient(180deg,rgba(255,243,202,0.34),rgba(217,163,52,0.22))] items-center justify-center text-[#fff6d1] shadow-[0_12px_30px_-18px_rgba(77,45,0,0.75)] transition-all hover:-translate-y-1 hover:border-[#fff0c2] hover:bg-[linear-gradient(180deg,rgba(255,246,214,0.48),rgba(235,178,61,0.34))] hover:text-white"
                >
                  {Icon && <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />}
                </a>
              )
            })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-stone/70">
        Copyright {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  )
}

