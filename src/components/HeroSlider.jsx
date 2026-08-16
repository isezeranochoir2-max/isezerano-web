import React, { useEffect, useState } from 'react'

export default function HeroSlider({ images = [], interval = 5000, overlayOpacity = 0.2 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images, interval])

  if (!images || images.length === 0) return null

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src + i}
          aria-hidden={i !== index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      {/* Optional subtle overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      />
    </div>
  )
}
