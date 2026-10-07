import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext.jsx'

export function ThemeSwitcher() {
  const { theme, switchTheme } = useTheme()
  const nextTheme = theme === 'night' ? 'day' : 'night'
  const Icon = theme === 'night' ? FiMoon : FiSun
  return <button className="theme-switcher" type="button" aria-label={`Switch to ${nextTheme === 'day' ? 'light' : 'dark'} theme`} title={`Switch to ${nextTheme === 'day' ? 'light' : 'dark'} theme`} onClick={switchTheme}>
    <Icon className="theme-switcher-icon" aria-hidden="true" />
  </button>
}
