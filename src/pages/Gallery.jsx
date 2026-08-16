import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'

export default function Gallery() {
  const gallery = useSelector((state) => state.content.gallery)
  const { t } = useTranslation()
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const openPhoto = (photo) => setSelectedPhoto(photo)
  const closePhoto = () => setSelectedPhoto(null)

  const goToPhoto = (direction) => {
    if (!selectedPhoto) return
    const currentIndex = gallery.photos.findIndex((p) => p.id === selectedPhoto.id)
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    if (newIndex >= 0 && newIndex < gallery.photos.length) {
      setSelectedPhoto(gallery.photos[newIndex])
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Seo title="Gallery Isezerano Choir" description="Moments of worship from Isezerano Choir." path="/gallery" />
      <div className="max-w-3xl">
        <p className="section-label mb-4">{t('gallery.label')}</p>
        <h1 className="section-heading mb-12">{t('gallery.heading')}</h1>
      </div>

      {gallery.photos.length === 0 ? (
        <div className="py-20">
          <p className="text-[14px] text-neutral-muted">{t('gallery.empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => openPhoto(photo)}
              className="aspect-square bg-neutral/5 border border-warm-border overflow-hidden hover:border-warm-border-hover transition-colors duration-200"
            >
              {photo.src && (
                <img
                  src={photo.src}
                  alt={photo.alt || ''}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <div className="fixed inset-0 z-[70] bg-warm-text/90 flex items-center justify-center p-4">
          <button
            onClick={closePhoto}
            className="absolute top-4 right-4 p-2 text-warm-white hover:text-warm-gold transition-colors"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>

          {gallery.photos.findIndex((p) => p.id === selectedPhoto.id) > 0 && (
            <button
              onClick={() => goToPhoto('prev')}
              className="absolute left-4 p-2 text-warm-white hover:text-warm-gold transition-colors"
              aria-label="Previous"
            >
              <FiChevronLeft size={24} />
            </button>
          )}

          {gallery.photos.findIndex((p) => p.id === selectedPhoto.id) < gallery.photos.length - 1 && (
            <button
              onClick={() => goToPhoto('next')}
              className="absolute right-4 p-2 text-warm-white hover:text-warm-gold transition-colors"
              aria-label="Next"
            >
              <FiChevronRight size={24} />
            </button>
          )}

          <div className="max-w-5xl max-h-[90vh]">
            {selectedPhoto.src && (
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt || ''}
                className="max-w-full max-h-[90vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
