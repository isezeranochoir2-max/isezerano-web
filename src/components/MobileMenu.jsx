import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'
import { CONTACT_ROUTE, NAV_ITEMS } from '../config/navigation'

const mobileNavItems = [...NAV_ITEMS, { path: CONTACT_ROUTE, labelKey: 'nav.contact' }]

export default function MobileMenu({ open, onClose }) {
  const location = useLocation()
  const { t } = useTranslation()

  // debug: log open prop to help trace why menu isn't visible
  // eslint-disable-next-line no-console
  console.log('MobileMenu render, open=', open)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    onClose()
  }, [location.pathname, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] bg-surface/80 backdrop-blur-lg flex flex-col">
      <div className="flex items-center justify-between px-6 h-14 border-b border-warm-border shrink-0">
        <span className="font-editorial text-[17px] font-semibold tracking-tight text-neutral">
          ISEZERANO
        </span>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-neutral hover:text-accent transition-colors"
          aria-label="Close menu"
        >
          <FiX size={18} />
        </button>
      </div>

      <nav className="px-6 py-10 overflow-y-auto flex-1">
        <ul className="space-y-0">
          {mobileNavItems.map((item, index) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block py-4 text-[16px] font-medium text-neutral border-b border-warm-border/50 hover:text-accent transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={onClose}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
