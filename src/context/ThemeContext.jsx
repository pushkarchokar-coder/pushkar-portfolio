import { createContext, useCallback, useContext, useState } from 'react'

const ThemeContext = createContext(null)

function readSavedTheme() {
  try {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'day') return 'day'
    if (savedTheme === 'dark' || savedTheme === 'night') return 'night'
  } catch {
    // Fall through to the system preference.
  }
  const preloadedTheme = document.documentElement.dataset.theme
  if (preloadedTheme === 'day' || preloadedTheme === 'night') return preloadedTheme
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'day' : 'night'
}

function setDocumentTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'day' ? '#F6F8FC' : '#070A12')
  try {
    window.localStorage.setItem('portfolio-theme', theme === 'day' ? 'light' : 'dark')
  } catch {
    // Theme switching still works when storage is unavailable.
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readSavedTheme)

  const switchTheme = useCallback(() => {
    const nextTheme = theme === 'night' ? 'day' : 'night'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const applyTheme = () => {
      setDocumentTheme(nextTheme)
      setTheme(nextTheme)
    }
    if (!reducedMotion && document.startViewTransition) {
      document.documentElement.dataset.themeDirection = nextTheme === 'day' ? 'left-to-right' : 'right-to-left'
      const transition = document.startViewTransition(applyTheme)
      transition.finished.finally(() => delete document.documentElement.dataset.themeDirection)
      return
    }
    applyTheme()
  }, [theme])

  return <ThemeContext.Provider value={{ theme, switchTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
