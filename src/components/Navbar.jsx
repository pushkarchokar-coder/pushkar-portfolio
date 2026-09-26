import { useEffect, useState } from 'react'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { profileImage } from '../data/profile.js'

const links = [
  { label: 'About', section: 'about' },
  { label: 'Skills', section: 'skills' },
  { label: 'Projects', section: 'projects' },
  { label: 'Coding', section: 'wakatime' },
  { label: 'GitHub', section: 'github' },
  { label: 'Writing', section: 'blog' },
  { label: 'Contact', section: 'contact' },
]
const THEME_STORAGE_KEY = 'portfolio-theme-v2'

function ThemeToggle() {
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && localStorage.getItem(THEME_STORAGE_KEY) === 'dark')
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} aria-pressed={dark}>{dark ? <FiSun /> : <FiMoon />}</button>
}

export function Navbar({ active }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className="site-header"><nav className="navbar wrap" aria-label="Main navigation">
    <a className="wordmark" href="#intro" onClick={close}><span className="wordmark-mark">{profileImage ? <img src={profileImage} alt="" /> : 'P'}</span><span className="wordmark-name">Pushkar Chokar<span>.</span></span></a>
    <div className={`nav-links ${open ? 'is-open' : ''}`}>
      {links.map(({ label, section }) => <a key={section} className={active === section ? 'active' : ''} href={`#${section}`} onClick={close}>{label}</a>)}
    </div>
    <div className="nav-actions"><ThemeToggle /><button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button></div>
  </nav></header>
}
