import { useDispatch, useSelector } from 'react-redux'
import { toggleLanguage } from '../store/slices/languageSlice'

export default function LanguageToggle() {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language.language)

  return (
    <button
      onClick={() => dispatch(toggleLanguage())}
      className="text-[11px] font-semibold text-neutral-muted hover:text-neutral transition-colors px-3 py-1 border border-warm-border hover:border-warm-border-hover min-w-[44px] rounded-md bg-transparent"
      aria-label="Toggle language"
    >
      {language === 'kin' ? 'EN' : 'KIN'}
    </button>
  )
}
