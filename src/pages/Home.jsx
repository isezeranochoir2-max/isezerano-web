import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiPlay, FiBookOpen, FiMusic, FiCalendar, FiHeart, FiInstagram, FiFacebook } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'
import HeroSlider from '../components/HeroSlider'
import img1 from '../assets/hero_igm/5Z7A8457.jpg.jpeg'
import img2 from '../assets/hero_igm/PXL_20260315_060047996.jpg.jpeg'
import img3 from '../assets/hero_igm/WhatsApp Image 2026-03-04 at 23.23.14.jpeg'

export default function Home() {
  const content = useSelector((state) => state.content)
  const { t } = useTranslation()

  return (
    <div>
      <Seo />

      <section className="relative overflow-hidden border-b border-warm-border/80 bg-primary" data-reveal>
        <HeroSlider images={[img1, img2, img3]} overlayOpacity={0.8} />

        <div className="relative max-w-6xl mx-auto px-6 md:px-8 min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 md:py-28">
          <div className="max-w-3xl text-center relative z-10" data-reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-warm-white/80 mb-5">
              {t('hero.subtitle')}
            </p>
            <h1 className="font-editorial text-[42px] md:text-[62px] lg:text-[72px] font-semibold text-warm-white leading-[0.96] tracking-[-0.04em] mb-5">
              {t('hero.title')}
            </h1>
            <p className="text-[15px] md:text-[17px] text-warm-white/80 leading-relaxed mb-8 max-w-xl text-balance">
              {t('hero.mission')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/music" className="btn-primary border-white bg-white text-neutral hover:bg-accent hover:border-accent hover:text-white">
                <FiPlay size={14} />
                {t('hero.ctaMusic')}
              </Link>
              <Link to="/about" className="btn-secondary border-white/35 bg-transparent text-white hover:bg-white/10 hover:border-white/60 hover:text-white">
                <FiBookOpen size={14} />
                {t('hero.ctaStory')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-warm-border" data-reveal>
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: FiMusic, labelKey: 'discovery.music', descKey: 'discovery.musicDesc', href: '/music' },
              { icon: FiCalendar, labelKey: 'discovery.events', descKey: 'discovery.eventsDesc', href: '/events' },
              { icon: FiHeart, labelKey: 'discovery.ministry', descKey: 'discovery.ministryDesc', href: '/ministry' },
              { icon: FiBookOpen, labelKey: 'discovery.story', descKey: 'discovery.storyDesc', href: '/about' },
            ].map((item) => (
              <Link
                key={item.labelKey}
                to={item.href}
                className="spatial-panel group rounded-[18px] bg-white/20 p-5 transition-all duration-200 hover:border-warm-border-hover hover:bg-white/40"
                data-reveal
              >
                <item.icon size={18} className="mb-4 text-accent transition-colors duration-200" />
                <p className="text-[13px] font-medium text-neutral mb-1.5">{t(item.labelKey)}</p>
                <p className="text-[12px] text-neutral-muted">{t(item.descKey)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-warm-border" data-reveal>
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div data-reveal>
              <p className="section-label mb-4">{t('about.label')}</p>
              <h2 className="section-heading mb-6">{t('about.heading')}</h2>
              <p className="text-[15px] text-neutral-muted leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <Link to="/about" className="btn-primary">
                {t('about.cta')}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="spatial-panel rounded-[28px] bg-gradient-to-br from-warm-green-soft to-white p-4 shadow-sm" data-reveal>
              <div className="aspect-[4/3] overflow-hidden rounded-[22px] border border-warm-border/80 bg-neutral/5">
                {content.about.image ? (
                  <img
                    src={content.about.image}
                    alt="Isezerano Choir photograph"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-center px-6">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-neutral-muted mb-3">Choir photograph</p>
                      <p className="text-[18px] font-editorial text-neutral">Worship in unity</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Music */}
      <section className="border-b border-warm-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="section-label mb-4">{t('music.label')}</p>
          <h2 className="section-heading mb-8">{t('music.heading')}</h2>

          {content.latestMusic.tracks.length === 0 ? (
            <div className="py-10">
              <p className="text-[14px] text-neutral-muted">{t('music.empty')}</p>
              <Link to="/music" className="btn-secondary mt-4 inline-flex">
                {t('music.browse')}
              </Link>
            </div>
          ) : (
            <div className="border border-warm-border">
              {content.latestMusic.tracks.slice(0, 4).map((track, i) => (
                <Link
                  key={track.id}
                  to={`/music/${track.slug}`}
                  className="track-row group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-[13px] text-neutral-muted font-mono w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-neutral truncate group-hover:text-accent transition-colors">
                        {track.title}
                      </p>
                      {track.album && (
                        <p className="text-[12px] text-neutral-muted">{track.album}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    {track.video && (
                      <span className="text-[12px] text-neutral-muted group-hover:text-neutral transition-colors">
                        {t('music.watch')}
                      </span>
                    )}
                    <span className="text-[12px] text-neutral-muted group-hover:text-neutral transition-colors">
                      {t('music.listen')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Event */}
      <section className="border-b border-warm-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="section-label mb-4">{t('events.label')}</p>
          <h2 className="section-heading mb-8">{t('events.heading')}</h2>

          {content.upcomingEvent.event ? (
            <div className="event-card max-w-2xl">
              <div className="flex items-start gap-6">
                <div className="shrink-0 text-center">
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-warm-muted">
                    {new Date(content.upcomingEvent.event.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                  </p>
                  <p className="text-2xl font-editorial font-semibold text-warm-text leading-none">
                    {new Date(content.upcomingEvent.event.date).getDate()}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-medium text-warm-text mb-1">
                    {content.upcomingEvent.event.title}
                  </h3>
                  {content.upcomingEvent.event.location && (
                    <p className="text-[13px] text-warm-muted mb-2">
                      {content.upcomingEvent.event.location}
                    </p>
                  )}
                  {content.upcomingEvent.event.description && (
                    <p className="text-[13px] text-warm-muted leading-relaxed line-clamp-2">
                      {content.upcomingEvent.event.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <Link to={`/events/${content.upcomingEvent.event.slug}`} className="btn-primary">
                  {t('events.viewEvent')}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-10">
              <p className="text-[14px] text-warm-muted">{t('events.empty')}</p>
              <Link to="/events" className="btn-secondary mt-4 inline-flex">
                {t('events.emptySub')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Ministry */}
      <section className="border-b border-warm-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="section-label mb-4">{t('ministry.label')}</p>
              <h2 className="section-heading mb-6">{t('ministry.heading')}</h2>
              <p className="text-[15px] text-warm-muted leading-relaxed mb-8">
                {t('ministry.description')}
              </p>
              <Link to="/ministry" className="btn-primary">
                {t('ministry.cta')}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-3">
              {content.ministry.activities.slice(0, 4).map((activity) => (
                <div
                  key={activity.id}
                  className="border border-warm-border p-5 hover:border-warm-border-hover transition-colors duration-200"
                >
                  <p className="text-[13px] font-medium text-warm-text mb-1">{t(`ministry.${activity.id}`)}</p>
                  <p className="text-[12px] text-warm-muted leading-relaxed line-clamp-2">
                    {t(`ministry.${activity.id}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="border-b border-warm-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="section-label mb-4">{t('story.label')}</p>
          <h2 className="section-heading mb-10">{t('story.heading')}</h2>

          {content.story.milestones.length === 0 ? (
            <div className="py-10">
              <p className="text-[14px] text-warm-muted">{t('story.preparing')}</p>
              <Link to="/about" className="btn-secondary mt-4 inline-flex">
                {t('story.learnMore')}
              </Link>
            </div>
          ) : (
            <div className="space-y-0">
              {content.story.milestones.map((milestone) => (
                <div key={milestone.id} className="flex gap-6 md:gap-10 py-6 border-b border-warm-border last:border-b-0">
                  <span className="text-[12px] font-mono text-warm-muted w-16 shrink-0 pt-1">
                    {milestone.year}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium text-warm-text mb-1">{milestone.title}</h3>
                    <p className="text-[13px] text-warm-muted leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="border-b border-warm-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <p className="section-label mb-4">{t('gallery.label')}</p>
          <div className="flex items-end justify-between mb-8">
            <h2 className="section-heading">{t('gallery.heading')}</h2>
            <Link to="/gallery" className="btn-secondary hidden md:inline-flex">
              {t('gallery.viewGallery')}
            </Link>
          </div>

          {content.gallery.photos.length === 0 ? (
            <div className="py-10">
              <p className="text-[14px] text-warm-muted">{t('gallery.empty')}</p>
              <Link to="/gallery" className="btn-secondary mt-4 inline-flex md:hidden">
                {t('gallery.viewGallery')}
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {content.gallery.photos.slice(0, 4).map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square bg-warm-text/5 border border-warm-border overflow-hidden"
                  >
                    {photo.src && (
                      <img
                        src={photo.src}
                        alt={photo.alt || ''}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center md:text-left">
                <Link to="/gallery" className="btn-secondary inline-flex">
                  {t('gallery.morePhotos')}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* News */}
      <section className="border-b border-warm-text/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20">
          <p className="section-label mb-4">{t('news.label')}</p>
          <div className="flex items-end justify-between mb-8">
            <h2 className="section-heading">{t('news.heading')}</h2>
            <Link to="/news" className="btn-secondary hidden md:inline-flex">
              {t('news.readAll')}
            </Link>
          </div>

          {content.news.articles.length === 0 ? (
            <div className="py-10">
              <p className="text-[14px] text-warm-muted">{t('news.empty')}</p>
              <Link to="/news" className="btn-secondary mt-4 inline-flex md:hidden">
                {t('news.readAll')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.news.articles.slice(0, 3).map((article) => (
                <article key={article.id} className="group">
                  {article.image && (
                    <div className="aspect-[16/10] bg-warm-text/5 border border-warm-text/10 overflow-hidden mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    </div>
                  )}
                  <time className="text-[11px] text-warm-muted tracking-wide uppercase block mb-2">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h3 className="text-[15px] font-medium text-warm-text mb-2 group-hover:text-warm-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-warm-muted leading-relaxed line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <Link to={`/news/${article.slug}`} className="text-[13px] font-medium text-warm-text hover:text-warm-gold transition-colors">
                    {t('news.readArticle')} &rarr;
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stay Connected */}
      <section className="border-b border-warm-text/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20">
          <div className="max-w-xl">
            <p className="section-label mb-4">{t('stayConnected.label')}</p>
            <h2 className="section-heading mb-4">{t('stayConnected.heading')}</h2>
            <p className="text-[15px] text-warm-muted leading-relaxed mb-8">
              {t('stayConnected.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={content.contact.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FiPlay size={14} />
                YouTube
              </a>
              <a
                href={content.contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FiInstagram size={14} />
                Instagram
              </a>
              <a
                href={content.contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FiFacebook size={14} />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
