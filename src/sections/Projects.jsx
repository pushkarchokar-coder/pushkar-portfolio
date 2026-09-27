import { FiArrowUpRight, FiCode } from 'react-icons/fi'
import { Section } from '../components/Section.jsx'

export function Projects() {
  return <Section id="projects" eyebrow="A little work in progress" title="Projects">
    <div className="projects-coming-soon">
      <div className="coming-soon-orbit" aria-hidden="true"><span className="coming-soon-core"><FiCode /></span><i /><i /></div>
      <div className="coming-soon-copy">
        <span className="coming-soon-status"><i /> IN THE WORKS</span>
        <h3>Something good is taking shape.</h3>
        <p>Projects will be showcased here soon. Check back for the latest builds.</p>
      </div>
      <span className="coming-soon-mark" aria-hidden="true"><FiArrowUpRight /></span>
    </div>
  </Section>
}
