import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'

const TRACK_VIEW_KEY = 'isezerano_site_track_views'

function readTrackViews() {
  if (typeof window === 'undefined') return {}

  try {
    return JSON.parse(localStorage.getItem(TRACK_VIEW_KEY) || '{}')
  } catch (error) {
    console.error('Unable to read track view stats:', error)
    return {}
  }
}

function formatViewCount(value) {
  const count = Number(value) || 0

  if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(count)
  }

  return String(count)
}

export default function Music() {
  const music = useSelector((state) => state.content.latestMusic)
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Seo title="Music Isezerano Choir" description="Listen to the latest music from Isezerano Choir." path="/music" />
      <div className="max-w-3xl">
        <p className="section-label mb-4">{t('music.label')}</p>
        <h1 className="section-heading mb-8">{t('music.heading')}</h1>
      </div>

      {music.tracks.length === 0 ? (
        <div className="py-20 rounded-[24px] border border-warm-border bg-white/20">
          <p className="text-[14px] text-neutral-muted">{t('music.empty')}</p>
          <p className="text-[13px] text-neutral-muted mt-2">{t('music.emptySub')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {music.tracks.map((track, i) => (
            <article
              key={track.id}
              className="group overflow-hidden rounded-[24px] border border-warm-border bg-white/20 transition-all duration-200 hover:-translate-y-1 hover:border-warm-border-hover"
            >
              <Link to={`/music/${track.slug}`} className="block">
                <div className="aspect-video overflow-hidden border-b border-warm-border bg-neutral/5">
                  {track.thumbnail || track.cover ? (
                    <img
                      src={track.thumbnail || track.cover}
                      alt={track.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-neutral-muted text-[12px] uppercase tracking-[0.2em]">
                      Video
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-warm-border bg-white/40 text-[11px] text-neutral-muted font-mono shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {track.video && (
                      <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-muted">
                        {t('music.watch')}
                      </span>
                    )}
                  </div>
                  <p className="text-[15px] font-medium text-neutral group-hover:text-accent transition-colors line-clamp-2">
                    {track.title}
                  </p>
                  {track.album && (
                    <p className="mt-2 text-[12px] text-neutral-muted">{track.album}</p>
                  )}
                  {track.releaseDate && (
                    <p className="mt-2 text-[11px] text-neutral-muted">
                      {new Date(track.releaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-warm-border pt-3">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-muted">Site views</span>
                    <span className="text-[12px] font-medium text-neutral">
                      {formatViewCount(readTrackViews()[track.youtubeId || track.id] || 0)}
                    </span>
                  </div>
                </div>
              </Link>

              {track.video && (
                <div className="px-4 pb-4">
                  <a
                    href={track.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[12px] font-medium text-accent hover:text-neutral transition-colors"
                  >
                    {t('music.watchVideo')}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {music.albums.length > 0 && (
        <div className="mt-16">
          <h2 className="section-heading-sm mb-8">{t('music.albums')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {music.albums.map((album) => (
              <Link
                key={album.id}
                to={`/albums/${album.slug}`}
                className="group rounded-[20px] border border-warm-border bg-white/20 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-warm-border-hover"
              >
                <div className="aspect-square bg-neutral/5 border border-warm-border overflow-hidden mb-3 rounded-[14px]">
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
        </div>
      )}
    </div>
  )
}
