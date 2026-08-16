import { useEffect, useRef, useState } from 'react'

export default function useScrollDirection(options = {}) {
  const { threshold = 0, smooth = true } = options
  const [state, setState] = useState({
    direction: 'down',
    scrollY: 0,
    velocity: 0,
    isScrolling: false,
  })
  const lastY = useRef(0)
  const lastTime = useRef(Date.now())
  const raf = useRef(null)

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const dt = now - lastTime.current
      const y = window.scrollY
      const dy = y - lastY.current

      let direction = state.direction
      let velocity = 0
      let isScrolling = false

      if (Math.abs(dy) > threshold) {
        direction = dy > 0 ? 'down' : 'up'
        velocity = dt > 0 ? Math.abs(dy) / dt : 0
        isScrolling = true
      }

      setState((prev) => {
        const next = { direction, scrollY: y, velocity, isScrolling }
        if (
          next.direction === prev.direction &&
          next.scrollY === prev.scrollY &&
          next.velocity === prev.velocity &&
          next.isScrolling === prev.isScrolling
        ) {
          return prev
        }
        return next
      })

      lastY.current = y
      lastTime.current = now
      raf.current = null
    }

    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(tick)
    }

    const onScrollEnd = () => {
      setState((prev) => ({ ...prev, isScrolling: false, velocity: 0 }))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    const endTimer = setInterval(onScrollEnd, 150)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(endTimer)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [threshold])

  return state
}
