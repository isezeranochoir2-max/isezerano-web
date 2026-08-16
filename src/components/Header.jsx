import { useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import MobileMenu from './MobileMenu'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { useTranslation } from '../hooks/useTranslation'
import { CONTACT_ROUTE, NAV_ITEMS } from '../config/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  const isActive = (path) => location.pathname === path

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-warm-border bg-[rgba(247,243,238,0.92)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="font-editorial text-[18px] font-semibold tracking-[0.08em] text-neutral hover:text-accent transition-colors duration-200"
            >
              ISEZERANO
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-5">
              <Link
                to={CONTACT_ROUTE}
                className={`nav-link ${isActive(CONTACT_ROUTE) ? 'nav-link-active' : ''}`}
              >
                {t('nav.contact')}
              </Link>
              <div className="w-px h-4 bg-warm-border" />
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <LanguageToggle />
              <button
                onClick={() => {
                  console.log('Header: hamburger clicked, opening menu')
                  setMenuOpen(true)
                }}
                className="p-2 -mr-2 text-neutral hover:text-accent transition-colors"
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <FiMenu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={handleCloseMenu} />
    </>
  )
}
