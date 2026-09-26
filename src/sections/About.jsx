import { Section } from '../components/Section.jsx'

export function About() {
  return <Section id="about" title="About" className="about-section">
    <div className="about-grid"><div><p className="eyebrow">About me</p><p className="about-intro">I’m a second-year B.Tech CSE student focused on frontend development and modern web experiences.</p></div>
    <div className="about-copy"><p>I build with HTML, CSS, JavaScript and React.js, and enjoy learning through projects and UI experiments.</p><p>I’m improving my Java and backend skills, and I’m interested in software development internships.</p></div></div>
  </Section>
}
