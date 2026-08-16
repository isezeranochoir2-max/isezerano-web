import { useDispatch, useSelector } from 'react-redux'
import { FiSun, FiMoon } from 'react-icons/fi'
import { toggleTheme } from '../store/slices/themeSlice'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 text-neutral-muted hover:text-neutral transition-colors rounded-md"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  )
}
