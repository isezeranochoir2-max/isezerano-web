import { useSelector } from 'react-redux'
import { translations } from '../data/translations'

export function useTranslation() {
  const language = useSelector((state) => state.language.language)

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  return { t, language }
}
