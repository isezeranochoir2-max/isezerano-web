import { useRef, useState, useEffect, useCallback } from 'react'

export function useSpatialTilt(options = {}) {
  const { max = 8, perspective = 1000, scale = 1.02 } = options
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const handleMove = useCallback(
    (e) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -max
      const rotateY = ((x - centerX) / centerX) * max
      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale},${scale},${scale})`,
        transition: 'transform 0.1s ease-out',
      })
    },
    [max, perspective, scale]
  )

  const handleLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`,
      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    })
  }, [perspective])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)
    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
    }
  }, [handleMove, handleLeave])

  return { ref, style }
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewCenter = window.innerHeight / 2
      const delta = center - viewCenter
      setOffset(delta * speed)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  const style = {
    transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
    willChange: 'transform',
  }

  return { ref, style }
}
