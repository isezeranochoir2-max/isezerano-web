import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Music = lazy(() => import('./pages/Music'))
const MusicDetail = lazy(() => import('./pages/MusicDetail'))
const Albums = lazy(() => import('./pages/Albums'))
const AlbumDetail = lazy(() => import('./pages/AlbumDetail'))
const Events = lazy(() => import('./pages/Events'))
const EventDetail = lazy(() => import('./pages/EventDetail'))
const Ministry = lazy(() => import('./pages/Ministry'))
const MinistryDetail = lazy(() => import('./pages/MinistryDetail'))
const Gallery = lazy(() => import('./pages/Gallery'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Contact = lazy(() => import('./pages/Contact'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-6 h-6 border-2 border-warm-border border-t-neutral rounded-full animate-spin" />
    </div>
  )
}

function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
      <p className="section-label mb-4">404</p>
      <h1 className="section-heading mb-6">Page not found</h1>
      <p className="text-[15px] text-warm-muted leading-relaxed mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <a href="/" className="btn-primary inline-flex">Back to homepage</a>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        <Route path="/music/:slug" element={<MusicDetail />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:slug" element={<AlbumDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/ministry" element={<Ministry />} />
        <Route path="/ministry/:slug" element={<MinistryDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
