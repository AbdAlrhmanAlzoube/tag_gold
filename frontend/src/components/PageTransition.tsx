import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const MIN_VISIBLE_MS = 750
const FADE_MS = 450

const SplashContext = createContext<{ hold: () => () => void }>({
  hold: () => () => {},
})

export function useHoldSplash(active: boolean) {
  const { hold } = useContext(SplashContext)

  useLayoutEffect(() => {
    if (!active) return
    return hold()
  }, [active, hold])
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const holdsRef = useRef(0)
  const shownAtRef = useRef(Date.now())
  const hideTimerRef = useRef<number>(undefined)
  const fadeTimerRef = useRef<number>(undefined)

  const clearTimers = () => {
    window.clearTimeout(hideTimerRef.current)
    window.clearTimeout(fadeTimerRef.current)
  }

  const tryHide = useCallback(() => {
    if (holdsRef.current > 0) return

    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAtRef.current))
    window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => {
      setFading(true)
      fadeTimerRef.current = window.setTimeout(() => {
        setVisible(false)
        setFading(false)
      }, FADE_MS)
    }, wait)
  }, [])

  const hold = useCallback(() => {
    holdsRef.current += 1
    clearTimers()
    setVisible(true)
    setFading(false)
    shownAtRef.current = Date.now()

    return () => {
      holdsRef.current = Math.max(0, holdsRef.current - 1)
      tryHide()
    }
  }, [tryHide])

  useEffect(() => {
    clearTimers()
    setVisible(true)
    setFading(false)
    shownAtRef.current = Date.now()
    tryHide()

    return clearTimers
  }, [location.pathname, tryHide])

  const brandName = import.meta.env.VITE_BRAND_NAME || 'TAJ JEWELRY'
  const brandNameAr = import.meta.env.VITE_BRAND_NAME_AR || 'تاج للمجوهرات'

  return (
    <SplashContext.Provider value={{ hold }}>
      {children}
      {visible && (
        <div
          className={`page-splash no-print ${fading ? 'page-splash-out' : ''}`}
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="page-splash-brand">
            <BrandLogo size="xl" className="page-splash-logo" />
            <p className="page-splash-name">{brandNameAr}</p>
            <p className="page-splash-name-en">{brandName}</p>
          </div>
        </div>
      )}
    </SplashContext.Provider>
  )
}
