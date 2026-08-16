import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'

export default function MinistryDetail() {
  const { slug } = useParams()
  const ministry = useSelector((state) => state.content.ministry)
  const activity = ministry.activities.find((a) => a.id === slug)
  const { t } = useTranslation()

  if (!activity) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <p className="text-[14px] text-neutral-muted">Activity not found.</p>
        <Link to="/ministry" className="btn-secondary mt-4 inline-flex">
          Back to ministry
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Link to="/ministry" className="inline-flex items-center gap-2 text-[13px] text-neutral-muted hover:text-neutral transition-colors mb-10">
        <FiArrowLeft size={14} />
        Back to ministry
      </Link>

      <div className="max-w-3xl">
        <h1 className="section-heading mb-4">{t(`ministry.${activity.id}`)}</h1>
        <p className="text-[15px] text-neutral-muted leading-relaxed">
          {t(`ministry.${activity.id}Desc`)}
        </p>
      </div>
    </div>
  )
}
