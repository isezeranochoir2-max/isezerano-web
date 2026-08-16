import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'

export default function Ministry() {
  const ministry = useSelector((state) => state.content.ministry)
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Seo title="Ministry Isezerano Choir" description="Our ministry extends beyond the choir loft into the heart of our community." path="/ministry" />
      <div className="max-w-3xl">
        <p className="section-label mb-4">{t('ministry.label')}</p>
        <h1 className="section-heading mb-8">{t('ministry.heading')}</h1>
        <p className="text-[15px] text-neutral-muted leading-relaxed mb-12">
          {t('ministry.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ministry.activities.map((activity) => (
          <div
            key={activity.id}
            className="border border-warm-border p-6 hover:border-warm-border-hover transition-colors duration-200"
          >
            <p className="text-[14px] font-medium text-neutral mb-2">{t(`ministry.${activity.id}`)}</p>
            <p className="text-[13px] text-neutral-muted leading-relaxed">{t(`ministry.${activity.id}Desc`)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
