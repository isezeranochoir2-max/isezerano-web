import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'

export default function Albums() {
  const music = useSelector((state) => state.content.latestMusic)
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="section-label mb-4">{t('music.label')}</p>
        <h1 className="section-heading mb-8">{t('music.albums')}</h1>
      </div>

      {music.albums.length === 0 ? (
        <div className="py-20">
          <p className="text-[14px] text-neutral-muted">No albums released yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {music.albums.map((album) => (
            <Link
              key={album.id}
              to={`/albums/${album.slug}`}
              className="group"
            >
              <div className="aspect-square bg-neutral/5 border border-neutral/10 overflow-hidden mb-3">
                  {album.cover && (
                    <img
                      src={album.cover}
                      alt={album.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
              </div>
              <p className="text-[13px] font-medium text-neutral truncate group-hover:text-accent transition-colors">
                {album.title}
              </p>
              <p className="text-[12px] text-neutral-muted">{album.year}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
