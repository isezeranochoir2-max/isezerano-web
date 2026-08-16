import { Link } from 'react-router-dom'
import { FiYoutube, FiInstagram, FiFacebook } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useTranslation } from '../hooks/useTranslation'
import { CONTACT_ROUTE, NAV_ITEMS } from '../config/navigation'

const footerLinks = [...NAV_ITEMS.map((item) => item.path), CONTACT_ROUTE]

export default function Footer() {
  const footer = useSelector((state) => state.content.footer)
  const { t } = useTranslation()

  return (
    <footer className="border-t border-warm-border bg-white/20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <h3 className="font-editorial text-[17px] font-semibold text-neutral mb-3 tracking-[0.08em]">
              {footer.name}
            </h3>
            <p className="text-[13px] text-neutral-muted leading-relaxed max-w-xs">
              {footer.address}
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-warm-muted mb-5">
              Navigate
            </h4>
            <nav className="flex flex-wrap gap-x-6 gap-y-2.5">
              {footerLinks.map((link) => {
                const navItem = [...NAV_ITEMS, { path: CONTACT_ROUTE, labelKey: 'nav.contact' }].find(
                  (item) => item.path === link,
                )

                return (
                  <Link
                    key={link}
                    to={link}
                    className="text-[13px] text-neutral-muted hover:text-neutral transition-colors"
                  >
                    {navItem ? t(navItem.labelKey) : 'Link'}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-muted mb-5">
              Follow
            </h4>
            <div className="flex items-center gap-6">
              {footer.social.youtube && (
                <a
                  href={footer.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-muted hover:text-neutral transition-colors"
                  aria-label="YouTube"
                >
                  <FiYoutube size={17} />
                </a>
              )}
              {footer.social.instagram && (
                <a
                  href={footer.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-muted hover:text-neutral transition-colors"
                  aria-label="Instagram"
                >
                  <FiInstagram size={17} />
                </a>
              )}
              {footer.social.facebook && (
                <a
                  href={footer.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-muted hover:text-neutral transition-colors"
                  aria-label="Facebook"
                >
                  <FiFacebook size={17} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-warm-border">
          <p className="text-[12px] text-neutral-muted" dangerouslySetInnerHTML={{ __html: t('footer.copyright') }} />
        </div>
      </div>
    </footer>
  )
}
