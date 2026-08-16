import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'

export default function Events() {
  const events = useSelector((state) => state.content.upcomingEvent)
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Seo title="Events Isezerano Choir" description="Upcoming events from Isezerano Choir ADEPR Kabuga Ville." path="/events" />
      <div className="max-w-3xl">
        <p className="section-label mb-4">{t('events.label')}</p>
        <h1 className="section-heading mb-12">{t('events.heading')}</h1>
      </div>

      {events.event ? (
        <div className="event-card max-w-3xl rounded-[28px] bg-white/25 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="shrink-0 flex items-center justify-center rounded-[20px] border border-warm-border bg-surface-soft px-5 py-4 md:min-w-[120px] md:min-h-[120px]">
              <div className="text-center">
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-neutral-muted">
                  {new Date(events.event.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                </p>
                <p className="text-4xl font-editorial font-semibold text-neutral leading-none mt-2">
                  {new Date(events.event.date).getDate()}
                </p>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-neutral-muted mb-3">Upcoming</p>
              <h2 className="text-[24px] md:text-[30px] font-editorial text-neutral mb-2">
                {events.event.title}
              </h2>
              {events.event.time && (
                <p className="text-[13px] text-neutral-muted mb-1">{events.event.time}</p>
              )}
              {events.event.location && (
                <p className="text-[13px] text-neutral-muted mb-3">
                  {events.event.location}
                </p>
              )}
              {events.event.description && (
                <p className="text-[14px] text-neutral-muted leading-relaxed line-clamp-3">
                  {events.event.description}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Link to={`/events/${events.event.slug}`} className="btn-primary">
              {t('events.viewEvent')}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="py-20 rounded-[24px] border border-warm-border bg-white/20">
          <p className="text-[14px] text-warm-muted">{t('events.empty')}</p>
          <p className="text-[13px] text-warm-muted mt-2">{t('events.emptySub')}</p>
        </div>
      )}
    </div>
  )
}
