import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'

export default function AlbumDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Link to="/music" className="inline-flex items-center gap-2 text-[13px] text-neutral-muted hover:text-neutral transition-colors mb-10">
        <FiArrowLeft size={14} />
        {t('music.back')}
      </Link>
      <p className="text-[14px] text-neutral-muted">Album detail page coming soon.</p>
    </div>
  )
}
