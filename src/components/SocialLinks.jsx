import { FiArrowUpRight, FiGithub, FiMail } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import { FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { SiWakatime } from 'react-icons/si'
import { siteConfig } from '../data/siteConfig.js'

export function SocialLinks({ className = '', compact = false }) {
  const links = [
    { label: 'GitHub', href: `https://github.com/${siteConfig.githubUsername}`, Icon: FiGithub },
    { label: 'WakaTime', href: siteConfig.wakatimeProfileUrl, Icon: SiWakatime },
    { label: 'LinkedIn', href: siteConfig.linkedinUrl, Icon: FaLinkedinIn },
    { label: 'Instagram', href: siteConfig.instagramUrl, Icon: FaInstagram },
    { label: 'X', href: siteConfig.xUrl, Icon: FaXTwitter },
    { label: 'Email', href: `mailto:${siteConfig.email}`, Icon: FiMail },
  ]
  return <ul className={`social-list ${compact ? 'social-list-compact' : ''} ${className}`}>{links.map(({ label, href, Icon }) => <li key={label}>{href ? <a href={href} aria-label={compact ? label : undefined} title={compact ? label : undefined} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}><Icon aria-hidden="true" />{!compact && label}<FiArrowUpRight className="arrow" aria-hidden="true" /></a> : <span className="social-placeholder" aria-label={`${label} profile link not set`} title={`${label} URL coming soon`}><Icon aria-hidden="true" />{!compact && label}</span>}</li>)}</ul>
}
