import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import { AppRoutes } from './router'
import { fetchLatestMusic } from './store/slices/contentSlice'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLatestMusic())
  }, [dispatch])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-surface text-neutral selection-surface">
      <Header />
      <main className="spatial-shell flex-1 pt-14">
        <div className="ambient-glow ambient-glow-one" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-two" aria-hidden="true" />
        <div className="spatial-grid" aria-hidden="true" />
        <div data-reveal className="scroll-reveal scroll-reveal-soft">
          <AppRoutes />
        </div>
      </main>
      <Footer />
    </div>
  )
}
