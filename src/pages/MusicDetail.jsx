import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiPlay, FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'

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

export default function MusicDetail() {
  const { slug } = useParams()
  const music = useSelector((state) => state.content.latestMusic)
  const track = music.tracks.find((t) => t.slug === slug)
  const { t } = useTranslation()
  const [showPlayer, setShowPlayer] = useState(false)
  const [siteViewCount, setSiteViewCount] = useState(0)
  const playerRef = useRef(null)
  const trackedPlayRef = useRef(false)
  const embedUrl = track?.youtubeId ? `https://www.youtube.com/embed/${track.youtubeId}?autoplay=1` : null

  useEffect(() => {
    if (!track?.youtubeId) return

    const views = readTrackViews()
    setSiteViewCount(views[track.youtubeId] || 0)
    trackedPlayRef.current = false
  }, [track?.youtubeId])

  useEffect(() => {
    if (!showPlayer || !track?.youtubeId || typeof window === 'undefined') return

    const ensureYoutubeApi = () => {
      if (window.YT && window.YT.Player) {
        createPlayer()
        return
      }

      const scriptId = 'youtube-iframe-api'
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://www.youtube.com/iframe_api'
        script.onload = createPlayer
        document.body.appendChild(script)
      }

      window.onYouTubeIframeAPIReady = createPlayer
    }

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return

      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player(`youtube-player-${track.youtubeId}`, {
        videoId: track.youtubeId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING && !trackedPlayRef.current) {
              trackedPlayRef.current = true

              const views = readTrackViews()
              const nextCount = (views[track.youtubeId] || 0) + 1
              views[track.youtubeId] = nextCount

              localStorage.setItem(TRACK_VIEW_KEY, JSON.stringify(views))
              setSiteViewCount(nextCount)
            }
          },
        },
      })
    }

    ensureYoutubeApi()

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy()
      }
      playerRef.current = null
      trackedPlayRef.current = false
    }
  }, [showPlayer, track?.youtubeId])

  if (!track) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <p className="text-[14px] text-neutral-muted">{t('music.notFound')}</p>
        <Link to="/music" className="btn-secondary mt-4 inline-flex">
          {t('music.back')}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Link to="/music" className="inline-flex items-center gap-2 text-[13px] text-neutral-muted hover:text-neutral transition-colors mb-10">
        <FiArrowLeft size={14} />
        {t('music.back')}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="aspect-square bg-neutral/5 border border-warm-border overflow-hidden">
          {showPlayer && track.youtubeId ? (
            <div id={`youtube-player-${track.youtubeId}`} className="h-full w-full" />
          ) : track.cover ? (
            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FiPlay size={48} className="text-neutral-muted" />
            </div>
          )}
        </div>

        <div>
          <h1 className="section-heading mb-3">{track.title}</h1>
          {track.album && (
            <p className="text-[14px] text-neutral-muted mb-2">{track.album}</p>
          )}
          {track.releaseDate && (
            <p className="text-[12px] text-neutral-muted mb-6">
              {new Date(track.releaseDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
          <div className="mb-6 text-[12px] uppercase tracking-[0.18em] text-neutral-muted">
            Site views: {formatViewCount(siteViewCount)}
          </div>
          {track.description && (
            <p className="text-[15px] text-neutral-muted leading-relaxed mb-8">
              {track.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowPlayer(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <FiPlay size={14} />
              {t('music.play')}
            </button>
            {track.video && (
              <a
                href={track.video}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                {t('music.watchVideo')}
              </a>
            )}
          </div>
        </div>
      </div>

      {music.tracks.filter((t) => t.slug !== slug).length > 0 && (
        <div className="mt-20">
          <h2 className="section-heading-sm mb-8">{t('music.related')}</h2>
          <div className="border border-warm-border">
            {music.tracks
              .filter((t) => t.slug !== slug)
              .slice(0, 4)
              .map((related, i) => (
                <Link
                  key={related.id}
                  to={`/music/${related.slug}`}
                  className="track-row group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-[13px] text-neutral-muted font-mono w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[14px] font-medium text-neutral truncate group-hover:text-accent transition-colors">
                      {related.title}
                    </p>
                  </div>
                  <span className="text-[12px] text-neutral-muted group-hover:text-neutral transition-colors ml-4">
                    {t('music.listen')}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
