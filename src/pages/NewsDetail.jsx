import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'

export default function NewsDetail() {
  const { slug } = useParams()
  const news = useSelector((state) => state.content.news)
  const article = news.articles.find((a) => a.slug === slug)
  const { t } = useTranslation()

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <p className="text-[14px] text-neutral-muted">Article not found.</p>
        <Link to="/news" className="btn-secondary mt-4 inline-flex">
          Back to news
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Link to="/news" className="inline-flex items-center gap-2 text-[13px] text-neutral-muted hover:text-neutral transition-colors mb-10">
        <FiArrowLeft size={14} />
        Back to news
      </Link>

      <article className="max-w-3xl">
        <time className="text-[11px] text-neutral-muted tracking-wide uppercase block mb-4">
          {new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className="section-heading mb-6">{article.title}</h1>
        {article.image && (
          <div className="aspect-video bg-neutral/5 border border-neutral/10 overflow-hidden mb-8">
            <img src={article.image} alt={article.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
        )}
        <p className="text-[15px] text-neutral-muted leading-relaxed">
          {article.content || article.excerpt}
        </p>
      </article>
    </div>
  )
}
