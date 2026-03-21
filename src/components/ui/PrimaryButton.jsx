import React from 'react'
import { motion } from 'framer-motion'

const MotionButton = motion.button

const styles = {
  primary:
    'bg-gold-600 text-charcoal hover:bg-gold-700 focus-visible:ring-gold-100 border-gold-600',
  secondary:
    'bg-white/5 text-ivory hover:bg-white/10 border-white/20',
}

export default function PrimaryButton({
  children,
  href,
  variant = 'primary',
  onClick,
  target,
  rel,
  iconLeft,
  iconRight,
  className = '',
  type = 'button',
  ...rest
}) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal';

  const button = (
    <MotionButton
      type={type}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
      data-interactive
      data-levitate
      whileTap={{ scale: 0.985 }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </MotionButton>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className="inline-block"
        aria-label={typeof children === 'string' ? children : undefined}
      >
        {button}
      </a>
    )
  }

  return React.cloneElement(button, { ...rest })
}
