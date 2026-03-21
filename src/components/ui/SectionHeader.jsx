import React from 'react'

export default function SectionHeader({ eyebrow, title, description, align = 'left', light = false }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p
        className={`text-xs md:text-sm tracking-[0.28em] uppercase font-medium mb-3 ${
          light ? 'text-gold-500' : 'text-gold-100'
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight text-ivory mb-3 sm:mb-4">{title}</h2>
      {description && (
        <p className={`text-sm sm:text-base md:text-lg ${light ? 'text-stone/80' : 'text-stone/75'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
