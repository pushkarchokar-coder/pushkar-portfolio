import { FiArrowDown, FiCheck, FiMapPin } from 'react-icons/fi'
import { siteConfig } from '../data/siteConfig.js'
import { LocalTime } from '../components/LocalTime.jsx'
import { MacTerminal } from '../components/MacTerminal.jsx'
import { SocialLinks } from '../components/SocialLinks.jsx'

export function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero-identity-bar glass-panel">
      <div className="identity-person">
        <span className="identity-avatar" aria-hidden="true">PC</span>
        <div className="identity-copy">
          <div className="identity-name-line"><h1 id="hero-title">{siteConfig.name}</h1><span className="verified-mark hero-verified" role="img" aria-label="Verified personal site"><FiCheck aria-hidden="true" /></span></div>
          <p className="identity-role">{siteConfig.role}</p>
        </div>
      </div>
      <div className="identity-details">
        <span className="identity-location"><FiMapPin aria-hidden="true" />{siteConfig.location}</span>
        <LocalTime />
      </div>
    </div>
    <div className="hero-copy">
      <p className="hero-description">I build clean, responsive and interactive web experiences while growing toward full-stack development.</p>
      <p className="hero-status"><span className="status-dot" />Currently building &amp; learning</p>
      <SocialLinks className="hero-socials" compact />
    </div>
    <MacTerminal />
    <a className="hero-scroll" href="#about" aria-label="Scroll to About"><FiArrowDown aria-hidden="true" /></a>
    <div className="hero-orbit" aria-hidden="true"><div className="orbit-core">PC</div><span className="orbit-label">BUILD · LEARN · REPEAT</span></div>
  </section>
}
