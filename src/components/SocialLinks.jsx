import { FiArrowUpRight, FiGithub, FiMail } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'

export const LINKEDIN_URL = '' // Set your exact LinkedIn profile URL here when available.
export const GITHUB_URL = 'https://github.com/pushkarchokar-coder'
export const EMAIL_ADDRESS = 'pushkarchokar@gmail.com'
const socialLinks = [
  { label: 'GitHub', href: GITHUB_URL, icon: FiGithub },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: FaLinkedinIn },
  { label: 'Email', href: `mailto:${EMAIL_ADDRESS}`, icon: FiMail },
]

export function SocialLinks({ className = '' }) {
  return <ul className={`social-links ${className}`}>{socialLinks.map(({ label, href, icon: Icon }) => <li key={label}>{href ? <a className={`social-${label.toLowerCase()}`} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'}><Icon aria-hidden="true" />{label}<FiArrowUpRight className="link-arrow" aria-hidden="true" /></a> : <span className="social-unconfigured" title="Add your LinkedIn profile URL in SocialLinks.jsx"><Icon aria-hidden="true" />{label}</span>}</li>)}</ul>
}
