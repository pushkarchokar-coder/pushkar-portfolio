import { FiArrowUpRight, FiGithub, FiMail } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import { FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { FaPinterestP } from 'react-icons/fa'
import { SiWakatime } from 'react-icons/si'
import { siteConfig } from '../data/siteConfig.js'

export function SocialLinks({ className = '', compact = false }) {
  const links = [
    { label: 'GitHub', href: `https://github.com/${siteConfig.githubUsername}`, Icon: FiGithub, color: '#f0f6fc' },
    { label: 'WakaTime', href: siteConfig.wakatimeProfileUrl, Icon: SiWakatime, color: '#e37933' },
    { label: 'LinkedIn', href: siteConfig.linkedinUrl, Icon: FaLinkedinIn, color: '#0a66c2' },
    { label: 'Instagram', href: siteConfig.instagramUrl, Icon: FaInstagram, color: '#e4405f' },
    { label: 'Pinterest', href: siteConfig.pinterestUrl, Icon: FaPinterestP, color: '#e60023' },
    { label: 'X', href: siteConfig.xUrl, Icon: FaXTwitter, color: '#f0f6fc' },
    { label: 'Email', href: `mailto:${siteConfig.email}`, Icon: FiMail, color: '#ea4335' },
  ]
  return <ul className={`social-list ${compact ? 'social-list-compact' : ''} ${className}`}>{links.map(({ label, href, Icon, color }) => <li key={label}>{href ? <a href={href} style={{ '--social-color': color }} aria-label={compact ? label : undefined} title={compact ? label : undefined} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}><Icon aria-hidden="true" />{!compact && label}<FiArrowUpRight className="arrow" aria-hidden="true" /></a> : <span className="social-placeholder" aria-label={`${label} profile link not set`} title={`${label} URL coming soon`}><Icon aria-hidden="true" />{!compact && label}</span>}</li>)}</ul>
}
