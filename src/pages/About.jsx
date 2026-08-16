import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'

export default function About() {
  const about = useSelector((state) => state.content.about)
  const story = useSelector((state) => state.content.story)
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Seo title="About Isezerano Choir" description="Learn about Isezerano Choir, our story, and our ministry at ADEPR Kabuga Ville." path="/about" />
      <div className="max-w-3xl">
        <p className="section-label mb-4">{t('about.label')}</p>
        <h1 className="section-heading mb-8">{t('about.heading')}</h1>
        <p className="text-[15px] text-neutral-muted leading-relaxed mb-8">
          {t('about.description')}
        </p>

        {story.milestones.length > 0 && (
          <div className="mt-16">
            <h2 className="section-heading-sm mb-10">{t('story.heading')}</h2>
            <div className="space-y-0">
              {story.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex gap-6 md:gap-10 py-6 border-b border-warm-border last:border-b-0"
                >
                  <span className="text-[12px] font-mono text-neutral-muted w-16 shrink-0 pt-1">
                    {milestone.year}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium text-neutral mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-[13px] text-neutral-muted leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
