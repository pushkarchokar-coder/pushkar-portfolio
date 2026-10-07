import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { siteConfig } from '../data/siteConfig.js'
import { EasterEgg } from './EasterEgg.jsx'
import { ThemeSwitcher } from './ThemeSwitcher.jsx'

const links = [['About', 'about'], ['Skills', 'skills'], ['Projects', 'projects'], ['GitHub', 'github'], ['Coding', 'coding'], ['Writing', 'writing'], ['Contact', 'contact']]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const targets = links.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current) setActive(current.target.id)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .3, .6] })
    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [])
  return <header className="topbar">
    <nav className="nav-inner page-width" aria-label="Main navigation">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>{siteConfig.name}<span className="brand-dot">.</span></a>
      <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <FiX /> : <FiMenu />}</button>
      <div className={`nav-links ${open ? 'nav-open' : ''}`}>
        {links.map(([label, id]) => <a className={active === id ? 'nav-active' : ''} key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
      <ThemeSwitcher />
      <EasterEgg />
    </nav>
  </header>
}
