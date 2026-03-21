import React, { useEffect, useState } from 'react'

export default function AdaptiveImage({
  src,
  fallback,
  alt = '',
  className = '',
  onLoad,
  ...props
}) {
  const [didFail, setDidFail] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const fallbackSrc =
    fallback || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'

  useEffect(() => {
    if (!src) {
      setCurrentSrc(fallbackSrc)
      return
    }

    setDidFail(false)
    setCurrentSrc(src)
  }, [src, fallbackSrc])

  return didFail ? (
    <div
      className={`${className} grid place-items-center bg-[radial-gradient(circle_at_20%_20%,#262a36,#0f121a)] text-stone/65 text-sm`}
      role="img"
      aria-label={alt || 'Decorative project visual'}
    >
      Visual placeholder
    </div>
  ) : (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc)
          return
        }
        setDidFail(true)
      }}
      onLoad={onLoad}
      loading="lazy"
      {...props}
    />
  )
}
