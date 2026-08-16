import { useState } from 'react'
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'
import Seo from '../components/Seo'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    await new Promise((resolve) => setTimeout(resolve, 800))

    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
      <Seo title="Contact Isezerano Choir" description="Get in touch with Isezerano Choir ADEPR Kabuga Ville." path="/contact" />
        <div className="max-w-3xl">
        <p className="section-label mb-4">{t('contact.heading').toUpperCase()}</p>
        <h1 className="section-heading mb-4">{t('contact.heading')}</h1>
        <p className="text-[15px] text-neutral-muted leading-relaxed mb-12">{t('contact.subheading')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-[12px] font-medium text-neutral-muted mb-2">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 text-[14px] bg-transparent border border-warm-border focus:border-neutral focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[12px] font-medium text-neutral-muted mb-2">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 text-[14px] bg-transparent border border-warm-border focus:border-neutral focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[12px] font-medium text-neutral-muted mb-2">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 text-[14px] bg-transparent border border-warm-border focus:border-neutral focus:outline-none transition-colors resize-none"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : t('contact.send')}
            </button>
            {status === 'success' && (
              <p className="text-[13px] text-primary mt-3">Message sent successfully. We will get back to you soon.</p>
            )}
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-muted mb-4">
              {t('contact.emailLabel')}
            </h3>
            <a href="mailto:isezeranochoir1@gmail.com" className="text-[14px] text-neutral hover:text-accent transition-colors">
              isezeranochoir1@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-muted mb-4">
              {t('contact.phoneLabel')}
            </h3>
            <a href="tel:+250788000000" className="text-[14px] text-neutral hover:text-accent transition-colors">
              +250 788 000 000
            </a>
          </div>
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-muted mb-4">
              {t('contact.locationLabel')}
            </h3>
            <p className="text-[14px] text-neutral">ADEPR Kabuga Ville, Kigali, Rwanda</p>
          </div>
        </div>
      </div>
    </div>
  )
}
