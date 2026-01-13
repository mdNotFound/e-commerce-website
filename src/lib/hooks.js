import { useState, useEffect, useRef, useCallback } from 'react'
import { lerp } from './utils'

// Hook for scroll progress (0 to 1)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(scrollProgress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return progress
}

// Hook for scroll position
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return scrollY
}

// Hook for detecting if scrolled past threshold
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])
  
  return scrolled
}

// Hook for mouse position
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return position
}

// Hook for smooth mouse position (lerped)
export function useSmoothMouse(lerpFactor = 0.1) {
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    
    const animate = () => {
      setSmoothPosition(prev => ({
        x: lerp(prev.x, targetRef.current.x, lerpFactor),
        y: lerp(prev.y, targetRef.current.y, lerpFactor)
      }))
      rafRef.current = requestAnimationFrame(animate)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [lerpFactor])
  
  return smoothPosition
}

// Hook for element in viewport
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (!options.repeat) {
          setHasAnimated(true)
          observer.unobserve(element)
        }
      } else if (options.repeat) {
        setIsInView(false)
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    })
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.repeat])
  
  return { ref, isInView, hasAnimated }
}

// Hook for media queries
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])
  
  return matches
}

// Responsive breakpoint hooks
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}

// Hook for window size
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return size
}

// Hook for magnetic effect
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    setPosition({ x: deltaX, y: deltaY })
  }, [strength])
  
  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])
  
  return { ref, position, handleMouseMove, handleMouseLeave }
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const parallaxOffset = (scrollProgress - 0.5) * speed * 100
      
      setOffset(parallaxOffset)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])
  
  return { ref, offset }
}

// Hook for loading state
export function useLoading(delay = 2000) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  return isLoading
}

// Hook for local storage
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])
  
  return [storedValue, setValue]
}
