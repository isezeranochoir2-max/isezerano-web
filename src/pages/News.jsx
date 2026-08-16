import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'

export default function News() {
  const news = useSelector((state) => state.content.news)
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Seo title="News Isezerano Choir" description="Latest news and updates from Isezerano Choir." path="/news" />
      <div className="max-w-3xl">
        <p className="section-label mb-4">{t('news.label')}</p>
        <h1 className="section-heading mb-12">{t('news.heading')}</h1>
      </div>

      {news.articles.length === 0 ? (
        <div className="py-20 rounded-[24px] border border-warm-border bg-white/20">
          <p className="text-[14px] text-neutral-muted">{t('news.empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.articles.map((article) => (
            <article key={article.id} className="group rounded-[22px] border border-warm-border bg-white/20 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-warm-border-hover">
              {article.image && (
                <div className="aspect-[16/10] bg-neutral/5 border border-warm-border overflow-hidden mb-4 rounded-[14px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <time className="text-[11px] text-neutral-muted tracking-[0.16em] uppercase block mb-3">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h3 className="text-[18px] font-medium text-neutral mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-[13px] text-neutral-muted leading-relaxed line-clamp-2 mb-4">
                {article.excerpt}
              </p>
              <Link to={`/news/${article.slug}`} className="text-[13px] font-medium text-neutral hover:text-accent transition-colors">
                {t('news.readArticle')} &rarr;
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
