import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { brand, navLinks, contactInfo } from '../../data/siteData'
import PrimaryButton from '../ui/PrimaryButton'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'py-3 bg-charcoal/80 backdrop-blur-2xl shadow-luxe border-b border-white/10' : 'py-5'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" data-interactive className="flex items-center gap-3 group">
          <span className="text-lg md:text-xl font-display tracking-widest text-ivory group-hover:text-gold-100 transition-colors uppercase font-semibold">
            {brand.name}
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-2 xl:gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-interactive
              className="text-sm font-medium text-ivory/80 hover:text-gold-100 transition-colors px-3 py-2"
            >
              {link.label}
            </a>
          ))}
          <PrimaryButton
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="ml-2"
          >
            Talk on WhatsApp
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-full h-11 w-11 border border-white/20 text-ivory"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="mx-4 mt-3 glass rounded-3xl p-4 border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              data-interactive
              className="block px-4 py-3 rounded-2xl text-sm text-ivory/90 hover:text-gold-100 hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <PrimaryButton href={contactInfo.whatsapp} variant="secondary" className="mt-3 w-full">
            Talk on WhatsApp
          </PrimaryButton>
        </div>
      </div>
    </header>
  )
}
