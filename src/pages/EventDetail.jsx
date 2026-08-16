import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiArrowLeft, FiMapPin } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'

export default function EventDetail() {
  const { slug } = useParams()
  const events = useSelector((state) => state.content.upcomingEvent)
  const event = events.event?.slug === slug ? events.event : null
  const { t } = useTranslation()

  if (!event) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <p className="text-[14px] text-neutral-muted">{t('events.notFound')}</p>
        <Link to="/events" className="btn-secondary mt-4 inline-flex">
          {t('events.back')}
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Link to="/events" className="inline-flex items-center gap-2 text-[13px] text-neutral-muted hover:text-neutral transition-colors mb-10">
        <FiArrowLeft size={14} />
        {t('events.back')}
      </Link>

      <div className="max-w-3xl">
        <div className="flex items-center gap-6 mb-8">
            <div className="shrink-0 text-center">
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-neutral-muted">
              {new Date(event.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
            </p>
            <p className="text-4xl font-editorial font-semibold text-neutral leading-none">
              {new Date(event.date).getDate()}
            </p>
          </div>
          <div>
            <h1 className="section-heading mb-2">{event.title}</h1>
            {event.time && (
              <p className="text-[14px] text-neutral-muted">{event.time}</p>
            )}
          </div>
        </div>

        {event.location && (
          <div className="flex items-start gap-2 mb-6 text-[13px] text-warm-muted">
            <FiMapPin size={14} className="mt-0.5 shrink-0" />
            <span>{event.location}</span>
          </div>
        )}

        {event.image && (
          <div className="aspect-video bg-neutral/5 border border-neutral/10 overflow-hidden mb-8">
            <img src={event.image} alt={event.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
        )}

        {event.description && (
          <p className="text-[15px] text-neutral-muted leading-relaxed mb-8">
            {event.description}
          </p>
        )}

        {event.location && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <FiMapPin size={14} />
            {t('events.getDirections')}
          </a>
        )}
      </div>
    </div>
  )
}
