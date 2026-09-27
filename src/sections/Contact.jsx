import { FiArrowUpRight } from 'react-icons/fi'
import { Section } from '../components/Section.jsx'
import { SocialLinks } from '../components/SocialLinks.jsx'
import { siteConfig } from '../data/siteConfig.js'

export function Contact() {
  return <Section id="contact" eyebrow="Have something in mind?" title="Let’s connect" className="contact-section">
    <p className="contact-copy">I’m open to internships, interesting projects, collaborations and conversations about technology.</p>
    <SocialLinks className="contact-links" />
    <a className="email-line" href={`mailto:${siteConfig.email}`}>{siteConfig.email}<FiArrowUpRight aria-hidden="true" /></a>
  </Section>
}
